"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, ArrowLeft, ArrowRight, Flag, AlertTriangle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { questionsDB } from "@/data/questions"
import type { Question } from "@/lib/types"

// Mock data para simulados
const mockTests = [
  {
    id: 1,
    title: "Simulado Geral - Residência Médica 2024",
    description: "Simulado completo com questões de todas as especialidades",
    questions: 100,
    duration: 240, // minutes
    difficulty: "medium",
    participants: 1247,
    averageScore: 72,
    status: "available",
  },
  {
    id: 2,
    title: "Simulado Clínica Médica",
    description: "Foco em questões de clínica médica e medicina interna",
    questions: 50,
    duration: 120,
    difficulty: "hard",
    participants: 892,
    averageScore: 68,
    status: "available",
  },
  {
    id: 3,
    title: "Simulado Pediatria",
    description: "Questões específicas de pediatria e neonatologia",
    questions: 40,
    duration: 90,
    difficulty: "medium",
    participants: 634,
    averageScore: 75,
    status: "available",
  },
]

export default function MockTestPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const simuladoId = Number(params.id)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  const simulado = mockTests.find((test) => test.id === simuladoId)

  useEffect(() => {
    if (!simulado) {
      router.push("/dashboard/mock-tests")
      return
    }

    // Selecionar questões aleatórias baseadas no simulado
    let selectedQuestions: Question[] = []

    if (simulado.id === 1) {
      // Simulado Geral - questões de todas as matérias
      selectedQuestions = questionsDB.slice(0, Math.min(simulado.questions, questionsDB.length))
    } else if (simulado.id === 2) {
      // Simulado Clínica Médica
      selectedQuestions = questionsDB.filter((q) => q.subject === "clinica-medica").slice(0, simulado.questions)
    } else if (simulado.id === 3) {
      // Simulado Pediatria
      selectedQuestions = questionsDB.filter((q) => q.subject === "pediatria").slice(0, simulado.questions)
    }

    // Se não tiver questões suficientes, completar com questões gerais
    if (selectedQuestions.length < simulado.questions) {
      const remainingQuestions = questionsDB
        .filter((q) => !selectedQuestions.includes(q))
        .slice(0, simulado.questions - selectedQuestions.length)
      selectedQuestions = [...selectedQuestions, ...remainingQuestions]
    }

    setQuestions(selectedQuestions)
    setTimeRemaining(simulado.duration * 60) // converter para segundos
  }, [simulado, router])

  // Timer
  useEffect(() => {
    if (isStarted && !isFinished && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsFinished(true)
            setShowResults(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isStarted, isFinished, timeRemaining])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartSimulado = () => {
    setIsStarted(true)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (isFinished) return

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleFinishSimulado = () => {
    setIsFinished(true)
    setShowResults(true)
  }

  const calculateResults = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / questions.length) * 100)
    return { correctAnswers, totalQuestions: questions.length, score }
  }

  if (!simulado) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <p className="text-lg text-gray-600">Simulado não encontrado.</p>
        <Button onClick={() => router.push("/dashboard/mock-tests")} className="mt-4">
          Voltar aos Simulados
        </Button>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Carregando simulado...</p>
      </div>
    )
  }

  // Tela inicial do simulado
  if (!isStarted) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" onClick={() => router.push("/dashboard/mock-tests")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </div>
            <CardTitle className="text-2xl">{simulado.title}</CardTitle>
            <p className="text-gray-600">{simulado.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-sm text-gray-600">Questões</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatTime(timeRemaining)}</div>
                <div className="text-sm text-gray-600">Tempo Limite</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{simulado.averageScore}%</div>
                <div className="text-sm text-gray-600">Média Geral</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Instruções Importantes:</h4>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Você terá {formatTime(timeRemaining)} para completar o simulado</li>
                    <li>• Não é possível pausar o tempo após iniciar</li>
                    <li>• Você pode navegar entre as questões livremente</li>
                    <li>• Certifique-se de ter uma conexão estável</li>
                    <li>• Recomendamos fazer em ambiente silencioso</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={handleStartSimulado} className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                <Flag className="w-5 h-5 mr-2" />
                Iniciar Simulado
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tela de resultados
  if (showResults) {
    const results = calculateResults()

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Simulado Concluído!</CardTitle>
            <p className="text-gray-600">{simulado.title}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">{results.score}%</div>
              <p className="text-lg text-gray-600">Sua pontuação</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{results.correctAnswers}</div>
                <div className="text-sm text-gray-600">Acertos</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{results.totalQuestions - results.correctAnswers}</div>
                <div className="text-sm text-gray-600">Erros</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{results.totalQuestions}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => router.push("/dashboard/mock-tests")} className="flex-1" variant="outline">
                Voltar aos Simulados
              </Button>
              <Button
                onClick={() => {
                  setIsStarted(false)
                  setIsFinished(false)
                  setShowResults(false)
                  setCurrentQuestionIndex(0)
                  setSelectedAnswers({})
                  setTimeRemaining(simulado.duration * 60)
                }}
                className="flex-1"
              >
                Refazer Simulado
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tela do simulado em andamento
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredQuestions = Object.keys(selectedAnswers).length

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header com timer e progresso */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push("/dashboard/mock-tests")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <div>
                <h2 className="font-semibold">{simulado.title}</h2>
                <p className="text-sm text-gray-600">
                  Questão {currentQuestionIndex + 1} de {questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-600">Respondidas</div>
                <div className="font-semibold">
                  {answeredQuestions}/{questions.length}
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-600">Tempo Restante</div>
                <div className={`font-semibold ${timeRemaining < 300 ? "text-red-600" : "text-green-600"}`}>
                  <Clock className="w-4 h-4 inline mr-1" />
                  {formatTime(timeRemaining)}
                </div>
              </div>

              <Button onClick={handleFinishSimulado} className="bg-red-600 hover:bg-red-700">
                <Flag className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </div>
          </div>

          <Progress value={progress} className="mt-4" />
        </CardContent>
      </Card>

      {/* Questão atual */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{currentQuestion.difficulty}</Badge>
            <Badge variant="secondary">{currentQuestion.subject}</Badge>
          </div>
          <CardTitle className="text-lg leading-relaxed">{currentQuestion.content}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === index

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                className={`w-full text-left p-4 border rounded-lg transition-colors ${
                  isSelected ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-500">{String.fromCharCode(65 + index)})</span>
                  <span>{option}</span>
                  {isSelected && <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />}
                </div>
              </button>
            )
          })}

          {/* Navegação */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="text-sm text-gray-600">
              {selectedAnswers[currentQuestionIndex] !== undefined ? (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Respondida
                </span>
              ) : (
                <span className="text-gray-500">Não respondida</span>
              )}
            </div>

            <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Próxima
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
