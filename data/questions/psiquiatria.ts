import type { Question } from "@/lib/types"

export const psiquiatriaQuestions: Question[] = [
  {
    id: "psi_001",
    subject: "psiquiatria",
    content:
      "Paciente de 35 anos relata humor deprimido, perda de interesse, fadiga, sentimentos de inutilidade e ideação suicida há 3 semanas. Nega episódios de mania ou hipomania. Qual o diagnóstico mais provável?",
    options: ["Transtorno bipolar tipo I", "Episódio depressivo maior", "Distimia", "Transtorno de ajustamento"],
    correctAnswer: 1,
    explanation:
      "O quadro apresenta critérios para episódio depressivo maior: humor deprimido, anedonia, fadiga, sentimentos de inutilidade e ideação suicida por mais de 2 semanas, sem história de episódios maníacos ou hipomaníacos.",
    difficulty: "easy",
    source: "DSM-5 e Manual de Psiquiatria",
  },
]
