import type { Question } from "@/lib/types"
import { cardiologiaQuestions } from "./cardiologia"
import { pediatriaQuestions } from "./pediatria"
import { ginecologiaQuestions } from "./ginecologia"
import { obstetriciaQuestions } from "./obstetricia"
import { psiquiatriaQuestions } from "./psiquiatria"
import { endocrinologiaQuestions } from "./endocrinologia"
import { preventivaQuestions } from "./preventiva"
import { susQuestions } from "./sus"
import { neurologiaQuestions } from "./neurologia"
import { cirurgiaQuestions } from "./cirurgia"
import { clinicaMedicaQuestions } from "./clinica-medica"

export const questionsDB: Question[] = [
  ...cardiologiaQuestions,
  ...pediatriaQuestions,
  ...ginecologiaQuestions,
  ...obstetriciaQuestions,
  ...psiquiatriaQuestions,
  ...endocrinologiaQuestions,
  ...preventivaQuestions,
  ...susQuestions,
  ...neurologiaQuestions,
  ...cirurgiaQuestions,
  ...clinicaMedicaQuestions,
]

export function getQuestionsBySubject(subject: string): Question[] {
  return questionsDB.filter((q) => q.subject === subject)
}

export function getQuestionById(id: string): Question | undefined {
  return questionsDB.find((q) => q.id === id)
}

export function getAllSubjects(): string[] {
  return [...new Set(questionsDB.map((q) => q.subject))]
}
