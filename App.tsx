import { useState, useEffect, useMemo, ComponentType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Ruler,
  Weight,
  Droplet,
  Square,
  Clock,
  Thermometer,
  Gauge,
  Database,
  Zap,
  Activity,
  ArrowRightLeft,
  Copy,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  RefreshCw,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';

import { CATEGORIES, performConversion, getCategoryById } from './data/units';
import { UnitCategory, Unit, ConversionResult } from './types';
import SearchableSelect from './components/SearchableSelect';
import ExplainPanel from './components/ExplainPanel';

// Icon Map resolver for Lucide
const ICON_MAP: Record<string, ComponentType<any>> = {
  Ruler: Ruler,
  Weight: Weight,
  Droplet: Droplet,
  Square: Square,
  Clock: Clock,
  Thermometer: Thermometer,
  Gauge: Gauge,
  Database: Database,
  Zap: Zap,
  Activity: Activity,
};

export default function App() {
  // 1. Theme Management (Forced to Pure Light/White Theme to match Web Ventures style)
  const theme = 'light';
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('calci-theme', 'light');
  }, []);

  // 2. Active Conversion State Catalog
  const [activeCategory, setActiveCategory] = useState<UnitCategory>('length');
  const [inputValueStr, setInputValueStr] = useState<string>('1');
  
  // Track units on a per-category mapping so switching categories preserves or selects suitable defaults
  const [categoryUnitMapping, setCategoryUnitMapping] = useState<Record<UnitCategory, { from: string; to: string }>>({
    length: { from: 'cm', to: 'm' },
    weight: { from: 'g', to: 'kg' },
    volume: { from: 'l', to: 'ml' }, // Let's use clean matching cases
    area: { from: 'm2', to: 'ha' },
    time: { from: 's', to: 'min' },
    temperature: { from: 'C', to: 'F' },
    speed: { from: 'km_h', to: 'm_s' },
    data_storage: { from: 'KB', to: 'MB' },
    energy: { from: 'J', to: 'kJ' },
    pressure: { from: 'kPa', to: 'Pa' },
  });

  const [copied, setCopied] = useState(false);
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [isAnimateResult, setIsAnimateResult] = useState(false);

  // Fetch meta details for current category
  const currentCategoryDef = useMemo(() => {
    return getCategoryById(activeCategory) || CATEGORIES[0];
  }, [activeCategory]);

  const { fromUnitId, toUnitId } = useMemo(() => {
    const mapping = categoryUnitMapping[activeCategory] || {
      from: currentCategoryDef.units[0].id,
      to: currentCategoryDef.units[1]?.id || currentCategoryDef.units[0].id,
    };
    return { fromUnitId: mapping.from, toUnitId: mapping.to };
  }, [categoryUnitMapping, activeCategory, currentCategoryDef]);

  const fromUnit = useMemo(() => {
    return currentCategoryDef.units.find((u) => u.id === fromUnitId) || currentCategoryDef.units[0];
  }, [currentCategoryDef, fromUnitId]);

  const toUnit = useMemo(() => {
    return currentCategoryDef.units.find((u) => u.id === toUnitId) || currentCategoryDef.units[1] || currentCategoryDef.units[0];
  }, [currentCategoryDef, toUnitId]);

  // Handle single values parsing and validation checks
  const parsedValue = useMemo(() => {
    if (inputValueStr.trim() === '') return 0;
    const val = parseFloat(inputValueStr);
    return isNaN(val) ? 0 : val;
  }, [inputValueStr]);

  const validationWarning = useMemo((): string | null => {
    if (inputValueStr.trim() === '') {
      return 'Please enter a numeric measurement value.';
    }
    const val = parseFloat(inputValueStr);
    if (isNaN(val)) {
      return 'Invalid number format. Please check decimal points.';
    }
    // Length, Weight, Area, Volume, Time, Storage, Energy, Pressure speeds cannot naturally be negative
    if (val < 0 && activeCategory !== 'temperature') {
      return 'Warning: Negative value. Standard measurements in this category are usually non-negative.';
    }
    return null;
  }, [inputValueStr, activeCategory]);

  // Compute conversion result programmatically (live updates as reactive mechanism)
  const currentResult = useMemo((): ConversionResult | null => {
    try {
      return performConversion(parsedValue, fromUnit.id, toUnit.id, activeCategory);
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [parsedValue, fromUnit, toUnit, activeCategory]);

  // Perform Manual/Forced conversion effect with visual flash triggers
  const triggerManualConvert = () => {
    setIsAnimateResult(true);
    setTimeout(() => setIsAnimateResult(false), 800);
  };

  // Swap Units Action (⇄)
  const handleSwapUnits = () => {
    setCategoryUnitMapping((prev) => ({
      ...prev,
      [activeCategory]: {
        from: toUnitId,
        to: fromUnitId,
      },
    }));
    triggerManualConvert();
  };

  // Update specific dropdown selectors
  const handleFromUnitChange = (unit: Unit) => {
    setCategoryUnitMapping((prev) => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        from: unit.id,
      },
    }));
  };

  const handleToUnitChange = (unit: Unit) => {
    setCategoryUnitMapping((prev) => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        to: unit.id,
      },
    }));
  };

  // Switch conversion units category
  const handleCategoryChange = (catId: UnitCategory) => {
    setActiveCategory(catId);
    triggerManualConvert();
  };

  // Helper formatting for converted value
  const formattedConvertedValue = useMemo(() => {
    if (!currentResult) return '0';
    const val = currentResult.convertedValue;
    // Handle very large/small exponential ranges nicely
    if (Math.abs(val) > 1e12 || (Math.abs(val) < 1e-5 && val !== 0)) {
      return val.toExponential(6);
    }
    // Limit standard output to average 6 decimal digits
    return Number(val.toFixed(6)).toString();
  }, [currentResult]);

  // Perform Result Copying
  const handleCopyResult = () => {
    if (!currentResult) return;
    const textToCopy = `${parsedValue} ${fromUnit.symbol} = ${formattedConvertedValue} ${toUnit.symbol}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Programmatic smooth scroll to Converter card
  const handleScrollToConverter = () => {
    document.getElementById('converter-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-[#f6fae1] text-slate-900 dark:bg-[#f6fae1] dark:text-slate-100 overflow-x-hidden relative selection:bg-slate-900/10 selection:text-slate-900">
      
      {/* Clean pure white background with zero decorative color circles */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none z-0" />

      {/* Floating Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/10 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Calci
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Conversion Quick link */}
            <button
              onClick={handleScrollToConverter}
              className="text-xs font-semibold px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition duration-150 cursor-pointer text-slate-600 dark:text-slate-300"
            >
              Converter
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full z-10">
        
        {/* ================= HERO SECTION ================= */}
        <section id="hero-section" className="relative pt-20 pb-20 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-slate-600 dark:text-slate-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Universal Scaling Engine v2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-sans tracking-tight font-black sm:leading-none text-slate-900"
            >
              We Help to Simplify Your <span className="text-slate-950 dark:text-white font-extrabold">Unit Measurement Problems</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-2"
            >
              We've been there. The long hours. The endless conversions. The sleepless nights.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Being a student or professional means precision. Being successful means having a reliable scaling tool in place to take your calculations to the next level. <strong className="text-slate-800 dark:text-slate-200">That's where we come in.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4"
            >
              <button
                id="btn-hero-cta"
                onClick={handleScrollToConverter}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-950 text-white font-bold rounded-xl shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:bg-slate-900 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                Convert Now
                <TrendingUp className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ================= CONVERTER SECTION ================= */}
        <section id="converter-section" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Category selection sidebar controller */}
            <div className="lg:col-span-1 space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3">
                Unit Categories
              </span>
              
              <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto pb-3 lg:pb-0 scrollbar-none snap-x mask-fade-edges">
                {CATEGORIES.map((cat) => {
                  const IconComponent = ICON_MAP[cat.icon] || Ruler;
                  const isActive = activeCategory === cat.id;
                  
                  return (
                    <button
                      key={cat.id}
                      id={`btn-cat-${cat.id}`}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer snap-start text-left ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                          : 'bg-white/80 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                      onClick={() => handleCategoryChange(cat.id)}
                    >
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Converter Interactive Workspace Board */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Glassmorphic conversion card box */}
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-205 dark:border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 relative overflow-visible">
                
                {/* Secondary Active Category Visual indicator pill */}
                <div className="absolute top-[-14px] left-6 inline-flex items-center gap-1.5 px-3.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                  {currentCategoryDef.name} scale
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end pt-2">
                  
                  {/* Left Side: Number value entry form */}
                  <div className="space-y-2">
                    <label htmlFor="input-measurement" className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 block">
                      Value to convert
                    </label>
                    <div className="relative">
                      <input
                        id="input-measurement"
                        type="text"
                        inputMode="decimal"
                        className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-50 border rounded-xl text-black dark:text-black font-extrabold font-mono text-lg transition-all duration-150 outline-hidden focus:ring-2 focus:ring-slate-900/15 ${
                          validationWarning && inputValueStr.trim() !== ''
                            ? 'border-amber-400 focus:border-amber-500 bg-amber-50/5 dark:bg-amber-950/5'
                            : 'border-slate-200 dark:border-slate-300 focus:border-slate-950'
                        }`}
                        placeholder="Enter value (e.g. 100)"
                        value={inputValueStr}
                        onChange={(e) => setInputValueStr(e.target.value)}
                      />
                      {inputValueStr && (
                        <button
                          type="button"
                          onClick={() => setInputValueStr('')}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded text-xs cursor-pointer font-sans"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Quick visual details message display */}
                  <div className="flex items-center">
                    {validationWarning ? (
                      <p className="text-xs font-medium text-amber-500 bg-amber-500/5 py-2 px-3 border border-amber-500/10 rounded-lg w-full">
                        {validationWarning}
                      </p>
                    ) : (
                      <div className="text-xs leading-relaxed text-slate-400 dark:text-slate-500 bg-slate-500/5 py-2 px-3 border border-slate-200/20 dark:border-slate-800/20 rounded-lg w-full flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-slate-900 dark:text-slate-100 shrink-0" />
                        <span>Input values processed on the fly automatically.</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Dropdowns + Swap controls grid */}
                <div className="grid grid-cols-1 md:grid-cols-9 gap-4 items-center">
                  
                  {/* From Unit Dropdown */}
                  <div className="md:col-span-4">
                    <SearchableSelect
                      id="unit-select-from"
                      label="From Unit"
                      units={currentCategoryDef.units}
                      selectedUnit={fromUnit}
                      onChange={handleFromUnitChange}
                      excludeUnitId={toUnit.id}
                    />
                  </div>

                  {/* Swap Button (⇄) */}
                  <div className="md:col-span-1 flex items-center justify-center pt-5">
                    <button
                      id="btn-swap-units"
                      type="button"
                      onClick={handleSwapUnits}
                      className="p-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
                      title="Swap Units"
                    >
                      <ArrowRightLeft className="w-4 h-4 shrink-0" />
                    </button>
                  </div>

                  {/* To Unit Dropdown */}
                  <div className="md:col-span-4">
                    <SearchableSelect
                      id="unit-select-to"
                      label="To Unit"
                      units={currentCategoryDef.units}
                      selectedUnit={toUnit}
                      onChange={handleToUnitChange}
                      excludeUnitId={fromUnit.id}
                    />
                  </div>

                </div>

                {/* Convert Button Trigger */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    id="btn-manual-convert"
                    type="button"
                    onClick={triggerManualConvert}
                    className="flex-1 py-3 px-5 bg-slate-950 hover:bg-slate-900 active:scale-98 text-white font-bold rounded-xl cursor-pointer transition-all duration-200 text-center shadow-lg shadow-slate-950/10 hover:shadow-slate-950/20"
                  >
                    Convert
                  </button>
                  
                  <button
                    id="btn-toggle-explain"
                    type="button"
                    onClick={() => setIsExplainOpen(!isExplainOpen)}
                    className={`px-5 py-3 rounded-xl border text-sm font-bold transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
                      isExplainOpen
                        ? 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Explain Conversion
                  </button>
                </div>

                {/* ================= RESULT CARD DISPLAY ================= */}
                <AnimatePresence mode="wait">
                  {currentResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        boxShadow: isAnimateResult ? '0 0 30px rgba(15, 23, 42, 0.1)' : 'none'
                      }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      className={`p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300 ${
                        isAnimateResult 
                          ? 'bg-slate-50 border border-slate-900/30 dark:bg-slate-900/60 dark:border-white/20' 
                          : 'bg-linear-to-r from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-900/30 border border-slate-200/80 dark:border-slate-800/80'
                      }`}
                      id="result-display-wrapper"
                    >
                      {/* Interactive Sparkle effect inside converter on action trigger */}
                      {isAnimateResult && (
                        <div className="absolute top-3 right-3 animate-bounce">
                          <Sparkles className="w-4 h-4 text-slate-900 dark:text-white" />
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <span className="block text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                            Converted Value ({currentCategoryDef.name})
                          </span>
                          
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                              {formattedConvertedValue}
                            </span>
                            <span className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">
                              {toUnit.name} ({toUnit.symbol})
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Source: <span className="font-mono text-slate-700 dark:text-slate-300">{parseFloat(inputValueStr) || 0} {fromUnit.symbol} ({fromUnit.name})</span>
                          </p>
                        </div>

                        {/* Equation and copy result triggers block */}
                        <div className="flex items-center gap-3 self-end md:self-center">
                          {/* Copy button */}
                          <button
                            id="btn-copy-result"
                            type="button"
                            onClick={handleCopyResult}
                            className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 font-semibold text-xs transition duration-200 cursor-pointer ${
                              copied
                                ? 'bg-slate-100 dark:bg-slate-800 border-slate-400 text-slate-900 dark:text-white'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                            title="Copy result mapping"
                          >
                            {copied ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Result</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Formula Detail Footer Line */}
                      {currentResult.formula && (
                        <div className="mt-4 pt-4 border-t border-slate-150 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                          <code className="p-1 px-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-sm font-mono text-[11px]">
                            Equation:
                          </code>
                          <span className="font-medium">{currentResult.formula}</span>
                        </div>
                      )}

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* ================= INLINE EXPLAIN PANEL CONTAINER ================= */}
              <AnimatePresence>
                {isExplainOpen && (
                  <ExplainPanel currentResult={currentResult} />
                )}
              </AnimatePresence>

            </div>

          </div>

        </section>

      </main>

      {/* Modern High-contrast Footer segment */}
      <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-150 dark:border-slate-800/60 mt-12 py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-1.5 justify-center md:justify-start">
              <span>Calci — Universal Measurement Converter</span>
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Built for accurate and instant unit conversions.
            </p>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            &copy; 2026 Calci Project. Operating with mathematical offsets.
          </p>
        </div>
      </footer>

    </div>
  );
}
