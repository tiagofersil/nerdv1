import type { Flashcard } from "@/lib/types"

export const clinicaMedicaFlashcards: Flashcard[] = [
  {
    id: 10,
    subject: "Clínica Médica",
    question: "Quais são os critérios de CURB-65 para pneumonia adquirida na comunidade?",
    answer:
      "C: Confusão mental, U: Ureia >19mg/dl, R: Frequência respiratória ≥30ipm, B: PA sistólica <90mmHg ou diastólica ≤60mmHg, 65: Idade ≥65 anos. Cada critério = 1 ponto. ≥2 pontos indica internação hospitalar.",
    difficulty: "medium",
  },
  {
    id: 101,
    subject: "Clínica Médica",
    question: "Quais são os critérios diagnósticos para síndrome metabólica?",
    answer:
      "≥3 critérios: circunferência abdominal >102cm (homens) ou >88cm (mulheres), triglicerídeos ≥150mg/dl, HDL <40mg/dl (homens) ou <50mg/dl (mulheres), PA ≥130/85mmHg, glicemia de jejum ≥100mg/dl.",
    difficulty: "easy",
  },
  {
    id: 102,
    subject: "Clínica Médica",
    question: "Qual é o manejo inicial da fibrilação atrial aguda hemodinamicamente estável?",
    answer:
      "Controle da frequência cardíaca (betabloqueadores, diltiazem, verapamil), anticoagulação baseada no CHA2DS2-VASc, e considerar cardioversão elétrica ou farmacológica se início <48h ou após anticoagulação adequada por ≥3 semanas.",
    difficulty: "hard",
  },
]
