import { Card } from '../types';

interface DiscardCardsPanelProps {
  cards: Card[];
  eliminatedCards: string[];
  onToggleDiscard: (cardId: string) => void;
}

export const DiscardCardsPanel = ({
  cards,
  eliminatedCards,
  onToggleDiscard,
}: DiscardCardsPanelProps) => {
  const discardedCards = cards.filter(c => eliminatedCards.includes(c.id));
  const availableCards = cards.filter(c => !eliminatedCards.includes(c.id) && c.attributes.code !== 'P1'); // P1 (vítima) não pode ser descartada

  if (availableCards.length === 0 && discardedCards.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-noir-darker/40 border border-gold/20 rounded-lg">
      <h3 className="text-gold/90 font-semibold mb-4 uppercase tracking-wide text-sm">
        Gerenciar Cartas
      </h3>
      
      {availableCards.length > 0 && (
        <div className="mb-4">
          <p className="text-gold/70 text-xs mb-2 uppercase">Cartas Disponíveis ({availableCards.length})</p>
          <div className="flex flex-wrap gap-2">
            {availableCards.map((card) => (
              <button
                key={card.id}
                onClick={() => onToggleDiscard(card.id)}
                className="px-3 py-1.5 text-xs rounded border border-gold/30 bg-noir-dark/60 text-gold/70 hover:bg-red-900/20 hover:border-red-500/50 hover:text-red-300 transition-all"
              >
                {card.attributes.code} - {card.attributes.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {discardedCards.length > 0 && (
        <div>
          <p className="text-red-400/70 text-xs mb-2 uppercase">Cartas Descartadas ({discardedCards.length})</p>
          <div className="flex flex-wrap gap-2">
            {discardedCards.map((card) => (
              <button
                key={card.id}
                onClick={() => onToggleDiscard(card.id)}
                className="px-3 py-1.5 text-xs rounded border border-red-500/50 bg-red-900/20 text-red-300 hover:bg-noir-dark/60 hover:border-gold/30 hover:text-gold/70 transition-all line-through"
              >
                {card.attributes.code} - {card.attributes.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-gold/50 text-xs mt-3 italic">
        Clique em uma carta para descartá-la ou restaurá-la
      </p>
    </div>
  );
};
