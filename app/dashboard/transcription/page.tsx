"use client"

import VoiceTranscription from "@/components/voice-transcription"

export default function TranscriptionPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transcrição de Áudio</h1>
        <p className="text-gray-600">Transcreva automaticamente aulas, palestras e conteúdos falados em tempo real</p>
      </div>

      <VoiceTranscription />
    </div>
  )
}
