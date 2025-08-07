"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DailyStudyCalendar } from "@/components/daily-study-calendar"
import { subjects } from "@/data/subjects"
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus, Award, Users } from 'lucide-react'

// Componente para ícones do ranking no estilo tabela periódica
const RankingPeriodicIcon = ({ position, initials }: { position: number; initials: string }) => (
  <div
    className="w-10 h-10 flex flex-col items-center justify-center text-white font-bold text-xs relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #374151, #1f2937)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "4px",
    }}
  >
    <div className="absolute top-0.5 left-1 text-[8px] leading-none opacity-80">
      {position.toString().padStart(2, "0")}
    </div>
    <div className="text-sm font-bold leading-none mt-1">{initials}</div>
  </div>
)

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [subjectStats, setSubjectStats] = useState<Record<string, { total: number; correct: number }>>({})

  useEffect(() => {
    // Carregar estatísticas por matéria do localStorage
    const stats = JSON.parse(localStorage.getItem("subjectStats") || "{}")
    setSubjectStats(stats)
  }, [])

  // Mapear nomes das matérias para IDs
  const subjectNameToId: Record<string, string> = {
    "Cardiologia": "cardiologia",
    "Neurologia": "neurologia", 
    "Pediatria": "pediatria",
    "Ginecologia": "ginecologia",
    "Obstetrícia": "obstetricia",
    "Psiquiatria": "psiquiatria",
    "Endocrinologia": "endocrinologia",
    "Medicina Preventiva": "preventiva",
    "SUS": "sus",
    "Cirurgia": "cirurgia",
    "Clínica Médica": "clinica-medica",
  }

  // Criar dados de progresso baseados nas estatísticas reais
  const specialtyProgress = [
    "Cardiologia", "Neurologia", "Pediatria", "Ginecologia", "Obstetrícia", 
    "Psiquiatria", "Endocrinologia", "Medicina Preventiva", "SUS", "Cirurgia", "Clínica Médica"
  ].map(name => {
    const subjectId = subjectNameToId[name]
    const stats = subjectStats[subjectId] || { total: 0, correct: 0 }
    const progress = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    
    return {
      name,
      progress,
      questions: stats.total,
      correct: stats.correct,
      color: getSubjectColor(name)
    }
  })

  function getSubjectColor(name: string) {
    const colors: Record<string, string> = {
      "Cardiologia": "bg-red-500",
      "Neurologia": "bg-purple-500",
      "Pediatria": "bg-pink-500",
      "Ginecologia": "bg-blue-500",
      "Obstetrícia": "bg-green-500",
      "Psiquiatria": "bg-indigo-500",
      "Endocrinologia": "bg-yellow-500",
      "Medicina Preventiva": "bg-teal-500",
      "SUS": "bg-orange-500",
      "Cirurgia": "bg-gray-500",
      "Clínica Médica": "bg-blue-600",
    }
    return colors[name] || "bg-gray-500"
  }

  // Carregar dados reais do ranking baseado nas estatísticas dos usuários
  const [rankingData, setRankingData] = useState([
    {
      id: 1,
      name: "Ana Silva",
      points: 0,
      change: "same",
      avatar: "AS",
      color: "bg-blue-500",
      isCurrentUser: false,
    },
    {
      id: 2,
      name: "Carlos Santos", 
      points: 0,
      change: "same",
      avatar: "CS",
      color: "bg-green-500",
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "Maria Oliveira",
      points: 0,
      change: "same",
      avatar: "MO", 
      color: "bg-purple-500",
      isCurrentUser: false,
    },
    {
      id: 4,
      name: "João Pedro",
      points: 0,
      change: "same",
      avatar: "JP",
      color: "bg-red-500",
      isCurrentUser: true,
    },
    {
      id: 5,
      name: "Fernanda Costa",
      points: 0,
      change: "same",
      avatar: "FC",
      color: "bg-yellow-500",
      isCurrentUser: false,
    },
    {
      id: 6,
      name: "Ricardo Lima",
      points: 0,
      change: "same",
      avatar: "RL",
      color: "bg-indigo-500",
      isCurrentUser: false,
    },
    {
      id: 7,
      name: "Juliana Rocha",
      points: 0,
      change: "same",
      avatar: "JR",
      color: "bg-pink-500",
      isCurrentUser: false,
    },
    {
      id: 8,
      name: "Pedro Alves",
      points: 0,
      change: "same",
      avatar: "PA",
      color: "bg-teal-500",
      isCurrentUser: false,
    },
  ])

  useEffect(() => {
    // Carregar estatísticas por matéria do localStorage
    const stats = JSON.parse(localStorage.getItem("subjectStats") || "{}")
    setSubjectStats(stats)
    
    // Calcular pontos totais do usuário atual
    const totalCorrect = Object.values(stats).reduce((sum: number, stat: any) => sum + (stat.correct || 0), 0)
    
    // Atualizar ranking com pontos reais do usuário atual
    setRankingData(prevRanking => 
      prevRanking.map(user => 
        user.isCurrentUser 
          ? { ...user, points: totalCorrect }
          : user
      ).sort((a, b) => b.points - a.points)
    )
  }, [])

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-gray-500">#{position}</span>
    }
  }

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Ranking Sidebar */}
      <div className="w-80 p-6">
        <Card className="modern-card h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Ranking Semanal
            </CardTitle>
            <p className="text-sm text-gray-600">Top estudantes da semana</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {rankingData.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-sm ${
                  user.isCurrentUser ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center w-8">{getRankIcon(index + 1)}</div>

                <RankingPeriodicIcon position={index + 1} initials={user.avatar} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium truncate ${user.isCurrentUser ? "text-blue-700" : "text-gray-900"}`}>
                      {user.name}
                    </p>
                    {user.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                        Você
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">{user.points.toLocaleString()} pts</p>
                    {getChangeIcon(user.change)}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-6 pt-0">
            <Button variant="outline" className="w-full text-sm modern-button-outline bg-transparent">
              Ver Ranking Completo
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 pl-0 space-y-6">
        {/* Daily Study Calendar - First Section */}
        <DailyStudyCalendar />

        {/* Progress by Specialty Section - Second Section */}
        <Card className="modern-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Progresso por Especialidade
                </CardTitle>
                <p className="text-gray-600 mt-1">Acompanhe seu desempenho em cada área médica</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedPeriod === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("week")}
                  className={selectedPeriod === "week" ? "modern-button" : "modern-button-outline"}
                >
                  Semana
                </Button>
                <Button
                  variant={selectedPeriod === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("month")}
                  className={selectedPeriod === "month" ? "modern-button" : "modern-button-outline"}
                >
                  Mês
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {specialtyProgress.map((specialty, index) => {
                const subjectData = subjects.find((s) => s.name === specialty.name)
                const IconComponent = subjectData?.icon

                return (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    {IconComponent && <IconComponent />}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{specialty.name}</h3>
                      <p className="text-sm text-gray-600">
                        {specialty.questions} questões • {specialty.correct} acertos
                      </p>
                      {specialty.questions > 0 && (
                        <p className="text-sm font-medium text-green-600">
                          {specialty.progress}% de acerto
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
