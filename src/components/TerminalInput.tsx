import { useEffect, useRef, useState } from 'react';

interface TerminalInputProps {
  onCodeSubmit: (code: string) => void;
  isLoading?: boolean;
}

export const TerminalInput = ({ onCodeSubmit, isLoading = false }: TerminalInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus no mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onCodeSubmit(inputValue.trim());
      setInputValue('');
      // Re-focus após submit
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 rounded-lg blur-sm"></div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Digite o código da carta (Ex: P1, A2, L1)..."
          className="relative w-full px-6 py-4 text-2xl font-mono bg-noir-darker/90 border-2 border-gold rounded-lg text-gold placeholder-gold/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          autoFocus
        />
      </div>
      <p className="mt-2 text-sm text-gold/60 text-center">
        Pressione <kbd className="px-2 py-1 bg-noir-darker border border-gold/50 rounded text-xs">Enter</kbd> para investigar
      </p>
    </form>
  );
};
