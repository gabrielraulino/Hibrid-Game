import { useState } from 'react';
import { Card } from '../types';

interface FinalGuessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (guess: { suspect: string; weapon: string; location: string }) => void;
  suspects: Card[];
  weapons: Card[];
  locations: Card[];
}

export const FinalGuessDialog = ({
  isOpen,
  onClose,
  onSubmit,
  suspects,
  weapons,
  locations,
}: FinalGuessDialogProps) => {
  const [selectedSuspect, setSelectedSuspect] = useState<string>('');
  const [selectedWeapon, setSelectedWeapon] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSuspect && selectedWeapon && selectedLocation) {
      onSubmit({
        suspect: selectedSuspect,
        weapon: selectedWeapon,
        location: selectedLocation,
      });
      // Reset seleções
      setSelectedSuspect('');
      setSelectedWeapon('');
      setSelectedLocation('');
    }
  };

  const handleClose = () => {
    setSelectedSuspect('');
    setSelectedWeapon('');
    setSelectedLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-noir-darker border-2 border-gold rounded-lg p-8 max-w-2xl w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-serif text-gold uppercase tracking-wide">
            Palpite Final
          </h2>
          <button
            onClick={handleClose}
            className="text-gold/60 hover:text-gold transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <p className="text-gold/80 mb-6 text-lg">
          Detetive, é hora de apresentar sua conclusão. Selecione o <strong>Suspeito</strong>, a <strong>Arma</strong> e o <strong>Local</strong> do crime.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Suspeito */}
          <div>
            <label className="block text-gold/90 font-semibold mb-3 uppercase tracking-wide">
              Suspeito
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {suspects.map((suspect) => (
                <button
                  key={suspect.id}
                  type="button"
                  onClick={() => setSelectedSuspect(suspect.attributes.code)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                    selectedSuspect === suspect.attributes.code
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-noir-dark/60 border-gold/30 text-gold/70 hover:border-gold/50'
                  }`}
                >
                  <div className="font-bold">{suspect.attributes.code}</div>
                  <div className="text-sm">{suspect.attributes.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Arma */}
          <div>
            <label className="block text-gold/90 font-semibold mb-3 uppercase tracking-wide">
              Arma
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {weapons.map((weapon) => (
                <button
                  key={weapon.id}
                  type="button"
                  onClick={() => setSelectedWeapon(weapon.attributes.code)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                    selectedWeapon === weapon.attributes.code
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-noir-dark/60 border-gold/30 text-gold/70 hover:border-gold/50'
                  }`}
                >
                  <div className="font-bold">{weapon.attributes.code}</div>
                  <div className="text-sm">{weapon.attributes.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Local */}
          <div>
            <label className="block text-gold/90 font-semibold mb-3 uppercase tracking-wide">
              Local
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {locations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setSelectedLocation(location.attributes.code)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                    selectedLocation === location.attributes.code
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-noir-dark/60 border-gold/30 text-gold/70 hover:border-gold/50'
                  }`}
                >
                  <div className="font-bold">{location.attributes.code}</div>
                  <div className="text-sm">{location.attributes.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 justify-end pt-4 border-t border-gold/30">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border-2 border-gold/50 rounded-lg text-gold/70 hover:bg-gold/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedSuspect || !selectedWeapon || !selectedLocation}
              className="px-6 py-2 bg-gold/20 border-2 border-gold rounded-lg text-gold hover:bg-gold/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-semibold"
            >
              Apresentar Palpite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
