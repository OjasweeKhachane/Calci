import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { Unit } from '../types';

interface SearchableSelectProps {
  id: string;
  label: string;
  units: Unit[];
  selectedUnit: Unit;
  onChange: (unit: Unit) => void;
  excludeUnitId?: string;
}

export default function SearchableSelect({
  id,
  label,
  units,
  selectedUnit,
  onChange,
  excludeUnitId
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter units according to search term
  const filteredUnits = units.filter(
    (unit) =>
      unit.name.toLowerCase().includes(search.toLowerCase()) ||
      unit.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear query on close or open
  useEffect(() => {
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  const selectOption = (unit: Unit) => {
    onChange(unit);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full text-left" ref={dropdownRef} id={`container-${id}`}>
      <label className="block text-xs font-semibold tracking-wider uppercase mb-1.5 text-slate-500 dark:text-slate-400">
        {label}
      </label>

      {/* Dropdown Button */}
      <button
        id={id}
        type="button"
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-800/80 border ${
          isOpen
            ? 'border-slate-900 ring-2 ring-slate-900/10'
            : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
        } rounded-xl shadow-xs cursor-pointer transition-all duration-200 text-slate-900 dark:text-slate-100 outline-hidden`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-baseline gap-2 overflow-hidden">
          <span className="font-semibold text-slate-900 dark:text-slate-50 whitespace-nowrap">
            {selectedUnit.name}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-500 dark:text-slate-300">
            {selectedUnit.symbol}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-900' : ''
          }`}
        />
      </button>

      {/* Floating Panel */}
      {isOpen && (
        <div className="absolute z-40 w-full mt-2 bg-white dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/70 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Box */}
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 ml-1.5" />
            <input
              id={`${id}-search`}
              type="text"
              className="w-full text-sm py-1.5 px-1 bg-transparent border-0 outline-hidden focus:ring-0 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              placeholder="Search by name or abbreviation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* List options */}
          <ul
            className="max-h-60 overflow-y-auto py-1 scrollbar-thin divide-y divide-slate-50 dark:divide-slate-800/30"
            role="listbox"
          >
            {filteredUnits.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                No units found for "{search}"
              </li>
            ) : (
              filteredUnits.map((unit) => {
                const isSelected = unit.id === selectedUnit.id;
                const isExcluded = unit.id === excludeUnitId;

                return (
                  <li key={unit.id} role="option" aria-selected={isSelected}>
                    <button
                      id={`opt-${id}-${unit.id}`}
                      type="button"
                      className={`w-full flex items-center justify-between gap-3 text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                          : isExcluded
                          ? 'bg-slate-50/50 dark:bg-slate-800/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                      onClick={() => selectOption(unit)}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{unit.name}</span>
                          <span className="font-mono text-xs px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                            {unit.symbol}
                          </span>
                        </div>
                        {unit.description && (
                          <span className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                            {unit.description}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 shrink-0 text-slate-900 dark:text-white" />
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
