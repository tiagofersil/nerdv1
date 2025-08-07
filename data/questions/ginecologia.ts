import type { Question } from "@/lib/types"

export const ginecologiaQuestions: Question[] = [
  {
    id: "gin_001",
    subject: "ginecologia",
    content:
      "Mulher de 28 anos, nuligesta, apresenta dismenorreia progressiva há 2 anos, dispareunia de profundidade e infertilidade há 1 ano. Ao exame ginecológico: útero em retroversão, doloroso à mobilização, com nódulos no fundo de saco posterior. Qual o diagnóstico mais provável?",
    options: ["Miomatose uterina", "Doença inflamatória pélvica", "Endometriose", "Síndrome do ovário policístico"],
    correctAnswer: 2,
    explanation:
      "A tríade clássica da endometriose inclui dismenorreia progressiva, dispareunia de profundidade e infertilidade. O exame físico com útero doloroso e nódulos no fundo de saco posterior reforça o diagnóstico.",
    difficulty: "medium",
    source: "Protocolo FEBRASGO 2020",
  },
]
