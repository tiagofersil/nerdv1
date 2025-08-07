"use client"

import NerdLogo from "@/components/nerd-logo"
import NerdLogoMinimal from "@/components/nerd-logo-minimal"
import NerdLogoAnimated from "@/components/nerd-logo-animated"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestLogosPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">NERD Logo Variations</h1>

        {/* Logo Principal */}
        <Card>
          <CardHeader>
            <CardTitle>Logo Principal - Completo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center p-8 bg-white rounded-lg">
              <NerdLogo height={60} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center p-4 bg-gray-900 rounded-lg">
                <NerdLogo height={50} textColor="#ffffff" />
              </div>
              <div className="flex items-center justify-center p-4 bg-blue-600 rounded-lg">
                <NerdLogo height={50} textColor="#ffffff" iconColor="#fbbf24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logo Minimal */}
        <Card>
          <CardHeader>
            <CardTitle>Logo Minimal - Para espaços pequenos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center p-8 bg-white rounded-lg">
              <NerdLogoMinimal height={40} />
            </div>

            <div className="flex items-center justify-center gap-8 p-4 bg-gray-100 rounded-lg">
              <NerdLogoMinimal height={32} />
              <NerdLogoMinimal height={24} />
              <NerdLogoMinimal height={20} />
            </div>
          </CardContent>
        </Card>

        {/* Logo Animado */}
        <Card>
          <CardHeader>
            <CardTitle>Logo Animado - Interativo (passe o mouse)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center p-8 bg-white rounded-lg">
              <NerdLogoAnimated height={60} />
            </div>

            <div className="flex items-center justify-center p-8 bg-gray-900 rounded-lg">
              <NerdLogoAnimated height={50} textColor="#ffffff" />
            </div>
          </CardContent>
        </Card>

        {/* Variações de Tamanho */}
        <Card>
          <CardHeader>
            <CardTitle>Variações de Tamanho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8 p-8 bg-white rounded-lg">
              <NerdLogo height={80} />
              <NerdLogo height={60} />
              <NerdLogo height={40} />
              <NerdLogo height={32} />
            </div>
          </CardContent>
        </Card>

        {/* Paleta de Cores */}
        <Card>
          <CardHeader>
            <CardTitle>Variações de Cores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center p-4 bg-white rounded-lg border">
                <NerdLogo height={40} iconColor="#3b82f6" />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg border">
                <NerdLogo height={40} iconColor="#10b981" />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg border">
                <NerdLogo height={40} iconColor="#8b5cf6" />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg border">
                <NerdLogo height={40} iconColor="#f59e0b" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
