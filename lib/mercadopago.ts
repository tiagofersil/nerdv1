// Configuração do Mercado Pago - MODO PRODUÇÃO
export const MP_CONFIG = {
  publicKey: "APP_USR-148fdbc0-8bd9-4937-ab6a-1c4669f48dde",
  accessToken: "APP_USR-1465117204666741-072922-1585cb7f208bd36b51564dac49fff8e5-140418108",
  clientId: "1465117204666741",
  clientSecret: "jmXNZ8i8cYGXXlCtxzwR9TlWlMaNmVKT",
}

export interface PaymentData {
  token?: string
  payment_method_id: string
  payer: {
    email: string
    identification?: {
      type: string
      number: string
    }
  }
  transaction_amount: number
  installments?: number
  description: string
}

export interface PaymentResponse {
  id: number
  status: string
  status_detail: string
  payment_method_id: string
  transaction_amount: number
  date_created: string
  point_of_interaction?: {
    transaction_data: {
      qr_code_base64: string
      qr_code: string
      ticket_url: string
    }
  }
}

// Mapeamento dos planos com valores
export const PLAN_PRICES = {
  gratuito: 0,
  basico: 19.9,
  premium: 39.9,
}

export const PLAN_NAMES = {
  gratuito: "Plano Gratuito",
  basico: "Plano Básico",
  premium: "Plano Premium",
}
