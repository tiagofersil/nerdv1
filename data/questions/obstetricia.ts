import type { Question } from "@/lib/types"

export const obstetriciaQuestions: Question[] = [
  {
    id: "obs_001",
    subject: "obstetricia",
    content:
      "Gestante de 32 semanas apresenta sangramento vaginal vermelho vivo, indolor, de início súbito. Útero com tônus normal, BCF normais. Qual a hipótese diagnóstica mais provável?",
    options: ["Descolamento prematuro de placenta", "Placenta prévia", "Rotura uterina", "Trabalho de parto prematuro"],
    correctAnswer: 1,
    explanation:
      "Placenta prévia caracteriza-se por sangramento vermelho vivo, indolor, de início súbito no terceiro trimestre. O útero mantém tônus normal e os BCF permanecem normais, diferentemente do descolamento prematuro de placenta.",
    difficulty: "medium",
    source: "Manual de Obstetrícia FEBRASGO 2019",
  },
]
