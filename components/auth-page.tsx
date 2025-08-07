"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import NerdLogo from "@/components/quesmed-logo"

const organElements = [
  { symbol: "Ce", name: "Cérebro", position: "col-start-1 row-start-1" },
  { symbol: "Ol", name: "Olhos", position: "col-start-2 row-start-1" },
  { symbol: "Or", name: "Orelhas", position: "col-start-3 row-start-1" },
  { symbol: "Na", name: "Nariz", position: "col-start-4 row-start-1" },
  { symbol: "Bo", name: "Boca", position: "col-start-5 row-start-1" },
  { symbol: "Tr", name: "Traqueia", position: "col-start-6 row-start-1" },
  { symbol: "Ti", name: "Tireoide", position: "col-start-7 row-start-1" },
  { symbol: "Es", name: "Esôfago", position: "col-start-8 row-start-1" },
  
  { symbol: "Co", name: "Coração", position: "col-start-1 row-start-2" },
  { symbol: "Pu", name: "Pulmões", position: "col-start-2 row-start-2" },
  { symbol: "Fi", name: "Fígado", position: "col-start-3 row-start-2" },
  { symbol: "Ve", name: "Vesícula", position: "col-start-4 row-start-2" },
  { symbol: "Ba", name: "Baço", position: "col-start-5 row-start-2" },
  { symbol: "Pa", name: "Pâncreas", position: "col-start-6 row-start-2" },
  { symbol: "Es", name: "Estômago", position: "col-start-7 row-start-2" },
  { symbol: "Ad", name: "Adrenais", position: "col-start-8 row-start-2" },
  
  { symbol: "Re", name: "Rins", position: "col-start-1 row-start-3" },
  { symbol: "In", name: "Intestinos", position: "col-start-2 row-start-3" },
  { symbol: "Ap", name: "Apêndice", position: "col-start-3 row-start-3" },
  { symbol: "Bl", name: "Bexiga", position: "col-start-4 row-start-3" },
  { symbol: "Ut", name: "Útero", position: "col-start-5 row-start-3" },
  { symbol: "Ov", name: "Ovários", position: "col-start-6 row-start-3" },
  { symbol: "Pr", name: "Próstata", position: "col-start-7 row-start-3" },
  { symbol: "Te", name: "Testículos", position: "col-start-8 row-start-3" },
  
  { symbol: "Os", name: "Ossos", position: "col-start-1 row-start-4" },
  { symbol: "Mu", name: "Músculos", position: "col-start-2 row-start-4" },
  { symbol: "Pe", name: "Pele", position: "col-start-3 row-start-4" },
  { symbol: "Sa", name: "Sangue", position: "col-start-4 row-start-4" },
  { symbol: "Li", name: "Linfonodos", position: "col-start-5 row-start-4" },
  { symbol: "Me", name: "Medula", position: "col-start-6 row-start-4" },
  { symbol: "Ne", name: "Nervos", position: "col-start-7 row-start-4" },
  { symbol: "Va", name: "Vasos", position: "col-start-8 row-start-4" },
]

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const success = await login(email, password)
      if (success) {
        setShowSuccessAnimation(true)
        // Don't redirect immediately, wait for animation
      } else {
        setError("Email ou senha inválidos")
        setIsLoading(false)
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.")
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const phone = formData.get("phone") as string
    const state = formData.get("state") as string
    const city = formData.get("city") as string
    const institution = formData.get("institution") as string

    try {
      const success = await register(name, email, password, phone, state, city, institution)
      if (success) {
        setShowSuccessAnimation(true)
        // Don't redirect immediately, wait for animation
      } else {
        setError("Erro ao criar conta. Verifique os dados.")
        setIsLoading(false)
      }
    } catch (error) {
      setError("Erro ao criar conta. Tente novamente.")
      setIsLoading(false)
    }
  }

  const handleAnimationComplete = () => {
    router.push("/dashboard")
  }

  if (showSuccessAnimation) {
    return <NerdLogo triggerSuccessAnimation={showSuccessAnimation} onAnimationComplete={handleAnimationComplete} />
  }

  return (
    <div className="min-h-screen relative bg-blue-950/10 py-12 px-4 sm:px-6 lg:px-8">
      {/* Tabela Periódica de Órgãos - Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="grid grid-cols-8 gap-2 p-8 max-w-6xl mx-auto mt-20">
          {organElements.map((element, index) => (
            <div
              key={index}
              className={`${element.position} bg-blue-600/20 border border-blue-400/30 rounded-lg p-3 text-center hover:bg-blue-500/30 transition-colors duration-300`}
            >
              <div className="text-lg font-bold text-blue-800">{element.symbol}</div>
              <div className="text-xs text-blue-700 mt-1">{element.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6" style={{ marginTop: '25px' }}>
              <NerdLogo height={80} />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Acesse sua conta</CardTitle>
              <CardDescription>Entre ou crie uma nova conta para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Criar Conta</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Sua senha"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" name="name" type="text" placeholder="Seu nome" required disabled={isLoading} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Número de telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        type="text"
                        placeholder="Ex: São Paulo"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Ex: São Paulo"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institution">Instituição de ensino</Label>
                      <Input
                        id="institution"
                        name="institution"
                        type="text"
                        placeholder="Nome da sua faculdade/universidade"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        minLength={8}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Criando conta..." : "Criar Conta"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-600">
            <p>
              Ao continuar, você concorda com nossos{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
