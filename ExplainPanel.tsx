import { motion } from 'motion/react';
import { HelpCircle, ChevronRight, BookOpen } from 'lucide-react';
import { ConversionResult } from '../types';
import { CATEGORIES } from '../data/units';

interface ExplainPanelProps {
  currentResult: ConversionResult | null;
}

export default function ExplainPanel({ currentResult }: ExplainPanelProps) {
  if (!currentResult) {
    return (
      <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500">
        <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-60 text-slate-400" />
        <p className="text-sm font-medium">Perform a conversion above and click "Explain Conversion" to see the full breakdown!</p>
      </div>
    );
  }

  const { inputValue, fromUnit, toUnit, convertedValue, formula, steps, category } = currentResult;
  const categoryMeta = CATEGORIES.find((cat) => cat.id === category);

  // Format decimal values beautifully depending on precision
  const formatNum = (num: number) => {
    if (Math.abs(num) < 1e-4 || Math.abs(num) > 1e9) {
      return num.toExponential(4);
    }
    // Limit to 6 decimals, strip trailing zeros
    return Number(num.toFixed(6));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-8 bg-linear-to-b from-white/90 to-slate-50/50 dark:from-slate-900/90 dark:to-slate-900/30 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xl space-y-6"
      id="explain-panel"
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/60">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            Conversion Explanation
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Step-by-step logic for: <span className="font-semibold">{fromUnit.name}</span> → <span className="font-semibold">{toUnit.name}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Step by Step */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Step-by-Step Calculation
          </h4>

          <div className="space-y-3">
            {/* Step summary relation */}
            <div className="p-4 bg-slate-100/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <span className="block text-xs font-medium text-slate-400 dark:text-slate-50 mb-1">
                Unit Relationship:
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                1 {fromUnit.name} is equivalent to{' '}
                <span className="text-slate-900 dark:text-white font-mono font-bold">
                  {fromUnit.baseRelationExplanation || `${fromUnit.multiplierText || '1'} base units`}
                </span>.
              </p>
            </div>

            {/* Formula display */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800">
              <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Conversion Formula:
              </span>
              <p className="text-base font-mono font-bold text-slate-900 dark:text-white">
                {formula}
              </p>
            </div>

            {/* Step Calculations List */}
            <div className="space-y-2">
              <span className="block text-xs font-medium text-slate-400 dark:text-slate-500 mt-2">
                Calculation:
              </span>
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 pl-1"
                >
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Final Statement */}
            <div className="pt-2">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Therefore:
              </p>
              <div className="text-md font-bold text-slate-900 dark:text-slate-50 font-mono bg-slate-50 dark:bg-slate-800/30 py-2 px-3 rounded-lg border border-slate-100 dark:border-slate-800 inline-block mt-1">
                {formatNum(inputValue)} {fromUnit.symbol} = {formatNum(convertedValue)} {toUnit.symbol}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Scientific Context */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Why This Works
          </h4>

          <div className="flex flex-col h-full justify-between gap-4">
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                {categoryMeta?.whyItWorksGeneral}
              </p>
              {fromUnit.multiplierText && toUnit.multiplierText && fromUnit.id !== toUnit.id && (
                <p>
                  To convert {fromUnit.name} to {toUnit.name}, we evaluate their relationship relative to the standard{' '}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {categoryMeta?.name} base unit ({categoryMeta?.baseUnit})
                  </span>
                  . This dynamic, centralized architecture ensures mathematical safety across all ranges without floating point rounding decay.
                </p>
              )}
              {category === 'temperature' && (
                <p>
                  Unlike relative length or mass scales, heat sensors operate on dynamic thermal baselines. Water freezes at 0° on the Celsius scale, 32° on the Fahrenheit scale, and 273.15 on the Kelvin scale, making proportional multipliers additive.
                </p>
              )}
            </div>

            {/* Quick Context Card */}
            <div className="p-4 rounded-xl bg-orange-50/20 dark:bg-orange-950/5 border border-orange-200/20 dark:border-orange-500/10 flex items-start gap-3">
              <div className="text-orange-500 text-xs font-sans shrink-0 font-bold bg-orange-500/10 px-2 py-0.5 rounded-sm mt-0.5">
                TIP
              </div>
              <p className="text-xs text-orange-600/90 dark:text-orange-400/90 leading-relaxed">
                Metric prefix keywords make scale tracking very intuitive—for example, **kilo** always represents 1,000, **centi** equals 0.01, and **milli** indicates 0.001.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
