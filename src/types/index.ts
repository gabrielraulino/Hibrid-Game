export type GameState = {
  unlockedFlags: string[]; // Ex: ['evidencia_l1_desbloqueada']
  eliminatedCards: string[]; // IDs das cartas já descartadas
  currentLocation?: string; // Código do local atual (ex: 'L1')
  finalGuess?: {
    suspect: string;
    weapon: string;
    location: string;
  };
  gameEnded?: boolean;
  gameWon?: boolean;
};

export type Interaction = {
  condition: 'default' | 'requires_flag' | 'requires_location' | 'requires_location_and_suspect';
  requiredFlag?: string; // Flag necessária para ver este texto
  requiredLocation?: string; // Local necessário (ex: 'L1') - usado para interrogações contextuais
  flagToUnlock?: string; // Flag que este texto desbloqueia no GameState
  storyText: string; // O texto narrativo (Markdown/HTML)
  gameInstruction: string; // Ex: "ELIMINE A CARTA A2"
};

export type Card = {
  id: string; // Strapi ID
  attributes: {
    code: string; // Ex: "P1", "A2" (Chave de busca)
    name: string;
    type: 'suspect' | 'weapon' | 'location';
    imageUrl: string;
    interactions: Interaction[]; // Component repetível no Strapi
  }
};

export type InvestigationResponse = {
  card?: Card; // Carta principal sendo investigada
  interaction?: Interaction;
  error?: string;
};
