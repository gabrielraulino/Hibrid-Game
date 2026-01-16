import { Card } from '../types';
import { images } from '../assets/images';

export const mockCards: Card[] = [
  // P1 - Ana Lúcia (Vítima)
  {
    id: '1',
    attributes: {
      code: 'P1',
      name: 'Ana Lúcia',
      type: 'suspect',
      imageUrl: images.vitima,
      interactions: [
        {
          condition: 'default',
          storyText: 'Vítima encontrada às 07:00 da manhã pelo zelador do cemitério.\nCausa da morte: Choque hipovolêmico causado por laceração profunda.\nEla lutou, mas não muito. Havia resquícios de terra debaixo das unhas.',
          gameInstruction: ''
        }
      ]
    }
  },
  // P2 - Ricardo (O Sócio)
  {
    id: '2',
    attributes: {
      code: 'P2',
      name: 'Ricardo',
      type: 'suspect',
      imageUrl: images.amigoSuspeito,
      interactions: [
        // Interrogação no Cemitério (L1) - sem flag
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L1',
          storyText: 'Você interroga Ricardo sobre o Cemitério Antigo. Ele nega veementemente:\n"Não estava aqui naquela noite! Estava na galeria preparando a exposição. Não tenho motivo para vir a um cemitério."',
          gameInstruction: ''
        },
        // Interrogação no Cemitério (L1) - com flag (após descobrir áudio)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L1',
          requiredFlag: 'pista_l1_desbloqueada',
          storyText: 'Você toca o áudio recuperado no cemitério. A postura de Ricardo muda. O choro para. Ele te encara com frieza.\n"Assistente... Ela me chamou de assistente na frente dos investidores. A arte era minha. A visão era minha! Ela só tinha o cheque. Eu não ia deixar ela me apagar."',
          gameInstruction: ''
        },
        // Interrogação na Mansão (L2)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L2',
          storyText: 'Você interroga Ricardo sobre a Mansão da Vítima. Ele nega:\n"Não estive na mansão dela naquela noite. Não tenho acesso. Não sei o que aconteceu lá."',
          gameInstruction: ''
        },
        // Interrogação no Parque (L3)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L3',
          storyText: 'Você interroga Ricardo sobre o Parque da Cidade. Ele nega:\n"Não estava no parque. Não tenho motivo para estar lá. Não conheço esse lugar."',
          gameInstruction: ''
        }
      ]
    }
  },
  // P3 - Sr. Alfred (O Mordomo)
  {
    id: '3',
    attributes: {
      code: 'P3',
      name: 'Sr. Alfred',
      type: 'suspect',
      imageUrl: images.mordomoSuspeito,
      interactions: [
        // Interrogação no Cemitério (L1)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L1',
          storyText: 'Você interroga o Sr. Alfred sobre o Cemitério Antigo. Ele nega categoricamente:\n"Não estava no cemitério. Tenho artrite severa, Detetive. Não saio da mansão há semanas. Não tenho como estar lá."',
          gameInstruction: ''
        },
        // Interrogação na Mansão (L2)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L2',
          storyText: 'Você interroga o Sr. Alfred sobre a Mansão. Ele confirma:\n"Estava aqui, sim. Servi o chá da tarde às 16:30. Às 17:00 ela atendeu um telefonema, gritou com alguém e saiu furiosa. O sistema de alarme confirma: só ela saiu. Eu não saí."',
          gameInstruction: ''
        },
        // Interrogação no Parque (L3)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L3',
          storyText: 'Você interroga o Sr. Alfred sobre o Parque da Cidade. Ele nega:\n"Não estava no parque. Não saio da mansão. Não tenho como estar lá com minha artrite."',
          gameInstruction: ''
        }
      ]
    }
  },
  // P4 - Jonas (O Morador de Rua)
  {
    id: '4',
    attributes: {
      code: 'P4',
      name: 'Jonas',
      type: 'suspect',
      imageUrl: images.mendigoSuspeito,
      interactions: [
        // Interrogação no Cemitério (L1)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L1',
          storyText: 'Você interroga Jonas sobre o Cemitério Antigo. Ele nega:\n"Não estava no cemitério naquela noite. Eu durmo no albergue do centro. Não tenho motivo para estar lá."',
          gameInstruction: ''
        },
        // Interrogação na Mansão (L2)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L2',
          storyText: 'Você interroga Jonas sobre a Mansão da Vítima. Ele nega:\n"Não estava na mansão. Não tenho acesso a lugares assim. Não sei nada sobre isso."',
          gameInstruction: ''
        },
        // Interrogação no Parque (L3)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L3',
          storyText: 'Você interroga Jonas sobre o Parque da Cidade. Ele explica:\n"Eu não matei ninguém! Achei a bolsa no banco do parque hoje cedo! Tava aberta e vazia. As câmeras de trânsito mostram que eu só cheguei no parque quando o sol nasceu."',
          gameInstruction: ''
        }
      ]
    }
  },
  // P5 - Camila (A Rival Corporativa)
  {
    id: '5',
    attributes: {
      code: 'P5',
      name: 'Camila',
      type: 'suspect',
      imageUrl: images.colegaSuspeito,
      interactions: [
        // Interrogação no Cemitério (L1)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L1',
          storyText: 'Você interroga Camila sobre o Cemitério Antigo. Ela nega:\n"Não estava no cemitério. Não tenho motivo para estar lá. Não conheço esse lugar."',
          gameInstruction: ''
        },
        // Interrogação na Mansão (L2)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L2',
          storyText: 'Você interroga Camila sobre a Mansão da Vítima. Ela nega:\n"Não estava na mansão dela. Não tenho acesso. Não sei o que aconteceu lá."',
          gameInstruction: ''
        },
        // Interrogação no Parque (L3)
        {
          condition: 'requires_location_and_suspect',
          requiredLocation: 'L3',
          storyText: 'Você interroga Camila sobre o Parque da Cidade. Ela nega:\n"Não estava no parque. Estava logada no servidor da empresa trabalhando até às 18:45. Não teria tempo de ir ao parque. Verifique os logs de TI se duvida."',
          gameInstruction: ''
        }
      ]
    }
  },
  // A1 - Faca de Caça
  {
    id: '6',
    attributes: {
      code: 'A1',
      name: 'Faca de Caça',
      type: 'weapon',
      imageUrl: images.facaArma,
      interactions: [
        {
          condition: 'default',
          storyText: 'Relatório do Legista: As feridas no corpo são limpas de um lado e irregulares do outro.\nA largura e a profundidade são 100% compatíveis com a lâmina serrilhada desta faca de caça encontrada num bueiro próximo.',
          gameInstruction: ''
        }
      ]
    }
  },
  // A2 - Veneno
  {
    id: '7',
    attributes: {
      code: 'A2',
      name: 'Veneno',
      type: 'weapon',
      imageUrl: images.venenoArma,
      interactions: [
        {
          condition: 'default',
          storyText: 'Relatório Toxicológico: O sangue da vítima foi testado para arsênico, cianeto, digitálicos e opióides.\nResultados NEGATIVOS. Não há traços de intoxicação.',
          gameInstruction: ''
        }
      ]
    }
  },
  // A3 - Revólver Calibre .38
  {
    id: '8',
    attributes: {
      code: 'A3',
      name: 'Revólver Calibre .38',
      type: 'weapon',
      imageUrl: images.revolverArma,
      interactions: [
        {
          condition: 'default',
          storyText: 'Relatório de Balística: O corpo não apresenta orifícios de entrada ou saída de projéteis.\nNão há resíduos de pólvora nas mãos ou roupas da vítima.',
          gameInstruction: ''
        }
      ]
    }
  },
  // L1 - Cemitério Antigo
  {
    id: '9',
    attributes: {
      code: 'L1',
      name: 'Cemitério Antigo',
      type: 'location',
      imageUrl: images.cemiterioLocal,
      interactions: [
        {
          condition: 'default',
          storyText: 'A equipe forense varreu a área. O sinal de GPS do celular da vítima termina aqui.\nRecuperamos um áudio da nuvem enviado minutos antes da morte:\n"Ricardo, pare de insistir. A galeria é minha. Me encontre no túmulo da minha mãe se quiser suas coisas de volta, senão vou queimar tudo."',
          gameInstruction: '',
          flagToUnlock: 'pista_l1_desbloqueada'
        }
      ]
    }
  },
  // L2 - Mansão da Vítima
  {
    id: '10',
    attributes: {
      code: 'L2',
      name: 'Mansão da Vítima',
      type: 'location',
      imageUrl: images.casaLocal,
      interactions: [
        {
          condition: 'default',
          storyText: 'A mansão está intacta. Sem sinais de arrombamento ou luta.\nO chá servido às 16:30 ainda está na xícara, frio. A vítima saiu daqui viva.',
          gameInstruction: ''
        }
      ]
    }
  },
  // L3 - Parque da Cidade
  {
    id: '11',
    attributes: {
      code: 'L3',
      name: 'Parque da Cidade',
      type: 'location',
      imageUrl: images.parqueLocal,
      interactions: [
        {
          condition: 'default',
          storyText: 'O parque é mal iluminado. Encontramos a bolsa da vítima num banco, mas sem sangue ou sinais de luta ao redor.\nO assassino apenas usou este local para se livrar de pertences pessoais da vítima.',
          gameInstruction: ''
        }
      ]
    }
  }
];
