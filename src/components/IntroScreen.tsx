import { useState, useEffect } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

const introFrames = [
  {
    title: 'Caso 001: Inveja Fatal',
    text: 'Detetive, o corpo de Ana Lúcia, 26 anos, foi encontrado esta manhã no Cemitério Antigo.'
  },
  {
    title: '',
    text: 'A cena foi alterada, mas as evidências falam. Temos 3 armas, 3 locais e 5 pessoas de interesse.'
  },
  {
    title: '',
    text: 'Separe suas cartas. O laboratório forense e o banco de dados estão online.'
  },
  {
    title: '',
    text: 'Traga justiça para ela.'
  }
];

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentFrame < introFrames.length - 1) {
        setCurrentFrame(currentFrame + 1);
      } else {
        // Último frame, aguarda mais tempo antes de fechar
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onComplete(), 500); // Delay para animação
        }, 2000);
      }
    }, currentFrame === 0 ? 3000 : 2500); // Primeiro frame mais longo

    return () => clearTimeout(timer);
  }, [currentFrame, onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => onComplete(), 100);
  };

  const handleNext = () => {
    if (currentFrame < introFrames.length - 1) {
      setCurrentFrame(currentFrame + 1);
    } else {
      handleSkip();
    }
  };

  if (!isVisible) return null;

  const frame = introFrames[currentFrame];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(5, 5, 5, 0.95)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="max-w-3xl mx-auto px-8 text-center relative w-full">
        {frame.title && (
          <h1 
            className="text-4xl md:text-5xl font-serif mb-8 tracking-wide"
            style={{ color: '#d4af37' }}
          >
            {frame.title}
          </h1>
        )}
        <p 
          className="text-xl md:text-2xl leading-relaxed"
          style={{ color: 'rgba(212, 175, 55, 0.9)' }}
        >
          {frame.text}
        </p>
        
        {/* Indicadores de progresso */}
        <div className="mt-8 flex justify-center mb-6">
          <div className="flex gap-2">
            {introFrames.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentFrame
                    ? 'w-8'
                    : 'w-2'
                }`}
                style={{
                  backgroundColor: index === currentFrame 
                    ? '#d4af37' 
                    : 'rgba(212, 175, 55, 0.3)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Botões de controle */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleNext}
            className="px-6 py-2 border-2 rounded-lg transition-colors"
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
            {currentFrame < introFrames.length - 1 ? 'Próximo' : 'Começar'}
          </button>
          <button
            onClick={handleSkip}
            className="px-6 py-2 border-2 rounded-lg transition-colors"
            style={{
              borderColor: 'rgba(212, 175, 55, 0.5)',
              color: 'rgba(212, 175, 55, 0.7)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Pular
          </button>
        </div>
      </div>
    </div>
  );
};
