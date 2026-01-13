import { InvestigationResponse } from '../types';

interface CardResponseProps {
  response: InvestigationResponse | null;
  isLoading?: boolean;
}

export const CardResponse = ({ response, isLoading }: CardResponseProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-pulse text-gold/60 text-xl">
          Investigando...
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-gold/40 text-center">
          <p className="text-lg mb-2">🔍</p>
          <p>Digite um código para começar a investigação</p>
        </div>
      </div>
    );
  }

  if (response.error) {
    return (
      <div className="p-6 bg-red-900/20 border-2 border-red-600 rounded-lg">
        <p className="text-red-400 text-lg font-semibold mb-2">⚠️ Erro</p>
        <p className="text-red-300">{response.error}</p>
      </div>
    );
  }

  if (!response.card || !response.interaction) {
    return null;
  }

  const { card, interaction } = response;
  const isEliminate = interaction.gameInstruction.toUpperCase().includes('ELIMINE');
  const instructionColor = isEliminate 
    ? 'text-red-400 border-red-500 bg-red-900/20' 
    : 'text-green-400 border-green-500 bg-green-900/20';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Carta */}
      <div className="flex justify-center">
        <div className="relative border-2 border-gold rounded-lg overflow-hidden shadow-2xl">
          <img
            src={card.attributes.imageUrl}
            alt={card.attributes.name}
            className="w-full max-w-sm h-auto"
            onError={(e) => {
              // Fallback se a imagem falhar
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute top-2 right-2 bg-noir-darker/90 px-3 py-1 rounded border border-gold">
            <span className="text-gold font-bold text-lg">{card.attributes.code}</span>
          </div>
        </div>
      </div>

      {/* Nome da Carta */}
      <div className="text-center">
        <h2 className="text-3xl font-serif text-gold mb-2">{card.attributes.name}</h2>
        <span className="inline-block px-4 py-1 bg-gold/20 border border-gold/50 rounded text-gold/80 text-sm uppercase tracking-wide">
          {card.attributes.code === 'P1' && 'Vítima'}
          {card.attributes.code !== 'P1' && card.attributes.type === 'suspect' && 'Suspeito'}
          {card.attributes.type === 'weapon' && 'Arma'}
          {card.attributes.type === 'location' && 'Local'}
        </span>
      </div>

      {/* Texto da História */}
      <div className="bg-noir-darker/60 border border-gold/30 rounded-lg p-6">
        <div 
          className="text-gold/90 text-lg leading-relaxed prose prose-invert prose-headings:text-gold prose-strong:text-gold-light"
          dangerouslySetInnerHTML={{ 
            __html: interaction.storyText
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n/g, '<br />')
          }}
        />
      </div>

      {/* Instrução do Jogo */}
      <div className={`border-2 rounded-lg p-4 ${instructionColor}`}>
        <div className="flex items-center justify-center gap-3">
          {isEliminate ? (
            <>
              <span className="text-2xl">🗑️</span>
              <p className="text-xl font-bold uppercase tracking-wide text-center">
                {interaction.gameInstruction}
              </p>
            </>
          ) : (
            <>
              <span className="text-2xl">✓</span>
              <p className="text-xl font-bold uppercase tracking-wide text-center">
                {interaction.gameInstruction}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
