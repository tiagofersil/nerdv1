"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import LandingPage from "@/components/landing-page"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      setIsRedirecting(true)
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading || isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            {isRedirecting ? "Redirecionando para o dashboard..." : "Carregando..."}
          </p>
        </div>
      </div>
    )
  }

  // Sempre mostra a landing page se não há usuário logado
  return <LandingPage />
}
