import { type NextRequest, NextResponse } from "next/server"
import { MP_CONFIG } from "@/lib/mercadopago"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("Webhook recebido:", body)

    // Verificar se é uma notificação de pagamento
    if (body.type === "payment") {
      const paymentId = body.data.id

      // Buscar detalhes do pagamento
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${MP_CONFIG.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      const paymentData = await response.json()

      console.log("Dados do pagamento:", paymentData)

      // Salvar dados do pagamento aprovado no localStorage (simulando banco de dados)
      if (paymentData.status === "approved") {
        console.log(`✅ Pagamento ${paymentId} aprovado!`)

        // Preparar dados do pagamento para salvar
        const paymentRecord = {
          id: paymentData.id.toString(),
          amount: paymentData.transaction_amount,
          status: paymentData.status,
          paymentMethod: paymentData.payment_method_id,
          payerEmail: paymentData.payer.email,
          payerName: paymentData.payer.first_name || paymentData.payer.email,
          dateCreated: paymentData.date_created,
          description: paymentData.description || "Assinatura de plano",
          installments: paymentData.installments || 1,
          cardLastFour: paymentData.card?.last_four_digits || null,
          cardBrand: paymentData.payment_method?.brand || null,
        }

        // Salvar no localStorage (em produção seria um banco de dados)
        if (typeof window !== "undefined") {
          const existingPayments = JSON.parse(localStorage.getItem("approvedPayments") || "[]")
          existingPayments.push(paymentRecord)
          localStorage.setItem("approvedPayments", JSON.stringify(existingPayments))
        }

        // Também atualizar os dados do cliente se existir
        if (typeof window !== "undefined") {
          const existingCustomers = JSON.parse(localStorage.getItem("customerData") || "[]")
          const customerIndex = existingCustomers.findIndex((c: any) => c.email === paymentData.payer.email)

          if (customerIndex >= 0) {
            existingCustomers[customerIndex].status = "active"
            existingCustomers[customerIndex].lastPayment = paymentData.date_created
            localStorage.setItem("customerData", JSON.stringify(existingCustomers))
          }
        }
      } else if (paymentData.status === "rejected") {
        console.log(`❌ Pagamento ${paymentId} rejeitado!`)

        // Salvar pagamento rejeitado também
        const rejectedPayment = {
          id: paymentData.id.toString(),
          amount: paymentData.transaction_amount,
          status: paymentData.status,
          paymentMethod: paymentData.payment_method_id,
          payerEmail: paymentData.payer.email,
          payerName: paymentData.payer.first_name || paymentData.payer.email,
          dateCreated: paymentData.date_created,
          description: paymentData.description || "Assinatura de plano",
          statusDetail: paymentData.status_detail,
        }

        if (typeof window !== "undefined") {
          const existingPayments = JSON.parse(localStorage.getItem("rejectedPayments") || "[]")
          existingPayments.push(rejectedPayment)
          localStorage.setItem("rejectedPayments", JSON.stringify(existingPayments))
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Erro no webhook:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}

// Mercado Pago também envia GET para verificar se o endpoint existe
export async function GET() {
  return NextResponse.json({ status: "Webhook ativo" })
}
