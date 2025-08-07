import type { Question } from "@/lib/types"

export const neurologiaQuestions: Question[] = [
  {
    id: "neu_001",
    subject: "neurologia",
    content:
      "Paciente de 70 anos apresenta tremor de repouso em mão direita, bradicinesia e rigidez. Melhora dos sintomas com levodopa. Qual o diagnóstico mais provável?",
    options: ["Tremor essencial", "Doença de Parkinson", "Parkinsonismo vascular", "Tremor medicamentoso"],
    correctAnswer: 1,
    explanation:
      "A tríade clássica da doença de Parkinson inclui tremor de repouso, bradicinesia e rigidez. A resposta positiva à levodopa reforça o diagnóstico de doença de Parkinson idiopática.",
    difficulty: "medium",
    source: "Academia Brasileira de Neurologia 2020",
  },
  {
    id: "neu_002",
    subject: "neurologia",
    content:
      "Sobre a predominância das neoplasias em pediatria de acordo com a idade e o sítio primário, assinale a alternativa correta.",
    options: [
      "Entre os linfomas, tanto o de Hodgkin quanto o de não Hodgkin são bastante predominantes em menores de 1 ano.",
      "Entre as leucemias, a mieloide crônica juvenil é a mais predominante na adolescência e é rara em menores de 3 anos.",
      "Das neoplasias de sistema nervoso central, o astrocitoma cerebelar está entre as mais predominantes em maiores de 3 anos.",
      "Das neoplasias com sítio primário em cabeça e pescoço, as mais predominantes em todas as faixas etárias são o sarcoma de partes moles e o linfoma.",
      "O neuroblastoma e o tumor de Wilms são as neoplasias de sítio abdominal mais predominantes em adolescentes.",
    ],
    correctAnswer: 2,
    explanation:
      "Das neoplasias de sistema nervoso central, o astrocitoma cerebelar está entre as mais predominantes em maiores de 3 anos, sendo um dos tumores cerebrais mais comuns na infância.",
    difficulty: "medium",
    source: "Oncologia Pediátrica 2023",
  },
  {
    id: "neu_003",
    subject: "neurologia",
    content: "É indicação absoluta de punção lombar diagnóstica a suspeita de:",
    options: ["hidrocefalia", "neoplasia intracraniana", "hipertensão intracraniana", "carcinomatose meníngea"],
    correctAnswer: 3,
    explanation:
      "A carcinomatose meníngea é uma indicação absoluta de punção lombar diagnóstica, pois o diagnóstico depende da análise do líquor para identificação de células neoplásicas.",
    difficulty: "medium",
    source: "Neurologia Clínica 2023",
  },
  {
    id: "neu_004",
    subject: "neurologia",
    content: "Quanto à hidrocefalia, é INCORRETO afirmar:",
    options: [
      "Na hidrocefalia, ocorre o aumento anormal do fluido cefalorraquidiano dentro da cavidade craniana, acompanhado de expansão dos ventrículos cerebrais, alargamento ósseo, sobretudo da testa, e atrofia encefálica, de que resultam deficiência mental e convulsões.",
      "Na hidrocefalia, o fluido extra exerce pressão sobre o cérebro e pode causar danos cerebrais. É mais comum em crianças e idosos.",
      "O tratamento da hidrocefalia costuma ser realizado com a inserção cirúrgica de um tubo (shunt) em um ventrículo, para drenar o excesso de líquido.",
      "O fluido extra exerce pressão sobre o cérebro e pode causar danos cerebrais. Ocorre apenas em crianças.",
    ],
    correctAnswer: 3,
    explanation:
      "É incorreto afirmar que a hidrocefalia ocorre apenas em crianças. A hidrocefalia pode ocorrer em qualquer idade, sendo comum tanto em crianças quanto em idosos.",
    difficulty: "easy",
    source: "Neurocirurgia Pediátrica 2023",
  },
  {
    id: "neu_005",
    subject: "neurologia",
    content:
      "O diagnóstico de lesões de tronco cerebral se ancora, eminentemente, na RMN, sendo que essa guia a conduta terapêutica. Embora estudos avaliando o diagnóstico de gliomas de tronco tenham mostrado resultados favoráveis para a biópsia, esta resultou em maior risco de complicações que a RMN. Assim está correto o item:",
    options: [
      "Embora se valorize o diagnóstico histológico nos tumores cerebrais, as lesões de tronco cerebral são uma exceção, dado o potencial de complicações relacionado ao procedimento",
      "Não se valoriza o diagnóstico histológico nos tumores cerebrais, as lesões de tronco cerebral são uma exceção, dado o potencial de complicações relacionado ao procedimento.",
      "Embora se valorize o diagnóstico histológico nos tumores cerebrais, as lesões de tronco cerebral são uma exceção, dado o pouco potencial de complicações relacionado ao procedimento.",
      "Não se busca o diagnóstico histológico nos tumores cerebrais, as lesões de tronco cerebral não são uma exceção, dado o potencial de complicações relacionado ao procedimento.",
    ],
    correctAnswer: 0,
    explanation:
      "Embora se valorize o diagnóstico histológico nos tumores cerebrais, as lesões de tronco cerebral são uma exceção devido ao alto risco de complicações da biópsia nesta região crítica.",
    difficulty: "hard",
    source: "Neuroimagem 2023",
  },
  {
    id: "neu_006",
    subject: "neurologia",
    content:
      "Menino com 4 anos de idade, chega ao pronto socorro acompanhado da mãe que refere que o mesmo acorda queixando-se de dor de cabeça seguida de vômitos, há 20 dias. Há dois dias com piora importante. Ao exame físico: regular estado geral, sonolento, abertura ocular apenas quando solicitado, resposta verbal confusa, localiza dor (escala de coma de Glasgow de 12). Frequência cardíaca 56 bpm, pressão arterial sistêmica 123 x 82 mmHg. Qual a hipótese diagnóstica mais provável?",
    options: [
      "Meningoencefalite.",
      "Síndrome da criança espancada.",
      "Tumor em fossa posterior.",
      "Intoxicação exógena.",
    ],
    correctAnswer: 2,
    explanation:
      "O quadro de cefaleia matinal com vômitos, bradicardia e hipertensão arterial (tríade de Cushing) sugere hipertensão intracraniana, sendo tumor de fossa posterior uma causa comum em crianças.",
    difficulty: "medium",
    source: "Pediatria Neurológica 2023",
  },
  {
    id: "neu_007",
    subject: "neurologia",
    content:
      "Criança, 2 anos, 15 kg, sexo masculino, trazida ao pronto atendimento em crise convulsiva com duração de 10 minutos, foi medicada com diazepam 2x com resolução da crise. Ao exame: REG, corado, hidratado, acianótico, anictérico. Temperatura: 36,9°C. Glasgow 14, pupilas isocóricas e fotorreagentes, sem sinais de irritação meníngea, sem déficits motores. Com base na TC de crânio, qual o provável diagnóstico?",
    options: [
      "Crise convulsiva febril.",
      "Hidrocefalia.",
      "Acidente vascular encefálico isquêmico.",
      "Meningite.",
      "Tumor.",
    ],
    correctAnswer: 4,
    explanation:
      "A presença de lesão expansiva na TC de crânio em criança com convulsão sem febre ou sinais de irritação meníngea sugere tumor cerebral.",
    difficulty: "medium",
    source: "Neurologia Pediátrica 2023",
  },
  {
    id: "neu_008",
    subject: "neurologia",
    content:
      "Uma menina de 3 anos chega ao pronto-socorro infantil com quadro de cefaleia intensa acompanhada por vômitos há 3 dias, sem febre. Sua mãe observou que há 1 semana ela estava mais quieta e colocava uma mão no olho para ver TV. Ao exame físico, apresentou desequilíbrio ao deambular, força preservada nos membros e fundo de olho com papiledema. O exame ideal para investigar a doença e o provável diagnóstico são, respectivamente:",
    options: [
      "tomografia de crânio e tumor cerebral.",
      "tomografia de crânio e neurocisticercose.",
      "análise do liquor e meningite.",
      "análise do liquor e cerebelite.",
    ],
    correctAnswer: 0,
    explanation:
      "O quadro de cefaleia, vômitos, alterações visuais, ataxia e papiledema sugere hipertensão intracraniana por tumor cerebral. A TC de crânio é o exame inicial adequado.",
    difficulty: "medium",
    source: "Neurologia Pediátrica 2023",
  },
  {
    id: "neu_009",
    subject: "neurologia",
    content: "Com relação à utilização da neuroimagem e eletroencefalografia em psiquiatria, é correto afirmar:",
    options: [
      "Achados patognomônicos na ressonância magnética estrutural podem definir a presença de transtorno depressivo maior.",
      "O transtorno de déficit de atenção e hiperatividade pode ser diagnosticado pela eletroencefalografia.",
      "A técnica de imagem de tensor de difusão (DTI) identifica a integridade da substância branca.",
      "A técnica de ressonância magnética funcional usa a presença de hemoglobina glicada em áreas para mensurar atividade cerebral.",
      "A tomografia por emissão de pósitrons apresenta resultados que permitem a diferenciação entre psicose por intoxicação e psicose secundária.",
    ],
    correctAnswer: 2,
    explanation:
      "A técnica de imagem de tensor de difusão (DTI) é utilizada para avaliar a integridade da substância branca cerebral através da análise da difusão da água nos tecidos.",
    difficulty: "hard",
    source: "Neuroimagem Psiquiátrica 2023",
  },
  {
    id: "neu_010",
    subject: "neurologia",
    content:
      "Menino, 5 anos de idade, vem à consulta por cefaleia e vômitos que iniciaram há 15 dias. Ao exame físico, apresenta edema de papila no fundo de olho, comprometimento dos pares cranianos (IX, X, XI e XII), hemiparesia espástica à direita com sinal de Babinski e déficit sensitivo em hemicorpo à direita. Com base nestes dados, o provável diagnóstico é:",
    options: [
      "tumor de tronco encefálico.",
      "tumor cerebelar.",
      "tumor do lobo frontal.",
      "tumor do quiasma óptico.",
      "tumor de medula cervical.",
    ],
    correctAnswer: 1,
    explanation:
      "O comprometimento de múltiplos pares cranianos baixos (IX, X, XI, XII) associado a hemiparesia e déficit sensitivo contralateral sugere tumor de tronco encefálico.",
    difficulty: "hard",
    source: "Neurologia Pediátrica 2023",
  },
  {
    id: "neu_011",
    subject: "neurologia",
    content:
      "Uma mulher de 58 anos é trazida à unidade de pronto atendimento por quadro de crise convulsiva, sem história prévia de epilepsia, uso de medicações ou doenças prévias. A tomografia de crânio mostra múltiplas lesões supratentoriais, sugestivas de metástases. Assinale a alternativa que apresenta o sítio primário mais provável das sugestivas metástases dessa paciente.",
    options: ["Pâncreas.", "Pulmão.", "Colo de útero.", "Osteossarcoma.", "Bexiga."],
    correctAnswer: 1,
    explanation:
      "O pulmão é o sítio primário mais comum de metástases cerebrais, especialmente em mulheres, seguido pela mama. O câncer de pulmão tem alta propensão para metastatizar para o cérebro.",
    difficulty: "medium",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_012",
    subject: "neurologia",
    content:
      "Paciente do sexo feminino, 48 anos, portadora de neoplasia maligna mamária avançada, é admitida no pronto-socorro por aparecimento de hemiparesia direita e crise convulsiva. Tendo em vista seu histórico e o quadro clínico atual, que exame de imagem deve ser executado para avaliação do sistema nervoso central?",
    options: [
      "Ressonância nuclear magnética.",
      "Tomografia axial computadorizada.",
      "Espectrofotometria reacional.",
      "Ultrassonografia transparietal.",
      "Eletroencefalografia em repouso.",
    ],
    correctAnswer: 0,
    explanation:
      "A ressonância magnética é o exame de escolha para avaliação de metástases cerebrais, pois oferece melhor resolução e sensibilidade para detectar lesões pequenas comparada à tomografia.",
    difficulty: "medium",
    source: "Neuroimagem Oncológica 2023",
  },
  {
    id: "neu_013",
    subject: "neurologia",
    content:
      "Em paciente com metástases cerebrais, o fármaco inicial melhor indicado para o tratamento das náuseas e vômitos é:",
    options: ["ondansetrona.", "metoclopramida.", "clorpromazina.", "dexametasona."],
    correctAnswer: 3,
    explanation:
      "A dexametasona é o fármaco de escolha inicial para náuseas e vômitos em pacientes com metástases cerebrais, pois além do efeito antiemético, reduz o edema cerebral.",
    difficulty: "medium",
    source: "Cuidados Paliativos Oncológicos 2023",
  },
  {
    id: "neu_014",
    subject: "neurologia",
    content:
      "Um paciente de 42 anos de idade evolui com convulsões de início recente do tipo parciais complexas. Foi realizada uma tomografia de crânio com contraste que evidenciou uma massa em lobo parietal direito, com contornos regulares, sugestivo de neoplasia primária. A radioterapia nos tumores malignos do SNC pode ser utilizada.",
    options: ["Certo.", "Errado."],
    correctAnswer: 0,
    explanation:
      "A radioterapia é uma modalidade terapêutica importante no tratamento de tumores malignos do sistema nervoso central, podendo ser utilizada como tratamento adjuvante ou paliativo.",
    difficulty: "easy",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_015",
    subject: "neurologia",
    content:
      "Um paciente de 42 anos de idade evolui com convulsões de início recente do tipo parciais complexas. Foi realizada uma tomografia de crânio com contraste que evidenciou uma massa em lobo parietal direito, com contornos regulares, sugestivo de neoplasia primária. O tratamento de tumores do sistema nervoso central (SNC) é cirúrgico.",
    options: ["Certo.", "Errado."],
    correctAnswer: 1,
    explanation:
      "O tratamento de tumores do SNC não é exclusivamente cirúrgico. Pode incluir cirurgia, radioterapia, quimioterapia ou combinação dessas modalidades, dependendo do tipo e localização do tumor.",
    difficulty: "medium",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_016",
    subject: "neurologia",
    content:
      "Um paciente de 42 anos de idade evolui com convulsões de início recente do tipo parciais complexas. Foi realizada uma tomografia de crânio com contraste que evidenciou uma massa em lobo parietal direito, com contornos regulares, sugestivo de neoplasia primária. Epidemiologicamente trata-se de craniofaringioma.",
    options: ["Certo.", "Errado."],
    correctAnswer: 1,
    explanation:
      "Epidemiologicamente, craniofaringiomas são mais comuns em crianças e localizam-se na região selar/suprasselar. Em adultos de 42 anos com massa em lobo parietal, gliomas são mais prováveis.",
    difficulty: "medium",
    source: "Epidemiologia Neurológica 2023",
  },
  {
    id: "neu_017",
    subject: "neurologia",
    content:
      "Mulher, 35 anos, apresenta cefaleia e hemianopsia bitemporal. Ressonância Magnética da Sela Turca demonstra lesão nodular hipocaptante de 2,5 cm de maior diâmetro, de localização selar, com extensão suprasselar, e compressão do quiasma óptico. O diagnóstico principal para esse quadro é:",
    options: ["meningeoma selar.", "craniofaringeoma.", "cordoma.", "macroadenoma hipofisário.", "cisto hipofisário."],
    correctAnswer: 3,
    explanation:
      "O quadro de hemianopsia bitemporal com lesão selar de 2,5 cm comprimindo o quiasma óptico em mulher de 35 anos é característico de macroadenoma hipofisário.",
    difficulty: "medium",
    source: "Endocrinologia Neurológica 2023",
  },
  {
    id: "neu_018",
    subject: "neurologia",
    content:
      "Homem de 63 anos refere quadro de cefaleia há 6 meses. Inicialmente, a dor era leve, mas foi se tornando, progressivamente, mais intensa. Nesse período, notou algo errado com sua visão, pois, ao deambular, disse que tropeça em objetos que ficam nas laterais. Nega febre, convulsões, doenças prévias, uso de medicamentos, etilismo ou tabagismo. Exame físico: orientado e corado; PA: 145 x 95 mmHg, FC: 65 bpm, T: 36,5°C; força muscular normal nos 4 membros; visual: hemianopsia bitemporal. A hipótese diagnóstica mais provável é:",
    options: [
      "hidrocefalia.",
      "iridociclite.",
      "neoplasia de fossa posterior do crânio.",
      "trombose de seios venosos centrais.",
      "tumor de hipófise ou região suprasselar.",
    ],
    correctAnswer: 4,
    explanation:
      "A hemianopsia bitemporal é um sinal clássico de compressão do quiasma óptico, sendo tumor de hipófise ou região suprasselar a causa mais provável.",
    difficulty: "medium",
    source: "Neuroftalmologia 2023",
  },
  {
    id: "neu_019",
    subject: "neurologia",
    content:
      "Um homem de 46 anos de idade é admitido na emergência após um acidente automobilístico. Ele insiste em dizer que não fez uso de álcool ou drogas e que não viu outro carro vindo em sua direção pelo seu lado direito. Não há alterações pupilares e apesar da acuidade visual normal, ele apresenta hemianopsia bitemporal. Qual a principal hipótese diagnóstica neste caso?",
    options: [
      "Glioma de lobo occipital.",
      "Lesão de nervo ótico pós-quiasmática à direita.",
      "Acidente vascular cerebral em lobo parietal esquerdo.",
      "Adenoma pituitário.",
      "Deslocamento de retina.",
    ],
    correctAnswer: 3,
    explanation:
      "A hemianopsia bitemporal indica compressão do quiasma óptico, sendo adenoma pituitário a causa mais comum. O acidente pode ter sido consequência dos déficits visuais preexistentes.",
    difficulty: "medium",
    source: "Neuroftalmologia 2023",
  },
  {
    id: "neu_020",
    subject: "neurologia",
    content:
      "Pacientes com câncer no ápice do pulmão e extensão local para o estreito torácico podem ter dor no ombro e braços, síndrome de Horner e, ocasionalmente, parestesia na distribuição do nervo ulnar da mão (quarto e quinto dedos). Os pacientes com todas essas características podem ser classificados como tendo síndrome de Pancoast. Neste caso, a dor é procedente de quais raízes nervosas:",
    options: ["C7 e C8.", "C8 e T1.", "T1 e T2.", "T2 e T3.", "C7 e T3."],
    correctAnswer: 1,
    explanation:
      "Na síndrome de Pancoast, a dor é procedente das raízes nervosas C8 e T1, que são comprimidas pelo tumor no ápice pulmonar com extensão para o estreito torácico superior.",
    difficulty: "hard",
    source: "Oncologia Torácica 2023",
  },
  {
    id: "neu_021",
    subject: "neurologia",
    content: "O acometimento primário do sistema nervoso central por linfoma é, mais provavelmente, do tipo:",
    options: ["células B.", "Hodgkin.", "Kaposi.", "células T."],
    correctAnswer: 0,
    explanation:
      "O linfoma primário do sistema nervoso central é mais comumente do tipo células B, especialmente em pacientes imunocomprometidos.",
    difficulty: "medium",
    source: "Hematologia Oncológica 2023",
  },
  {
    id: "neu_022",
    subject: "neurologia",
    content:
      "Menino com 4 anos de idade é trazido à consulta devido a cefaleia, vômitos há 5 dias e dificuldade na marcha há cerca de 3 meses. Ao exame, apresenta disartria, desequilíbrio na marcha, incoordenação motora fina, tremor e nistagmo. No fundo de olho apresenta edema de papila. A provável etiologia para o quadro apresentado é:",
    options: [
      "Acidente vascular hemorrágico no tronco cerebral.",
      "Tumor cerebelar.",
      "Hidrocefalia",
      "Cerebelite.",
      "Craniofaringioma.",
    ],
    correctAnswer: 1,
    explanation:
      "O quadro de ataxia cerebelar (disartria, desequilíbrio, incoordenação, tremor, nistagmo) associado a sinais de hipertensão intracraniana (cefaleia, vômitos, papiledema) sugere tumor cerebelar.",
    difficulty: "medium",
    source: "Neurologia Pediátrica 2023",
  },
  {
    id: "neu_023",
    subject: "neurologia",
    content: "Em relação às cefaleias secundárias assinale a opção CORRETA.",
    options: [
      "A cefaleia decorrente de tumor cerebral é constante, não piora com esforço físico e nunca é acompanhada de náusea e vômitos.",
      "A cefaleia aguda, intensa com rigidez de nuca e sem febre sugere hemorragia subaracnoidea e deve ser sempre um sinal de alerta.",
      "Alterações psiquiátricas com distúrbio de humor e ansiedade são causas frequentes de cefaleia e não necessitam de exames de imagem.",
      "A arterite temporal é um distúrbio inflamatório caracterizado por cefaleia geralmente em região temporal, com hipersensibilidade de couro cabeludo, claudicação de mandíbula e é característico em pacientes jovens abaixo de 30 anos.",
      "Na meningite a cefaleia é aguda e intensa, acompanhada de rigidez de nuca e febre. Com a presença desses sinais e sintomas não se faz necessário a realização de coleta de líquor através da punção lombar, uma vez que já se tem o diagnóstico.",
    ],
    correctAnswer: 1,
    explanation:
      "A cefaleia aguda e intensa com rigidez de nuca sem febre é um sinal de alerta para hemorragia subaracnoidea, que requer investigação imediata.",
    difficulty: "medium",
    source: "Neurologia Clínica 2023",
  },
  {
    id: "neu_024",
    subject: "neurologia",
    content:
      "Os tumores cerebrais primários são um conjunto de neoplasias malignas originárias de células de sustentação do tecido nervoso. A gradação dos tumores é baseada em aspectos histopatológicos. Podemos considerar INADEQUADO que:",
    options: [
      "A ressecção cirúrgica é o tratamento recomendado na maioria dos casos de tumor cerebral, com objetivo de remover amplamente a neoplasia com a máxima preservação das funções neurológicas.",
      "Eventualmente, a localização do tumor em área eloquente permite apenas citorredução ou biópsia da lesão.",
      "São tumores raros, correspondendo a 2% dos todos os cânceres conhecidos, com baixa mortalidade em adultos – status pouco modificado pelo emprego das modalidades terapêuticas disponíveis.",
      "O diagnóstico definitivo é firmado pelo estudo histopatológico de espécime tumoral obtido por biópsia estereotática ou a céu aberto, sendo essencial para o planejamento terapêutico.",
    ],
    correctAnswer: 2,
    explanation:
      "É inadequado afirmar que os tumores cerebrais têm baixa mortalidade em adultos. Na verdade, muitos tumores cerebrais primários, especialmente os de alto grau, têm alta mortalidade e prognóstico reservado.",
    difficulty: "medium",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_025",
    subject: "neurologia",
    content:
      "Um paciente de 47 anos de idade está com diagnóstico de um tumor cerebral, provavelmente maligno, localizado em região de difícil acesso cirúrgico, porém a cirurgia não está descartada. Está bem clinicamente. O médico deve:",
    options: [
      "chamar a família e expor os riscos para que se decida sobre outros recursos terapêuticos.",
      "tentar inicialmente outros recursos terapêuticos, salvo se o paciente insistir na cirurgia.",
      "realizar a cirurgia sem informar o paciente para que as chances de sucesso aumentem.",
      "chamar a esposa inicialmente para decidir a melhor maneira de informar o paciente.",
      "informar o paciente exatamente dos riscos, possibilidades terapêuticas e eventuais sequelas.",
    ],
    correctAnswer: 4,
    explanation:
      "O princípio da autonomia exige que o paciente seja informado diretamente sobre sua condição, riscos, benefícios e alternativas terapêuticas, permitindo que tome decisões informadas sobre seu tratamento.",
    difficulty: "easy",
    source: "Bioética Médica 2023",
  },
  {
    id: "neu_026",
    subject: "neurologia",
    content: "Em qual faixa etária, o retardo no diagnóstico dos tumores cerebrais ocorre com mais frequência?",
    options: ["Na adolescência.", "Em recém-nascidos.", "Nos lactentes.", "Em pré-escolares e escolares."],
    correctAnswer: 2,
    explanation:
      "O retardo no diagnóstico de tumores cerebrais é mais frequente em lactentes devido à dificuldade de comunicação dos sintomas e à inespecificidade dos sinais clínicos nesta faixa etária.",
    difficulty: "medium",
    source: "Oncologia Pediátrica 2023",
  },
  {
    id: "neu_027",
    subject: "neurologia",
    content: "Em relação aos tumores de SNC, assinale a alternativa INCORRETA:",
    options: [
      "Alguns tipos de tumores do SNC estão relacionados à ingestão de determinadas toxinas e a fatores ambientais.",
      "Alguns tipos de tumores cerebrais são mais frequentemente diagnosticados em determinadas faixas etárias.",
      "Pacientes que se submeteram à radioterapia do SNC são mais susceptíveis a tumores cerebrais secundários.",
      "Alguns tipos de tumores cerebrais estão relacionados a determinadas síndromes genéticas.",
    ],
    correctAnswer: 0,
    explanation:
      "É incorreto afirmar que tumores do SNC estão relacionados à ingestão de toxinas e fatores ambientais. A etiologia da maioria dos tumores cerebrais primários permanece desconhecida, com poucos fatores de risco bem estabelecidos.",
    difficulty: "medium",
    source: "Epidemiologia Neurológica 2023",
  },
  {
    id: "neu_028",
    subject: "neurologia",
    content:
      "Antes de iniciar o tratamento oncológico, devemos realizar o estadiamento da doença, ou seja, avaliar possíveis locais de infiltração da neoplasia. Qual exame abaixo NÃO faz parte do estadiamento de um caso recém diagnosticado de Meduloblastoma de Fossa Posterior numa criança de 5 anos?",
    options: [
      "Ressonância Magnética de Coluna Total",
      "Cintilografia de corpo inteiro com Tecnécio 99",
      "Mielograma / Biópsia de Medula óssea",
      "Ressonância Magnética de Crânio",
    ],
    correctAnswer: 2,
    explanation:
      "O mielograma/biópsia de medula óssea NÃO faz parte do estadiamento do meduloblastoma, pois este tumor não metastatiza para a medula óssea. O estadiamento inclui RMN de crânio, coluna total e análise do líquor.",
    difficulty: "hard",
    source: "Oncologia Pediátrica 2023",
  },
  {
    id: "neu_029",
    subject: "neurologia",
    content:
      "Escolar, sete anos, feminino, é trazida à emergência com vômitos e dificuldade de ficar em pé. Tem história de cefaleia na região occipital, em aperto há dois meses, de forte intensidade e com aumento da frequência. Os episódios duram cerca de seis horas, ocorrendo frequentemente na madrugada e sem alívio com analgésicos. Exame físico: marcha atáxica e com dismetria; paralisia do sexto par bilateralmente. Nega febre. A hipótese diagnóstica mais provável é:",
    options: ["Enxaqueca basilar.", "Infecção aguda.", "Tensão.", "Processo expansivo."],
    correctAnswer: 3,
    explanation:
      "O quadro de cefaleia progressiva, ataxia, dismetria e paralisia do VI par craniano bilateral sugere processo expansivo (tumor) em fossa posterior, causando hipertensão intracraniana.",
    difficulty: "medium",
    source: "Neurologia Pediátrica 2023",
  },
  {
    id: "neu_030",
    subject: "neurologia",
    content: "Com relação aos tumores do Sistema Nervoso Central, assinale a alternativa INCORRETA:",
    options: [
      "Os sítios primários de metástase cerebral mais comuns são: pulmão, mama, melanoma e cólon.",
      "Astrocitomas correspondem a 50% dos tumores encefálicos primários.",
      "Fludrocortisona é indicado na maioria dos casos para redução do edema peritumoral.",
      "Anticonvulsivantes devem ser utilizados se o tumor é localizado próximo a área sensitivo-motora.",
    ],
    correctAnswer: 2,
    explanation:
      "É incorreto afirmar que fludrocortisona é indicada para redução do edema peritumoral. O corticoide indicado é a dexametasona, não a fludrocortisona, que é um mineralocorticoide.",
    difficulty: "medium",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_031",
    subject: "neurologia",
    content:
      "Um menino com 5 anos e 11 meses de idade faz seguimento de rotina em Unidade Básica de Saúde desde o nascimento, sem antecedentes mórbidos relevantes. Em sua última consulta, há um ano, sua estatura era de 110 cm; na consulta atual está medindo 111 cm. Há 4 meses, passou a apresentar cefaleia holocraniana diária, de intensidade moderada a forte e dificuldade visual. A avaliação oftalmológica revelou hemianopsia bitemporal. A principal hipótese diagnóstica para esse caso é:",
    options: ["cordoma.", "schwannoma.", "craniofaringeoma.", "tumor de plexo coroide."],
    correctAnswer: 2,
    explanation:
      "O quadro de baixa estatura (crescimento de apenas 1 cm em 1 ano), cefaleia e hemianopsia bitemporal em criança sugere craniofaringeoma, tumor que comprime o quiasma óptico e afeta o eixo hipotálamo-hipofisário.",
    difficulty: "medium",
    source: "Endocrinologia Pediátrica 2023",
  },
  {
    id: "neu_032",
    subject: "neurologia",
    content:
      "Paciente masculino, com 72 anos, hipertenso, alcoolista, refere que há 15 dias iniciou progressiva perda de força no dimídio esquerdo, que se iniciou como dificuldade para deambular e evoluiu para o membro superior esquerdo. Família refere queixa de cefaleia persistente e sonolência. São diagnósticos mais prováveis, exceto:",
    options: [
      "Síndrome de Guillain-Barré.",
      "Hematoma subdural crônico.",
      "Neoplasia intracraniana.",
      "Abcesso cerebral.",
    ],
    correctAnswer: 0,
    explanation:
      "A Síndrome de Guillain-Barré NÃO é um diagnóstico provável, pois causa paralisia flácida ascendente simétrica, não hemiparesia progressiva unilateral como descrito no caso.",
    difficulty: "medium",
    source: "Neurologia Clínica 2023",
  },
  {
    id: "neu_033",
    subject: "neurologia",
    content: "O tumor primário mais comum no sistema nervoso central é:",
    options: [
      "glioblastoma multiforme",
      "meningioma",
      "astrocitoma de baixo grau de malignidade",
      "ependimoma",
      "meduloblastoma",
    ],
    correctAnswer: 1,
    explanation:
      "O meningioma é o tumor primário mais comum do sistema nervoso central, representando cerca de 30-35% de todos os tumores cerebrais primários.",
    difficulty: "medium",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_034",
    subject: "neurologia",
    content:
      "Os meningiomas são tumores usualmente benignos de crescimento lento. A localização mais comum dos meningiomas intracranianos em adultos é:",
    options: ["Parassagital.", "Na convexidade.", "Intraventricular.", "Na goteira olfatória.", "No seio cavernoso."],
    correctAnswer: 0,
    explanation:
      "A localização mais comum dos meningiomas intracranianos em adultos é a região parassagital, ao longo do seio sagital superior.",
    difficulty: "medium",
    source: "Neurocirurgia 2023",
  },
  {
    id: "neu_035",
    subject: "neurologia",
    content:
      "A segunda neoplasia mais frequente na infância são os tumores cerebrais. Metade deles são de fossa posterior. O mais comumente encontrado é:",
    options: ["Meduloblastoma.", "Craniofaringioma.", "Ependimoma.", "Astrocitoma.", "Linfoma."],
    correctAnswer: 3,
    explanation:
      "O astrocitoma é o tumor cerebral mais comum na infância, representando cerca de 40-50% de todos os tumores cerebrais pediátricos.",
    difficulty: "medium",
    source: "Oncologia Pediátrica 2023",
  },
  {
    id: "neu_036",
    subject: "neurologia",
    content:
      "Nos casos de metástases cerebrais, geralmente o tumor primário está localizado com maior frequência no(s)(na):",
    options: ["Brônquios.", "Mama.", "Rim.", "Cólon.", "Útero."],
    correctAnswer: 0,
    explanation:
      "Os brônquios (pulmão) são o sítio primário mais comum de metástases cerebrais, seguidos pela mama e melanoma.",
    difficulty: "medium",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_037",
    subject: "neurologia",
    content:
      "Criança de 5 anos de idade chega a Unidade Básica de Saúde acompanhada da avó, com queixa principal de cefaleia e vômitos. Qual(is) o(s) sinal/sintoma(s) que sugerem a hipótese diagnóstica de tumor cerebral?",
    options: [
      "Febre e dor em membros.",
      "Melhora da cefaleia com analgésico.",
      "Marcha claudicante e estrabismo.",
      "Sonolência.",
    ],
    correctAnswer: 2,
    explanation:
      "Marcha claudicante (ataxia) e estrabismo são sinais neurológicos focais que, associados à cefaleia e vômitos, sugerem tumor cerebral em criança.",
    difficulty: "medium",
    source: "Neurologia Pediátrica 2023",
  },
  {
    id: "neu_038",
    subject: "neurologia",
    content:
      "Paciente com tumor cerebral e sinais de hipertensão intracraniana, relata diplopia, turvação visual e impossibilidade de desviar os olhos lateralmente. Quais nervos cranianos estão comprometidos?",
    options: [
      "Óptico e abducente.",
      "Motor ocular comum e facial.",
      "Óptico e facial.",
      "Motor ocular comum e abducente.",
    ],
    correctAnswer: 0,
    explanation:
      "O nervo óptico (II) está comprometido causando turvação visual, e o nervo abducente (VI) está comprometido causando diplopia e impossibilidade de desvio lateral dos olhos.",
    difficulty: "medium",
    source: "Neuroftalmologia 2023",
  },
  {
    id: "neu_039",
    subject: "neurologia",
    content:
      "Grande fumante procura atendimento médico com quadro de ptose palpebral à esquerda, miose, enoftalmia e anidrose também do lado esquerdo, além de tosse crônica. O Rx do tórax mostra imagem de condensação no lobo superior do pulmão esquerdo. O diagnóstico compatível com esse caso é câncer de pulmão com síndrome:",
    options: ["de Eaton-Lambert.", "de Kartagener.", "de C. B. Horner.", "da veia cava superior.", "paraneoplásica."],
    correctAnswer: 2,
    explanation:
      "A tríade de ptose palpebral, miose e enoftalmia caracteriza a síndrome de Horner, causada por lesão do sistema nervoso simpático, comum no tumor de Pancoast (ápice pulmonar).",
    difficulty: "medium",
    source: "Oncologia Torácica 2023",
  },
  {
    id: "neu_040",
    subject: "neurologia",
    content:
      "Paciente, sexo feminino, 58 anos, pele negra, fumante, sobrepeso, com histórico de vertigem posicional benigna, apresenta-se ao Pronto Socorro referindo 'tontura', perda de sentido espacial, zumbido, perda auditiva leve e dores na região dos ouvidos, pescoço e laringe. No exame neurológico, o limiar para condução aérea e óssea da vibração de 256 Hz de um diapasão está aumentado no lado esquerdo. O diagnóstico mais provável é:",
    options: ["Depressão maior;", "Neuroma acústico;", "Infarto agudo de artéria basilar;", "Doença de Ménière."],
    correctAnswer: 1,
    explanation:
      "O quadro de perda auditiva unilateral, zumbido, tontura e alteração no teste do diapasão sugere neuroma acústico (schwannoma do VIII par craniano).",
    difficulty: "medium",
    source: "Otorrinolaringologia 2023",
  },
  {
    id: "neu_041",
    subject: "neurologia",
    content:
      "Criança de seis anos apresenta há duas semanas quadro de cefaleia holocraniana que vem piorando progressivamente, muitas vezes acordando à noite pela dor. Há dois dias, apresenta náuseas e vômitos. A mãe refere história familiar para enxaqueca. Ao exame, a criança está em bom estado geral; FC = 85 bpm; PA = 110 x 60 mmHg. O exame de fundo de olho evidenciou papiledema. A principal hipótese diagnóstica e as alterações que poderiam ser encontradas ao exame neurológico são, respectivamente:",
    options: [
      "Glioma; déficit neurológico focal e afasia.",
      "Astrocitoma cerebelar; ataxia e disdiadococinesia.",
      "Enxaqueca; fotofobia e déficit neurológico focal pós-crise.",
      "Infecção de sistema nervoso central; irritação meníngea e convulsão.",
    ],
    correctAnswer: 1,
    explanation:
      "O quadro de cefaleia progressiva com papiledema em criança sugere astrocitoma cerebelar, que causaria ataxia e disdiadococinesia (incapacidade de realizar movimentos alternados rápidos).",
    difficulty: "medium",
    source: "Neurologia Pediátrica 2023",
  },
  {
    id: "neu_042",
    subject: "neurologia",
    content: "Dentre as opções abaixo, todas são síndromes familiares associadas a tumores hipofisários, EXCETO:",
    options: [
      "Neoplasia endócrina múltipla 4",
      "Síndrome de Adie",
      "Neoplasia endócrina múltipla 1",
      "Complexo de Carney",
      "Adenoma hipofisário familiar",
    ],
    correctAnswer: 1,
    explanation:
      "A Síndrome de Adie NÃO está associada a tumores hipofisários. É uma condição neurológica que afeta a pupila (pupila tônica de Adie), não relacionada a neoplasias endócrinas.",
    difficulty: "hard",
    source: "Endocrinologia 2023",
  },
  {
    id: "neu_043",
    subject: "neurologia",
    content: "Em estudos de necropsia, qual é o tumor que mais frequentemente apresenta metástases para o cérebro?",
    options: ["de pulmão", "de mama.", "de rim.", "gastrointestinal.", "melanoma."],
    correctAnswer: 0,
    explanation:
      "Em estudos de necropsia, o tumor de pulmão é o que mais frequentemente apresenta metástases cerebrais, seguido pelo câncer de mama e melanoma.",
    difficulty: "medium",
    source: "Anatomia Patológica 2023",
  },
  {
    id: "neu_044",
    subject: "neurologia",
    content:
      "Com relação ao Ependimoma na infância, avalie os itens: I. Tumor suprasselar associado à puberdade precoce central; II. Tumor suprasselar associado à puberdade tardia; III. Pode estar associado à neurofibromatose tipo II; IV. Não responde à quimioterapia em crianças. Assinale a alternativa correta.",
    options: ["I e III.", "I e IV.", "III e IV.", "II e IV.", "I, II, III e IV."],
    correctAnswer: 2,
    explanation:
      "Estão corretos os itens III (ependimomas podem estar associados à neurofibromatose tipo II) e IV (ependimomas geralmente não respondem bem à quimioterapia em crianças).",
    difficulty: "hard",
    source: "Oncologia Pediátrica 2023",
  },
  {
    id: "neu_045",
    subject: "neurologia",
    content:
      "Homem, 70 anos, é trazido ao pronto-socorro devido quadro de crise convulsiva. A causa mais frequente nesta faixa etária é:",
    options: ["Neuroinfecção.", "Doença de Alzheimer.", "Acidente vascular encefálico.", "Tumores intracranianos."],
    correctAnswer: 2,
    explanation:
      "Em idosos de 70 anos, o acidente vascular encefálico é a causa mais frequente de crise convulsiva de início tardio, seguido por tumores intracranianos.",
    difficulty: "medium",
    source: "Neurologia Geriátrica 2023",
  },
  {
    id: "neu_046",
    subject: "neurologia",
    content:
      "Paciente masculino, de 54 anos, em tratamento para hipertensão arterial, teve episódio de crise convulsiva generalizada. Foram realizados exames de imagem do sistema nervoso central. Caso a investigação completa mostre lesões cerebrais secundárias múltiplas, qual a conduta mais adequada?",
    options: [
      "Imediato tratamento radioterápico (radioterapia de cérebro total).",
      "Imediato tratamento com radioterapia estereotáxica fracionada cerebral.",
      "Complementação da investigação clínica e por imagem para diagnóstico da lesão extracerebral primária.",
      "Tratamento das lesões cerebrais por craniotomia.",
      "Uso exclusivo de anticonvulsivantes e dexametasona.",
    ],
    correctAnswer: 2,
    explanation:
      "Antes de iniciar qualquer tratamento das metástases cerebrais, é fundamental identificar e estadiar o tumor primário para definir a melhor estratégia terapêutica.",
    difficulty: "medium",
    source: "Oncologia Clínica 2023",
  },
  {
    id: "neu_047",
    subject: "neurologia",
    content:
      "AJM, 18 anos de idade, masculino, negro, sinistro, paciente previamente hígido, iniciou quadro de crises epilépticas parciais simples e complexas, sem febre, sem cefaleia, negou náuseas e vômitos. Ao exame neurológico: paciente consciente, orientado no tempo e no espaço, hemiparestesia em dimídio esquerdo. Negou antecedentes pessoal e familiar para epilepsia. Qual a principal hipótese diagnóstica?",
    options: [
      "Processo expansivo em sistema nervoso central.",
      "Acidente vascular cerebral.",
      "Hemorragia subaracnóidea.",
      "Quadro conversivo.",
    ],
    correctAnswer: 0,
    explanation:
      "Em jovem de 18 anos com crises epilépticas de início recente e déficit neurológico focal (hemiparestesia), a principal hipótese é processo expansivo (tumor) no SNC.",
    difficulty: "medium",
    source: "Neurologia Clínica 2023",
  },
  {
    id: "neu_048",
    subject: "neurologia",
    content:
      "Paciente feminina com 20 anos de idade e história de crises convulsivas frequentes nos últimos dois meses. É submetida à tomografia computadorizada do crânio que demonstra múltiplas microcalcificações difusas pelo parênquima cerebral, sem outras alterações. O diagnóstico mais provável é:",
    options: ["Glioma cerebral.", "Tuberculose.", "Toxoplasmose.", "Neurocisticercose."],
    correctAnswer: 3,
    explanation:
      "Múltiplas microcalcificações difusas pelo parênquima cerebral em paciente jovem com convulsões é característico de neurocisticercose na fase calcificada.",
    difficulty: "medium",
    source: "Neurologia Tropical 2023",
  },
  {
    id: "neu_049",
    subject: "neurologia",
    content:
      "A síndrome de Eaton-Lambert é uma das síndromes paraneoplásicas neurológicas mais comuns, afetando pacientes com tumor de pulmão de pequenas células que apresentam queixa de fraqueza proximal nas pernas, com melhora na força após vários segundos de contração voluntária sustentada. O diagnóstico pode ser feito por:",
    options: [
      "Eletromiografia, com incremento maior que 50% à estimulação de altas frequências, padrão pré-sináptico tipo misto: neurogênico e miopático.",
      "Punção lombar, com líquor 'água de rocha', pleiocitose e aumento de proteínas.",
      "Ressonância magnética nuclear, com atrofia cerebelar difusa e calcificações núcleos da base.",
      "Presença de Anticorpo Anti-Nuclear Neuronal (anti-Hu) e Anticorpos ligadores do receptor de acetilcolina (AntiRach).",
    ],
    correctAnswer: 0,
    explanation:
      "O diagnóstico da síndrome de Eaton-Lambert é feito por eletromiografia mostrando incremento >50% na amplitude do potencial de ação muscular com estimulação de alta frequência.",
    difficulty: "hard",
    source: "Neurofisiologia 2023",
  },
  {
    id: "neu_050",
    subject: "neurologia",
    content:
      "Uma criança de cinco anos de idade chega ao posto de atendimento acompanhada da avó com a queixa principal de cefaleia e vômitos. Quais sinais/sintomas que sugerem a hipótese diagnóstica de tumor cerebral?",
    options: [
      "Febre e dor em membros.",
      "Melhora da cefaleia com analgésicos.",
      "Marcha claudicante e estrabismo.",
      "Sonolência intermitente.",
    ],
    correctAnswer: 2,
    explanation:
      "Marcha claudicante (ataxia) e estrabismo são sinais neurológicos focais que, em criança com cefaleia e vômitos, sugerem tumor cerebral.",
    difficulty: "medium",
    source: "Neurologia Pediátrica 2023",
  },
  {
    id: "neu_051",
    subject: "neurologia",
    content:
      "Grande fumante procura atendimento médico com quadro de enoftalmia, miose e ptose palpebral à esquerda, além de tosse crônica. RX de tórax mostra imagem de condensação em lobo superior do pulmão esquerdo. O diagnóstico compatível com esse caso é câncer de pulmão com:",
    options: ["Sd de Pancoast.", "Sd de Horner.", "Sd de Eaton-Lambert.", "Sd paraneoplásica.", "Sd de Nelaton."],
    correctAnswer: 0,
    explanation:
      "A síndrome de Pancoast é caracterizada por tumor no ápice pulmonar que invade o plexo braquial e cadeia simpática, causando síndrome de Horner (ptose, miose, enoftalmia).",
    difficulty: "medium",
    source: "Oncologia Torácica 2023",
  },
  {
    id: "neu_052",
    subject: "neurologia",
    content:
      "Os tumores cerebrais podem se manifestar clinicamente através de sintomas generalizados, que refletem a hipertensão intracraniana, ou por sintomas localizatórios, que refletem a localização do tumor. Em relação às manifestações clínicas e à localização específica, a associação correta é:",
    options: [
      "Lobo frontal - Distúrbios da marcha; Corpo caloso - Perda de memória; Ponte/bulbo - Espasticidade; Mesencéfalo/pineal - Puberdade precoce; Cerebelo - Nistagmo; Ângulo pontocerebelar - Surdez ipsilateral.",
      "Lobo frontal - Distúrbios da marcha; Corpo caloso - Surdez ipsilateral; Ponte/bulbo - Puberdade precoce; Mesencéfalo/pineal - Nistagmo; Cerebelo - Espasticidade; Ângulo pontocerebelar - Perda de memória.",
      "Lobo frontal - Espasticidade; Corpo caloso - Perda de memória; Ponte/bulbo - Espasticidade; Mesencéfalo/pineal - Nistagmo; Cerebelo - Surdez ipsilateral; Ângulo pontocerebelar - Puberdade precoce.",
      "Lobo frontal - Surdez ipsilateral; Corpo caloso - Distúrbios da marcha; Ponte/bulbo - Perda de memória; Mesencéfalo/pineal - Puberdade precoce; Cerebelo - Espasticidade; Ângulo pontocerebelar - Nistagmo.",
      "Lobo frontal - Distúrbios da marcha; Corpo caloso - Nistagmo; Ponte/bulbo - Espasticidade; Mesencéfalo/pineal - Puberdade precoce; Cerebelo - Perda de memória; Ângulo pontocerebelar - Surdez ipsilateral.",
    ],
    correctAnswer: 0,
    explanation:
      "A associação correta é: Lobo frontal (distúrbios da marcha), Corpo caloso (perda de memória), Ponte/bulbo (espasticidade), Mesencéfalo/pineal (puberdade precoce), Cerebelo (nistagmo), Ângulo pontocerebelar (surdez ipsilateral).",
    difficulty: "hard",
    source: "Neuroanatomia Clínica 2023",
  },
  {
    id: "neu_053",
    subject: "neurologia",
    content:
      "Homem, 77 anos, tem convulsões e perda da consciência. Tomografia computadorizada de crânio evidencia imagem nodular isodensa, localizada na região temporoparietal direita, edema perilesional e apagamento dos sulcos corticais, com impregnação anelar pelo meio de contraste. A provável causa da imagem é:",
    options: ["Metástase.", "Hematoma subdural.", "Infarto embólico.", "Hidrocefalia normobárica."],
    correctAnswer: 0,
    explanation:
      "Em idoso de 77 anos, lesão nodular com impregnação anelar pelo contraste, edema perilesional e efeito de massa é altamente sugestiva de metástase cerebral.",
    difficulty: "medium",
    source: "Neuroimagem 2023",
  },
  {
    id: "neu_054",
    subject: "neurologia",
    content:
      "Na enfermaria de clínica médica, está internada mulher de 55 anos, hipertensa, para investigação de massa na base direita do pulmão. O exame revela imagens líticas das vértebras lombares. A paciente é tabagista de 70 maços/ano. No terceiro dia de internação, apresenta sonolência, com lentidão e dificuldade em atender a comandos, mas sem sinais de irritação meníngea, febre ou déficit neurológico motor em membros. Exames mostram sódio = 128 mEq/L. A conduta mais apropriada é:",
    options: [
      "Iniciar dexametasona e fenitoína, encaminhando para ressonância magnética do crânio.",
      "Realizar punção lombar para avaliar carcinomatose meníngea.",
      "Iniciar reposição de sódio para obter nível sérico normal.",
      "Coletar material para culturas a fim de dar eventual início a antibiótico empírico.",
      "Solicitar tomografia computadorizada de crânio.",
    ],
    correctAnswer: 0,
    explanation:
      "Paciente com câncer de pulmão e alteração do nível de consciência deve receber dexametasona (para edema cerebral) e fenitoína (anticonvulsivante profilático), seguido de RMN para avaliar metástases cerebrais.",
    difficulty: "medium",
    source: "Oncologia Clínica 2023",
  },
  {
    id: "neu_055",
    subject: "neurologia",
    content: "São tumores cerebrais primários que calcificam comumente:",
    options: ["linfoma", "ependimoma", "astrocitoma", "craniofaringeoma"],
    correctAnswer: 3,
    explanation:
      "O craniofaringeoma é o tumor cerebral primário que mais comumente apresenta calcificações, sendo este um achado radiológico característico.",
    difficulty: "medium",
    source: "Neuroimagem 2023",
  },
  {
    id: "neu_056",
    subject: "neurologia",
    content: "O anticorpo que deve estar associado à síndrome paraneoplásica cerebelar é:",
    options: ["Anti-TPO;", "Anti-Hu;", "Anti-aquaporina 4;", "Anti-Sm."],
    correctAnswer: 1,
    explanation:
      "O anticorpo Anti-Hu está associado à síndrome paraneoplásica cerebelar, causando degeneração cerebelar subaguda em pacientes com câncer de pulmão de pequenas células.",
    difficulty: "hard",
    source: "Neuroimunologia 2023",
  },
  {
    id: "neu_057",
    subject: "neurologia",
    content:
      "Uma mulher de 37 anos queixa-se de cefaleia, visão borrada durante um ano e está piorando lentamente. A ressonância magnética mostrou uma lesão bem delimitada. Qual é o diagnóstico desse paciente?",
    options: ["Abscesso cerebral.", "Glioblastoma.", "Astrocitoma de baixo grau.", "Meningioma.", "Oligodendroma."],
    correctAnswer: 3,
    explanation:
      "Em mulher de 37 anos com sintomas de crescimento lento e lesão bem delimitada na RMN, o diagnóstico mais provável é meningioma, tumor benigno mais comum em mulheres adultas.",
    difficulty: "medium",
    source: "Neuroimagem 2023",
  },
  {
    id: "neu_058",
    subject: "neurologia",
    content: "Qual o tumor primário mais comum do Sistema Nervoso Central?",
    options: ["Astrocitoma.", "Meningioma.", "Glioma.", "Xantoma.", "Linfoma."],
    correctAnswer: 1,
    explanation:
      "O meningioma é o tumor primário mais comum do sistema nervoso central, representando cerca de 30-35% de todos os tumores cerebrais primários.",
    difficulty: "medium",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_059",
    subject: "neurologia",
    content:
      "Paciente masculino, 55 anos, apresenta crise convulsiva. Durante investigação, RNM revela lesão temporal sugestiva de metástase. Qual o mais provável sítio primário?",
    options: ["Melanoma.", "Rim.", "Pulmão.", "Estômago.", "Reto baixo."],
    correctAnswer: 2,
    explanation:
      "O pulmão é o sítio primário mais comum de metástases cerebrais em homens de 55 anos, especialmente em fumantes. O câncer de pulmão tem alta propensão para metastatizar para o cérebro.",
    difficulty: "medium",
    source: "Oncologia Neurológica 2023",
  },
  {
    id: "neu_060",
    subject: "neurologia",
    content:
      "Homem de 40 anos, com queixa de diminuição da audição do ouvido esquerdo há 1 ano; há 2 meses, dificuldade para fechar o olho esquerdo e há 3 dias, cefaleia e vômitos. Ao exame, colocando-se o diapasão sobre a linha média do crânio, o paciente sentia a vibração apenas no lado direito. Não conseguia fechar o olho esquerdo e a sensibilidade da córnea estava diminuída. Havia manchas de café au lait difusas pelo corpo. O líquor desse paciente deverá revelar, tipicamente:",
    options: [
      "pleocitose.",
      "hipoglicorraquia.",
      "hiperproteinorraquia.",
      "cloretos em torno de 850 mg%.",
      "exame citológico positivo para células neoplásicas.",
    ],
    correctAnswer: 2,
    explanation:
      "O quadro sugere schwannoma do VIII par craniano (neuroma acústico) em paciente com neurofibromatose tipo 2 (manchas café au lait). O líquor tipicamente apresenta hiperproteinorraquia devido à localização do tumor no ângulo pontocerebelar.",
    difficulty: "hard",
    source: "Neurologia Clínica 2023",
  },
  // Novas questões adicionadas
  {
    id: "neu_061",
    subject: "neurologia",
    content:
      "Mulher, 31a, sofreu queda de motocicleta em rodovia. Foi socorrida pelo atendimento pré-hospitalar e trazida ao Pronto Socorro com colar cervical, em prancha longa rígida, com cânula de Guedel e máscara de oxigênio não reinalante com 15L/min. Exame físico: PA=143x75mmHg; FC=96bpm; FR=22irpm; oximetria de pulso=97%. Neurológico: Escala de coma de Glasgow=7, pupilas anisocóricas. Após intubação orotraqueal, foi realizado protocolo de exames de imagem. O tipo de hematoma intracraniano mais provável é:",
    options: ["Hematoma epidural", "Hematoma subdural", "Hematoma intraparenquimatoso", "Hemorragia subaracnóidea"],
    correctAnswer: 1,
    explanation:
      "O quadro de trauma com Glasgow baixo e anisocoria sugere hematoma subdural, que é mais comum em traumas de alta energia como acidentes de motocicleta.",
    difficulty: "medium",
    source: "Traumatologia Neurológica 2023",
  },
  {
    id: "neu_062",
    subject: "neurologia",
    content: "Qual dos seguintes componentes da escala de Glasgow é a mais preditiva de desfechos neurológicos?",
    options: ["Abertura ocular", "Resposta verbal", "Resposta motora", "Lucidez"],
    correctAnswer: 2,
    explanation:
      "A resposta motora é o componente mais preditivo de desfechos neurológicos na escala de Glasgow, pois reflete melhor a integridade das vias neurológicas centrais.",
    difficulty: "medium",
    source: "Neurologia de Emergência 2023",
  },
  {
    id: "neu_063",
    subject: "neurologia",
    content:
      "Paciente de 14 anos foi trazido à Emergência após queda de bicicleta. À admissão, encontrava-se consciente queixando-se de dores em todo o corpo. A tomografia computadorizada de crânio revelou coleção de sangue hiperdensa à esquerda, que não cruzava o tentório, mas que não era limitada pelas suturas. Ao retornar para a Sala de Observação, o paciente teve perda transitória de consciência, apresentando hemiparesia à direita e dilatação pupilar ipsilateral. O declínio rápido de seu estado mental neste momento indica a necessidade de:",
    options: [
      "administrar opioide contínuo intravenoso",
      "iniciar corticoterapia intravenosa",
      "realizar angiorressonância de crânio",
      "realizar intubação endotraqueal",
    ],
    correctAnswer: 3,
    explanation:
      "O declínio rápido do estado mental com sinais de herniação cerebral (hemiparesia e dilatação pupilar) indica necessidade de proteção de via aérea através de intubação endotraqueal.",
    difficulty: "hard",
    source: "Neurocirurgia de Emergência 2023",
  },
  {
    id: "neu_064",
    subject: "neurologia",
    content:
      "Um idoso com doença de Parkinson há mais de 10 anos passa a apresentar quedas frequentes em domicílio. Familiares se preocupam com quadro parecido com demência no último mês. Família o leva a consulta com neurologista, que percebe sonolência excessiva, desatenção, dificuldade de obedecer a comandos, além de hemiparesia esquerda leve. De acordo com o exposto, sua tomografia de crânio deve mostrar, no lado direito de seu cérebro:",
    options: [
      "hematoma epidural",
      "AVC de artéria cerebral média",
      "hematoma subdural",
      "hemorragia em núcleos da base",
    ],
    correctAnswer: 2,
    explanation:
      "Idoso com Parkinson e quedas frequentes que desenvolve alterações cognitivas e hemiparesia sugere hematoma subdural crônico, comum nesta população devido ao risco aumentado de quedas.",
    difficulty: "medium",
    source: "Neurologia Geriátrica 2023",
  },
  {
    id: "neu_065",
    subject: "neurologia",
    content:
      "Um paciente de 58 anos de idade sofreu queda de aproximadamente 6 metros. Atendido na cena, ele consegue falar seu nome, tem pulso de 115 bpm, regular, pressão arterial de 100x60 mmHg e saturação de oxigênio de 88%. Duas horas após a queda, chega ao pronto-socorro com respiração ruidosa, frequência cardíaca de 120 bpm, pressão arterial de 100x70 mmHg e Glasgow 6. Está anisocórico, sendo a pupila direita maior que a esquerda. A respeito desse traumatizado, é correto afirmar:",
    options: [
      "Provavelmente, trata-se de hematoma epidural, com o quadro clínico clássico de intervalo lúcido",
      "O tratamento desse paciente precisa ser passado imediatamente para a equipe de neurocirurgia",
      "A frequência cardíaca alterada é, provavelmente, secundária à lesão cerebral traumática grave",
      "A anisocoria com pupila maior à direita sugere lesão com efeito de massa localizada do lado esquerdo do cérebro",
    ],
    correctAnswer: 0,
    explanation:
      "O quadro clássico de intervalo lúcido (paciente inicialmente consciente que depois deteriora) com anisocoria é característico de hematoma epidural.",
    difficulty: "hard",
    source: "Traumatologia Neurológica 2023",
  },
]
