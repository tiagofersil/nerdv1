"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, User, LogOut, X, Crown } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import MedproLogo from "./quesmed-logo"

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [notifications] = useState(3)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirecionar para página de questões com filtro de pesquisa
      router.push(`/dashboard/questions?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setShowMobileSearch(false)
    }
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const mockNotifications = [
    {
      id: 1,
      title: "Nova questão disponível",
      message: "Cardiologia - Arritmias cardíacas",
      time: "5 min atrás",
      unread: true,
    },
    {
      id: 2,
      title: "Meta diária atingida!",
      message: "Parabéns! Você completou 50 questões hoje",
      time: "1 hora atrás",
      unread: true,
    },
    {
      id: 3,
      title: "Simulado disponível",
      message: "Novo simulado de Pediatria foi adicionado",
      time: "2 horas atrás",
      unread: false,
    },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-600/20 backdrop-blur-md border-b border-blue-300/20">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <MedproLogo height={80} />
        </div>

        {/* Center - Search (Desktop) */}
        {!showMobileSearch && (
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar questões, temas, simulados..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              />
            </form>
          </div>
        )}

        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="flex-1 mx-4 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Right side - Actions and Profile */}
        <div className="flex items-center gap-3">
          {/* Search button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-100 rounded-lg"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            {showMobileSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

          {/* Plans button */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-lg"
            onClick={() => router.push("/plans")}
            title="Planos e Assinaturas"
          >
            {user?.subscription.plan === "premium" ? (
              <Crown className="h-5 w-5 text-yellow-600" />
            ) : user?.subscription.plan === "basico" ? (
              <Crown className="h-5 w-5 text-blue-600" />
            ) : (
              <Crown className="h-5 w-5 text-gray-600" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 modern-card" align="end">
              <DropdownMenuLabel className="font-semibold text-gray-900">
                Notificações ({notifications})
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${notification.unread ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-blue-600 mt-2">{notification.time}</p>
                      </div>
                      {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600 hover:bg-gray-50 cursor-pointer">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
                <Avatar className="h-10 w-10 border-2 border-gray-200">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-gray-100 text-gray-700 font-semibold">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 modern-card" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900">{user?.name || "Usuário"}</p>
                  <p className="text-xs leading-none text-gray-500">{user?.email || "usuario@exemplo.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push("/dashboard/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-red-50 text-red-600 cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
