import { type NextRequest, NextResponse } from "next/server"
import { MP_CONFIG, type PaymentData, type PaymentResponse } from "@/lib/mercadopago"

export async function POST(request: NextRequest) {
  try {
    const paymentData: PaymentData = await request.json()

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_CONFIG.accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": `${Date.now()}-${Math.random()}`,
      },
      body: JSON.stringify(paymentData),
    })

    const result: PaymentResponse = await response.json()

    if (!response.ok) {
      console.error("Erro na API do Mercado Pago:", result)
      return NextResponse.json({ error: "Erro ao processar pagamento", details: result }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro na API de pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
