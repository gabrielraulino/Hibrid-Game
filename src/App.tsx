import { useState, useEffect } from 'react';
import { useInvestigation } from './hooks/useInvestigation';
import { TerminalInput } from './components/TerminalInput';
import { CardResponse } from './components/CardResponse';
import { DebugPanel } from './components/DebugPanel';
import { IntroScreen } from './components/IntroScreen';
import { LocationSelector } from './components/LocationSelector';
import { FinalGuessDialog } from './components/FinalGuessDialog';
import { DiscardCardsPanel } from './components/DiscardCardsPanel';
import { GameResult } from './components/GameResult';
import { images } from './assets/images';
import { mockCards } from './mockData/invejaFatal';

function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [showFinalGuess, setShowFinalGuess] = useState(false);
  const [showGameResult, setShowGameResult] = useState(false);
  const { 
    gameState, 
    response, 
    isLoading, 
    investigateCode, 
    setCurrentLocation,
    toggleDiscardCard,
    submitFinalGuess,
    resetGame 
  } = useInvestigation();

  // Atualiza showGameResult quando o jogo termina
  useEffect(() => {
    if (introCompleted && gameState.gameEnded && !showGameResult) {
      setShowGameResult(true);
    }
  }, [introCompleted, gameState.gameEnded, showGameResult]);

  if (!introCompleted) {
    return <IntroScreen onComplete={() => setIntroCompleted(true)} />;
  }

  const handleReset = () => {
    resetGame();
    setShowGameResult(false);
    setShowFinalGuess(false);
    setIntroCompleted(false);
  };

  const handleFinalGuessSubmit = (guess: { suspect: string; weapon: string; location: string }) => {
    submitFinalGuess(guess);
    setShowFinalGuess(false);
  };

  const locations = mockCards.filter(c => c.attributes.type === 'location');
  const suspects = mockCards.filter(c => c.attributes.type === 'suspect' && c.attributes.code !== 'P1'); // Exclui vítima
  const weapons = mockCards.filter(c => c.attributes.type === 'weapon');

  return (
    <div className="min-h-screen bg-gradient-to-b from-noir-dark via-noir-darker to-noir-dark relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${images.backgroundImg})`,
        }}
      ></div>
      
      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)',
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block border-2 border-gold rounded-lg px-8 py-4 bg-noir-darker/80 backdrop-blur-sm">
            <h1 className="text-5xl font-serif text-gold mb-2 tracking-wide">
              INVESTIGATOR
            </h1>
            <p className="text-gold/60 text-sm uppercase tracking-widest">
              Caso 001: Inveja Fatal
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <div className="bg-noir-darker/60 border-2 border-gold rounded-lg p-8 shadow-2xl backdrop-blur-sm">
            {/* Discard Cards Panel */}
            {!gameState.gameEnded && (
              <DiscardCardsPanel
                cards={mockCards}
                eliminatedCards={gameState.eliminatedCards}
                onToggleDiscard={toggleDiscardCard}
              />
            )}

            {/* Location Selector */}
            {!gameState.gameEnded && (
              <LocationSelector
                locations={locations}
                currentLocation={gameState.currentLocation}
                onLocationChange={setCurrentLocation}
              />
            )}

            {/* Terminal Input Section */}
            {!gameState.gameEnded && (
              <div className="mb-8">
                <TerminalInput 
                  onCodeSubmit={investigateCode}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Botão de Palpite Final */}
            {!gameState.gameEnded && (
              <div className="mb-8 text-center">
                <button
                  onClick={() => setShowFinalGuess(true)}
                  className="px-8 py-3 bg-gold/20 border-2 border-gold rounded-lg text-gold hover:bg-gold/30 transition-colors font-semibold text-lg uppercase tracking-wide"
                >
                  🎯 Apresentar Palpite Final
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gold/30 my-8"></div>

            {/* Response Section */}
            <div className="min-h-[400px]">
              <CardResponse 
                response={response}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-gold/40 text-sm">
          <p>Digite os códigos das cartas para investigar o caso</p>
        </footer>
      </div>

      {/* Debug Panel (apenas em dev) */}
      {import.meta.env.DEV && (
        <DebugPanel gameState={gameState} onReset={handleReset} />
      )}

      {/* Final Guess Dialog */}
      <FinalGuessDialog
        isOpen={showFinalGuess}
        onClose={() => setShowFinalGuess(false)}
        onSubmit={handleFinalGuessSubmit}
        suspects={suspects}
        weapons={weapons}
        locations={locations}
      />

      {/* Game Result */}
      {showGameResult && (
        <GameResult
          gameState={gameState}
          onReset={handleReset}
          onClose={() => setShowGameResult(false)}
        />
      )}
    </div>
  );
}

export default App;
