export type UnitCategory =
  | 'length'
  | 'weight'
  | 'volume'
  | 'area'
  | 'time'
  | 'temperature'
  | 'speed'
  | 'data_storage'
  | 'energy'
  | 'pressure';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
  description?: string;
  // Custom metadata for automatic text formulation
  multiplierText?: string;
  baseRelationExplanation?: string;
}

export interface CategoryDefinition {
  id: UnitCategory;
  name: string;
  icon: string; // Lucide icon identifier
  baseUnit: string; // Symbol or ID of base unit
  units: Unit[];
  whyItWorksGeneral: string; // Explains the general theory (e.g. Metric system, Imperial conversion, absolute temperature offsets)
}

export interface ConversionResult {
  inputValue: number;
  fromUnit: Unit;
  toUnit: Unit;
  convertedValue: number;
  category: UnitCategory;
  formula: string;
  steps: string[];
}
