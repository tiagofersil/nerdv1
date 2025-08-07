"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react'
import { useAuth } from "@/lib/auth-context"
import { getQuestionsBySubject } from "@/data/questions"
import type { Question } from "@/lib/types"

interface QuestionQuizProps {
  subject: string
  onBack: () => void
}

const bounceStyle = `
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
  .bounce-effect {
    animation: bounce 1s ease-in-out;
  }
  
  .percentage-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
    border-radius: 8px;
    transition: width 1s ease-out;
    z-index: 0;
  }
  
  .percentage-bar.correct {
    background: linear-gradient(90deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.08) 100%);
  }
  
  .percentage-bar.incorrect {
    background: linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 100%);
  }
  
  .option-content {
    position: relative;
    z-index: 1;
  }
`

// Dados simulados de estatísticas de seleção por questão
const getQuestionStats = (questionId: string) => {
  // Simulando estatísticas baseadas no ID da questão para consistência
  const seed = questionId.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
  const random = (seed * 9301 + 49297) % 233280
  const rnd = random / 233280

  // Gerando porcentagens que somam 100%
  const base = [25, 25, 25, 25]
  const variation = Math.floor(rnd * 40) - 20 // -20 a +20

  const stats = [
    Math.max(5, base[0] + variation),
    Math.max(5, base[1] - variation / 2),
    Math.max(5, base[2] + variation / 3),
    Math.max(5, base[3] - variation / 4),
  ]

  // Normalizar para somar 100%
  const total = stats.reduce((a, b) => a + b, 0)
  return stats.map((stat) => Math.round((stat / total) * 100))
}

export default function QuestionQuiz({ subject, onBack }: QuestionQuizProps) {
  const { user, updateUserStats } = useAuth()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showBounceEffect, setShowBounceEffect] = useState(false)

  useEffect(() => {
    const subjectQuestions = getQuestionsBySubject(subject)

    // Obter questões já resolvidas do localStorage
    const answeredQuestions = JSON.parse(localStorage.getItem("answeredQuestions") || "[]")

    // Separar questões não resolvidas e resolvidas
    const unanswered = subjectQuestions.filter((q) => !answeredQuestions.includes(q.id))
    const answered = subjectQuestions.filter((q) => answeredQuestions.includes(q.id))

    // Colocar questões não resolvidas primeiro, depois as resolvidas
    const orderedQuestions = [...unanswered, ...answered]

    setQuestions(orderedQuestions)
  }, [subject])

  const currentQuestion = questions[currentQuestionIndex]
  const canShowExplanation = user?.subscription?.plan === "premium"
  const questionStats = currentQuestion ? getQuestionStats(currentQuestion.id) : []

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    setShowResult(true)
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    // Marcar questão como resolvida
    const answeredQuestions = JSON.parse(localStorage.getItem("answeredQuestions") || "[]")
    if (!answeredQuestions.includes(currentQuestion.id)) {
      answeredQuestions.push(currentQuestion.id)
      localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions))
    }

    // Salvar estatísticas por matéria
    const subjectStats = JSON.parse(localStorage.getItem("subjectStats") || "{}")
    if (!subjectStats[subject]) {
      subjectStats[subject] = { total: 0, correct: 0 }
    }
    subjectStats[subject].total += 1
    if (isCorrect) {
      subjectStats[subject].correct += 1
    }
    localStorage.setItem("subjectStats", JSON.stringify(subjectStats))

    if (isCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }))
      setShowBounceEffect(true)
      setTimeout(() => setShowBounceEffect(false), 1000)

      // Atualizar estatísticas do usuário - questão correta
      updateUserStats({
        totalQuestions: (user?.stats.totalQuestions || 0) + 1,
        correctAnswers: (user?.stats.correctAnswers || 0) + 1,
      })
    } else {
      // Atualizar estatísticas do usuário - questão incorreta
      updateUserStats({
        totalQuestions: (user?.stats.totalQuestions || 0) + 1,
      })
    }

    setScore((prev) => ({ ...prev, total: prev.total + 1 }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowExplanation(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowExplanation(false)
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      easy: { label: "Fácil", className: "bg-green-100 text-green-800 border-green-300" },
      medium: { label: "Médio", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      hard: { label: "Difícil", className: "bg-red-100 text-red-800 border-red-300" },
    }

    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig] || difficultyConfig.medium

    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const getSubjectName = (subjectId: string) => {
    const subjects = {
      cardiologia: "Cardiologia",
      pediatria: "Pediatria",
      ginecologia: "Ginecologia",
      obstetricia: "Obstetrícia",
      psiquiatria: "Psiquiatria",
      endocrinologia: "Endocrinologia",
      preventiva: "Preventiva",
      sus: "SUS",
      neurologia: "Neurologia",
      cirurgia: "Cirurgia",
      "clinica-medica": "Clínica Médica",
    }
    return subjects[subjectId as keyof typeof subjects] || subjectId
  }

  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-lg text-gray-600">Nenhuma questão encontrada para este tema.</p>
          <Button onClick={onBack} className="mt-4">
            Voltar
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <style jsx>{bounceStyle}</style>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div>
                <CardTitle className="text-xl">{getSubjectName(subject)}</CardTitle>
                <p className="text-sm text-gray-600">
                  Questão {currentQuestionIndex + 1} de {questions.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Pontuação</p>
              <p className="text-lg font-bold">
                {score.correct}/{score.total}
              </p>
            </div>
          </div>
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card className={showBounceEffect ? "bounce-effect" : ""}>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            {getDifficultyBadge(currentQuestion.difficulty)}
            <Badge variant="secondary">{currentQuestion.source}</Badge>
          </div>
          <CardTitle className="text-lg leading-relaxed">{currentQuestion.content}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 border rounded-lg transition-colors relative overflow-hidden"

            if (showResult) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += " bg-green-100 border-green-500 text-green-800"
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonClass += " bg-red-100 border-red-500 text-red-800"
              } else {
                buttonClass += " bg-gray-50 border-gray-200"
              }
            } else if (selectedAnswer === index) {
              buttonClass += " bg-blue-100 border-blue-500"
            } else {
              buttonClass += " hover:bg-gray-50 border-gray-200"
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showResult}
              >
                {/* Barra de porcentagem */}
                {showResult && (
                  <div
                    className={`percentage-bar ${
                      index === currentQuestion.correctAnswer
                        ? "correct"
                        : index === selectedAnswer && index !== currentQuestion.correctAnswer
                          ? "incorrect"
                          : ""
                    }`}
                    style={{ width: `${questionStats[index]}%` }}
                  />
                )}

                <div className="option-content flex items-center gap-3">
                  <span className="font-semibold text-gray-500">{String.fromCharCode(65 + index)})</span>
                  <span className="flex-1">{option}</span>

                  {/* Apenas a porcentagem em verde */}
                  {showResult && <span className="text-sm font-medium text-green-600">{questionStats[index]}%</span>}
                </div>
              </button>
            )
          })}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {!showResult ? (
              <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="flex-1">
                Confirmar Resposta
              </Button>
            ) : (
              <>
                {canShowExplanation && (
                  <Button
                    variant="outline"
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center gap-2"
                  >
                    {showExplanation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showExplanation ? "Ocultar" : "Ver"} Resolução
                  </Button>
                )}

                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                    Próxima
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Plan Restriction Message */}
          {showResult && !canShowExplanation && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                🔒 <strong>Resolução disponível apenas no Plano Premium</strong>
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                Faça upgrade para ter acesso às explicações detalhadas de todas as questões.
              </p>
            </div>
          )}

          {/* Explanation */}
          {showResult && showExplanation && canShowExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">📚 Explicação:</h4>
              <p className="text-blue-800 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
