"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, TrendingUp, Heart, Check, Crown, Zap, Atom } from 'lucide-react'
import type { Plan } from "@/lib/types"
import QuesmedLogo from "@/components/quesmed-logo"

const plans: Plan[] = [
  {
    id: "gratuito",
    name: "Gratuito",
    price: 0,
    period: "para sempre",
    color: "gray",
    features: ["1 questão por dia por matéria", "Acesso a todas as matérias", "Estatísticas básicas", "Ranking geral"],
  },
  {
    id: "basico",
    name: "Básico",
    price: 19.9,
    period: "/mês",
    color: "blue",
    popular: true,
    features: [
      "Questões ilimitadas",
      "Acesso a todas as matérias",
      "Estatísticas avançadas",
      "Ranking geral",
      "Filtros avançados",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 39.9,
    period: "/mês",
    color: "yellow",
    features: [
      "Questões ilimitadas",
      "Resolução completa das questões",
      "Comentários dos professores",
      "Simulados personalizados",
      "Estatísticas avançadas",
      "Suporte prioritário",
      "Acesso antecipado a novidades",
      "Certificado de conclusão",
    ],
  },
]

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectPlan = (planId: string, price: number) => {
    if (planId === "gratuito") {
      router.push("/dashboard")
    } else {
      router.push(`/checkout?plan=${planId}&amount=${price}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 w-full">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <QuesmedLogo className="h-8" />
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-700" onClick={() => router.push("/auth")}>
            Fazer Login
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 w-full max-w-7xl">
        {/* Hero Section com tema científico */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
              <Atom className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold text-white">
              Planos <span className="text-blue-400">Científicos</span>
            </h1>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
              <Atom className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Mais de 15.000 questões organizadas como elementos da tabela periódica. 
            Cada especialidade é um elemento único no seu processo de aprovação.
          </p>
        </div>

        {/* Benefits em formato de elementos químicos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex flex-col items-center justify-center border-2 border-blue-400 shadow-lg">
              <div className="text-xs text-blue-100 font-bold">10K+</div>
              <div className="text-lg font-bold text-white">Us</div>
              <div className="text-xs text-blue-100">Usuários</div>
            </div>
            <h3 className="font-semibold mb-2 text-white">Mais de 10.000 estudantes</h3>
            <p className="text-sm text-slate-400">Junte-se à maior comunidade científica</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex flex-col items-center justify-center border-2 border-green-400 shadow-lg">
              <div className="text-xs text-green-100 font-bold">95%</div>
              <div className="text-lg font-bold text-white">Ap</div>
              <div className="text-xs text-green-100">Aprovação</div>
            </div>
            <h3 className="font-semibold mb-2 text-white">95% de aprovação</h3>
            <p className="text-sm text-slate-400">Taxa de sucesso comprovada</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex flex-col items-center justify-center border-2 border-purple-400 shadow-lg">
              <div className="text-xs text-purple-100 font-bold">15K</div>
              <div className="text-lg font-bold text-white">Qt</div>
              <div className="text-xs text-purple-100">Questões</div>
            </div>
            <h3 className="font-semibold mb-2 text-white">Conteúdo atualizado</h3>
            <p className="text-sm text-slate-400">Questões atualizadas semanalmente</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex flex-col items-center justify-center border-2 border-red-400 shadow-lg">
              <div className="text-xs text-red-100 font-bold">24/7</div>
              <div className="text-lg font-bold text-white">Sp</div>
              <div className="text-xs text-red-100">Suporte</div>
            </div>
            <h3 className="font-semibold mb-2 text-white">Suporte dedicado</h3>
            <p className="text-sm text-slate-400">Equipe especializada sempre disponível</p>
          </div>
        </div>

        {/* Plans em formato de elementos da tabela periódica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative bg-slate-800/50 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? "border-blue-400 shadow-blue-400/20 shadow-lg" 
                  : plan.id === "premium" 
                    ? "border-yellow-400 shadow-yellow-400/20 shadow-lg"
                    : "border-slate-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-2 shadow-lg">
                    <Zap className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                {/* Elemento químico do plano */}
                <div className="mx-auto mb-6">
                  <div className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center border-2 shadow-lg ${
                    plan.id === "gratuito" 
                      ? "bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500"
                      : plan.id === "basico"
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400"
                        : "bg-gradient-to-br from-yellow-500 to-yellow-600 border-yellow-400"
                  }`}>
                    <div className="text-xs text-white/80 font-bold">
                      {index + 1}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {plan.id === "gratuito" ? "Fr" : plan.id === "basico" ? "Ba" : "Pr"}
                    </div>
                    <div className="text-xs text-white/80">
                      {plan.name.slice(0, 4)}
                    </div>
                  </div>
                </div>

                <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-white mb-2">
                  R$ {plan.price.toFixed(2).replace(".", ",")}
                  <span className="text-sm font-normal text-slate-400"> {plan.period}</span>
                </div>
                {plan.id !== "gratuito" && (
                  <p className="text-sm text-slate-400">Cancele quando quiser</p>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/30">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.id === "gratuito"
                      ? "bg-slate-600 hover:bg-slate-700 text-white"
                      : plan.id === "basico"
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25"
                        : "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-yellow-500/25"
                  }`}
                  onClick={() => handleSelectPlan(plan.id, plan.price)}
                >
                  {plan.id === "gratuito" ? "Começar Grátis" : "Escolher Plano"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer científico */}
        <div className="text-center mt-16">
          <p className="text-slate-400 text-sm">
            🧪 Desenvolvido com precisão científica para sua aprovação
          </p>
        </div>
      </div>
    </div>
  )
}
