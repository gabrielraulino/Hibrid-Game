import { useState, useCallback } from 'react';
import { GameState, InvestigationResponse } from '../types';
import { mockCards } from '../mockData/invejaFatal';

const initialGameState: GameState = {
  unlockedFlags: [],
  eliminatedCards: [],
  currentLocation: undefined,
  gameEnded: false,
  gameWon: false,
};

// Resposta correta do caso
const CORRECT_GUESS = {
  suspect: 'P2', // Ricardo
  weapon: 'A1', // Faca de Caça
  location: 'L1', // Cemitério Antigo
};

export const useInvestigation = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [response, setResponse] = useState<InvestigationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setCurrentLocation = useCallback((locationCode: string | undefined) => {
    setGameState(prev => ({ ...prev, currentLocation: locationCode }));
  }, []);

  const investigateCode = useCallback(async (inputCode: string) => {
    if (!inputCode.trim()) {
      setResponse({ error: 'Por favor, digite um código válido.' });
      return;
    }

    setIsLoading(true);

    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      // Busca a carta pelo código (simulando fetch do Strapi)
      const card = mockCards.find(c => 
        c.attributes.code.toUpperCase() === inputCode.trim().toUpperCase()
      );

      if (!card) {
        setResponse({ error: `Código "${inputCode}" não encontrado. Verifique e tente novamente.` });
        setIsLoading(false);
        return;
      }

      // Verifica se a carta já foi eliminada
      if (gameState.eliminatedCards.includes(card.id)) {
        setResponse({ 
          error: `A carta ${card.attributes.code} já foi eliminada do jogo.` 
        });
        setIsLoading(false);
        return;
      }

      // Processa as interações baseado nas flags atuais
      let selectedInteraction: typeof card.attributes.interactions[0] | null = null;
      let defaultInteraction: typeof card.attributes.interactions[0] | null = null;

      // Primeiro, separa as interações por tipo e encontra a melhor match
      for (const interaction of card.attributes.interactions) {
        if (interaction.condition === 'requires_flag' && interaction.requiredFlag) {
          // Se a flag está desbloqueada, esta é a interação que queremos
          if (gameState.unlockedFlags.includes(interaction.requiredFlag)) {
            selectedInteraction = interaction;
            break; // Prioridade máxima: para na primeira que encontrar
          }
        } else if (interaction.condition === 'requires_location' && interaction.requiredLocation) {
          // Se o local atual corresponde ao requerido
          if (gameState.currentLocation === interaction.requiredLocation) {
            selectedInteraction = interaction;
            break;
          }
        } else if (interaction.condition === 'default') {
          // Guarda a primeira interação default como fallback
          if (!defaultInteraction) {
            defaultInteraction = interaction;
          }
        }
      }

      // Se não encontrou uma interação com flag desbloqueada, usa a default
      if (!selectedInteraction) {
        selectedInteraction = defaultInteraction || card.attributes.interactions[0];
      }

      // Atualiza o gameState se necessário
      const newFlags: string[] = [...gameState.unlockedFlags];
      const newEliminatedCards: string[] = [...gameState.eliminatedCards];

      // Adiciona nova flag se a interação desbloqueia uma
      if (selectedInteraction.flagToUnlock) {
        if (!newFlags.includes(selectedInteraction.flagToUnlock)) {
          newFlags.push(selectedInteraction.flagToUnlock);
        }
      }

      // Processa instruções de eliminação
      if (selectedInteraction.gameInstruction.toUpperCase().includes('ELIMINE')) {
        if (!newEliminatedCards.includes(card.id)) {
          newEliminatedCards.push(card.id);
        }
      }

      // Atualiza o estado (preserva o local atual)
      setGameState({
        ...gameState,
        unlockedFlags: newFlags,
        eliminatedCards: newEliminatedCards,
      });

      // Retorna a resposta
      setResponse({
        card,
        interaction: selectedInteraction,
      });

    } catch (error) {
      setResponse({ error: 'Erro ao processar investigação. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  }, [gameState]);

  const toggleDiscardCard = useCallback((cardId: string) => {
    setGameState(prev => {
      const isDiscarded = prev.eliminatedCards.includes(cardId);
      return {
        ...prev,
        eliminatedCards: isDiscarded
          ? prev.eliminatedCards.filter(id => id !== cardId)
          : [...prev.eliminatedCards, cardId],
      };
    });
  }, []);

  const submitFinalGuess = useCallback((guess: { suspect: string; weapon: string; location: string }) => {
    const isCorrect = 
      guess.suspect === CORRECT_GUESS.suspect &&
      guess.weapon === CORRECT_GUESS.weapon &&
      guess.location === CORRECT_GUESS.location;

    setGameState(prev => ({
      ...prev,
      finalGuess: guess,
      gameEnded: true,
      gameWon: isCorrect,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    setResponse(null);
  }, []);

  return {
    gameState,
    response,
    isLoading,
    investigateCode,
    setCurrentLocation,
    toggleDiscardCard,
    submitFinalGuess,
    resetGame,
  };
};
