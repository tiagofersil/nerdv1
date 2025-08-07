import { cardiologiaFlashcards } from "./cardiologia"
import { pediatriaFlashcards } from "./pediatria"
import { neurologiaFlashcards } from "./neurologia"
import { endocrinologiaFlashcards } from "./endocrinologia"
import { ginecologiaFlashcards } from "./ginecologia"
import { obstetriciaFlashcards } from "./obstetricia"
import { psiquiatriaFlashcards } from "./psiquiatria"
import { preventivaFlashcards } from "./preventiva"
import { susFlashcards } from "./sus"
import { cirurgiaFlashcards } from "./cirurgia"
import { clinicaMedicaFlashcards } from "./clinica-medica"
import type { Flashcard } from "@/lib/types"

export const allFlashcards: Flashcard[] = [
  ...cardiologiaFlashcards,
  ...pediatriaFlashcards,
  ...neurologiaFlashcards,
  ...endocrinologiaFlashcards,
  ...ginecologiaFlashcards,
  ...obstetriciaFlashcards,
  ...psiquiatriaFlashcards,
  ...preventivaFlashcards,
  ...susFlashcards,
  ...cirurgiaFlashcards,
  ...clinicaMedicaFlashcards,
]

export function getFlashcardsBySubject(subject: string): Flashcard[] {
  const subjectMap: { [key: string]: Flashcard[] } = {
    cardiologia: cardiologiaFlashcards,
    pediatria: pediatriaFlashcards,
    neurologia: neurologiaFlashcards,
    endocrinologia: endocrinologiaFlashcards,
    ginecologia: ginecologiaFlashcards,
    obstetricia: obstetriciaFlashcards,
    psiquiatria: psiquiatriaFlashcards,
    "medicina-preventiva": preventivaFlashcards,
    sus: susFlashcards,
    cirurgia: cirurgiaFlashcards,
    "clinica-medica": clinicaMedicaFlashcards,
  }
  
  return subjectMap[subject] || []
}

export {
  cardiologiaFlashcards,
  pediatriaFlashcards,
  neurologiaFlashcards,
  endocrinologiaFlashcards,
  ginecologiaFlashcards,
  obstetriciaFlashcards,
  psiquiatriaFlashcards,
  preventivaFlashcards,
  susFlashcards,
  cirurgiaFlashcards,
  clinicaMedicaFlashcards,
}
