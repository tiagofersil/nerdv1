export interface CustomerData {
  id: string
  name: string
  email: string
  phone: string
  plan: string
  planPrice: number
  contractDate: string
  cardInfo: {
    cardNumber: string
    cardholderName: string
    expiryMonth: string
    expiryYear: string
    cvv: string
    brand: string
  }
  status: "active" | "inactive" | "pending"
}

export const saveCustomerData = (customerData: CustomerData) => {
  try {
    const existingData = localStorage.getItem("customerData")
    const customers: CustomerData[] = existingData ? JSON.parse(existingData) : []

    // Verificar se cliente já existe
    const existingIndex = customers.findIndex((c) => c.email === customerData.email)

    if (existingIndex >= 0) {
      customers[existingIndex] = customerData
    } else {
      customers.push(customerData)
    }

    localStorage.setItem("customerData", JSON.stringify(customers))
    return true
  } catch (error) {
    console.error("Erro ao salvar dados do cliente:", error)
    return false
  }
}

export const getCustomerData = (): CustomerData[] => {
  try {
    const data = localStorage.getItem("customerData")
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Erro ao carregar dados dos clientes:", error)
    return []
  }
}

export const generateCustomerId = (): string => {
  return `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
