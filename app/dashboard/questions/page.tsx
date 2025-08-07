"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import QuestionQuiz from "@/components/question-quiz"
import { useSearchParams } from "next/navigation"
import { getAllSubjectsData } from "@/data/subjects"

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

export default function QuestionsPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const initialSubject = searchParams.get("subject")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(initialSubject)

  const subjects = getAllSubjectsData()

  useEffect(() => {
    setSelectedSubject(initialSubject)
  }, [initialSubject])

  if (selectedSubject) {
    return <QuestionQuiz subject={selectedSubject} onBack={() => setSelectedSubject(null)} />
  }

  const getColorClass = (color: string) => {
    const colors = {
      red: "bg-red-500",
      pink: "bg-pink-500",
      purple: "bg-purple-500",
      indigo: "bg-indigo-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      cyan: "bg-cyan-500",
      orange: "bg-orange-500",
    }
    return colors[color as keyof typeof colors] || "bg-gray-500"
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Temas de Estudo</h1>
        <p className="text-gray-600">Escolha um tema para começar a estudar</p>
      </div>

      {user?.plan === "gratuito" && (
        <Card className="bg-blue-50 border-blue-200 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Aproveite mais seus estudos!</h3>
                <p className="text-blue-700">Upgrade para ter acesso ilimitado a questões e resoluções detalhadas.</p>
              </div>
              <Button>Ver Planos</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => {
          const subjectData = getSubjectData(subject.name, index)
          return (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <NerdStyleIcon
                    symbol={subjectData.symbol}
                    atomicNumber={subjectData.atomicNumber}
                    atomicMass={subjectData.atomicMass}
                    color={getIconColor(subject.color)}
                    delay={index * 300}
                  />
                  <div>
                    <h3 className="font-semibold">{subject.name}</h3>
                    <p className="text-sm text-gray-600">{subject.totalQuestions} questões</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Taxa de acerto</span>
                    <span>{subject.userProgress.correctRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getColorClass(subject.color)}`}
                      style={{ width: `${subject.userProgress.correctRate}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">1 questão disponível</span>
                  <Button
                    size="sm"
                    className="bg-black hover:bg-gray-800"
                    onClick={() => setSelectedSubject(subject.id)}
                  >
                    Estudar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
