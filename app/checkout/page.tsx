"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Atom } from 'lucide-react'
import MercadoPagoCheckout from "@/components/mercadopago-checkout"
import QuesmedLogo from "@/components/quesmed-logo"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get("plan") || "basico"
  const amount = Number.parseFloat(searchParams.get("amount") || "19.90")

  const planNames = {
    basico: "Plano Básico",
    premium: "Plano Premium",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 w-full">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/plans")}>
            <QuesmedLogo className="h-8" />
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-700" onClick={() => router.push("/auth")}>
            Fazer Login
          </Button>
        </div>
      </header>

      <div className="py-12 px-4 w-full">
        <div className="container mx-auto w-full max-w-7xl">
          {/* Hero Section com tema científico */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                <Atom className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold text-white">
                Finalizar <span className="text-blue-400">Assinatura</span>
              </h1>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                <Atom className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            {/* Elemento químico do plano selecionado */}
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center border-2 shadow-lg ${
                plan === "basico"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400"
                  : "bg-gradient-to-br from-yellow-500 to-yellow-600 border-yellow-400"
              }`}>
                <div className="text-xs text-white/80 font-bold">
                  {plan === "basico" ? "2" : "3"}
                </div>
                <div className="text-2xl font-bold text-white">
                  {plan === "basico" ? "Ba" : "Pr"}
                </div>
                <div className="text-xs text-white/80">
                  {plan === "basico" ? "Básico" : "Prem"}
                </div>
              </div>
            </div>

            <p className="text-lg text-blue-400 font-semibold mb-2">
              {planNames[plan as keyof typeof planNames]}
            </p>
            <p className="text-2xl font-bold text-white">
              R$ {amount.toFixed(2).replace(".", ",")} /mês
            </p>
          </div>

          <div className="flex justify-center w-full">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg p-8 shadow-2xl max-w-md w-full">
              <MercadoPagoCheckout
                planAmount={amount}
                planName={planNames[plan as keyof typeof planNames]}
                planId={plan}
              />
            </div>
          </div>

          {/* Footer científico */}
          <div className="text-center mt-12">
            <p className="text-slate-400 text-sm">
              🧪 Pagamento seguro e criptografado
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
