"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Trophy, Play, BookOpen, Target } from "lucide-react"
import { useRouter } from "next/navigation"

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
  {
    id: 4,
    title: "Simulado Cirurgia Geral",
    description: "Questões de cirurgia geral e especialidades cirúrgicas",
    questions: 45,
    duration: 100,
    difficulty: "hard",
    participants: 523,
    averageScore: 65,
    status: "coming_soon",
  },
]

const completedTests = [
  {
    id: 1,
    title: "Simulado Cardiologia",
    score: 85,
    totalQuestions: 30,
    correctAnswers: 26,
    completedAt: "2024-01-15",
    ranking: 23,
    totalParticipants: 456,
  },
  {
    id: 2,
    title: "Simulado Neurologia",
    score: 78,
    totalQuestions: 25,
    correctAnswers: 20,
    completedAt: "2024-01-10",
    ranking: 45,
    totalParticipants: 312,
  },
]

export default function MockTestsPage() {
  const [selectedTest, setSelectedTest] = useState<number | null>(null)
  const router = useRouter()

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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
  }

  const handleStartSimulado = (simuladoId: number) => {
    router.push(`/dashboard/mock-tests/${simuladoId}`)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Simulados</h1>
        <p className="text-gray-600">Teste seus conhecimentos com simulados completos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Available Tests */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Simulados Disponíveis</h2>
            <div className="space-y-4">
              {mockTests.map((test) => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{test.description}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {test.questions} questões
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDuration(test.duration)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {test.participants.toLocaleString()} participantes
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getDifficultyColor(test.difficulty)}>{test.difficulty}</Badge>
                        <div className="text-sm text-gray-600">Média: {test.averageScore}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <Target className="w-4 h-4 inline mr-1" />
                        Média de acertos: {test.averageScore}%
                      </div>

                      <Button
                        className="flex items-center gap-2"
                        disabled={test.status === "coming_soon"}
                        onClick={() => handleStartSimulado(test.id)}
                      >
                        <Play className="w-4 h-4" />
                        {test.status === "coming_soon" ? "Em Breve" : "Iniciar Simulado"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Completed Tests */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Simulados Concluídos</h2>
            <div className="space-y-4">
              {completedTests.map((test) => (
                <Card key={test.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{test.title}</h3>
                        <p className="text-sm text-gray-600">
                          Concluído em {new Date(test.completedAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{test.score}%</div>
                        <div className="text-sm text-gray-600">
                          {test.correctAnswers}/{test.totalQuestions} acertos
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Progress value={test.score} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        Posição: #{test.ranking} de {test.totalParticipants}
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Suas Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2</div>
                <div className="text-sm text-gray-600">Simulados Concluídos</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">81%</div>
                <div className="text-sm text-gray-600">Média Geral</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">#34</div>
                <div className="text-sm text-gray-600">Melhor Posição</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Simulados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-sm">Simulado Ginecologia</div>
                <div className="text-xs text-gray-600">Disponível em 3 dias</div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-semibold text-sm">Simulado Psiquiatria</div>
                <div className="text-xs text-gray-600">Disponível em 1 semana</div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-sm">Simulado Geral #2</div>
                <div className="text-xs text-gray-600">Disponível em 2 semanas</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
