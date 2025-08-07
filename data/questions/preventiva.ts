import type { Question } from "@/lib/types"

export const preventivaQuestions: Question[] = [
  {
    id: "prev_001",
    subject: "preventiva",
    content:
      "Mulher de 50 anos, sem comorbidades, procura orientação sobre rastreamento de câncer de mama. Qual a recomendação atual do Ministério da Saúde?",
    options: [
      "Mamografia anual a partir dos 40 anos",
      "Mamografia bienal dos 50 aos 69 anos",
      "Ultrassom mamário anual a partir dos 45 anos",
      "Ressonância magnética anual a partir dos 50 anos",
    ],
    correctAnswer: 1,
    explanation:
      "Segundo o INCA e Ministério da Saúde, o rastreamento mamográfico é recomendado bienalmente para mulheres de 50 a 69 anos sem fatores de risco específicos.",
    difficulty: "easy",
    source: "INCA - Diretrizes de Rastreamento 2021",
  },
]
