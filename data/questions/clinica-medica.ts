import type { Question } from "@/lib/types"

export const clinicaMedicaQuestions: Question[] = [
  {
    id: "cli_001",
    subject: "clinica-medica",
    content:
      "Paciente de 55 anos, tabagista, apresenta tosse produtiva há 3 meses, dispneia aos esforços e sibilos. Espirometria: VEF1/CVF < 0,70. Qual o diagnóstico mais provável?",
    options: ["Asma brônquica", "Doença pulmonar obstrutiva crônica (DPOC)", "Fibrose pulmonar", "Bronquiectasias"],
    correctAnswer: 1,
    explanation:
      "DPOC é caracterizada por limitação persistente ao fluxo aéreo (VEF1/CVF < 0,70 pós-broncodilatador) em paciente com fatores de risco como tabagismo e sintomas respiratórios crônicos.",
    difficulty: "medium",
    source: "GOLD Guidelines 2021",
  },
]
