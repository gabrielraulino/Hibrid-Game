import { Card } from '../types';

interface LocationSelectorProps {
  locations: Card[];
  currentLocation?: string;
  onLocationChange: (locationCode: string | undefined) => void;
}

export const LocationSelector = ({ 
  locations, 
  currentLocation, 
  onLocationChange 
}: LocationSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-gold/80 text-sm font-semibold mb-3 uppercase tracking-wide">
        Local Atual:
      </label>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onLocationChange(undefined)}
          className={`px-4 py-2 rounded-lg border-2 transition-all ${
            !currentLocation
              ? 'bg-gold/20 border-gold text-gold'
              : 'bg-noir-darker/60 border-gold/30 text-gold/60 hover:border-gold/50'
          }`}
        >
          Nenhum
        </button>
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => onLocationChange(location.attributes.code)}
            disabled={location.attributes.type !== 'location'}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              currentLocation === location.attributes.code
                ? 'bg-gold/20 border-gold text-gold'
                : 'bg-noir-darker/60 border-gold/30 text-gold/60 hover:border-gold/50'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {location.attributes.code} - {location.attributes.name}
          </button>
        ))}
      </div>
    </div>
  );
};
