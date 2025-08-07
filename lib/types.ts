"use client"

export interface User {
  id: string
  name: string
  email: string
  institution?: string
  city?: string
  state?: string
  plan: "gratuito" | "basico" | "premium"
  profilePicture?: string
  stats: {
    totalQuestions: number
    correctAnswers: number
    studyTime: number // em horas
    ranking: number
  }
}

export interface Question {
  id: string
  subject: string
  content: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  source: string
}

export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  totalQuestions: number
  userProgress: {
    answered: number
    correctRate: number
  }
}

export interface Plan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
  color: string
}

export interface Flashcard {
  id: number
  subject: string
  question: string
  answer: string
  difficulty: "easy" | "medium" | "hard"
}

export interface DailyPlan {
  questionsGoal: number
  flashcardsGoal: number
  focusSubjects: string[]
  isCompleted?: boolean // Adicionado para o status de conclusão do dia
  notice?: string // Novo campo para avisos no calendário
}
