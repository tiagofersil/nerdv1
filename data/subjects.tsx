"use client"

import type React from "react"
import { useState, useEffect } from "react"

// Componente para ícones no estilo exato da imagem de referência
const PeriodicTableIcon = ({
  symbol,
  atomicNumber,
  atomicMass,
  color,
  delay = 0,
}: {
  symbol: string
  atomicNumber: number
  atomicMass: string
  color: string
  delay?: number
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }, delay)

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }, 3000 + delay)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [delay])

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-md transition-all duration-600 ease-in-out cursor-pointer ${
        isAnimating ? "animate-spin" : ""
      }`}
      style={{
        width: 56,
        height: 56,
        backgroundColor: color,
        boxShadow: isAnimating ? `0 8px 25px ${color}60` : `0 4px 15px ${color}30`,
        transform: isAnimating ? "scale(1.15) rotate(360deg)" : "scale(1)",
      }}
    >
      {/* Número atômico no canto superior esquerdo */}
      <div className="absolute top-1 left-1.5 text-xs text-white font-semibold leading-none">
        {String(atomicNumber).padStart(2, "0")}
      </div>

      {/* Símbolo do elemento no centro */}
      <div className="text-2xl font-bold text-white leading-none mt-1">{symbol}</div>

      {/* Massa atômica no canto inferior direito */}
      <div className="absolute bottom-1 right-1.5 text-xs text-white font-medium leading-none">{atomicMass}</div>
    </div>
  )
}

// Ícones específicos para cada matéria seguindo o padrão da imagem
const CardiologiaIcon = () => (
  <PeriodicTableIcon symbol="C" atomicNumber={1} atomicMass="12.01" color="#ef4444" delay={0} />
)
const PediatriaIcon = () => (
  <PeriodicTableIcon symbol="P" atomicNumber={2} atomicMass="30.97" color="#ec4899" delay={300} />
)
const GinecologiaIcon = () => (
  <PeriodicTableIcon symbol="G" atomicNumber={3} atomicMass="69.72" color="#9c27b0" delay={600} />
)
const ObstetriciaIcon = () => (
  <PeriodicTableIcon symbol="O" atomicNumber={4} atomicMass="15.99" color="#3f51b5" delay={900} />
)
const PsiquiatriaIcon = () => (
  <PeriodicTableIcon symbol="Ps" atomicNumber={5} atomicMass="30.97" color="#00e676" delay={1200} />
)
const EndocrinologiaIcon = () => (
  <PeriodicTableIcon symbol="E" atomicNumber={6} atomicMass="252.0" color="#2196f3" delay={1500} />
)
const PreventivaIcon = () => (
  <PeriodicTableIcon symbol="Pr" atomicNumber={7} atomicMass="140.9" color="#00bcd4" delay={1800} />
)
const SusIcon = () => <PeriodicTableIcon symbol="S" atomicNumber={8} atomicMass="32.06" color="#ff9800" delay={2100} />
const NeurologiaIcon = () => (
  <PeriodicTableIcon symbol="N" atomicNumber={9} atomicMass="14.01" color="#673ab7" delay={2400} />
)
const CirurgiaIcon = () => (
  <PeriodicTableIcon symbol="Cr" atomicNumber={10} atomicMass="51.99" color="#f44336" delay={2700} />
)
const ClinicaMedicaIcon = () => (
  <PeriodicTableIcon symbol="Cm" atomicNumber={11} atomicMass="247.0" color="#1976d2" delay={3000} />
)

export interface Subject {
  id: string
  name: string
  icon: React.ComponentType
  color: string
  totalQuestions: number
  userProgress: {
    correctRate: number
    questionsAnswered: number
  }
}

export const subjects: Subject[] = [
  {
    id: "cardiologia",
    name: "Cardiologia",
    icon: CardiologiaIcon,
    color: "red",
    totalQuestions: 150,
    userProgress: {
      correctRate: 75,
      questionsAnswered: 45,
    },
  },
  {
    id: "pediatria",
    name: "Pediatria",
    icon: PediatriaIcon,
    color: "pink",
    totalQuestions: 120,
    userProgress: {
      correctRate: 68,
      questionsAnswered: 32,
    },
  },
  {
    id: "ginecologia",
    name: "Ginecologia",
    icon: GinecologiaIcon,
    color: "purple",
    totalQuestions: 100,
    userProgress: {
      correctRate: 82,
      questionsAnswered: 28,
    },
  },
  {
    id: "obstetricia",
    name: "Obstetrícia",
    icon: ObstetriciaIcon,
    color: "indigo",
    totalQuestions: 90,
    userProgress: {
      correctRate: 71,
      questionsAnswered: 21,
    },
  },
  {
    id: "psiquiatria",
    name: "Psiquiatria",
    icon: PsiquiatriaIcon,
    color: "green",
    totalQuestions: 80,
    userProgress: {
      correctRate: 79,
      questionsAnswered: 19,
    },
  },
  {
    id: "endocrinologia",
    name: "Endocrinologia",
    icon: EndocrinologiaIcon,
    color: "blue",
    totalQuestions: 70,
    userProgress: {
      correctRate: 73,
      questionsAnswered: 15,
    },
  },
  {
    id: "preventiva",
    name: "Medicina Preventiva",
    icon: PreventivaIcon,
    color: "cyan",
    totalQuestions: 85,
    userProgress: {
      correctRate: 77,
      questionsAnswered: 23,
    },
  },
  {
    id: "sus",
    name: "SUS",
    icon: SusIcon,
    color: "orange",
    totalQuestions: 95,
    userProgress: {
      correctRate: 69,
      questionsAnswered: 18,
    },
  },
  {
    id: "neurologia",
    name: "Neurologia",
    icon: NeurologiaIcon,
    color: "purple",
    totalQuestions: 110,
    userProgress: {
      correctRate: 74,
      questionsAnswered: 27,
    },
  },
  {
    id: "cirurgia",
    name: "Cirurgia",
    icon: CirurgiaIcon,
    color: "red",
    totalQuestions: 130,
    userProgress: {
      correctRate: 70,
      questionsAnswered: 35,
    },
  },
  {
    id: "clinica-medica",
    name: "Clínica Médica",
    icon: ClinicaMedicaIcon,
    color: "blue",
    totalQuestions: 200,
    userProgress: {
      correctRate: 76,
      questionsAnswered: 52,
    },
  },
]

export function getAllSubjectsData(): Subject[] {
  return subjects
}

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((subject) => subject.id === id)
}

export default subjects
