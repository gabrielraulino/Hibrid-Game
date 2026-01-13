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
          gameInstruction: 'MANTENHA ESTA CARTA COMO REFERÊNCIA'
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
        {
          condition: 'default',
          storyText: 'Ricardo está na sala de interrogatório 1. Ele chora e treme.\n"Ana era minha irmã de alma! Nós íamos abrir a galeria no mês que vem... O sonho dela era o meu sonho. Quem faria isso?"',
          gameInstruction: 'O DEPOIMENTO PARECE EMOCIONAL, MAS VAGO. ANALISE OS LOCAIS PARA CHECAR O ÁLIBI.'
        },
        {
          condition: 'requires_flag',
          requiredFlag: 'pista_l1_desbloqueada',
          storyText: 'Você toca o áudio recuperado no cemitério. A postura de Ricardo muda. O choro para. Ele te encara com frieza.\n"Assistente... Ela me chamou de assistente na frente dos investidores. A arte era minha. A visão era minha! Ela só tinha o cheque. Eu não ia deixar ela me apagar."',
          gameInstruction: 'CONFISSÃO OBTIDA. MOTIVO: INVEJA E VINGANÇA. ESTE É O ASSASSINO.'
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
        {
          condition: 'default',
          storyText: 'O Sr. Alfred é um homem de poucas palavras.\n"Servi o chá da tarde às 16:30. Às 17:00 ela atendeu um telefonema, gritou com alguém e saiu furiosa.\nTenho artrite severa, Detetive. Não saio da mansão há semanas. O sistema de alarme confirma: só ela saiu."',
          gameInstruction: 'ÁLIBI CONFIRMADO PELO ALARME. ELIMINE P3 (MORDOMO) E L2 (CASA).'
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
        {
          condition: 'default',
          storyText: 'Jonas foi detido com a bolsa da vítima.\n"Eu não matei ninguém! Achei a bolsa no banco do parque hoje cedo! Tava aberta e vazia.\nEu durmo no albergue do centro, as câmeras de trânsito mostram que eu só cheguei no parque quando o sol nasceu."',
          gameInstruction: 'CÂMERAS CONFIRMAM: JONAS ESTAVA LONGE NA HORA DA MORTE.\nA BOLSA FOI APENAS DESCARTADA LÁ. ELIMINE P4 (JONAS) E L3 (PARQUE).'
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
        {
          condition: 'default',
          storyText: 'Camila não esconde o desprezo.\n"Eu queria o cargo dela? Óbvio. Ela era incompetente. Mas eu não sou estúpida de sujar minhas mãos.\nEstava logada no servidor da empresa trabalhando até às 18:45. Verifique os logs de TI se duvida."',
          gameInstruction: 'LOGS VERIFICADOS. ÁLIBI DIGITAL SÓLIDO.\nELA NÃO TERIA TEMPO DE IR AO CEMITÉRIO. ELIMINE P5 (CAMILA).'
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
          gameInstruction: 'ESTA É A ARMA DO CRIME. MANTENHA A1 NA MESA.'
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
          gameInstruction: 'MORTE NÃO FOI POR ENVENENAMENTO. ELIMINE A2 (VENENO).'
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
          gameInstruction: 'NENHUM DISPARO FOI EFETUADO. ELIMINE A3 (REVÓLVER).'
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
          gameInstruction: 'PISTA CRUCIAL! A VÍTIMA ESTAVA AQUI PARA ENCONTRAR RICARDO (P2).\nCONFRONTE P2 NOVAMENTE COM ESSA INFORMAÇÃO.',
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
          gameInstruction: 'A CENA DO CRIME NÃO É AQUI. ELIMINE L2 (MANSÃO).'
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
          gameInstruction: 'LOCAL DE DESCARTE, NÃO DE MORTE. ELIMINE L3 (PARQUE).'
        }
      ]
    }
  }
];
