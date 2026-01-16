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

      // Lógica específica para suspeitos: requer local selecionado
      if (card.attributes.type === 'suspect' && card.attributes.code !== 'P1') {
        if (!gameState.currentLocation) {
          setResponse({ 
            error: 'Selecione um local primeiro antes de interrogar suspeitos. Use o seletor de local acima.' 
          });
          setIsLoading(false);
          return;
        }
      }

      // Processa as interações baseado nas flags atuais e local
      let selectedInteraction: typeof card.attributes.interactions[0] | null = null;
      let defaultInteraction: typeof card.attributes.interactions[0] | null = null;
      let contextualInteraction: typeof card.attributes.interactions[0] | null = null;

      // Primeiro, separa as interações por tipo e encontra a melhor match
      for (const interaction of card.attributes.interactions) {
        // Prioridade 1: Interação contextual (local + suspeito) - pode ter flag também
        if (interaction.condition === 'requires_location_and_suspect' && interaction.requiredLocation) {
          if (gameState.currentLocation === interaction.requiredLocation && card.attributes.type === 'suspect') {
            // Se tem flag requerida, verifica se está desbloqueada (prioridade máxima)
            if (interaction.requiredFlag) {
              if (gameState.unlockedFlags.includes(interaction.requiredFlag)) {
                contextualInteraction = interaction;
                break; // Prioridade máxima: interação contextual com flag desbloqueada
              }
            } else {
              // Interação contextual sem flag requerida (guarda como fallback)
              if (!contextualInteraction) {
                contextualInteraction = interaction;
              }
            }
          }
        }
        // Prioridade 2: Interação com flag desbloqueada (não contextual)
        else if (interaction.condition === 'requires_flag' && interaction.requiredFlag) {
          if (gameState.unlockedFlags.includes(interaction.requiredFlag)) {
            if (!selectedInteraction) {
              selectedInteraction = interaction;
            }
          }
        }
        // Prioridade 3: Interação que requer local específico (para locais)
        else if (interaction.condition === 'requires_location' && interaction.requiredLocation) {
          if (gameState.currentLocation === interaction.requiredLocation) {
            if (!selectedInteraction) {
              selectedInteraction = interaction;
            }
          }
        }
        // Prioridade 4: Interação default
        else if (interaction.condition === 'default') {
          if (!defaultInteraction) {
            defaultInteraction = interaction;
          }
        }
      }

      // Seleciona a interação: contextual > flag > location > default
      if (contextualInteraction) {
        selectedInteraction = contextualInteraction;
      } else if (!selectedInteraction) {
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
