import type { Question } from "@/lib/types"

export const pediatriaQuestions: Question[] = [
  {
    id: "ped_001",
    subject: "pediatria",
    content:
      "Lactente de 8 meses apresenta febre há 2 dias, coriza, tosse seca e dificuldade respiratória. Ao exame: tiragem subcostal, sibilos difusos e saturação de 92%. Qual o diagnóstico mais provável?",
    options: ["Pneumonia bacteriana", "Bronquiolite viral", "Asma brônquica", "Coqueluche"],
    correctAnswer: 1,
    explanation:
      "Bronquiolite é a principal causa de sibilância em lactentes menores de 2 anos, especialmente entre 2-24 meses. O quadro típico inclui sintomas de vias aéreas superiores seguidos de dificuldade respiratória com sibilos.",
    difficulty: "easy",
    source: "Manual de Pediatria SBP 2021",
  },
]
