"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, CheckCircle, XCircle, Clock } from "lucide-react"

interface PaymentStatus {
  id: number
  status: string
  status_detail: string
  payment_method_id: string
  transaction_amount: number
  date_created: string
}

export default function PaymentStatusChecker() {
  const [paymentId, setPaymentId] = useState("")
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)

  const checkPaymentStatus = async () => {
    if (!paymentId.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/payment/${paymentId}`)
      const result = await response.json()

      if (response.ok) {
        setPaymentStatus(result)
      } else {
        alert("Pagamento não encontrado")
      }
    } catch (error) {
      console.error("Erro ao consultar pagamento:", error)
      alert("Erro ao consultar pagamento")
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-4 h-4 mr-1" />
            Aprovado
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="w-4 h-4 mr-1" />
            Pendente
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="w-4 h-4 mr-1" />
            Rejeitado
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Consultar Status do Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="paymentId">ID do Pagamento</Label>
            <Input
              id="paymentId"
              placeholder="Digite o ID do pagamento"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
            />
          </div>
          <Button onClick={checkPaymentStatus} disabled={loading} className="mt-6">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </div>

        {paymentStatus && (
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Status Atual</h3>
              {getStatusBadge(paymentStatus.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label>ID</Label>
                <p className="font-mono">{paymentStatus.id}</p>
              </div>
              <div>
                <Label>Valor</Label>
                <p>R$ {paymentStatus.transaction_amount.toFixed(2)}</p>
              </div>
              <div>
                <Label>Método</Label>
                <p>{paymentStatus.payment_method_id}</p>
              </div>
              <div>
                <Label>Data</Label>
                <p>{new Date(paymentStatus.date_created).toLocaleString("pt-BR")}</p>
              </div>
            </div>

            <div>
              <Label>Detalhes do Status</Label>
              <p className="text-sm text-muted-foreground">{paymentStatus.status_detail}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
