import { useState } from 'react';
import { Search } from 'lucide-react';
import type { SeatingAssignment } from './guestList';
import seatingChart from './guestList';





interface SearchResult extends SeatingAssignment {
  name: string;
}

type Result = SearchResult | null;

export default function WeddingSeating() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Result>(null);

  // Sample seating assignments - replace with your actual guest list

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setSelectedSuggestion(null);
    
    if (value.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    
    // Find matching names
    const matches = Object.keys(seatingChart).filter(
      name => name.toLowerCase().includes(value.trim().toLowerCase())
    );
    
    setSuggestions(matches);
  };

  const selectGuest = (name: string) => {
    setSearch(name);
    setSuggestions([]);
    setSelectedSuggestion({ name, ...seatingChart[name] });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-neutral-800 mb-2">Take A Seat</h1>
          <p className="text-neutral-500 text-sm">Find your table assignment</p>
        </div>

        <div className="mb-8 relative">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-4 pr-12 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent text-neutral-800 placeholder-neutral-400"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-400">
              <Search size={20} />
            </div>
          </div>
          
          {suggestions.length > 0 && (
            <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-10 max-h-60 overflow-y-auto">
              {suggestions.map((name) => (
                <button
                  key={name}
                  onClick={() => selectGuest(name)}
                  className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors text-neutral-700 border-b border-neutral-100 last:border-b-0"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedSuggestion && (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200 text-center">
            <p className="text-neutral-600 mb-6">{selectedSuggestion.name}</p>
            <div className="text-5xl font-light text-neutral-800">
            {selectedSuggestion.table}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}