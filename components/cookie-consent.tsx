"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CookieConsentProps {
  onAccept?: () => void
  onManage?: () => void
}

export function CookieConsent({ onAccept, onManage }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const cookieConsent = localStorage.getItem("quesmed-cookie-consent")
    if (!cookieConsent) {
      // Mostrar o popup após um pequeno delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("quesmed-cookie-consent", "accepted")
    setIsVisible(false)
    onAccept?.()
  }

  const handleManage = () => {
    localStorage.setItem("quesmed-cookie-consent", "managed")
    setIsVisible(false)
    onManage?.()
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/20 backdrop-blur-sm">
      <Card className="w-full max-w-4xl bg-white shadow-2xl border-0 rounded-t-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">Primeiro, vamos falar dos cookies 🍪</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0 hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              Utilizamos cookies essenciais para o funcionamento do Quesmed. Gostaríamos de usar outros cookies para
              melhorar e personalizar a sua experiência, selecionar melhor os anúncios do Quesmed que você vê no nosso
              site e em sites parceiros e analisar o desempenho do nosso site, mas somente se você permitir. Para saber
              mais{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline" onClick={(e) => e.preventDefault()}>
                sobre suas opções
              </a>
              ,{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline" onClick={(e) => e.preventDefault()}>
                consulte a nossa Política de cookies
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAcceptAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Aceitar todos os cookies
            </Button>
            <Button
              variant="outline"
              onClick={handleManage}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium bg-transparent"
            >
              Administrar cookies
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CookieConsent
