"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, RotateCcw, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { getFlashcardsBySubject } from "@/data/flashcards"
import { subjects } from "@/data/subjects"
import type { Flashcard } from "@/lib/types"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

// Componente para ícones idênticos ao menu NERD
const NerdStyleIcon = ({
  symbol,
  atomicNumber,
  atomicMass,
  color,
  delay = 0,
}: {
  symbol: string
  atomicNumber: number
  atomicMass: string
  color: string
  delay?: number
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }, delay)

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }, 3000 + delay)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [delay])

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-md transition-all duration-600 ease-in-out cursor-pointer ${
        isAnimating ? "animate-spin" : ""
      }`}
      style={{
        width: 56,
        height: 56,
        backgroundColor: color,
        boxShadow: isAnimating ? `0 8px 25px ${color}60` : `0 4px 15px ${color}30`,
        transform: isAnimating ? "scale(1.15) rotate(360deg)" : "scale(1)",
      }}
    >
      {/* Número atômico no canto superior esquerdo */}
      <div className="absolute top-1 left-1.5 text-xs text-white font-semibold leading-none">
        {String(atomicNumber).padStart(2, "0")}
      </div>

      {/* Símbolo do elemento no centro */}
      <div className="text-2xl font-bold text-white leading-none mt-1">{symbol}</div>

      {/* Massa atômica no canto inferior direito */}
      <div className="absolute bottom-1 right-1.5 text-xs text-white font-medium leading-none">{atomicMass}</div>
    </div>
  )
}

export default function FlashcardsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedSubject = searchParams.get("subject")

  const [allFlashcards, setAllFlashcards] = useState<Flashcard[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [completedCards, setCompletedCards] = useState<number[]>([])

  useEffect(() => {
    if (selectedSubject) {
      const flashcardsToLoad = getFlashcardsBySubject(selectedSubject)
      setAllFlashcards(flashcardsToLoad)
      setCurrentCardIndex(0)
      setShowAnswer(false) // Não mostrar resposta automaticamente
      setCompletedCards([])
    } else {
      setAllFlashcards([])
    }
  }, [selectedSubject])

  const currentCard = allFlashcards[currentCardIndex]
  const currentSubjectData = subjects.find((s) => s.id === selectedSubject)

  const handleNext = () => {
    if (currentCardIndex < allFlashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1)
      setShowAnswer(false) // Não mostrar resposta automaticamente
    }
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1)
      setShowAnswer(false) // Não mostrar resposta automaticamente
    }
  }

  const handleCardSelect = (index: number) => {
    setCurrentCardIndex(index)
    setShowAnswer(false)
  }

  const handleMarkComplete = () => {
    if (currentCard && !completedCards.includes(currentCard.id)) {
      setCompletedCards((prev) => [...prev, currentCard.id])
    }
  }

  const resetSession = () => {
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setCompletedCards([])
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIconColor = (color: string) => {
    const colors = {
      red: "#ef4444",
      pink: "#ec4899",
      purple: "#9c27b0",
      indigo: "#3f51b5",
      green: "#00e676",
      blue: "#2196f3",
      cyan: "#00bcd4",
      orange: "#ff9800",
    }
    return colors[color as keyof typeof colors] || "#6b7280"
  }

  const getSubjectData = (name: string, index: number) => {
    const subjectMap = {
      Cardiologia: { symbol: "C", atomicNumber: 6, atomicMass: "12.01" },
      Pediatria: { symbol: "P", atomicNumber: 15, atomicMass: "30.97" },
      Ginecologia: { symbol: "G", atomicNumber: 31, atomicMass: "69.72" },
      Obstetrícia: { symbol: "O", atomicNumber: 8, atomicMass: "15.99" },
      Psiquiatria: { symbol: "Ps", atomicNumber: 82, atomicMass: "207.2" },
      Endocrinologia: { symbol: "E", atomicNumber: 99, atomicMass: "252.0" },
      "Medicina Preventiva": { symbol: "Pr", atomicNumber: 59, atomicMass: "140.9" },
      SUS: { symbol: "S", atomicNumber: 16, atomicMass: "32.06" },
      Neurologia: { symbol: "N", atomicNumber: 7, atomicMass: "14.01" },
      Cirurgia: { symbol: "Cr", atomicNumber: 24, atomicMass: "51.99" },
      "Clínica Médica": { symbol: "Cm", atomicNumber: 96, atomicMass: "247.0" },
    }
    return (
      subjectMap[name as keyof typeof subjectMap] || {
        symbol: name.charAt(0),
        atomicNumber: index + 1,
        atomicMass: "1.00",
      }
    )
  }

  // Se não há assunto selecionado, mostra a lista de assuntos
  if (!selectedSubject) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Flashcards</h1>
          <p className="text-gray-600">Selecione um assunto para começar a revisar com flashcards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const flashcardsCount = getFlashcardsBySubject(subject.id).length
            const subjectData = getSubjectData(subject.name, index)

            return (
              <Card key={subject.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <NerdStyleIcon
                        symbol={subjectData.symbol}
                        atomicNumber={subjectData.atomicNumber}
                        atomicMass={subjectData.atomicMass}
                        color={getIconColor(subject.color)}
                        delay={index * 300}
                      />
                    </div>
                    <div className="flex-1 min-w0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-600">{flashcardsCount} flashcards disponíveis</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progresso</span>
                      <span className="font-medium">{subject.userProgress.correctRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.userProgress.correctRate}%` }}
                      />
                    </div>
                  </div>

                  <Link href={`/dashboard/flashcards?subject=${subject.id}`}>
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Estudar Flashcards</Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  // Se não há flashcards para o assunto selecionado
  if (allFlashcards.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/flashcards">
            <Button variant="outline" className="flex items-center gap-2 mb-4 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Assuntos
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Flashcards - {currentSubjectData?.name}</h1>
          <p className="text-gray-600">Nenhum flashcard encontrado para este assunto.</p>
        </div>
      </div>
    )
  }

  const currentSubjectDataForIcon = getSubjectData(currentSubjectData?.name || "", 0)

  // Interface dos flashcards
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/flashcards">
          <Button variant="outline" className="flex items-center gap-2 mb-4 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Assuntos
          </Button>
        </Link>
        <div className="flex items-center gap-4 mb-2">
          {currentSubjectData && (
            <NerdStyleIcon
              symbol={currentSubjectDataForIcon.symbol}
              atomicNumber={currentSubjectDataForIcon.atomicNumber}
              atomicMass={currentSubjectDataForIcon.atomicMass}
              color={getIconColor(currentSubjectData.color)}
            />
          )}
          <h1 className="text-2xl font-bold text-gray-900">Flashcards - {currentSubjectData?.name}</h1>
        </div>
        <p className="text-gray-600">Revise conceitos importantes com nossos flashcards interativos</p>
      </div>

      {/* Progress Stats Above Flashcard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="relative border-2 border-blue-300 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#2196f3' }}>
          <CardContent className="p-4 text-center">
            <div className="absolute top-1 left-2 text-xs text-white/80 font-bold">01</div>
            <div className="text-4xl font-bold text-white mb-1">📚</div>
            <div className="text-2xl font-bold text-white mb-1">{allFlashcards.length}</div>
            <div className="text-xs font-medium text-white/90">Total Cards</div>
            <div className="absolute bottom-1 right-2 text-xs text-white/80 font-medium">TC</div>
          </CardContent>
        </Card>
        <Card className="relative border-2 border-green-300 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#00e676' }}>
          <CardContent className="p-4 text-center">
            <div className="absolute top-1 left-2 text-xs text-white/80 font-bold">02</div>
            <div className="text-4xl font-bold text-white mb-1">✅</div>
            <div className="text-2xl font-bold text-white mb-1">{completedCards.length}</div>
            <div className="text-xs font-medium text-white/90">Completados</div>
            <div className="absolute bottom-1 right-2 text-xs text-white/80 font-medium">CP</div>
          </CardContent>
        </Card>
        <Card className="relative border-2 border-orange-300 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#ff9800' }}>
          <CardContent className="p-4 text-center">
            <div className="absolute top-1 left-2 text-xs text-white/80 font-bold">03</div>
            <div className="text-4xl font-bold text-white mb-1">📊</div>
            <div className="text-2xl font-bold text-white mb-1">
              {allFlashcards.length > 0 ? Math.round((completedCards.length / allFlashcards.length) * 100) : 0}%
            </div>
            <div className="text-xs font-medium text-white/90">Progresso</div>
            <div className="absolute bottom-1 right-2 text-xs text-white/80 font-medium">PG</div>
          </CardContent>
        </Card>
      </div>

      {/* Single Periodic Element Flashcard */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <div 
            className="relative rounded-lg transition-all duration-300 border-4 border-white/20 flex flex-col justify-between"
            style={{
              backgroundColor: getIconColor(currentSubjectData?.color || 'blue'),
              boxShadow: `0 12px 30px ${getIconColor(currentSubjectData?.color || 'blue')}40`,
              minHeight: showAnswer ? '600px' : '500px',
            }}
          >
            {/* Número atômico no canto superior esquerdo - estilo tabela periódica */}
            <div className="absolute top-3 left-3 text-sm text-white/80 font-bold">
              {String(currentCardIndex + 1).padStart(2, "0")}
            </div>

            {/* Símbolo do elemento centralizado no topo */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-4xl font-bold text-white">
              {currentSubjectDataForIcon.symbol}
            </div>

            {/* Nome do assunto abaixo do símbolo */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-lg font-semibold text-white/90">
              {currentSubjectData?.name}
            </div>

            {/* Conteúdo principal - pergunta e resposta */}
            <div className="flex flex-col justify-center items-center px-8 py-32 space-y-6">
              {/* Pergunta */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 w-full max-w-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Pergunta:</h3>
                <p className="text-white text-lg leading-relaxed">{currentCard.question}</p>
              </div>

              {/* Resposta (quando mostrada) */}
              {showAnswer && (
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 border border-white/30 w-full max-w-2xl">
                  <h3 className="text-xl font-bold text-white mb-4">Resposta:</h3>
                  <p className="text-white text-base leading-relaxed">{currentCard.answer}</p>
                </div>
              )}

              {/* Botão Mostrar/Ocultar Resposta */}
              <Button 
                onClick={() => setShowAnswer(!showAnswer)} 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              >
                {showAnswer ? "Ocultar Resposta" : "Mostrar Resposta"}
              </Button>

              {/* Mark Complete Button */}
              {showAnswer && (
                <Button
                  onClick={handleMarkComplete}
                  disabled={completedCards.includes(currentCard.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {completedCards.includes(currentCard.id) ? "✓ Concluído" : "Marcar como Concluído"}
                </Button>
              )}
            </div>

            {/* Massa atômica no canto inferior direito */}
            <div className="absolute bottom-3 right-3 text-sm text-white/80 font-medium">
              {currentSubjectDataForIcon.atomicMass}
            </div>

            {/* Dificuldade no canto inferior esquerdo */}
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                {currentCard.difficulty === 'easy' ? 'Fácil' : 
                 currentCard.difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentCardIndex === allFlashcards.length - 1}
          className="flex items-center gap-2"
        >
          Próximo
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
