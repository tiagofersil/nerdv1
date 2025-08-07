"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Brain, FileText, Calendar, BarChart3, Home, Stethoscope, Activity, Target, Star, Share2, Flame } from 'lucide-react'
import { useAuth } from "@/lib/auth-context"

// Sistema de níveis baseado na tabela periódica
const studyLevels = [
  {
    id: 1,
    name: "Hidrogênio",
    symbol: "H",
    questionsRequired: 100,
    color: "#e5e7eb",
    character: "🧪",
    description: "Elemento mais simples",
    atomicNumber: 1,
  },
  {
    id: 2,
    name: "Hélio",
    symbol: "He",
    questionsRequired: 250,
    color: "#fbbf24",
    character: "⚗️",
    description: "Gás nobre iniciante",
    atomicNumber: 2,
  },
  {
    id: 3,
    name: "Lítio",
    symbol: "Li",
    questionsRequired: 500,
    color: "#34d399",
    character: "🔬",
    description: "Metal alcalino",
    atomicNumber: 3,
  },
  {
    id: 4,
    name: "Berílio",
    symbol: "Be",
    questionsRequired: 1000,
    color: "#60a5fa",
    character: "🧬",
    description: "Metal alcalino-terroso",
    atomicNumber: 4,
  },
  {
    id: 5,
    name: "Boro",
    symbol: "B",
    questionsRequired: 2000,
    color: "#a78bfa",
    character: "⚛️",
    description: "Semimetal",
    atomicNumber: 5,
  },
  {
    id: 6,
    name: "Carbono",
    symbol: "C",
    questionsRequired: 3000,
    color: "#1f2937",
    character: "💎",
    description: "Base da vida",
    atomicNumber: 6,
  },
  {
    id: 7,
    name: "Nitrogênio",
    symbol: "N",
    questionsRequired: 5000,
    color: "#3b82f6",
    character: "🌟",
    description: "Gás essencial",
    atomicNumber: 7,
  },
  {
    id: 8,
    name: "Oxigênio",
    symbol: "O",
    questionsRequired: 10000,
    color: "#ef4444",
    character: "🔥",
    description: "Elemento vital",
    atomicNumber: 8,
  },
  {
    id: 9,
    name: "Flúor",
    symbol: "F",
    questionsRequired: 20000,
    color: "#10b981",
    character: "⚡",
    description: "Halogênio poderoso",
    atomicNumber: 9,
  },
  {
    id: 10,
    name: "Urânio",
    symbol: "U",
    questionsRequired: 30000,
    color: "#dc2626",
    character: "☢️",
    description: "MESTRE SUPREMO",
    atomicNumber: 92,
  },
]

// Função para calcular o nível atual baseado nas questões respondidas
const getCurrentLevel = (questionsAnswered: number) => {
  for (let i = studyLevels.length - 1; i >= 0; i--) {
    if (questionsAnswered >= studyLevels[i].questionsRequired) {
      return studyLevels[i]
    }
  }
  return null // Ainda não atingiu o primeiro nível
}

// Função para calcular o próximo nível
const getNextLevel = (questionsAnswered: number) => {
  for (let i = 0; i < studyLevels.length; i++) {
    if (questionsAnswered < studyLevels[i].questionsRequired) {
      return studyLevels[i]
    }
  }
  return null // Já atingiu o nível máximo
}

// Componente para ícones da tabela periódica
const PeriodicIcon = ({
  symbol,
  atomicNumber,
  color,
  isActive,
}: {
  symbol: string
  atomicNumber: number
  color: string
  isActive: boolean
}) => (
  <div
    className={`w-8 h-8 rounded-md flex flex-col items-center justify-center text-white font-bold text-xs relative overflow-hidden ${isActive ? "shadow-lg" : ""}`}
    style={{
      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      border: "1px solid rgba(255,255,255,0.2)",
    }}
  >
    <div className="text-[10px] font-bold leading-none">{symbol}</div>
  </div>
)

// Componente do nível do usuário
const UserLevelDisplay = ({ questionsAnswered }: { questionsAnswered: number }) => {
  const currentLevel = getCurrentLevel(questionsAnswered)
  const nextLevel = getNextLevel(questionsAnswered)

  if (!currentLevel && !nextLevel) {
    return null
  }

  const progressToNext = nextLevel
    ? ((questionsAnswered - (currentLevel?.questionsRequired || 0)) /
        (nextLevel.questionsRequired - (currentLevel?.questionsRequired || 0))) *
      100
    : 100

  // Adicione esta função antes do return do UserLevelDisplay
  const getStreakDays = () => {
    const lastLoginDate = localStorage.getItem("lastLoginDate")
    const streakCount = parseInt(localStorage.getItem("streakCount") || "0")
    const today = new Date().toDateString()
    
    if (lastLoginDate === today) {
      return streakCount
    } else {
      // Verificar se fez questão hoje
      const subjectStats = JSON.parse(localStorage.getItem("subjectStats") || "{}")
      const totalQuestions = Object.values(subjectStats).reduce((sum: number, stat: any) => sum + (stat.total || 0), 0)
      
      if (totalQuestions > 0) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        
        if (lastLoginDate === yesterday.toDateString()) {
          const newStreak = streakCount + 1
          localStorage.setItem("streakCount", newStreak.toString())
          localStorage.setItem("lastLoginDate", today)
          return newStreak
        } else {
          localStorage.setItem("streakCount", "1")
          localStorage.setItem("lastLoginDate", today)
          return 1
        }
      }
      
      return streakCount
    }
  }

  const shareProfile = async () => {
    const currentLevel = getCurrentLevel(questionsAnswered)
  
    // Criar canvas para gerar a imagem
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return
    
    // Configurar dimensões do canvas
    canvas.width = 400
    canvas.height = 300
    
    // Fundo gradiente
    const gradient = ctx.createLinearGradient(0, 0, 400, 300)
    gradient.addColorStop(0, '#1f2937')
    gradient.addColorStop(1, '#374151')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 400, 300)
    
    // Título
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('QuesMed - Meu Nível', 200, 40)
    
    if (currentLevel) {
      // Elemento da tabela periódica
      ctx.fillStyle = currentLevel.color
      ctx.fillRect(150, 70, 100, 100)
      
      // Borda do elemento
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.lineWidth = 2
      ctx.strokeRect(150, 70, 100, 100)
      
      // Número atômico
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(currentLevel.atomicNumber.toString(), 160, 85)
      
      // Símbolo
      ctx.font = 'bold 36px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(currentLevel.symbol, 200, 135)
      
      // Nome do nível
      ctx.font = 'bold 20px Arial'
      ctx.fillText(currentLevel.name, 200, 200)
      
      // Descrição
      ctx.font = '14px Arial'
      ctx.fillStyle = '#d1d5db'
      ctx.fillText(currentLevel.description, 200, 220)
      
      // Questões respondidas
      ctx.fillText(`${questionsAnswered.toLocaleString()} questões respondidas`, 200, 250)
      
      // Emoji
      ctx.font = '32px Arial'
      ctx.fillText(currentLevel.character, 200, 285)
    } else {
      // Usuário iniciante
      ctx.fillStyle = '#6b7280'
      ctx.fillRect(150, 70, 100, 100)
      
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.lineWidth = 2
      ctx.strokeRect(150, 70, 100, 100)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 36px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('?', 200, 135)
      
      ctx.font = 'bold 20px Arial'
      ctx.fillText('Iniciante', 200, 200)
      
      ctx.font = '14px Arial'
      ctx.fillStyle = '#d1d5db'
      ctx.fillText('Continue estudando!', 200, 220)
      
      ctx.fillText(`${questionsAnswered} questões respondidas`, 200, 250)
      
      ctx.font = '32px Arial'
      ctx.fillText('🧪', 200, 285)
    }
    
    // Converter canvas para blob e fazer download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `meu-nivel-quesmed-${currentLevel?.name || 'iniciante'}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    }, 'image/png')
  }

  return (
    <div
      id="user-profile-card"
      className="px-4 py-3 mx-3 mb-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-gray-700 text-white relative"
      style={{ marginTop: "27px" }}
    >
      {/* Ícone de Ofensiva */}
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <Flame className="h-3 w-3 text-orange-500" />
        <span className="text-xs font-bold text-orange-500">{getStreakDays()}</span>
      </div>

      {/* Botão de compartilhamento */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
        onClick={shareProfile}
        title="Compartilhar no Instagram"
      >
        <Share2 className="h-3 w-3" />
      </Button>

      {/* Resto do conteúdo permanece igual */}
      {currentLevel ? (
        <>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white font-bold text-xs relative overflow-hidden shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}dd)`,
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              <div className="absolute top-0.5 left-1 text-[8px] leading-none opacity-80">
                {currentLevel.atomicNumber}
              </div>
              <div className="text-sm font-bold leading-none mt-1">{currentLevel.symbol}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentLevel.character}</span>
                <span className="text-sm font-bold">{currentLevel.name}</span>
              </div>
              <p className="text-xs text-gray-300">{currentLevel.description}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300">Questões: {questionsAnswered.toLocaleString()}</span>
              {nextLevel && (
                <span className="text-gray-300">Próximo: {nextLevel.questionsRequired.toLocaleString()}</span>
              )}
            </div>

            {nextLevel ? (
              <div className="space-y-1">
                <Progress value={Math.min(progressToNext, 100)} className="h-2 bg-gray-700" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    Próximo: {nextLevel.name} {nextLevel.character}
                  </span>
                  <span className="text-gray-400">{Math.round(progressToNext)}%</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-yellow-400">
                <Star className="h-4 w-4" />
                <span className="font-bold">NÍVEL MÁXIMO ATINGIDO!</span>
              </div>
            )}
          </div>
        </>
      ) : (
        nextLevel && (
          <div className="text-center">
            <div className="text-2xl mb-2">🧪</div>
            <p className="text-sm font-medium">Iniciante</p>
            <p className="text-xs text-gray-300 mb-2">
              Responda {nextLevel.questionsRequired} questões para desbloquear {nextLevel.name}
            </p>
            <Progress value={(questionsAnswered / nextLevel.questionsRequired) * 100} className="h-2 bg-gray-700" />
            <p className="text-xs text-gray-400 mt-1">
              {questionsAnswered}/{nextLevel.questionsRequired} questões
            </p>
          </div>
        )
      )}
    </div>
  )
}

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
    badge: null,
    periodicSymbol: "Ds",
    atomicNumber: 1,
    color: "#1f2937",
  },
  {
    icon: BookOpen,
    label: "Questões",
    href: "/dashboard/questions",
    badge: "0",
    periodicSymbol: "Q",
    atomicNumber: 2,
    color: "#374151",
  },
  {
    icon: Brain,
    label: "Flashcards",
    href: "/dashboard/flashcards",
    badge: "0",
    periodicSymbol: "Fl",
    atomicNumber: 3,
    color: "#4b5563",
  },
  {
    icon: FileText,
    label: "Simulados",
    href: "/dashboard/mock-tests",
    badge: "0",
    periodicSymbol: "Sm",
    atomicNumber: 4,
    color: "#6b7280",
  },
  {
    icon: Calendar,
    label: "Plano de Estudos",
    href: "/dashboard/study-plan",
    badge: null,
    periodicSymbol: "Pe",
    atomicNumber: 5,
    color: "#111827",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/dashboard/analytics",
    badge: null,
    periodicSymbol: "An",
    atomicNumber: 6,
    color: "#374151",
  },
  {
    icon: Activity,
    label: "Transcrição",
    href: "/dashboard/transcription",
    badge: "Beta",
    periodicSymbol: "Tr",
    atomicNumber: 7,
    color: "#4b5563",
  },
]

export default function MinimalSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const { user } = useAuth()

  // Usar dados reais do usuário
  const userQuestionsAnswered = user?.stats.totalQuestions || 0

  const isActive = (href: string) => pathname === href

  return (
    <div
      className={`fixed left-0 h-full bg-blue-600/20 backdrop-blur-md border-r border-blue-300/20 transition-all duration-300 z-40 ${isExpanded ? "w-64" : "w-16"}`}
      style={{ top: "98px" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* User Level Display - Only when expanded */}
        {isExpanded && <UserLevelDisplay questionsAnswered={userQuestionsAnswered} />}

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-1 space-y-0.5">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={isActive(item.href) ? "default" : "ghost"}
              className={`w-full justify-start h-10 transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                  : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              } ${!isExpanded ? "px-3" : "px-4"} rounded-lg`}
              onClick={() => router.push(item.href)}
            >
              <div className={`flex items-center justify-center ${!isExpanded ? "mx-auto" : "mr-3"}`}>
                <PeriodicIcon
                  symbol={item.periodicSymbol}
                  atomicNumber={item.atomicNumber}
                  color={item.color}
                  isActive={isActive(item.href)}
                />
              </div>
              {isExpanded && (
                <>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={isActive(item.href) ? "secondary" : "outline"}
                      className={`text-xs ${
                        isActive(item.href)
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>

        {/* Medical Status Indicator */}
        {isExpanded && (
          <div className="px-4 py-3 mx-3 mb-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-6 w-6 text-blue-600" strokeWidth={2} />
              <span className="text-sm font-medium text-gray-900">Status Médico</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" strokeWidth={2} />
              <span className="text-xs text-gray-600">Meta diária: 85%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
