import type { Question } from "@/lib/types"

export const susQuestions: Question[] = [
  {
    id: "sus_001",
    subject: "sus",
    content:
      "Qual princípio do SUS garante que todos os cidadãos têm direito aos serviços de saúde, independentemente de sua condição socioeconômica?",
    options: ["Integralidade", "Universalidade", "Equidade", "Descentralização"],
    correctAnswer: 1,
    explanation:
      "A universalidade é o princípio que garante acesso aos serviços de saúde a todos os cidadãos, sem discriminação de qualquer natureza, sendo um dos pilares fundamentais do SUS.",
    difficulty: "easy",
    source: "Lei 8.080/90 - Lei Orgânica da Saúde",
  },
]
