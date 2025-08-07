import { type NextRequest, NextResponse } from "next/server"
import { MP_CONFIG } from "@/lib/mercadopago"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${params.id}`, {
      headers: {
        Authorization: `Bearer ${MP_CONFIG.accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: "Pagamento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro ao consultar pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
