import { GameState } from '../types';

interface DebugPanelProps {
  gameState: GameState;
  onReset?: () => void;
}

export const DebugPanel = ({ gameState, onReset }: DebugPanelProps) => {
  return (
    <div className="fixed bottom-4 right-4 bg-noir-darker/95 border-2 border-gold/50 rounded-lg p-4 max-w-sm shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gold font-bold text-sm uppercase tracking-wide">🔧 Debug Panel</h3>
        {onReset && (
          <button
            onClick={onReset}
            className="px-3 py-1 text-xs bg-red-900/50 border border-red-600 rounded hover:bg-red-900/70 transition-colors text-red-200"
          >
            Reset
          </button>
        )}
      </div>
      
      <div className="space-y-3 text-xs">
        {/* Flags Desbloqueadas */}
        <div>
          <p className="text-gold/80 font-semibold mb-1">Flags Ativas:</p>
          {gameState.unlockedFlags.length === 0 ? (
            <p className="text-gold/50 italic">Nenhuma flag desbloqueada</p>
          ) : (
            <ul className="space-y-1">
              {gameState.unlockedFlags.map((flag) => (
                <li key={flag} className="text-green-400 font-mono pl-2 border-l-2 border-green-500">
                  ✓ {flag}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Local Atual */}
        <div>
          <p className="text-gold/80 font-semibold mb-1">Local Atual:</p>
          {gameState.currentLocation ? (
            <p className="text-blue-400 font-mono pl-2 border-l-2 border-blue-500">
              📍 {gameState.currentLocation}
            </p>
          ) : (
            <p className="text-gold/50 italic">Nenhum local selecionado</p>
          )}
        </div>

        {/* Cartas Eliminadas */}
        <div>
          <p className="text-gold/80 font-semibold mb-1">Cartas Eliminadas:</p>
          {gameState.eliminatedCards.length === 0 ? (
            <p className="text-gold/50 italic">Nenhuma carta eliminada</p>
          ) : (
            <ul className="space-y-1">
              {gameState.eliminatedCards.map((cardId) => (
                <li key={cardId} className="text-red-400 font-mono pl-2 border-l-2 border-red-500">
                  ✗ {cardId}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
