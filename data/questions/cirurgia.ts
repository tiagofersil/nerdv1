import type { Question } from "@/lib/types"

export const cirurgiaQuestions: Question[] = [
  {
    id: "cir_001",
    subject: "cirurgia",
    content:
      "Paciente de 40 anos apresenta dor abdominal em fossa ilíaca direita há 12 horas, náuseas, vômitos e febre. Sinal de Blumberg positivo. Leucocitose com desvio à esquerda. Qual o diagnóstico mais provável?",
    options: ["Colecistite aguda", "Apendicite aguda", "Diverticulite aguda", "Obstrução intestinal"],
    correctAnswer: 1,
    explanation:
      "O quadro clínico com dor em fossa ilíaca direita, sinais de irritação peritoneal (Blumberg positivo), febre e leucocitose é característico de apendicite aguda.",
    difficulty: "easy",
    source: "Manual de Cirurgia CBC 2021",
  },
]
