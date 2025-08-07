"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Target, Award, Calendar, BookOpen, Brain, Clock, Trophy, Star, Zap } from 'lucide-react'

// Dados mock para os gráficos
const performanceData = [
  { date: "01/01", acertos: 75, total: 100, taxa: 75 },
  { date: "02/01", acertos: 82, total: 110, taxa: 74.5 },
  { date: "03/01", acertos: 95, total: 120, taxa: 79.2 },
  { date: "04/01", acertos: 88, total: 115, taxa: 76.5 },
  { date: "05/01", acertos: 102, total: 125, taxa: 81.6 },
  { date: "06/01", acertos: 118, total: 140, taxa: 84.3 },
  { date: "07/01", acertos: 125, total: 145, taxa: 86.2 },
]

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

const weeklyActivity = [
  { dia: "Seg", questoes: 0, tempo: 0, flashcards: 0 },
  { dia: "Ter", questoes: 0, tempo: 0, flashcards: 0 },
  { dia: "Qua", questoes: 0, tempo: 0, flashcards: 0 },
  { dia: "Qui", questoes: 0, tempo: 0, flashcards: 0 },
  { dia: "Sex", questoes: 0, tempo: 0, flashcards: 0 },
  { dia: "Sáb", questoes: 0, tempo: 0, flashcards: 0 },
  { dia: "Dom", questoes: 0, tempo: 0, flashcards: 0 },
]

const goals = [
  { id: 1, titulo: "Meta Diária", descricao: "50 questões por dia", progresso: 0, meta: 50, atual: 0 },
  { id: 2, titulo: "Meta Semanal", descricao: "300 questões por semana", progresso: 0, meta: 300, atual: 0 },
  { id: 3, titulo: "Taxa de Acerto", descricao: "Manter acima de 80%", progresso: 0, meta: 80, atual: 0 },
  { id: 4, titulo: "Sequência de Estudos", descricao: "7 dias consecutivos", progresso: 0, meta: 7, atual: 0 },
]

const achievements = [
  { id: 1, titulo: "Primeira Centena", descricao: "100 questões respondidas", conquistado: true, icone: Trophy },
  { id: 2, titulo: "Especialista", descricao: "90% de acerto em uma matéria", conquistado: true, icone: Star },
  { id: 3, titulo: "Maratonista", descricao: "1000 questões respondidas", conquistado: false, icone: Zap },
  { id: 4, titulo: "Consistente", descricao: "30 dias de estudo consecutivos", conquistado: false, icone: Calendar },
]

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState("7d")
  const [subjectStats, setSubjectStats] = useState<Record<string, { total: number; correct: number }>>({})

  useEffect(() => {
    // Carregar estatísticas por matéria do localStorage
    const stats = JSON.parse(localStorage.getItem("subjectStats") || "{}")
    setSubjectStats(stats)
  }, [])

  function getSubjectColor(name: string) {
    const colors: Record<string, string> = {
      "Cardiologia": "#ef4444",
      "Neurologia": "#3b82f6",
      "Pediatria": "#10b981",
      "Ginecologia": "#f59e0b",
      "Psiquiatria": "#8b5cf6",
      "Endocrinologia": "#ec4899",
      "Medicina Preventiva": "#14b8a6",
      "SUS": "#f97316",
      "Cirurgia": "#6b7280",
      "Clínica Médica": "#2563eb",
    }
    return colors[name] || "#6b7280"
  }

  const subjectData = [
    "Cardiologia", "Neurologia", "Pediatria", "Ginecologia", "Obstetrícia",
    "Psiquiatria", "Endocrinologia", "Medicina Preventiva", "SUS", "Cirurgia", "Clínica Médica"
  ].map(name => {
    const subjectId = subjectNameToId[name]
    const stats = subjectStats[subjectId] || { total: 0, correct: 0 }
    const taxa = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0

    return {
      materia: name,
      acertos: stats.correct,
      total: stats.total,
      taxa: taxa,
      cor: getSubjectColor(name)
    }
  })

  // Calcular estatísticas reais
  const totalQuestions = Object.values(subjectStats).reduce((sum, stats) => sum + stats.total, 0)
  const totalCorrect = Object.values(subjectStats).reduce((sum, stats) => sum + stats.correct, 0)
  const overallAccuracy = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : "0.0"

  const pieData = [
    { name: "Acertos", value: totalCorrect, color: "#10b981" },
    { name: "Erros", value: totalQuestions - totalCorrect, color: "#ef4444" },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análises Detalhadas</h2>
          <p className="text-muted-foreground">Acompanhe seu progresso e desempenho nos estudos</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12% esta semana
          </Badge>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Taxa de Acerto</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{overallAccuracy}%</div>
            <p className="text-xs text-blue-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Taxa geral de acerto
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Questões Respondidas</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{totalQuestions.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Total respondidas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Tempo de Estudo</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">0h 0m</div>
            <p className="text-xs text-purple-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Tempo de estudo
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Sequência de Estudos</CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">0 dias</div>
            <p className="text-xs text-orange-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Sequência atual
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
          <TabsTrigger value="subjects">Por Matéria</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Taxa de Acerto</CardTitle>
                <CardDescription>Acompanhe sua evolução nos últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="taxa"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Respostas</CardTitle>
                <CardDescription>Proporção entre acertos e erros</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recomendações Personalizadas</CardTitle>
              <CardDescription>Com base no seu desempenho atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Foque em Psiquiatria</h4>
                  <p className="text-sm text-blue-700">
                    Sua taxa de acerto em Psiquiatria (75%) está abaixo da média. Recomendamos revisar os conceitos
                    básicos.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Trophy className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900">Excelente em Pediatria!</h4>
                  <p className="text-sm text-green-700">
                    Continue assim! Sua performance em Pediatria está acima da média (83.6%).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Matéria</CardTitle>
              <CardDescription>Análise detalhada do seu progresso em cada especialidade</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="materia" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="taxa" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjectData.map((subject) => (
              <Card key={subject.materia}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {subject.materia}
                    <Badge variant="outline" style={{ borderColor: subject.cor, color: subject.cor }}>
                      {subject.taxa.toFixed(1)}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Acertos: {subject.acertos}</span>
                      <span>Total: {subject.total}</span>
                    </div>
                    <Progress
                      value={subject.taxa}
                      className="h-2"
                      style={{
                        backgroundColor: `${subject.cor}20`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Semanal</CardTitle>
              <CardDescription>Seu padrão de estudos nos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="questoes" fill="#3b82f6" name="Questões" />
                  <Bar dataKey="flashcards" fill="#10b981" name="Flashcards" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Média Diária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Questões</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tempo</span>
                    <span className="font-semibold">0 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Flashcards</span>
                    <span className="font-semibold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Melhor Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sábado</span>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Recorde
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-600">0 questões</div>
                  <div className="text-sm text-muted-foreground">0 minutos de estudo</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consistência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Dias ativos</span>
                    <span className="font-semibold">0/7</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="text-sm text-gray-600 font-medium">Comece sua jornada! 🚀</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {goal.titulo}
                    <Badge
                      variant={goal.progresso >= 100 ? "default" : "outline"}
                      className={goal.progresso >= 100 ? "bg-green-600" : ""}
                    >
                      {goal.progresso >= 100 ? "Concluída" : `${goal.progresso}%`}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{goal.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso: {goal.atual}</span>
                      <span>Meta: {goal.meta}</span>
                    </div>
                    <Progress value={goal.progresso} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
              <CardDescription>Seus marcos e realizações nos estudos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icone
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border ${
                        achievement.conquistado ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <IconComponent
                        className={`h-8 w-8 ${achievement.conquistado ? "text-green-600" : "text-gray-400"}`}
                      />
                      <div className="flex-1">
                        <h4 className={`font-semibold ${achievement.conquistado ? "text-green-900" : "text-gray-600"}`}>
                          {achievement.titulo}
                        </h4>
                        <p className={`text-sm ${achievement.conquistado ? "text-green-700" : "text-gray-500"}`}>
                          {achievement.descricao}
                        </p>
                      </div>
                      {achievement.conquistado && <Badge className="bg-green-600">Conquistado</Badge>}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
