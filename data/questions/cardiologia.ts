import type { Question } from "@/lib/types"

export const cardiologiaQuestions: Question[] = [
  {
    id: "card_001",
    subject: "cardiologia",
    content:
      "Paciente de 65 anos, hipertenso, apresenta dor precordial em aperto há 30 minutos, irradiando para membro superior esquerdo. ECG mostra supradesnivelamento de ST em DII, DIII e aVF. Qual a conduta mais adequada?",
    options: [
      "Solicitar ecocardiograma e manter observação",
      "Iniciar terapia trombolítica ou encaminhar para angioplastia primária",
      "Prescrever AAS e liberar para casa",
      "Solicitar enzimas cardíacas e aguardar resultado",
    ],
    correctAnswer: 1,
    explanation:
      "O quadro clínico e eletrocardiográfico é compatível com infarto agudo do miocárdio com supradesnivelamento de ST (IAMCSST) de parede inferior. A conduta é reperfusão miocárdica urgente, preferencialmente angioplastia primária ou trombolítico se não disponível.",
    difficulty: "medium",
    source: "Diretriz Brasileira de Cardiologia 2020",
  },
]
