import { GameState } from '../types';

interface GameResultProps {
  gameState: GameState;
  onReset: () => void;
  onClose: () => void;
}

export const GameResult = ({ gameState, onReset, onClose }: GameResultProps) => {
  if (!gameState.gameEnded) return null;

  const isVictory = gameState.gameWon;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-noir-darker border-2 border-gold rounded-lg p-8 max-w-2xl w-full shadow-2xl">
        <div className="text-center">
          <div className="mb-6">
            {isVictory ? (
              <>
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-4xl font-serif text-gold mb-2 uppercase tracking-wide">
                  CASO ENCERRADO
                </h2>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-4xl font-serif text-red-400 mb-2 uppercase tracking-wide">
                  ARQUIVO MORTO
                </h2>
              </>
            )}
          </div>

          <div className="bg-noir-dark/60 border border-gold/30 rounded-lg p-6 mb-6">
            {isVictory ? (
              <p className="text-gold/90 text-lg leading-relaxed">
                Brilhante, Detetive. Com a confissão de Ricardo e a faca apreendida, o promotor tem tudo o que precisa.
                <br />
                <br />
                A inveja destruiu duas vidas hoje, mas a justiça prevaleceu graças a você.
              </p>
            ) : (
              <p className="text-red-300/90 text-lg leading-relaxed">
                Sua dedução tem falhas. O advogado de defesa destruiu seus argumentos no tribunal.
                <br />
                <br />
                O verdadeiro assassino continua solto e o caso esfriou. Tente revisar as evidências.
              </p>
            )}
          </div>

          {isVictory && (
            <div className="mb-6">
              <div className="text-gold text-2xl">⭐⭐⭐</div>
            </div>
          )}

          {gameState.finalGuess && (
            <div className="bg-noir-dark/40 border border-gold/20 rounded-lg p-4 mb-6 text-left">
              <p className="text-gold/70 text-sm mb-2 uppercase tracking-wide">Seu Palpite:</p>
              <div className="space-y-1 text-gold/80">
                <p><strong>Suspeito:</strong> {gameState.finalGuess.suspect}</p>
                <p><strong>Arma:</strong> {gameState.finalGuess.weapon}</p>
                <p><strong>Local:</strong> {gameState.finalGuess.location}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-gold/50 rounded-lg text-gold/70 hover:bg-gold/10 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={onReset}
              className="px-6 py-2 bg-gold/20 border-2 border-gold rounded-lg text-gold hover:bg-gold/30 transition-colors font-semibold"
            >
              Reiniciar Jogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
