import { useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const handleStart = () => {
    onComplete();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(5, 5, 5, 0.95)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="max-w-3xl mx-auto px-8 text-center relative w-full">
        <h1 
          className="text-4xl md:text-5xl font-serif mb-8 tracking-wide"
          style={{ color: '#d4af37' }}
        >
          Caso 001: Inveja Fatal
        </h1>
        
        <div 
          className="text-lg md:text-xl leading-relaxed space-y-4 mb-8"
          style={{ color: 'rgba(212, 175, 55, 0.9)' }}
        >
          <p>
            Detetive, o corpo de <strong>Ana Lúcia (P1)</strong>, 26 anos, foi encontrado esta manhã no <strong>Cemitério Antigo (L1)</strong>.
          </p>
          <p>
            A cena foi alterada, mas as evidências falam. Temos 3 armas, 3 locais e 5 pessoas de interesse.
          </p>
          <p>
            Separe suas cartas. O laboratório forense e o banco de dados estão online. Digite o ID de qualquer carta para começar a análise.
          </p>
          <p>
            Traga justiça para ela.
          </p>
        </div>

        {/* Botão de começar */}
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="px-8 py-3 border-2 rounded-lg transition-colors font-semibold text-lg"
            style={{
              borderColor: '#d4af37',
              color: '#d4af37',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            }}
          >
            Começar Investigação
          </button>
        </div>
      </div>
    </div>
  );
};
