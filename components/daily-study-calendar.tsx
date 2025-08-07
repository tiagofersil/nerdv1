"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, BookOpen, Brain, Target, Save, CheckCircle, Edit, Eye, Play } from "lucide-react"
import { toast } from "sonner"

interface StudyPlan {
  date: string
  questionsGoal: number
  flashcardsGoal: number
  studyTime: number
  subjects: string[]
  notes: string
}

interface DailyStudyCalendarProps {
  className?: string
}

export function DailyStudyCalendar({ className = "" }: DailyStudyCalendarProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [studyPlans, setStudyPlans] = useState<Record<string, StudyPlan>>({})
  const [currentPlan, setCurrentPlan] = useState<StudyPlan>({
    date: "",
    questionsGoal: 20,
    flashcardsGoal: 15,
    studyTime: 2,
    subjects: [],
    notes: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isEditMode, setIsEditMode] = useState(true)

  const subjects = [
    "Cardiologia",
    "Neurologia",
    "Pediatria",
    "Ginecologia",
    "Obstetrícia",
    "Psiquiatria",
    "Endocrinologia",
    "Medicina Preventiva",
    "SUS",
    "Cirurgia Geral",
    "Clínica Médica",
  ]

  // Load saved plans from localStorage
  useEffect(() => {
    const savedPlans = localStorage.getItem("studyPlans")
    if (savedPlans) {
      try {
        setStudyPlans(JSON.parse(savedPlans))
      } catch (error) {
        console.error("Error loading study plans:", error)
      }
    }
  }, [])

  // Generate calendar days for current month in periodic table format
  const generatePeriodicCalendarDays = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()

    const days = []

    // Create periodic table layout for days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      days.push({
        day,
        dateStr,
        isToday: day === today.getDate(),
        hasPlan: !!studyPlans[dateStr],
        // Assign periodic table properties
        atomicNumber: day,
        symbol: `D${day}`,
        group: ((day - 1) % 18) + 1,
        period: Math.floor((day - 1) / 18) + 1,
      })
    }

    return days
  }

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr)

    if (studyPlans[dateStr]) {
      setCurrentPlan(studyPlans[dateStr])
      setIsEditMode(false) // Show preview mode if plan exists
    } else {
      setCurrentPlan({
        date: dateStr,
        questionsGoal: 20,
        flashcardsGoal: 15,
        studyTime: 2,
        subjects: [],
        notes: "",
      })
      setIsEditMode(true) // Show edit mode for new plans
    }
  }

  const handleSubjectToggle = (subject: string) => {
    setCurrentPlan((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }))
  }

  const handleSavePlan = async () => {
    if (!selectedDate) {
      toast.error("Selecione uma data primeiro")
      return
    }

    if (currentPlan.questionsGoal <= 0 && currentPlan.flashcardsGoal <= 0 && currentPlan.studyTime <= 0) {
      toast.error("Defina pelo menos uma meta de estudo")
      return
    }

    setIsSaving(true)

    try {
      const updatedPlans = {
        ...studyPlans,
        [selectedDate]: {
          ...currentPlan,
          date: selectedDate,
        },
      }

      setStudyPlans(updatedPlans)
      localStorage.setItem("studyPlans", JSON.stringify(updatedPlans))

      toast.success("Plano de estudos salvo com sucesso!")

      // Switch to preview mode after saving
      setIsEditMode(false)
    } catch (error) {
      console.error("Error saving study plan:", error)
      toast.error("Erro ao salvar plano de estudos")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditPlan = () => {
    setIsEditMode(true)
  }

  const handleStartStudying = () => {
    router.push("/dashboard/questions")
  }

  const periodicDays = generatePeriodicCalendarDays()
  const today = new Date()
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  // Create periodic table grid layout
  const createPeriodicGrid = () => {
    const maxPeriods = Math.max(...periodicDays.map((d) => d.period))
    const grid = []

    for (let period = 1; period <= maxPeriods; period++) {
      const periodDays = periodicDays.filter((d) => d.period === period)
      grid.push(periodDays)
    }

    return grid
  }

  const periodicGrid = createPeriodicGrid()

  return (
    <Card className={`modern-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Calendar className="h-6 w-6" />
          Tabela Periódica de Estudos
        </CardTitle>
        <p className="text-gray-600">Organize seus estudos como elementos químicos - cada dia é um elemento único</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Periodic Table Calendar */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {monthNames[today.getMonth()]} {today.getFullYear()} - Tabela Periódica
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Cada elemento representa um dia do mês. Clique para planejar seus estudos.
              </p>
            </div>

            {/* Periodic Table Grid */}
            <div className="space-y-2 overflow-x-auto">
              {periodicGrid.map((period, periodIndex) => (
                <div key={periodIndex} className="flex gap-1 justify-start min-w-max">
                  {/* Period number */}
                  <div className="w-8 h-16 flex items-center justify-center text-xs font-bold text-gray-500 mr-2">
                    {periodIndex + 1}
                  </div>

                  {/* Elements in this period */}
                  {Array.from({ length: 18 }, (_, groupIndex) => {
                    const dayInGroup = period.find((d) => d.group === groupIndex + 1)

                    if (!dayInGroup) {
                      return <div key={groupIndex} className="w-16 h-16" />
                    }

                    return (
                      <button
                        key={dayInGroup.day}
                        onClick={() => handleDateSelect(dayInGroup.dateStr)}
                        className={`w-16 h-16 border-2 rounded-lg transition-all duration-200 relative flex flex-col items-center justify-center text-xs font-mono ${
                          selectedDate === dayInGroup.dateStr
                            ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-105"
                            : dayInGroup.isToday
                              ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md"
                              : dayInGroup.hasPlan
                                ? "border-green-500 bg-green-50 text-green-700 hover:bg-green-100"
                                : "border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {/* Atomic number (day) */}
                        <div className="text-[8px] leading-none mb-0.5 opacity-70">{dayInGroup.atomicNumber}</div>

                        {/* Element symbol */}
                        <div className="text-sm font-bold leading-none">{dayInGroup.day}</div>

                        {/* Study plan indicator */}
                        {dayInGroup.hasPlan && (
                          <div className="absolute -top-1 -right-1">
                            <CheckCircle className="h-3 w-3 text-green-500 bg-white rounded-full" />
                          </div>
                        )}

                        {/* Today indicator */}
                        {dayInGroup.isToday && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-2 h-1 bg-blue-600 rounded-full" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Legenda da Tabela:</h4>
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 bg-blue-50 rounded"></div>
                  <span>Hoje</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-green-500 bg-green-50 rounded"></div>
                  <span>Com plano</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 bg-blue-600 rounded"></div>
                  <span>Selecionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 bg-white rounded"></div>
                  <span>Disponível</span>
                </div>
              </div>
            </div>
          </div>

          {/* Study Plan Details */}
          <div className="space-y-4">
            {selectedDate ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Elemento {periodicDays.find((d) => d.dateStr === selectedDate)?.day}
                  </h3>
                  {!isEditMode && (
                    <Button
                      onClick={handleEditPlan}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 modern-button-outline bg-transparent"
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                  )}
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR")}
                </div>

                {isEditMode ? (
                  // Edit Mode - Configuration Panel
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="questionsGoal" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Meta de Questões
                      </Label>
                      <Input
                        id="questionsGoal"
                        type="number"
                        min="0"
                        max="100"
                        value={currentPlan.questionsGoal}
                        onChange={(e) =>
                          setCurrentPlan((prev) => ({
                            ...prev,
                            questionsGoal: Number.parseInt(e.target.value) || 0,
                          }))
                        }
                        className="mt-1 modern-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="flashcardsGoal" className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Meta de Flashcards
                      </Label>
                      <Input
                        id="flashcardsGoal"
                        type="number"
                        min="0"
                        max="50"
                        value={currentPlan.flashcardsGoal}
                        onChange={(e) =>
                          setCurrentPlan((prev) => ({
                            ...prev,
                            flashcardsGoal: Number.parseInt(e.target.value) || 0,
                          }))
                        }
                        className="mt-1 modern-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="studyTime" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Tempo de Estudo (horas)
                      </Label>
                      <Input
                        id="studyTime"
                        type="number"
                        min="0"
                        max="12"
                        step="0.5"
                        value={currentPlan.studyTime}
                        onChange={(e) =>
                          setCurrentPlan((prev) => ({
                            ...prev,
                            studyTime: Number.parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="mt-1 modern-input"
                      />
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4" />
                        Assuntos de Estudo
                      </Label>
                      <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                        {subjects.map((subject) => (
                          <label key={subject} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={currentPlan.subjects.includes(subject)}
                              onChange={() => handleSubjectToggle(subject)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{subject}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        placeholder="Adicione observações sobre seu plano de estudos..."
                        value={currentPlan.notes}
                        onChange={(e) =>
                          setCurrentPlan((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        className="mt-1 modern-input"
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleSavePlan} disabled={isSaving} className="w-full modern-button">
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Salvando..." : "Salvar Plano"}
                    </Button>
                  </div>
                ) : (
                  // Preview Mode - Plan Visualization
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="h-5 w-5 text-gray-700" />
                      <span className="font-medium text-gray-700">Propriedades do Elemento</span>
                    </div>

                    {/* Goals Summary */}
                    <div className="grid grid-cols-1 gap-3">
                      {currentPlan.questionsGoal > 0 && (
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-blue-900">Questões</span>
                          </div>
                          <span className="text-xl font-bold text-blue-600">{currentPlan.questionsGoal}</span>
                        </div>
                      )}

                      {currentPlan.flashcardsGoal > 0 && (
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-purple-900">Flashcards</span>
                          </div>
                          <span className="text-xl font-bold text-purple-600">{currentPlan.flashcardsGoal}</span>
                        </div>
                      )}

                      {currentPlan.studyTime > 0 && (
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-green-900">Tempo de Estudo</span>
                          </div>
                          <span className="text-xl font-bold text-green-600">{currentPlan.studyTime}h</span>
                        </div>
                      )}
                    </div>

                    {/* Subjects */}
                    {currentPlan.subjects.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-gray-700" />
                          <span className="font-medium text-gray-700">Composição de Estudos</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentPlan.subjects.map((subject) => (
                            <Badge
                              key={subject}
                              variant="secondary"
                              className="bg-gray-100 text-gray-700 border-gray-200"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {currentPlan.notes && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Propriedades Especiais</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-700">{currentPlan.notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Análise do Elemento:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-blue-800">
                          <span className="font-medium">Atividades totais:</span>
                          <br />
                          {(currentPlan.questionsGoal || 0) + (currentPlan.flashcardsGoal || 0)}
                        </div>
                        <div className="text-blue-800">
                          <span className="font-medium">Energia necessária:</span>
                          <br />
                          {currentPlan.studyTime}h
                        </div>
                      </div>
                    </div>

                    {/* Start Studying Button */}
                    <Button
                      onClick={handleStartStudying}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-2.5 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Ativar Elemento
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">
                  Selecione um elemento na tabela periódica para configurar seu plano de estudos
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
