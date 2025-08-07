"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  CreditCard,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Search,
  Download,
  Eye,
  LogOut,
  CheckCircle,
  XCircle,
} from "lucide-react"
import QuesmedLogo from "@/components/quesmed-logo"

interface CustomerData {
  id: string
  name: string
  email: string
  phone: string
  plan: string
  planPrice: number
  contractDate: string
  cardInfo: {
    lastFour: string
    brand: string
    expiryMonth: string
    expiryYear: string
  }
  status: "active" | "inactive" | "pending"
  lastPayment?: string
}

interface PaymentRecord {
  id: string
  amount: number
  status: string
  paymentMethod: string
  payerEmail: string
  payerName: string
  dateCreated: string
  description: string
  installments?: number
  cardLastFour?: string
  cardBrand?: string
  statusDetail?: string
}

export default function AdminDashboard() {
  const [customers, setCustomers] = useState<CustomerData[]>([])
  const [approvedPayments, setApprovedPayments] = useState<PaymentRecord[]>([])
  const [rejectedPayments, setRejectedPayments] = useState<PaymentRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se está logado como admin
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin")
      return
    }

    // Carregar dados
    loadData()

    // Atualizar dados a cada 30 segundos para capturar novos pagamentos
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [router])

  const loadData = () => {
    // Carregar clientes
    const storedCustomers = localStorage.getItem("customerData")
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers))
    }

    // Carregar pagamentos aprovados
    const storedApprovedPayments = localStorage.getItem("approvedPayments")
    if (storedApprovedPayments) {
      setApprovedPayments(JSON.parse(storedApprovedPayments))
    }

    // Carregar pagamentos rejeitados
    const storedRejectedPayments = localStorage.getItem("rejectedPayments")
    if (storedRejectedPayments) {
      setRejectedPayments(JSON.parse(storedRejectedPayments))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin")
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const totalRevenue = approvedPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalPayments = approvedPayments.length + rejectedPayments.length
  const approvalRate = totalPayments > 0 ? ((approvedPayments.length / totalPayments) * 100).toFixed(1) : "0"

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      pix: "PIX",
      visa: "Visa",
      master: "Mastercard",
      elo: "Elo",
      amex: "American Express",
      hipercard: "Hipercard",
    }
    return methods[method] || method.toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <QuesmedLogo height={32} />
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                  <p className="text-2xl font-bold">{activeCustomers}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pagamentos Aprovados</p>
                  <p className="text-2xl font-bold">{approvedPayments.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Aprovação</p>
                  <p className="text-2xl font-bold">{approvalRate}%</p>
                </div>
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            {/* Pagamentos Aprovados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Pagamentos Aprovados ({approvedPayments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedPayments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum pagamento aprovado ainda</p>
                  ) : (
                    approvedPayments
                      .slice()
                      .reverse()
                      .map((payment) => (
                        <Card key={payment.id} className="p-4 border-l-4 border-l-green-500">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{payment.payerName}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {payment.payerEmail}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(payment.dateCreated)}
                                  </span>
                                  <Badge variant="outline" className="text-green-600 border-green-600">
                                    {getPaymentMethodName(payment.paymentMethod)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">R$ {payment.amount.toFixed(2)}</p>
                              <p className="text-sm text-gray-600">ID: {payment.id}</p>
                              {payment.cardLastFour && (
                                <p className="text-xs text-gray-500">**** {payment.cardLastFour}</p>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pagamentos Rejeitados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Pagamentos Rejeitados ({rejectedPayments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rejectedPayments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum pagamento rejeitado</p>
                  ) : (
                    rejectedPayments
                      .slice()
                      .reverse()
                      .map((payment) => (
                        <Card key={payment.id} className="p-4 border-l-4 border-l-red-500">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-red-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{payment.payerName}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {payment.payerEmail}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(payment.dateCreated)}
                                  </span>
                                  <Badge variant="outline" className="text-red-600 border-red-600">
                                    {getPaymentMethodName(payment.paymentMethod)}
                                  </Badge>
                                </div>
                                {payment.statusDetail && (
                                  <p className="text-xs text-red-600 mt-1">Motivo: {payment.statusDetail}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-red-600">R$ {payment.amount.toFixed(2)}</p>
                              <p className="text-sm text-gray-600">ID: {payment.id}</p>
                            </div>
                          </div>
                        </Card>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Label htmlFor="search">Buscar Cliente</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Nome, email ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>

                {/* Customer List */}
                <div className="space-y-4">
                  {filteredCustomers.map((customer) => (
                    <Card key={customer.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{customer.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {customer.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {customer.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {customer.contractDate}
                              </span>
                              {customer.lastPayment && (
                                <span className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  Último pagamento: {formatDate(customer.lastPayment)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                              {customer.plan}
                            </Badge>
                            <p className="text-sm font-semibold">R$ {customer.planPrice.toFixed(2)}/mês</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas de Planos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-lg">Plano Gratuito</h3>
                    <p className="text-3xl font-bold text-gray-600">
                      {customers.filter((c) => c.plan === "gratuito").length}
                    </p>
                    <p className="text-sm text-gray-500">clientes</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-lg">Plano Básico</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {customers.filter((c) => c.plan === "basico").length}
                    </p>
                    <p className="text-sm text-gray-500">clientes</p>
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-lg">Plano Premium</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                      {customers.filter((c) => c.plan === "premium").length}
                    </p>
                    <p className="text-sm text-gray-500">clientes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Customer Detail Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detalhes do Cliente</CardTitle>
                  <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Informações Pessoais</h3>
                    <div className="space-y-3">
                      <div>
                        <Label>Nome</Label>
                        <p className="font-medium">{selectedCustomer.name}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="font-medium">{selectedCustomer.email}</p>
                      </div>
                      <div>
                        <Label>Telefone</Label>
                        <p className="font-medium">{selectedCustomer.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Informações do Plano</h3>
                    <div className="space-y-3">
                      <div>
                        <Label>Plano</Label>
                        <Badge>{selectedCustomer.plan}</Badge>
                      </div>
                      <div>
                        <Label>Valor</Label>
                        <p className="font-medium">R$ {selectedCustomer.planPrice.toFixed(2)}/mês</p>
                      </div>
                      <div>
                        <Label>Data de Contratação</Label>
                        <p className="font-medium">{selectedCustomer.contractDate}</p>
                      </div>
                      {selectedCustomer.lastPayment && (
                        <div>
                          <Label>Último Pagamento</Label>
                          <p className="font-medium text-green-600">{formatDate(selectedCustomer.lastPayment)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Informações de Pagamento</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium">**** **** **** {selectedCustomer.cardInfo.lastFour}</p>
                        <p className="text-sm text-gray-600">
                          {selectedCustomer.cardInfo.brand} • Expira em {selectedCustomer.cardInfo.expiryMonth}/
                          {selectedCustomer.cardInfo.expiryYear}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Histórico de Pagamentos do Cliente */}
                <div>
                  <h3 className="font-semibold mb-4">Histórico de Pagamentos</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {approvedPayments
                      .filter((payment) => payment.payerEmail === selectedCustomer.email)
                      .map((payment) => (
                        <div key={payment.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <div>
                            <p className="text-sm font-medium">R$ {payment.amount.toFixed(2)}</p>
                            <p className="text-xs text-gray-600">{getPaymentMethodName(payment.paymentMethod)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">{formatDate(payment.dateCreated)}</p>
                            <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                              Aprovado
                            </Badge>
                          </div>
                        </div>
                      ))}
                    {approvedPayments.filter((payment) => payment.payerEmail === selectedCustomer.email).length ===
                      0 && <p className="text-sm text-gray-500">Nenhum pagamento registrado</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
