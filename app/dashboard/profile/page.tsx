"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { Camera, User, CreditCard } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateUserProfilePicture } = useAuth()
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(user?.profilePicture || null)

  if (!user) {
    router.push("/auth")
    return null
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImage(base64String)
        updateUserProfilePicture(base64String) // Update context with new image
      }
      reader.readAsDataURL(file)
    }
  }

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'gratuito':
        return 'Gratuito'
      case 'basico':
        return 'Básico'
      case 'premium':
        return 'Premium'
      default:
        return 'Gratuito'
    }
  }

  const getPlanStatus = () => {
    if (user.subscription.plan === 'gratuito') {
      return 'Ativo'
    }
    return user.subscription.expiresAt && new Date(user.subscription.expiresAt) > new Date() 
      ? 'Ativo' 
      : 'Expirado'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Configurações do Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile-info">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile-info" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Informações do Perfil
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Assinatura
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile-info" className="space-y-6 p-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={profileImage || "/placeholder.svg?height=100&width=100&query=default+user+avatar"}
                    alt={user.name}
                  />
                  <AvatarFallback className="text-4xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Label htmlFor="profile-picture-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Alterar Foto
                    </span>
                  </Button>
                  <Input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" value={user.name} readOnly />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} readOnly />
                </div>
                <div>
                  <Label htmlFor="institution">Instituição</Label>
                  <Input id="institution" value={user.institution || "Não informado"} readOnly />
                </div>
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" value={user.city || "Não informado"} readOnly />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" value={user.state || "Não informado"} readOnly />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" value={user.phone || "Não informado"} readOnly />
                </div>
              </div>
              <Button className="w-full">Salvar Alterações</Button>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6 p-4">
              <h3 className="text-lg font-semibold mb-4">Detalhes da Assinatura</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Plano Atual</Label>
                  <p className="text-lg font-bold capitalize">{getPlanDisplayName(user.subscription.plan)}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className={`text-lg font-bold ${getPlanStatus() === 'Ativo' ? 'text-green-600' : 'text-red-600'}`}>
                    {getPlanStatus()}
                  </p>
                </div>
                {user.subscription.plan !== "gratuito" && user.subscription.expiresAt && (
                  <div>
                    <Label>Próxima Cobrança</Label>
                    <p>{new Date(user.subscription.expiresAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                )}
              </div>
              {user.subscription.plan === "gratuito" ? (
                <Button className="w-full" onClick={() => router.push("/plans")}>
                  Fazer Upgrade de Plano
                </Button>
              ) : (
                <Button variant="outline" className="w-full bg-transparent">
                  Gerenciar Assinatura
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
