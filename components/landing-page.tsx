"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, TrendingUp, Crown, Zap, Menu, X } from "lucide-react"
import MedproLogo from "@/components/quesmed-logo"
import CookieConsent from "@/components/cookie-consent"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <MedproLogo height={40} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Planos
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sobre
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/auth")}>
              Entrar
            </Button>
            <Button onClick={() => router.push("/plans")}>Começar Agora</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-blue-600">
                Recursos
              </a>
              <a href="#pricing" className="block text-gray-700 hover:text-blue-600">
                Planos
              </a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600">
                Sobre
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => router.push("/auth")}>
                  Entrar
                </Button>
                <Button onClick={() => router.push("/plans")}>Começar Agora</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <MedproLogo height={80} className="mx-auto mb-6" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sua plataforma de <span className="text-blue-600">estudos inteligente</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Domine qualquer assunto com nossa plataforma completa de estudos. Questões, flashcards, simulados e muito
            mais!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={() => router.push("/plans")} className="text-lg px-8 py-4">
              <Zap className="w-5 h-5 mr-2" />
              Começar Gratuitamente
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/auth")} className="text-lg px-8 py-4">
              Já tenho conta
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15K+</div>
              <div className="text-gray-600">Questões</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">10K+</div>
              <div className="text-gray-600">Estudantes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">Aprovação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para <span className="text-blue-600">estudar melhor</span>
            </h2>
            <p className="text-xl text-gray-600">Ferramentas poderosas para acelerar seu aprendizado</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Questões Ilimitadas</h3>
                <p className="text-sm text-gray-600">Mais de 15.000 questões atualizadas</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Flashcards Inteligentes</h3>
                <p className="text-sm text-gray-600">Sistema de repetição espaçada</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Análise de Desempenho</h3>
                <p className="text-sm text-gray-600">Relatórios detalhados do seu progresso</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Comunidade Ativa</h3>
                <p className="text-sm text-gray-600">Conecte-se com outros estudantes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para acelerar seus estudos?</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de estudantes que já estão conquistando seus objetivos
          </p>
          <Button size="lg" variant="secondary" onClick={() => router.push("/plans")} className="text-lg px-8 py-4">
            <Crown className="w-5 h-5 mr-2" />
            Ver Planos
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <MedproLogo height={40} textColor="#ffffff" className="mb-4" />
              <p className="text-gray-400">A plataforma mais completa para seus estudos</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Questões
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Flashcards
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Simulados
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Relatórios
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MEDPRO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </div>
  )
}
