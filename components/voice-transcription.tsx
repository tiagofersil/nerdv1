"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Mic,
  MicOff,
  Download,
  Copy,
  Trash2,
  Save,
  Volume2,
  Pause,
  Play,
  FileText,
  Stethoscope,
  Plus,
  Edit,
  X,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface TranscriptionSettings {
  language: string
  continuous: boolean
  interimResults: boolean
}

interface AnamnesisTemplate {
  id: string
  name: string
  sections: string[]
  description: string
  isCustom?: boolean
}

interface AnamnesisData {
  [key: string]: string
}

const defaultAnamnesisTemplates: AnamnesisTemplate[] = [
  {
    id: "general",
    name: "Anamnese Geral",
    sections: [
      "Identificação do Paciente",
      "Queixa Principal",
      "História da Doença Atual",
      "História Médica Pregressa",
      "História Familiar",
      "História Social",
      "Revisão de Sistemas",
      "Exame Físico",
      "Hipóteses Diagnósticas",
      "Plano Terapêutico",
    ],
    description: "Modelo padrão para consultas gerais",
  },
  {
    id: "pediatric",
    name: "Anamnese Pediátrica",
    sections: [
      "Identificação da Criança",
      "Queixa Principal",
      "História da Doença Atual",
      "História Perinatal",
      "Desenvolvimento Neuropsicomotor",
      "Imunizações",
      "História Familiar",
      "História Social",
      "Exame Físico Pediátrico",
      "Avaliação do Crescimento",
      "Hipóteses Diagnósticas",
      "Orientações aos Pais",
    ],
    description: "Especializado para consultas pediátricas",
  },
  {
    id: "cardiology",
    name: "Anamnese Cardiológica",
    sections: [
      "Identificação do Paciente",
      "Queixa Principal",
      "História da Doença Atual",
      "Sintomas Cardiovasculares",
      "Fatores de Risco Cardiovascular",
      "História Familiar Cardiovascular",
      "Medicações em Uso",
      "Exame Físico Cardiovascular",
      "Ausculta Cardíaca",
      "Avaliação Vascular",
      "Hipóteses Diagnósticas",
      "Plano de Investigação",
    ],
    description: "Focado em avaliação cardiovascular",
  },
  {
    id: "psychiatric",
    name: "Anamnese Psiquiátrica",
    sections: [
      "Identificação do Paciente",
      "Queixa Principal",
      "História da Doença Atual",
      "História Psiquiátrica Pregressa",
      "História Familiar Psiquiátrica",
      "História Social e Ocupacional",
      "Uso de Substâncias",
      "Exame do Estado Mental",
      "Avaliação de Risco",
      "Hipóteses Diagnósticas",
      "Plano Terapêutico",
    ],
    description: "Especializado para avaliação psiquiátrica",
  },
]

export default function VoiceTranscription() {
  const { user } = useAuth()
  const [isListening, setIsListening] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [interimTranscript, setInterimTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<TranscriptionSettings>({
    language: "pt-BR",
    continuous: true,
    interimResults: true,
  })

  // Estados para anamnese
  const [anamnesisTemplates, setAnamnesisTemplates] = useState<AnamnesisTemplate[]>(defaultAnamnesisTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<AnamnesisTemplate | null>(null)
  const [anamnesisMode, setAnamnesisMode] = useState(false)
  const [anamnesisData, setAnamnesisData] = useState<AnamnesisData>({})
  const [formattedAnamnesis, setFormattedAnamnesis] = useState("")
  const [isProcessingAnamnesis, setIsProcessingAnamnesis] = useState(false)

  // Estados para criação/edição de templates
  const [showTemplateEditor, setShowTemplateEditor] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<AnamnesisTemplate | null>(null)
  const [newTemplateName, setNewTemplateName] = useState("")
  const [newTemplateDescription, setNewTemplateDescription] = useState("")
  const [newTemplateSections, setNewTemplateSections] = useState<string[]>([""])

  const recognitionRef = useRef<any>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Carregar templates customizados do localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem("custom-anamnesis-templates")
    if (savedTemplates) {
      const customTemplates = JSON.parse(savedTemplates)
      setAnamnesisTemplates([...defaultAnamnesisTemplates, ...customTemplates])
    }
  }, [])

  // Verificar suporte do navegador
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      setIsSupported(!!SpeechRecognition)

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        setupRecognition()
      }
    }
  }, [])

  // Processar transcrição para anamnese quando o texto muda
  useEffect(() => {
    if (anamnesisMode && selectedTemplate && transcript.length > 50) {
      processAnamnesisFromTranscript()
    }
  }, [transcript, anamnesisMode, selectedTemplate])

  const setupRecognition = () => {
    if (!recognitionRef.current) return

    const recognition = recognitionRef.current

    recognition.continuous = settings.continuous
    recognition.interimResults = settings.interimResults
    recognition.lang = settings.language
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
      console.log("🎤 Transcrição iniciada")
    }

    recognition.onresult = (event: any) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " "
        } else {
          interimTranscript += transcript
        }
      }

      if (finalTranscript) {
        // Filtrar ruídos e informações irrelevantes
        const cleanedTranscript = cleanTranscript(finalTranscript)
        setTranscript((prev) => prev + cleanedTranscript)
        setInterimTranscript("")
      } else {
        setInterimTranscript(interimTranscript)
      }
    }

    recognition.onerror = (event: any) => {
      console.error("Erro na transcrição:", event.error)
      setError(`Erro: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      setInterimTranscript("")
      console.log("🛑 Transcrição finalizada")
    }
  }

  // Função para limpar ruídos e informações irrelevantes do texto
  const cleanTranscript = (text: string): string => {
    // Lista de palavras e frases irrelevantes para filtrar
    const noiseWords = [
      // Cumprimentos e cortesias
      "bom dia",
      "boa tarde",
      "boa noite",
      "olá",
      "oi",
      "tchau",
      "até logo",
      "obrigado",
      "obrigada",
      "de nada",
      "por favor",
      "com licença",
      "desculpa",
      "desculpe",

      // Interjeições e hesitações
      "né",
      "então",
      "aí",
      "tipo",
      "assim",
      "sabe",
      "entende",
      "certo",
      "ok",
      "tá",
      "tá bom",
      "uhm",
      "ahm",
      "eh",
      "ah",
      "oh",
      "hm",
      "hmm",
      "ahn",
      "éh",

      // Palavras de preenchimento
      "bem",
      "meio que",
      "mais ou menos",
      "sei lá",
      "vai",
      "vamos",
      "deixa eu ver",
      "como é que é",
      "é isso aí",
      "exato",
      "isso mesmo",
      "perfeito",

      // Ruídos de conversação
      "pois é",
      "é verdade",
      "com certeza",
      "claro",
      "obviamente",
      "realmente",
      "na verdade",
      "aliás",
      "inclusive",
      "enfim",
      "resumindo",

      // Marcadores temporais irrelevantes
      "agora",
      "hoje",
      "ontem",
      "amanhã",
      "depois",
      "antes",
      "já",
      "ainda",

      // Conectivos desnecessários em excesso
      "e aí",
      "daí",
      "então assim",
      "tipo assim",
      "sabe como é",
    ]

    // Padrões de ruído para remover
    const noisePatterns = [
      /\b(ah+|eh+|oh+|hm+|uhm+|ahn+)\b/gi, // Interjeições repetitivas
      /\b(né|sabe|entende|certo|ok|tá)\s*\?/gi, // Perguntas retóricas
      /\b(então|aí|tipo|assim)\s+(então|aí|tipo|assim)/gi, // Repetições
      /\b(é|foi|tá|ok)\s*,?\s*\b/gi, // Confirmações isoladas
      /\s{2,}/g, // Múltiplos espaços
    ]

    let cleanedText = text.toLowerCase()

    // Remover palavras de ruído
    noiseWords.forEach((noise) => {
      const regex = new RegExp(`\\b${noise}\\b`, "gi")
      cleanedText = cleanedText.replace(regex, " ")
    })

    // Remover padrões de ruído
    noisePatterns.forEach((pattern) => {
      cleanedText = cleanedText.replace(pattern, " ")
    })

    // Limpar espaços extras e capitalizar primeira letra
    cleanedText = cleanedText
      .replace(/\s+/g, " ") // Múltiplos espaços para um
      .trim() // Remover espaços das bordas
      .replace(/^\w/, (c) => c.toUpperCase()) // Capitalizar primeira letra

    // Se o texto ficou muito pequeno após limpeza, retornar original
    if (cleanedText.length < text.length * 0.3) {
      return text
    }

    return cleanedText + " "
  }

  // Função para processar a transcrição e extrair dados da anamnese
  const processAnamnesisFromTranscript = async () => {
    if (!selectedTemplate || !transcript) return

    setIsProcessingAnamnesis(true)

    try {
      // Simulação de processamento NLP (em produção, usaria uma API real)
      const processedData = await simulateNLPProcessing(transcript, selectedTemplate)
      setAnamnesisData(processedData)

      // Formatar anamnese
      const formatted = formatAnamnesis(processedData, selectedTemplate)
      setFormattedAnamnesis(formatted)
    } catch (error) {
      console.error("Erro ao processar anamnese:", error)
    } finally {
      setIsProcessingAnamnesis(false)
    }
  }

  // Simulação de processamento NLP
  const simulateNLPProcessing = async (text: string, template: AnamnesisTemplate): Promise<AnamnesisData> => {
    // Simula delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data: AnamnesisData = {}
    const lowerText = text.toLowerCase()

    // Extração básica baseada em palavras-chave (em produção seria mais sofisticado)
    template.sections.forEach((section) => {
      const sectionKey = section.toLowerCase()

      if (sectionKey.includes("identificação") || sectionKey.includes("paciente")) {
        data[section] = extractPatientInfo(lowerText)
      } else if (sectionKey.includes("queixa principal")) {
        data[section] = extractMainComplaint(lowerText)
      } else if (sectionKey.includes("história da doença atual") || sectionKey.includes("doença atual")) {
        data[section] = extractCurrentIllness(lowerText)
      } else if (sectionKey.includes("história médica") || sectionKey.includes("pregressa")) {
        data[section] = extractMedicalHistory(lowerText)
      } else if (sectionKey.includes("história familiar")) {
        data[section] = extractFamilyHistory(lowerText)
      } else if (sectionKey.includes("exame físico")) {
        data[section] = extractPhysicalExam(lowerText)
      } else if (sectionKey.includes("sintomas")) {
        data[section] = extractSymptoms(lowerText)
      } else {
        // Para outras seções, extrai trechos relevantes
        data[section] = extractRelevantText(lowerText, sectionKey)
      }
    })

    return data
  }

  // Funções auxiliares para extração de informações
  const extractPatientInfo = (text: string): string => {
    const patterns = [/paciente.*?(\d+\s*anos?)/i, /nome.*?([A-Za-z\s]+)/i, /idade.*?(\d+)/i]

    let info = ""
    patterns.forEach((pattern) => {
      const match = text.match(pattern)
      if (match) info += match[0] + ". "
    })

    return info || "Informações do paciente mencionadas na conversa."
  }

  const extractMainComplaint = (text: string): string => {
    const keywords = [
      "dor",
      "febre",
      "tosse",
      "falta de ar",
      "náusea",
      "vômito",
      "diarreia",
      "constipação",
      "cefaleia",
      "tontura",
      "fraqueza",
      "cansaço",
      "mal estar",
      "desconforto",
    ]
    const sentences = text.split(/[.!?]/)

    for (const sentence of sentences) {
      for (const keyword of keywords) {
        if (sentence.includes(keyword)) {
          return sentence.trim() + "."
        }
      }
    }

    return "Queixa principal identificada na conversa."
  }

  const extractCurrentIllness = (text: string): string => {
    const timeKeywords = ["há", "desde", "começou", "iniciou", "dias", "semanas", "meses", "anos"]
    const sentences = text.split(/[.!?]/)

    const relevantSentences = []
    for (const sentence of sentences) {
      for (const keyword of timeKeywords) {
        if (sentence.includes(keyword)) {
          relevantSentences.push(sentence.trim())
          break
        }
      }
    }

    return relevantSentences.join(". ") || "História da doença atual relatada na consulta."
  }

  const extractMedicalHistory = (text: string): string => {
    const keywords = [
      "cirurgia",
      "operação",
      "internação",
      "medicamento",
      "remédio",
      "alergia",
      "diabetes",
      "hipertensão",
      "pressão alta",
      "colesterol",
      "tratamento",
    ]
    const sentences = text.split(/[.!?]/)

    const relevantSentences = []
    for (const sentence of sentences) {
      for (const keyword of keywords) {
        if (sentence.includes(keyword)) {
          relevantSentences.push(sentence.trim())
          break
        }
      }
    }

    return relevantSentences.join(". ") || "História médica pregressa mencionada."
  }

  const extractFamilyHistory = (text: string): string => {
    const keywords = ["pai", "mãe", "irmão", "irmã", "avô", "avó", "família", "familiar", "hereditário", "genético"]
    const sentences = text.split(/[.!?]/)

    const relevantSentences = []
    for (const sentence of sentences) {
      for (const keyword of keywords) {
        if (sentence.includes(keyword)) {
          relevantSentences.push(sentence.trim())
          break
        }
      }
    }

    return relevantSentences.join(". ") || "História familiar relatada na consulta."
  }

  const extractPhysicalExam = (text: string): string => {
    const keywords = [
      "ausculta",
      "palpação",
      "inspeção",
      "pressão",
      "temperatura",
      "pulso",
      "respiração",
      "exame",
      "batimentos",
      "sopro",
      "ruído",
      "abdome",
      "tórax",
      "coração",
    ]
    const sentences = text.split(/[.!?]/)

    const relevantSentences = []
    for (const sentence of sentences) {
      for (const keyword of keywords) {
        if (sentence.includes(keyword)) {
          relevantSentences.push(sentence.trim())
          break
        }
      }
    }

    return relevantSentences.join(". ") || "Exame físico realizado durante a consulta."
  }

  const extractSymptoms = (text: string): string => {
    const symptoms = [
      "dor",
      "febre",
      "tosse",
      "falta de ar",
      "náusea",
      "vômito",
      "diarreia",
      "cefaleia",
      "tontura",
      "fraqueza",
      "cansaço",
      "insônia",
      "perda de peso",
    ]
    const foundSymptoms = []

    for (const symptom of symptoms) {
      if (text.includes(symptom)) {
        foundSymptoms.push(symptom)
      }
    }

    return foundSymptoms.length > 0
      ? `Sintomas identificados: ${foundSymptoms.join(", ")}.`
      : "Sintomas relatados na consulta."
  }

  const extractRelevantText = (text: string, sectionKey: string): string => {
    // Extração genérica baseada na proximidade de palavras-chave
    const sentences = text.split(/[.!?]/)
    const keywords = sectionKey.split(" ")

    for (const sentence of sentences) {
      for (const keyword of keywords) {
        if (sentence.includes(keyword)) {
          return sentence.trim() + "."
        }
      }
    }

    return `Informações sobre ${sectionKey} mencionadas na consulta.`
  }

  // Formatar anamnese estruturada
  const formatAnamnesis = (data: AnamnesisData, template: AnamnesisTemplate): string => {
    let formatted = `ANAMNESE - ${template.name.toUpperCase()}\n`
    formatted += `Data: ${new Date().toLocaleDateString("pt-BR")}\n`
    formatted += `Hora: ${new Date().toLocaleTimeString("pt-BR")}\n\n`

    template.sections.forEach((section, index) => {
      formatted += `${index + 1}. ${section.toUpperCase()}\n`
      formatted += `${data[section] || "Não relatado."}\n\n`
    })

    return formatted
  }

  // Funções para gerenciar templates customizados
  const saveCustomTemplate = () => {
    if (!newTemplateName.trim() || newTemplateSections.filter((s) => s.trim()).length === 0) {
      alert("Preencha o nome e pelo menos uma seção do template.")
      return
    }

    const newTemplate: AnamnesisTemplate = {
      id: `custom_${Date.now()}`,
      name: newTemplateName.trim(),
      description: newTemplateDescription.trim() || "Template personalizado",
      sections: newTemplateSections.filter((s) => s.trim()).map((s) => s.trim()),
      isCustom: true,
    }

    let updatedTemplates
    if (editingTemplate) {
      // Editando template existente
      updatedTemplates = anamnesisTemplates.map((t) =>
        t.id === editingTemplate.id ? { ...newTemplate, id: editingTemplate.id } : t,
      )
    } else {
      // Criando novo template
      updatedTemplates = [...anamnesisTemplates, newTemplate]
    }

    setAnamnesisTemplates(updatedTemplates)

    // Salvar templates customizados no localStorage
    const customTemplates = updatedTemplates.filter((t) => t.isCustom)
    localStorage.setItem("custom-anamnesis-templates", JSON.stringify(customTemplates))

    // Resetar formulário
    setNewTemplateName("")
    setNewTemplateDescription("")
    setNewTemplateSections([""])
    setShowTemplateEditor(false)
    setEditingTemplate(null)

    alert(editingTemplate ? "Template atualizado com sucesso!" : "Template criado com sucesso!")
  }

  const editTemplate = (template: AnamnesisTemplate) => {
    if (!template.isCustom) {
      alert("Apenas templates personalizados podem ser editados.")
      return
    }

    setEditingTemplate(template)
    setNewTemplateName(template.name)
    setNewTemplateDescription(template.description)
    setNewTemplateSections([...template.sections, ""])
    setShowTemplateEditor(true)
  }

  const deleteTemplate = (templateId: string) => {
    const template = anamnesisTemplates.find((t) => t.id === templateId)
    if (!template?.isCustom) {
      alert("Apenas templates personalizados podem ser excluídos.")
      return
    }

    if (confirm("Tem certeza que deseja excluir este template?")) {
      const updatedTemplates = anamnesisTemplates.filter((t) => t.id !== templateId)
      setAnamnesisTemplates(updatedTemplates)

      // Atualizar localStorage
      const customTemplates = updatedTemplates.filter((t) => t.isCustom)
      localStorage.setItem("custom-anamnesis-templates", JSON.stringify(customTemplates))

      // Se estava selecionado, desselecionar
      if (selectedTemplate?.id === templateId) {
        setSelectedTemplate(null)
      }

      alert("Template excluído com sucesso!")
    }
  }

  const addSection = () => {
    setNewTemplateSections([...newTemplateSections, ""])
  }

  const updateSection = (index: number, value: string) => {
    const updated = [...newTemplateSections]
    updated[index] = value
    setNewTemplateSections(updated)
  }

  const removeSection = (index: number) => {
    if (newTemplateSections.length > 1) {
      const updated = newTemplateSections.filter((_, i) => i !== index)
      setNewTemplateSections(updated)
    }
  }

  const startListening = async () => {
    if (!recognitionRef.current || !isSupported) return

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      recognitionRef.current.start()
      setIsPaused(false)
    } catch (err) {
      setError("Permissão do microfone negada ou não disponível")
      console.error("Erro ao acessar microfone:", err)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const pauseListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsPaused(true)
    }
  }

  const resumeListening = () => {
    if (isPaused) {
      startListening()
    }
  }

  const clearTranscript = () => {
    setTranscript("")
    setInterimTranscript("")
    setAnamnesisData({})
    setFormattedAnamnesis("")
  }

  const copyToClipboard = async () => {
    const textToCopy = anamnesisMode ? formattedAnamnesis : transcript
    try {
      await navigator.clipboard.writeText(textToCopy)
      alert("Texto copiado para a área de transferência!")
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  const downloadTranscript = () => {
    const content = anamnesisMode ? formattedAnamnesis : transcript
    const filename = anamnesisMode
      ? `anamnese-${selectedTemplate?.id}-${new Date().toISOString().split("T")[0]}.txt`
      : `transcricao-${new Date().toISOString().split("T")[0]}.txt`

    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const saveTranscript = () => {
    const savedTranscripts = JSON.parse(localStorage.getItem("voice-transcripts") || "[]")
    const newTranscript = {
      id: Date.now(),
      content: anamnesisMode ? formattedAnamnesis : transcript,
      date: new Date().toISOString(),
      title: anamnesisMode
        ? `Anamnese ${selectedTemplate?.name} ${new Date().toLocaleDateString("pt-BR")}`
        : `Transcrição ${new Date().toLocaleDateString("pt-BR")}`,
      type: anamnesisMode ? "anamnesis" : "transcription",
      template: selectedTemplate?.id,
    }

    savedTranscripts.push(newTranscript)
    localStorage.setItem("voice-transcripts", JSON.stringify(savedTranscripts))
    alert(anamnesisMode ? "Anamnese salva com sucesso!" : "Transcrição salva com sucesso!")
  }

  if (!isSupported) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-red-500 mb-4">
            <MicOff className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">Recurso não suportado</h3>
            <p className="text-sm text-gray-600 mt-2">
              Seu navegador não suporta reconhecimento de voz. Recomendamos usar Chrome, Edge ou Safari.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Seleção de Modo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Modo de Transcrição
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button
              variant={!anamnesisMode ? "default" : "outline"}
              onClick={() => {
                setAnamnesisMode(false)
                setSelectedTemplate(null)
                setFormattedAnamnesis("")
                setAnamnesisData({})
              }}
              className="flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Transcrição Livre
            </Button>
            <Button
              variant={anamnesisMode ? "default" : "outline"}
              onClick={() => setAnamnesisMode(true)}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Anamnese Médica
            </Button>
          </div>

          {/* Seleção de Template de Anamnese */}
          {anamnesisMode && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Selecione o tipo de anamnese:</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTemplateEditor(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Criar Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {anamnesisTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            {template.name}
                            {template.isCustom && (
                              <Badge variant="secondary" className="text-xs">
                                Personalizado
                              </Badge>
                            )}
                          </h5>
                          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                          <div className="text-xs text-gray-500">{template.sections.length} seções incluídas</div>
                        </div>
                        {template.isCustom && (
                          <div className="flex gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                editTemplate(template)
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteTemplate(template.id)
                              }}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Editor de Template */}
      {showTemplateEditor && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {editingTemplate ? "Editar Template" : "Criar Novo Template"}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowTemplateEditor(false)
                  setEditingTemplate(null)
                  setNewTemplateName("")
                  setNewTemplateDescription("")
                  setNewTemplateSections([""])
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Template</label>
                <input
                  type="text"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  placeholder="Ex: Anamnese Neurológica"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input
                  type="text"
                  value={newTemplateDescription}
                  onChange={(e) => setNewTemplateDescription(e.target.value)}
                  placeholder="Breve descrição do template"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Seções da Anamnese</label>
                <Button variant="outline" size="sm" onClick={addSection}>
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Seção
                </Button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {newTemplateSections.map((section, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={section}
                      onChange={(e) => updateSection(index, e.target.value)}
                      placeholder={`Seção ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {newTemplateSections.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSection(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={saveCustomTemplate} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingTemplate ? "Atualizar Template" : "Salvar Template"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowTemplateEditor(false)
                  setEditingTemplate(null)
                  setNewTemplateName("")
                  setNewTemplateDescription("")
                  setNewTemplateSections([""])
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header com controles principais */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {anamnesisMode ? (
                <Stethoscope className="w-6 h-6 text-blue-600" />
              ) : (
                <Volume2 className="w-6 h-6 text-blue-600" />
              )}
              <div>
                <CardTitle>
                  {anamnesisMode ? "Transcrição para Anamnese Médica" : "Transcrição de Áudio em Tempo Real"}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {anamnesisMode
                    ? "Capture a conversa médico-paciente e gere anamnese estruturada automaticamente"
                    : "Habilite o microfone para transcrever automaticamente o que está sendo falado"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isListening && (
                <Badge className="bg-red-500 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Gravando
                </Badge>
              )}
              {isPaused && <Badge className="bg-yellow-500">Pausado</Badge>}
              {anamnesisMode && selectedTemplate && <Badge className="bg-green-500">{selectedTemplate.name}</Badge>}
              {isProcessingAnamnesis && <Badge className="bg-blue-500 animate-pulse">Processando NLP</Badge>}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Aviso para anamnese */}
          {anamnesisMode && !selectedTemplate && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                ⚠️ Selecione um modelo de anamnese antes de iniciar a transcrição.
              </p>
            </div>
          )}

          {/* Controles de gravação */}
          <div className="flex items-center gap-3">
            {!isListening && !isPaused && (
              <Button
                onClick={startListening}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                disabled={anamnesisMode && !selectedTemplate}
              >
                <Mic className="w-4 h-4" />
                {anamnesisMode ? "Iniciar Consulta" : "Iniciar Transcrição"}
              </Button>
            )}

            {isListening && (
              <>
                <Button onClick={pauseListening} className="bg-yellow-600 hover:bg-yellow-700 flex items-center gap-2">
                  <Pause className="w-4 h-4" />
                  Pausar
                </Button>

                <Button onClick={stopListening} className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
                  <MicOff className="w-4 h-4" />
                  Parar
                </Button>
              </>
            )}

            {isPaused && (
              <Button onClick={resumeListening} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Play className="w-4 h-4" />
                Retomar
              </Button>
            )}

            {/* Configurações */}
            <div className="flex items-center gap-2 ml-auto">
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="px-3 py-1 border rounded-md text-sm"
                disabled={isListening}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
                <option value="fr-FR">Français</option>
              </select>
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Área de transcrição */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transcrição Original */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{anamnesisMode ? "Conversa Capturada" : "Texto Transcrito"}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearTranscript} disabled={!transcript}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Limpar
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={transcript + interimTranscript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={
                  anamnesisMode
                    ? "A conversa médico-paciente aparecerá aqui (ruídos filtrados automaticamente)..."
                    : "A transcrição aparecerá aqui em tempo real..."
                }
                className="min-h-[400px] text-base leading-relaxed resize-none"
                style={{
                  fontSize: "16px",
                  lineHeight: "1.6",
                }}
              />

              {/* Indicador de texto temporário */}
              {interimTranscript && (
                <div className="absolute bottom-4 right-4 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Processando...
                </div>
              )}
            </div>

            {/* Estatísticas */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <div>Palavras: {transcript.split(" ").filter((word) => word.length > 0).length}</div>
              <div>Caracteres: {transcript.length}</div>
              <div>Última atualização: {transcript ? new Date().toLocaleTimeString("pt-BR") : "--:--:--"}</div>
            </div>
          </CardContent>
        </Card>

        {/* Anamnese Formatada */}
        {anamnesisMode && selectedTemplate && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Anamnese Estruturada
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!formattedAnamnesis}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copiar
                  </Button>

                  <Button variant="outline" size="sm" onClick={saveTranscript} disabled={!formattedAnamnesis}>
                    <Save className="w-4 h-4 mr-1" />
                    Salvar
                  </Button>

                  <Button variant="outline" size="sm" onClick={downloadTranscript} disabled={!formattedAnamnesis}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="relative">
                <Textarea
                  value={formattedAnamnesis}
                  onChange={(e) => setFormattedAnamnesis(e.target.value)}
                  placeholder="A anamnese estruturada será gerada automaticamente conforme a conversa é transcrita..."
                  className="min-h-[400px] text-sm leading-relaxed resize-none font-mono"
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                />

                {isProcessingAnamnesis && (
                  <div className="absolute bottom-4 right-4 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    Processando com NLP...
                  </div>
                )}
              </div>

              {/* Progresso das seções */}
              {selectedTemplate && Object.keys(anamnesisData).length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Seções Identificadas:</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedTemplate.sections.map((section) => (
                      <Badge
                        key={section}
                        variant={anamnesisData[section] ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {section}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {Object.keys(anamnesisData).length} de {selectedTemplate.sections.length} seções preenchidas
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dicas de uso */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            💡 {anamnesisMode ? "Dicas para anamnese médica:" : "Dicas para melhor transcrição:"}
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {anamnesisMode ? (
              <>
                <li>• Selecione ou crie o modelo de anamnese adequado antes de iniciar</li>
                <li>• Fale de forma clara durante a consulta</li>
                <li>• Mencione explicitamente as seções (ex: "história familiar", "exame físico")</li>
                <li>• O sistema filtra automaticamente ruídos e informações irrelevantes</li>
                <li>• Revise e edite a anamnese gerada conforme necessário</li>
                <li>• Use em ambiente silencioso para melhor precisão</li>
                <li>• Crie templates personalizados para suas especialidades</li>
              </>
            ) : (
              <>
                <li>• Fale de forma clara e pausada</li>
                <li>• Mantenha o microfone próximo (30-50cm)</li>
                <li>• Evite ruídos de fundo</li>
                <li>• Use fones de ouvido para evitar eco</li>
                <li>• A transcrição funciona melhor em ambientes silenciosos</li>
                <li>• O sistema filtra automaticamente palavras irrelevantes</li>
              </>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
