"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  subscription: {
    plan: "gratuito" | "basico" | "premium"
    expiresAt?: Date
  }
  stats: {
    totalQuestions: number
    correctAnswers: number
    studyTime: number
    streak: number
    flashcardsStudied: number
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUserStats: (stats: Partial<User["stats"]>) => void
  updateUserPlan: (plan: "gratuito" | "basico" | "premium") => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem("medresidencia-user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("medresidencia-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simple validation
      if (!email || !password || password.length < 3) {
        return false
      }

      // Mock user data - iniciando com 99 questões
      const userData: User = {
        id: "1",
        name: email.split("@")[0] || "Usuário",
        email,
        subscription: {
          plan: "gratuito",
        },
        stats: {
          totalQuestions: 99,
          correctAnswers: 0,
          studyTime: 0,
          streak: 0,
          flashcardsStudied: 0,
        },
      }

      setUser(userData)
      localStorage.setItem("medresidencia-user", JSON.stringify(userData))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simple validation
      if (!name || !email || !password || password.length < 6) {
        return false
      }

      // Mock user data - iniciando com 99 questões
      const userData: User = {
        id: "1",
        name,
        email,
        subscription: {
          plan: "gratuito",
        },
        stats: {
          totalQuestions: 99,
          correctAnswers: 0,
          studyTime: 0,
          streak: 0,
          flashcardsStudied: 0,
        },
      }

      setUser(userData)
      localStorage.setItem("medresidencia-user", JSON.stringify(userData))
      return true
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const updateUserStats = (newStats: Partial<User["stats"]>) => {
    if (user) {
      const updatedUser = {
        ...user,
        stats: {
          ...user.stats,
          ...newStats,
        },
      }
      setUser(updatedUser)
      localStorage.setItem("medresidencia-user", JSON.stringify(updatedUser))
    }
  }

  const updateUserPlan = (plan: "gratuito" | "basico" | "premium") => {
    if (user) {
      const updatedUser = {
        ...user,
        subscription: {
          ...user.subscription,
          plan,
          expiresAt: plan !== "gratuito" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined, // 30 dias
        },
      }
      setUser(updatedUser)
      localStorage.setItem("medresidencia-user", JSON.stringify(updatedUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("medresidencia-user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUserStats, updateUserPlan }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
