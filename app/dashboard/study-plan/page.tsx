"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, CalendarIcon, BookOpen, Zap, CheckCircle, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { getAllSubjects } from "@/data/questions"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { DailyPlan } from "@/lib/types"

export default function StudyPlanPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [dailyQuestionsGoal, setDailyQuestionsGoal] = useState(10)
  const [dailyFlashcardsGoal, setDailyFlashcardsGoal] = useState(5)
  const [focusSubjects, setFocusSubjects] = useState<string[]>([])
  const [currentQuestionsAnswered, setCurrentQuestionsAnswered] = useState(0)
  const [currentFlashcardsReviewed, setCurrentFlashcardsReviewed] = useState(0)

  const [allStudyPlans, setAllStudyPlans] = useState<Record<string, DailyPlan>>({})

  const availableSubjects = getAllSubjects()

  const formatDateKey = (date: Date) => format(date, "yyyy-MM-dd")

  // Load all study plans from localStorage on mount
  useEffect(() => {
    const storedPlans = localStorage.getItem("medresidencia-study-plans")
    if (storedPlans) {
      setAllStudyPlans(JSON.parse(storedPlans))
    }
  }, [])

  // Load plan for selected date
  useEffect(() => {
    if (selectedDate) {
      const dateKey = formatDateKey(selectedDate)
      const planForDate = allStudyPlans[dateKey]
      if (planForDate) {
        setDailyQuestionsGoal(planForDate.questionsGoal)
        setDailyFlashcardsGoal(planForDate.flashcardsGoal)
        setFocusSubjects(planForDate.focusSubjects)
      } else {
        // Reset to default if no plan for date
        setDailyQuestionsGoal(10)
        setDailyFlashcardsGoal(5)
        setFocusSubjects([])
      }
      // Mock progress for demonstration (in a real app, this would come from actual user activity)
      setCurrentQuestionsAnswered(Math.floor(Math.random() * (dailyQuestionsGoal + 5)))
      setCurrentFlashcardsReviewed(Math.floor(Math.random() * (dailyFlashcardsGoal + 3)))
    }
  }, [selectedDate, allStudyPlans, dailyQuestionsGoal, dailyFlashcardsGoal])

  const questionsProgress = Math.min((currentQuestionsAnswered / dailyQuestionsGoal) * 100, 100)
  const flashcardsProgress = Math.min((currentFlashcardsReviewed / dailyFlashcardsGoal) * 100, 100)

  const handleSaveGoals = () => {
    if (!selectedDate) return

    const dateKey = formatDateKey(selectedDate)
    const updatedPlans = {
      ...allStudyPlans,
      [dateKey]: {
        questionsGoal: dailyQuestionsGoal,
        flashcardsGoal: dailyFlashcardsGoal,
        focusSubjects: focusSubjects,
      },
    }
    setAllStudyPlans(updatedPlans)
    localStorage.setItem("medresidencia-study-plans", JSON.stringify(updatedPlans))
    alert("Metas salvas com sucesso para " + format(selectedDate, "dd/MM/yyyy") + "!")
  }

  const getSubjectDisplayName = (subjectId: string) => {
    const subjectsMap: { [key: string]: string } = {
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
    return subjectsMap[subjectId] || subjectId.charAt(0).toUpperCase() + subjectId.slice(1).replace(/-/g, " ")
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seu Plano de Estudos</h1>
        <p className="text-gray-600">Defina suas metas e acompanhe seu progresso diário</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goal Setting */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Definir Metas Diárias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="date-picker">Selecione a Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="questions-goal">Questões por Dia</Label>
                <Input
                  id="questions-goal"
                  type="number"
                  value={dailyQuestionsGoal}
                  onChange={(e) => setDailyQuestionsGoal(Number(e.target.value))}
                  min={1}
                />
              </div>
              <div>
                <Label htmlFor="flashcards-goal">Flashcards por Dia</Label>
                <Input
                  id="flashcards-goal"
                  type="number"
                  value={dailyFlashcardsGoal}
                  onChange={(e) => setDailyFlashcardsGoal(Number(e.target.value))}
                  min={1}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subjects-focus">Foco em Assuntos (Premium)</Label>
              <Select
                value={focusSubjects.length > 0 ? focusSubjects.join(",") : ""}
                onValueChange={(value) => setFocusSubjects(value.split(",").filter(Boolean))}
                disabled={user?.plan !== "premium"}
                multiple // Enable multi-select
              >
                <SelectTrigger id="subjects-focus">
                  <SelectValue placeholder="Selecione os assuntos">
                    {focusSubjects.length > 0
                      ? focusSubjects.map(getSubjectDisplayName).join(", ")
                      : "Selecione os assuntos"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {getSubjectDisplayName(subject)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {user?.plan !== "premium" && (
                <p className="text-sm text-yellow-700 mt-2">
                  Recurso de foco em assuntos disponível apenas para o Plano Premium.
                </p>
              )}
            </div>

            <Button onClick={handleSaveGoals} className="w-full">
              Salvar Metas
            </Button>
          </CardContent>
        </Card>

        {/* Daily Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-purple-600" />
              Progresso Diário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Questões</span>
                </div>
                <span className="text-sm text-gray-600">
                  {currentQuestionsAnswered} / {dailyQuestionsGoal}
                </span>
              </div>
              <Progress value={questionsProgress} className="h-2" />
              {currentQuestionsAnswered >= dailyQuestionsGoal ? (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Meta de questões atingida!
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  Faltam {dailyQuestionsGoal - currentQuestionsAnswered} questões para sua meta.
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">Flashcards</span>
                </div>
                <span className="text-sm text-gray-600">
                  {currentFlashcardsReviewed} / {dailyFlashcardsGoal}
                </span>
              </div>
              <Progress value={flashcardsProgress} className="h-2" />
              {currentFlashcardsReviewed >= dailyFlashcardsGoal ? (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Meta de flashcards atingida!
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  Faltam {dailyFlashcardsGoal - currentFlashcardsReviewed} flashcards para sua meta.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations / Next Steps */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Recomendações e Próximos Passos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">Com base no seu progresso e nas suas metas, aqui estão algumas sugestões:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Continue praticando questões de **Cardiologia** para melhorar sua taxa de acerto.</li>
            <li>Revise os flashcards de **Pediatria** para solidificar o conhecimento.</li>
            <li>Considere fazer um **Simulado Geral** para testar seu desempenho em diversas áreas.</li>
          </ul>
          <div className="flex gap-4">
            <Button onClick={() => router.push("/dashboard/questions")} className="flex-1">
              Ir para Questões
            </Button>
            <Button onClick={() => router.push("/dashboard/flashcards")} className="flex-1" variant="outline">
              Ir para Flashcards
            </Button>
            <Button onClick={() => router.push("/dashboard/mock-tests")} className="flex-1" variant="outline">
              Ir para Simulados
            </Button>
          </div>
        </CardContent>
      </Card>

      {user?.plan !== "premium" && (
        <Card className="bg-blue-50 border-blue-200 mt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Desbloqueie o potencial máximo!</h3>
                <p className="text-blue-700">
                  Faça upgrade para o Plano Premium e tenha acesso a recomendações personalizadas, análises de
                  desempenho aprofundadas e muito mais.
                </p>
              </div>
              <Button onClick={() => router.push("/plans")}>Ver Planos</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
