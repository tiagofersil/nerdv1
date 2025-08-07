"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, QrCode, CheckCircle, XCircle, Clock, RefreshCw, Crown } from "lucide-react"
import { MP_CONFIG, PLAN_PRICES, PLAN_NAMES, type PaymentData, type PaymentResponse } from "@/lib/mercadopago"
import { useAuth } from "@/lib/auth-context"
import { saveCustomerData, generateCustomerId, type CustomerData } from "@/lib/admin-utils"

declare global {
  interface Window {
    MercadoPago: any
  }
}

interface MercadoPagoCheckoutProps {
  planAmount?: number
  planName?: string
  planId?: string
}

export default function MercadoPagoCheckout({
  planAmount = PLAN_PRICES.basico,
  planName = PLAN_NAMES.basico,
  planId = "basico",
}: MercadoPagoCheckoutProps) {
  const [mp, setMp] = useState<any>(null)
  const [cardForm, setCardForm] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "pix">("credit_card")
  const [planUpdated, setPlanUpdated] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    docType: "CPF",
    docNumber: "",
    cardholderName: "",
    installments: 1,
  })

  const { user, updateUserPlan } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        docType: "CPF",
        docNumber: "",
        cardholderName: user.name,
        installments: 1,
      })
    }
  }, [user])

  // Usar valores corretos dos planos
  const actualAmount = PLAN_PRICES[planId as keyof typeof PLAN_PRICES] || planAmount
  const actualPlanName = PLAN_NAMES[planId as keyof typeof PLAN_NAMES] || planName

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://sdk.mercadopago.com/js/v2"
    script.onload = () => {
      const mercadopago = new window.MercadoPago(MP_CONFIG.publicKey)
      setMp(mercadopago)

      if (paymentMethod === "credit_card") {
        initializeCardForm(mercadopago)
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [paymentMethod, actualAmount])

  const handlePaymentApproval = (paymentData: PaymentResponse) => {
    if (paymentData.status === "approved" && !planUpdated) {
      // Atualizar plano do usuário
      const newPlan = planId as "gratuito" | "basico" | "premium"
      updateUserPlan(newPlan)
      setPlanUpdated(true)

      // Salvar dados completos do cliente no sistema admin
      const customerData: CustomerData = {
        id: generateCustomerId(),
        name: user?.name || formData.cardholderName || "Cliente",
        email: user?.email || formData.email,
        phone: formData.docNumber,
        plan: actualPlanName,
        planPrice: actualAmount,
        contractDate: new Date().toLocaleDateString("pt-BR"),
        cardInfo: {
          cardNumber: "****",
          cardholderName: formData.cardholderName,
          expiryMonth: "",
          expiryYear: "",
          cvv: "***",
          brand: paymentData.payment_method_id,
        },
        status: "active",
      }

      saveCustomerData(customerData)

      // Mostrar mensagem de sucesso
      alert(`🎉 Pagamento aprovado! Seu plano foi atualizado para ${actualPlanName}!`)

      // Redirecionar para dashboard após 3 segundos
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    }
  }

  const initializeCardForm = (mercadopago: any) => {
    const cardForm = mercadopago.cardForm({
      amount: actualAmount.toFixed(2),
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) console.error("Form Mounted handling error: ", error)
        },
        onSubmit: (event: any) => {
          event.preventDefault()
          handleCreditCardPayment(cardForm)
        },
      },
    })
    setCardForm(cardForm)
  }

  const checkPaymentStatus = async (paymentId: number) => {
    setCheckingPayment(true)
    try {
      const response = await fetch(`/api/payment/${paymentId}`)
      const result = await response.json()

      if (response.ok) {
        setPaymentResult(result)
        handlePaymentApproval(result)

        // Mostrar mensagem baseada no status
        if (result.status === "approved") {
          alert("🎉 Pagamento aprovado com sucesso!")
        } else if (result.status === "rejected") {
          alert("❌ Pagamento foi rejeitado.")
        } else if (result.status === "pending") {
          alert("⏳ Pagamento ainda está pendente. Tente novamente em alguns instantes.")
        }
      } else {
        alert("Erro ao verificar pagamento")
      }
    } catch (error) {
      console.error("Erro ao verificar pagamento:", error)
      alert("Erro ao verificar pagamento")
    } finally {
      setCheckingPayment(false)
    }
  }

  const handleCreditCardPayment = async (cardForm: any) => {
    setLoading(true)
    try {
      const { token, ...cardFormData } = cardForm.getCardFormData()

      const emailToUse =
        cardFormData.cardholderEmail && cardFormData.cardholderEmail.trim()
          ? cardFormData.cardholderEmail
          : user?.email || "cliente@exemplo.com"

      const paymentData: PaymentData = {
        token,
        payment_method_id: cardFormData.payment_method_id,
        payer: {
          email: emailToUse,
          identification: {
            type: cardFormData.identificationType,
            number: cardFormData.identificationNumber,
          },
        },
        transaction_amount: actualAmount,
        installments: Number.parseInt(cardFormData.installments) || 1,
        description: `${actualPlanName} - R$ ${actualAmount.toFixed(2)}`,
      }

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      })

      const result = await response.json()

      if (!response.ok) {
        setPaymentResult({
          id: 0,
          status: "error",
          status_detail: result.error || "Erro no processamento",
          payment_method_id: "credit_card",
          transaction_amount: actualAmount,
          date_created: new Date().toISOString(),
          ...result,
        })
      } else {
        setPaymentResult(result)
        handlePaymentApproval(result)
      }
    } catch (error) {
      console.error("Erro no pagamento:", error)
      setPaymentResult({
        id: 0,
        status: "error",
        status_detail: "Erro de conexão",
        payment_method_id: "credit_card",
        transaction_amount: actualAmount,
        date_created: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePixPayment = async () => {
    setLoading(true)
    try {
      const emailToUse = formData.email && formData.email.trim() ? formData.email : user?.email || "cliente@exemplo.com"

      const paymentData: PaymentData = {
        payment_method_id: "pix",
        payer: {
          email: emailToUse,
          identification: {
            type: formData.docType,
            number: formData.docNumber,
          },
        },
        transaction_amount: actualAmount,
        description: `${actualPlanName} PIX - R$ ${actualAmount.toFixed(2)}`,
      }

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      })

      const result = await response.json()

      if (!response.ok) {
        setPaymentResult({
          id: 0,
          status: "error",
          status_detail: result.error || "Erro no processamento",
          payment_method_id: "pix",
          transaction_amount: actualAmount,
          date_created: new Date().toISOString(),
          ...result,
        })
      } else {
        setPaymentResult(result)
        // Para PIX, não atualizamos o plano automaticamente, apenas quando verificar o status
      }
    } catch (error) {
      console.error("Erro no pagamento PIX:", error)
      setPaymentResult({
        id: 0,
        status: "error",
        status_detail: "Erro de conexão",
        payment_method_id: "pix",
        transaction_amount: actualAmount,
        date_created: new Date().toISOString(),
      })
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

  if (paymentResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Resultado do Pagamento
            {getStatusBadge(paymentResult.status || "unknown")}
          </CardTitle>
          {planUpdated && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold">
                ✅ Plano atualizado com sucesso! Redirecionando para o dashboard...
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ID do Pagamento</Label>
              <p className="font-mono text-sm">{paymentResult.id || "N/A"}</p>
            </div>
            <div>
              <Label>Valor</Label>
              <p className="font-semibold">
                R${" "}
                {paymentResult.transaction_amount
                  ? paymentResult.transaction_amount.toFixed(2)
                  : actualAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <Label>Método</Label>
              <p>{paymentResult.payment_method_id || "N/A"}</p>
            </div>
            <div>
              <Label>Data</Label>
              <p>
                {paymentResult.date_created
                  ? new Date(paymentResult.date_created).toLocaleString("pt-BR")
                  : new Date().toLocaleString("pt-BR")}
              </p>
            </div>
          </div>

          {paymentResult.payment_method_id === "pix" && paymentResult.point_of_interaction?.transaction_data && (
            <div className="border rounded-lg p-4">
              <Label className="flex items-center gap-2 mb-2">
                <QrCode className="w-4 h-4" />
                QR Code PIX - PAGAMENTO REAL
              </Label>
              <div className="flex flex-col items-center gap-4">
                {paymentResult.point_of_interaction.transaction_data.qr_code_base64 && (
                  <img
                    src={`data:image/png;base64,${paymentResult.point_of_interaction.transaction_data.qr_code_base64}`}
                    alt="QR Code PIX"
                    className="w-48 h-48"
                  />
                )}
                <p className="text-sm text-muted-foreground text-center">
                  Escaneie o código QR com seu aplicativo bancário
                </p>
                {paymentResult.point_of_interaction.transaction_data.qr_code && (
                  <code className="text-xs bg-muted p-2 rounded break-all">
                    {paymentResult.point_of_interaction.transaction_data.qr_code}
                  </code>
                )}

                {/* Botão para atualizar status do pagamento PIX */}
                <Button
                  onClick={() => checkPaymentStatus(paymentResult.id)}
                  disabled={checkingPayment}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {checkingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verificando Pagamento...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Atualizar Status do Pagamento
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setPaymentResult(null)
                setPaymentMethod("credit_card")
                setPlanUpdated(false)
              }}
              className="flex-1"
              variant="outline"
            >
              Fazer Novo Pagamento
            </Button>

            {paymentResult.payment_method_id !== "pix" && (
              <Button
                onClick={() => checkPaymentStatus(paymentResult.id)}
                disabled={checkingPayment}
                className="flex-1"
              >
                {checkingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Verificar Status
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-600" />
          Checkout - {actualPlanName}
        </CardTitle>
        <CardDescription>
          Finalize sua assinatura do {actualPlanName} - R$ {actualAmount.toFixed(2).replace(".", ",")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credit_card" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Cartão de Crédito
            </TabsTrigger>
            <TabsTrigger value="pix" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              PIX
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit_card" className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 text-sm">
                💳 <strong>Ambiente de Produção:</strong> Pagamentos reais serão processados. Use apenas cartões válidos
                com limite disponível.
              </p>
            </div>

            <form id="form-checkout">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="form-checkout__cardholderEmail">E-mail</Label>
                  <input
                    id="form-checkout__cardholderEmail"
                    name="cardholderEmail"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    placeholder="E-mail do usuário logado"
                    className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="form-checkout__identificationType">Tipo de documento</Label>
                  <select
                    id="form-checkout__identificationType"
                    name="identificationType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="form-checkout__identificationNumber">Número do documento</Label>
                  <input
                    id="form-checkout__identificationNumber"
                    name="identificationNumber"
                    type="text"
                    placeholder="Digite seu CPF/CNPJ real"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="form-checkout__cardholderName">Nome do titular</Label>
                  <input
                    id="form-checkout__cardholderName"
                    name="cardholderName"
                    type="text"
                    value={user?.name || ""}
                    readOnly
                    placeholder="Nome do usuário logado"
                    className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="form-checkout__cardNumber">Número do cartão</Label>
                  <div id="form-checkout__cardNumber" className="h-10 border rounded-md"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="form-checkout__expirationDate">Vencimento</Label>
                    <div id="form-checkout__expirationDate" className="h-10 border rounded-md"></div>
                  </div>
                  <div>
                    <Label htmlFor="form-checkout__securityCode">CVV</Label>
                    <div id="form-checkout__securityCode" className="h-10 border rounded-md"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="form-checkout__issuer">Banco emissor</Label>
                    <select
                      id="form-checkout__issuer"
                      name="issuer"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    ></select>
                  </div>
                  <div>
                    <Label htmlFor="form-checkout__installments">Parcelas</Label>
                    <select
                      id="form-checkout__installments"
                      name="installments"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    ></select>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando Pagamento...
                  </>
                ) : (
                  `💳 Pagar R$ ${actualAmount.toFixed(2).replace(".", ",")}`
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="pix" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail do usuário logado"
                  value={user?.email || ""}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="docType">Tipo de documento</Label>
                <Select
                  value={formData.docType}
                  onValueChange={(value) => setFormData({ ...formData, docType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CPF">CPF</SelectItem>
                    <SelectItem value="CNPJ">CNPJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="docNumber">Número do documento</Label>
              <Input
                id="docNumber"
                placeholder="Digite seu CPF/CNPJ real"
                value={formData.docNumber}
                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
              />
            </div>

            <Button onClick={handlePixPayment} className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando PIX...
                </>
              ) : (
                `🔥 Pagar R$ ${actualAmount.toFixed(2).replace(".", ",")} com PIX`
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
