import { CategoryDefinition, UnitCategory, ConversionResult } from '../types';

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'length',
    name: 'Length',
    icon: 'Ruler',
    baseUnit: 'm',
    whyItWorksGeneral: 'The base unit is the Meter (m). Metric units relate by factors of 10, while Imperial units rely on historic relative ratios (12 inches in a foot, 3 feet in a yard, 1760 yards in a mile).',
    units: [
      {
        id: 'mm',
        name: 'Millimeter',
        symbol: 'mm',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        multiplierText: '0.001',
        description: 'A metric unit of length, equal to one-thousandth of a meter.',
        baseRelationExplanation: 'one-thousandth of a meter (0.001 m)'
      },
      {
        id: 'cm',
        name: 'Centimeter',
        symbol: 'cm',
        toBase: (v) => v * 0.01,
        fromBase: (v) => v / 0.01,
        multiplierText: '0.01',
        description: 'A metric unit of length, equal to one-hundredth of a meter.',
        baseRelationExplanation: 'one-hundredth of a meter (0.01 m)'
      },
      {
        id: 'm',
        name: 'Meter',
        symbol: 'm',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'The fundamental unit of length in the International System of Units (SI).',
        baseRelationExplanation: 'the definition of standard length'
      },
      {
        id: 'km',
        name: 'Kilometer',
        symbol: 'km',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
        multiplierText: '1000',
        description: 'A metric unit of length, equal to one thousand meters.',
        baseRelationExplanation: 'one thousand meters (1000 m)'
      },
      {
        id: 'in',
        name: 'Inch',
        symbol: 'in',
        toBase: (v) => v * 0.0254,
        fromBase: (v) => v / 0.0254,
        multiplierText: '0.0254',
        description: 'An Imperial/US customary unit of length, defined as exactly 25.4 millimeters.',
        baseRelationExplanation: 'exactly 0.0254 meters'
      },
      {
        id: 'ft',
        name: 'Foot',
        symbol: 'ft',
        toBase: (v) => v * 0.3048,
        fromBase: (v) => v / 0.3048,
        multiplierText: '0.3048',
        description: 'A unit of length equal to 12 inches or 0.3048 meters.',
        baseRelationExplanation: 'exactly 0.3048 meters'
      },
      {
        id: 'yd',
        name: 'Yard',
        symbol: 'yd',
        toBase: (v) => v * 0.9144,
        fromBase: (v) => v / 0.9144,
        multiplierText: '0.9144',
        description: 'A unit of length equal to 3 feet or 36 inches.',
        baseRelationExplanation: 'exactly 0.9144 meters'
      },
      {
        id: 'mi',
        name: 'Mile',
        symbol: 'mi',
        toBase: (v) => v * 1609.344,
        fromBase: (v) => v / 1609.344,
        multiplierText: '1609.344',
        description: 'A customary unit of length equal to 5,280 feet or 1,760 yards.',
        baseRelationExplanation: 'exactly 1609.344 meters'
      },
      {
        id: 'nmi',
        name: 'Nautical Mile',
        symbol: 'nmi',
        toBase: (v) => v * 1852,
        fromBase: (v) => v / 1852,
        multiplierText: '1852',
        description: 'A unit of measurement used in air, marine, and space navigation, based on the earth circumference.',
        baseRelationExplanation: 'exactly 1852 meters'
      }
    ]
  },
  {
    id: 'weight',
    name: 'Weight & Mass',
    icon: 'Weight',
    baseUnit: 'g',
    whyItWorksGeneral: 'The base unit is the Gram (g). Multiples follow SI prefixes (1 kg = 1000 g), while Imperial units rely on avoirdupois ratios (16 ounces to a pound, 14 pounds to a stone).',
    units: [
      {
        id: 'mg',
        name: 'Milligram',
        symbol: 'mg',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        multiplierText: '0.001',
        description: 'One thousandth of a gram.',
        baseRelationExplanation: '0.001 grams'
      },
      {
        id: 'g',
        name: 'Gram',
        symbol: 'g',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'The standard base unit of mass.',
        baseRelationExplanation: 'the definition of standard mass'
      },
      {
        id: 'kg',
        name: 'Kilogram',
        symbol: 'kg',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
        multiplierText: '1000',
        description: 'A primary metric base mass, equivalent to one thousand grams.',
        baseRelationExplanation: '1000 grams'
      },
      {
        id: 't',
        name: 'Tonne',
        symbol: 't',
        toBase: (v) => v * 1000000,
        fromBase: (v) => v / 1000000,
        multiplierText: '1000000',
        description: 'A metric ton, equivalent to 1,000 kilograms or one million grams.',
        baseRelationExplanation: '1,000,000 grams'
      },
      {
        id: 'oz',
        name: 'Ounce',
        symbol: 'oz',
        toBase: (v) => v * 28.349523125,
        fromBase: (v) => v / 28.349523125,
        multiplierText: '28.349523125',
        description: 'An Imperial unit of mass, equal to 1/16th of a pound.',
        baseRelationExplanation: 'approximately 28.3495 grams'
      },
      {
        id: 'lb',
        name: 'Pound',
        symbol: 'lb',
        toBase: (v) => v * 453.59237,
        fromBase: (v) => v / 453.59237,
        multiplierText: '453.59237',
        description: 'A measurement of mass equal to 16 ounces or exactly 453.59237 grams.',
        baseRelationExplanation: 'exactly 453.59237 grams'
      },
      {
        id: 'st',
        name: 'Stone',
        symbol: 'st',
        toBase: (v) => v * 6350.29318,
        fromBase: (v) => v / 6350.29318,
        multiplierText: '6350.29318',
        description: 'An informal British unit of weight equal to 14 pounds or roughly 6.35 kilograms.',
        baseRelationExplanation: 'exactly 6350.29318 grams'
      }
    ]
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: 'Droplet',
    baseUnit: 'L',
    whyItWorksGeneral: 'The base unit is the Liter (L). High accuracy values map between metric units (such as Milliliters or Cubic Meters) and traditional US Customary fluid portions.',
    units: [
      {
        id: 'ml',
        name: 'Milliliter',
        symbol: 'ml',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        multiplierText: '0.001',
        description: 'A metric unit equal to one-thousandth of a liter.',
        baseRelationExplanation: '0.001 liters'
      },
      {
        id: 'L',
        name: 'Liter',
        symbol: 'L',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'The standard metric unit of volume.',
        baseRelationExplanation: 'the definition of standard liquid volume'
      },
      {
        id: 'cm3',
        name: 'Cubic Centimeter',
        symbol: 'cm³',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        multiplierText: '0.001',
        description: 'The volume of a cube with sides of 1 centimeter; identical to 1 milliliter.',
        baseRelationExplanation: '0.001 liters'
      },
      {
        id: 'm3',
        name: 'Cubic Meter',
        symbol: 'm³',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
        multiplierText: '1000',
        description: 'The SI unit of volume, equal to 1,000 liters.',
        baseRelationExplanation: '1000 liters'
      },
      {
        id: 'tsp',
        name: 'Teaspoon',
        symbol: 'tsp',
        toBase: (v) => v * 0.00492892159,
        fromBase: (v) => v / 0.00492892159,
        multiplierText: '0.00492892159',
        description: 'A customary kitchen cooking unit equal to 1/3 of a tablespoon.',
        baseRelationExplanation: 'approximately 0.0049289 liters'
      },
      {
        id: 'tbsp',
        name: 'Tablespoon',
        symbol: 'tbsp',
        toBase: (v) => v * 0.01478676478,
        fromBase: (v) => v / 0.01478676478,
        multiplierText: '0.01478676478',
        description: 'A US culinary unit equivalent to three teaspoons or half a fluid ounce.',
        baseRelationExplanation: 'approximately 0.0147867 liters'
      },
      {
        id: 'cup',
        name: 'Cup',
        symbol: 'cup',
        toBase: (v) => v * 0.2365882365,
        fromBase: (v) => v / 0.2365882365,
        multiplierText: '0.2365882365',
        description: 'A standard measuring unit of volume, equal to 8 fluid ounces in US Customary systems.',
        baseRelationExplanation: 'approximately 0.236588 liters'
      },
      {
        id: 'pt',
        name: 'Pint',
        symbol: 'pt',
        toBase: (v) => v * 0.473176473,
        fromBase: (v) => v / 0.473176473,
        multiplierText: '0.473176473',
        description: 'A unit of liquid capacity equal to 16 US fluid ounces, or two cups.',
        baseRelationExplanation: 'approximately 0.473176 liters'
      },
      {
        id: 'qt',
        name: 'Quart',
        symbol: 'qt',
        toBase: (v) => v * 0.946352946,
        fromBase: (v) => v / 0.946352946,
        multiplierText: '0.946352946',
        description: 'A liquid measure equal to two pints or a quarter of a gallon.',
        baseRelationExplanation: 'approximately 0.946353 liters'
      },
      {
        id: 'gal',
        name: 'Gallon',
        symbol: 'gal',
        toBase: (v) => v * 3.785411784,
        fromBase: (v) => v / 3.785411784,
        multiplierText: '3.785411784',
        description: 'A customary unit of liquid volume equal to four quarts or 128 fluid ounces.',
        baseRelationExplanation: 'exactly 3.785411784 liters'
      }
    ]
  },
  {
    id: 'area',
    name: 'Area',
    icon: 'Square',
    baseUnit: 'm2',
    whyItWorksGeneral: 'The base unit is the Square Meter (m²). Area measures surface coverage and is calculated as the product of length dimensions squared.',
    units: [
      {
        id: 'mm2',
        name: 'Square Millimeter',
        symbol: 'mm²',
        toBase: (v) => v * 1e-6,
        fromBase: (v) => v / 1e-6,
        multiplierText: '0.000001',
        description: 'The area of a square with 1-millimeter sides.',
        baseRelationExplanation: '0.000001 square meters'
      },
      {
        id: 'cm2',
        name: 'Square Centimeter',
        symbol: 'cm²',
        toBase: (v) => v * 0.0001,
        fromBase: (v) => v / 0.0001,
        multiplierText: '0.0001',
        description: 'The area of a square with 1-centimeter sides.',
        baseRelationExplanation: '0.0001 square meters'
      },
      {
        id: 'm2',
        name: 'Square Meter',
        symbol: 'm²',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'The standard derived SI unit of area surface.',
        baseRelationExplanation: 'the definition of standard area'
      },
      {
        id: 'km2',
        name: 'Square Kilometer',
        symbol: 'km²',
        toBase: (v) => v * 1000000,
        fromBase: (v) => v / 1000000,
        multiplierText: '1000000',
        description: 'The area of a square with 1-kilometer sides.',
        baseRelationExplanation: '1,000,000 square meters'
      },
      {
        id: 'ac',
        name: 'Acre',
        symbol: 'ac',
        toBase: (v) => v * 4046.8564224,
        fromBase: (v) => v / 4046.8564224,
        multiplierText: '4046.8564224',
        description: 'A customary unit of land area, equal to 43,560 square feet.',
        baseRelationExplanation: 'approximately 4046.8564 square meters'
      },
      {
        id: 'ha',
        name: 'Hectare',
        symbol: 'ha',
        toBase: (v) => v * 10000,
        fromBase: (v) => v / 10000,
        multiplierText: '10000',
        description: 'A metric unit of land area equal to 10,000 square meters.',
        baseRelationExplanation: 'exactly 10,000 square meters'
      },
      {
        id: 'ft2',
        name: 'Square Foot',
        symbol: 'ft²',
        toBase: (v) => v * 0.09290304,
        fromBase: (v) => v / 0.09290304,
        multiplierText: '0.09290304',
        description: 'The area equivalent to a square with sides measuring 1 foot.',
        baseRelationExplanation: 'exactly 0.09290304 square meters'
      },
      {
        id: 'yd2',
        name: 'Square Yard',
        symbol: 'yd²',
        toBase: (v) => v * 0.83612736,
        fromBase: (v) => v / 0.83612736,
        multiplierText: '0.83612736',
        description: 'The area equal to 9 square feet or a square with 1-yard sides.',
        baseRelationExplanation: 'exactly 0.83612736 square meters'
      },
      {
        id: 'mi2',
        name: 'Square Mile',
        symbol: 'mi²',
        toBase: (v) => v * 2589988.110336,
        fromBase: (v) => v / 2589988.110336,
        multiplierText: '2589988.110336',
        description: 'The area equal to 640 acres or a square with 1-mile sides.',
        baseRelationExplanation: 'exactly 2,589,988.110336 square meters'
      }
    ]
  },
  {
    id: 'time',
    name: 'Time',
    icon: 'Clock',
    baseUnit: 's',
    whyItWorksGeneral: 'The base unit is the Second (s). Time units correspond through conventional solar/calendar definitions (60 seconds per minute, 24 hours per day, 365.2425 average days per year).',
    units: [
      {
        id: 'ms',
        name: 'Millisecond',
        symbol: 'ms',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        multiplierText: '0.001',
        description: 'One thousandth of a second.',
        baseRelationExplanation: '0.001 seconds'
      },
      {
        id: 's',
        name: 'Second',
        symbol: 's',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'The standard base unit of time under the SI system.',
        baseRelationExplanation: 'the definition of standard time'
      },
      {
        id: 'min',
        name: 'Minute',
        symbol: 'min',
        toBase: (v) => v * 60,
        fromBase: (v) => v / 60,
        multiplierText: '60',
        description: 'A duration of exactly 60 seconds.',
        baseRelationExplanation: '60 seconds'
      },
      {
        id: 'h',
        name: 'Hour',
        symbol: 'h',
        toBase: (v) => v * 3600,
        fromBase: (v) => v / 3600,
        multiplierText: '3600',
        description: 'A duration of exactly 60 minutes or 3,600 seconds.',
        baseRelationExplanation: '3,600 seconds'
      },
      {
        id: 'd',
        name: 'Day',
        symbol: 'd',
        toBase: (v) => v * 86400,
        fromBase: (v) => v / 86400,
        multiplierText: '86400',
        description: 'A duration of exactly 24 hours or 86,400 seconds.',
        baseRelationExplanation: '86,400 seconds'
      },
      {
        id: 'wk',
        name: 'Week',
        symbol: 'wk',
        toBase: (v) => v * 604800,
        fromBase: (v) => v / 604800,
        multiplierText: '604800',
        description: 'A standard calendar duration of exactly seven days.',
        baseRelationExplanation: '604,800 seconds'
      },
      {
        id: 'mo',
        name: 'Month',
        symbol: 'mo',
        toBase: (v) => v * 2629746, // 30.436875 days average
        fromBase: (v) => v / 2629746,
        multiplierText: '2629746',
        description: 'An average calendar month representing exactly 30.436875 active days.',
        baseRelationExplanation: 'approximately 2,629,746 seconds'
      },
      {
        id: 'yr',
        name: 'Year',
        symbol: 'yr',
        toBase: (v) => v * 31556952, // 365.2425 days Gregorian average
        fromBase: (v) => v / 31556952,
        multiplierText: '31556952',
        description: 'A standard Gregorian calendar year measuring an average of 365.2425 days.',
        baseRelationExplanation: 'exactly 31,556,952 seconds'
      }
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: 'Thermometer',
    baseUnit: 'C',
    whyItWorksGeneral: 'The base unit is Celsius (°C). Because temperature scales possess arbitrary origins (freezing points) and different subdivision sizes, conversions employ scale offsets rather than constant multipliers.',
    units: [
      {
        id: 'C',
        name: 'Celsius',
        symbol: '°C',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: 'The standard metric temperature unit scaled to pure water freezing (0°C) and boiling points (100°C).',
        baseRelationExplanation: 'the fundamental standard pivot Celsius scale'
      },
      {
        id: 'F',
        name: 'Fahrenheit',
        symbol: '°F',
        toBase: (v) => (v - 32) * (5 / 9),
        fromBase: (v) => v * (9 / 5) + 32,
        description: 'A customary temperature scale where water freezes at 32°F and boils at 212°F.',
        baseRelationExplanation: 'Celsius multiplied by 9/5 and offset by 32 degrees'
      },
      {
        id: 'K',
        name: 'Kelvin',
        symbol: 'K',
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
        description: 'The absolute thermodynamic temperature scale, sharing Celsius subdivision size with its origin at absolute zero.',
        baseRelationExplanation: 'Celsius offset by exactly 273.15 degrees'
      }
    ]
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: 'Gauge',
    baseUnit: 'm/s',
    whyItWorksGeneral: 'The base unit is Meters per Second (m/s). Speed models the rate of position displacement over time.',
    units: [
      {
        id: 'm_s',
        name: 'm/s',
        symbol: 'm/s',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'Meters traveled per second.',
        baseRelationExplanation: 'the definition of standard speed velocity'
      },
      {
        id: 'km_h',
        name: 'km/h',
        symbol: 'km/h',
        toBase: (v) => v / 3.6,
        fromBase: (v) => v * 3.6,
        multiplierText: '0.2777777778',
        description: 'Kilometers traveled per hour.',
        baseRelationExplanation: 'exactly 1/3.6 meters per second'
      },
      {
        id: 'mph',
        name: 'mph',
        symbol: 'mph',
        toBase: (v) => v * 0.44704,
        fromBase: (v) => v / 0.44704,
        multiplierText: '0.44704',
        description: 'Miles traveled per hour in Imperial/Customary speeds.',
        baseRelationExplanation: 'exactly 0.44704 meters per second'
      },
      {
        id: 'knot',
        name: 'knot',
        symbol: 'kt',
        toBase: (v) => v * 0.514444444,
        fromBase: (v) => v / 0.514444444,
        multiplierText: '0.514444444',
        description: 'One nautical mile per hour, standard in navigation speed calculations.',
        baseRelationExplanation: 'approximately 0.514444 meters per second'
      }
    ]
  },
  {
    id: 'data_storage',
    name: 'Data Storage',
    icon: 'Database',
    baseUnit: 'B',
    whyItWorksGeneral: 'The base unit is the Byte (B). Traditional computing conversions rely on binary powers of 2 (such as 1024) to represent byte collections.',
    units: [
      {
        id: 'bit',
        name: 'Bit',
        symbol: 'b',
        toBase: (v) => v / 8,
        fromBase: (v) => v * 8,
        multiplierText: '0.125',
        description: 'The standard primary unit of information, representing a 0 or 1 binary digit.',
        baseRelationExplanation: 'exactly 1/8th of a byte (0.125 B)'
      },
      {
        id: 'B',
        name: 'Byte',
        symbol: 'B',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'The typical base storage block, containing an 8-bit octet.',
        baseRelationExplanation: 'the definition of standard byte storage'
      },
      {
        id: 'KB',
        name: 'Kilobyte',
        symbol: 'KB',
        toBase: (v) => v * 1024,
        fromBase: (v) => v / 1024,
        multiplierText: '1024',
        description: 'Exactly 2^10 or 1,024 standard bytes.',
        baseRelationExplanation: 'exactly 1,024 bytes'
      },
      {
        id: 'MB',
        name: 'Megabyte',
        symbol: 'MB',
        toBase: (v) => v * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024),
        multiplierText: '1048576',
        description: 'Exactly 2^20 or 1,048,576 bytes derived as 1,024 Kilobytes.',
        baseRelationExplanation: 'exactly 1,048,576 bytes (1,024 KB)'
      },
      {
        id: 'GB',
        name: 'Gigabyte',
        symbol: 'GB',
        toBase: (v) => v * 1024 * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024 * 1024),
        multiplierText: '1073741824',
        description: 'Exactly 2^30 or 1,073,741,824 bytes derived as 1,024 Megabytes.',
        baseRelationExplanation: 'exactly 1,073,741,824 bytes (1,024 MB)'
      },
      {
        id: 'TB',
        name: 'Terabyte',
        symbol: 'TB',
        toBase: (v) => v * 1024 * 1024 * 1024 * 1024,
        fromBase: (v) => v / (1024 * 1024 * 1024 * 1024),
        multiplierText: '1099511627776',
        description: 'Exactly 2^40 or 1,099,511,627,776 bytes derived as 1,024 Gigabytes.',
        baseRelationExplanation: 'exactly 1,099,511,627,776 bytes (1,024 GB)'
      }
    ]
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: 'Zap',
    baseUnit: 'J',
    whyItWorksGeneral: 'The base unit is the Joule (J). Energy represents capacity to perform work, translating between physical mechanical force metrics and chemical calorie equations.',
    units: [
      {
        id: 'J',
        name: 'Joule',
        symbol: 'J',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'The standard SI measurement of energy equivalent to one Newton-meter.',
        baseRelationExplanation: 'the definition of standard energy'
      },
      {
        id: 'kJ',
        name: 'Kilojoule',
        symbol: 'kJ',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
        multiplierText: '1000',
        description: 'One thousand Joules.',
        baseRelationExplanation: '1,000 joules'
      },
      {
        id: 'cal',
        name: 'Calorie',
        symbol: 'cal',
        toBase: (v) => v * 4.184,
        fromBase: (v) => v / 4.184,
        multiplierText: '4.184',
        description: 'A chemical thermochemical heat energy unit, equal to approximately 4.184 Joules.',
        baseRelationExplanation: 'exactly 4.184 joules'
      },
      {
        id: 'kcal',
        name: 'Kilocalorie',
        symbol: 'kcal',
        toBase: (v) => v * 4184,
        fromBase: (v) => v / 4184,
        multiplierText: '4184',
        description: 'Common dietary Calorie (large Calorie), measuring the heat required to raise 1 kg of water by 1°C.',
        baseRelationExplanation: 'exactly 4,184 joules (1,000 calories)'
      },
      {
        id: 'Wh',
        name: 'Watt-hour',
        symbol: 'Wh',
        toBase: (v) => v * 3600,
        fromBase: (v) => v / 3600,
        multiplierText: '3600',
        description: 'The energy expended by a one-watt power source running for one hour.',
        baseRelationExplanation: 'exactly 3,600 joules'
      },
      {
        id: 'kWh',
        name: 'Kilowatt-hour',
        symbol: 'kWh',
        toBase: (v) => v * 3600000,
        fromBase: (v) => v / 3600000,
        multiplierText: '3600000',
        description: 'The standard electrical billing unit, representing 1000 Watt-hours or 3.6 Megajoules.',
        baseRelationExplanation: 'exactly 3,600,000 joules'
      }
    ]
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: 'Activity',
    baseUnit: 'Pa',
    whyItWorksGeneral: 'The base unit is the Pascal (Pa). Pressure models perpendicular force applied onto a unit area.',
    units: [
      {
        id: 'Pa',
        name: 'Pascal',
        symbol: 'Pa',
        toBase: (v) => v,
        fromBase: (v) => v,
        multiplierText: '1',
        description: 'One Newton of force distributed across one square meter.',
        baseRelationExplanation: 'the definition of standard pressure'
      },
      {
        id: 'kPa',
        name: 'Kilopascal',
        symbol: 'kPa',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
        multiplierText: '1000',
        description: 'A metric multiplier of 1,000 Pascals.',
        baseRelationExplanation: '1,000 Pascals'
      },
      {
        id: 'bar',
        name: 'Bar',
        symbol: 'bar',
        toBase: (v) => v * 100000,
        fromBase: (v) => v / 100000,
        multiplierText: '100000',
        description: 'An atmospheric unit of pressure equal to 100,000 Pascals (approx. sea-level weight).',
        baseRelationExplanation: 'exactly 100,000 Pascals'
      },
      {
        id: 'atm',
        name: 'Atmosphere',
        symbol: 'atm',
        toBase: (v) => v * 101325,
        fromBase: (v) => v / 101325,
        multiplierText: '101325',
        description: 'Standard air weight pressure at sea level, equal to 101.325 Kilopascals.',
        baseRelationExplanation: 'exactly 101,325 Pascals'
      },
      {
        id: 'psi',
        name: 'PSI',
        symbol: 'psi',
        toBase: (v) => v * 6894.757293168,
        fromBase: (v) => v / 6894.757293168,
        multiplierText: '6894.757293168',
        description: 'Customary Imperial weight scale representing one pound of force exerted onto one square inch.',
        baseRelationExplanation: 'approximately 6,894.7573 Pascals'
      }
    ]
  }
];

export function getCategoryById(id: UnitCategory): CategoryDefinition | undefined {
  return CATEGORIES.find((cat) => cat.id === id);
}

// Dynamically compute the formatting/conversion result
export function performConversion(
  value: number,
  fromId: string,
  toId: string,
  category: UnitCategory
): ConversionResult {
  const cat = getCategoryById(category);
  if (!cat) throw new Error(`Category ${category} not found`);

  const fromUnit = cat.units.find((u) => u.id === fromId);
  const toUnit = cat.units.find((u) => u.id === toId);

  if (!fromUnit || !toUnit) {
    throw new Error(`Unit translation error: from ${fromId} to ${toId}`);
  }

  // 1. Convert to base
  const baseValue = fromUnit.toBase(value);
  // 2. Convert from base to target
  const convertedValue = toUnit.fromBase(baseValue);

  // Setup formula and calculation steps
  let formula = '';
  const steps: string[] = [];

  if (category === 'temperature') {
    // Temperature has custom formulas due to additive offset
    if (fromId === 'C' && toId === 'F') {
      formula = `°F = (°C × 9/5) + 32`;
      steps.push(`Multiply the Celsius value by 9/5: ${value} × 1.8 = ${value * 1.8}`);
      steps.push(`Add 32 to complete Fahrenheit scale: ${value * 1.8} + 32 = ${convertedValue}`);
    } else if (fromId === 'F' && toId === 'C') {
      formula = `°C = (°F - 32) × 5/9`;
      steps.push(`Subtract 32 from Fahrenheit scale: ${value} - 32 = ${value - 32}`);
      steps.push(`Multiply by 5/9 to match Celsius scale: ${value - 32} × (5/9) = ${convertedValue}`);
    } else if (fromId === 'C' && toId === 'K') {
      formula = `K = °C + 273.15`;
      steps.push(`Add absolute zero displacement factor 273.15: ${value} + 273.15 = ${convertedValue}`);
    } else if (fromId === 'K' && toId === 'C') {
      formula = `°C = K - 273.15`;
      steps.push(`Subtract standard absolute zero factor 273.15: ${value} - 273.15 = ${convertedValue}`);
    } else if (fromId === 'F' && toId === 'K') {
      formula = `K = (°F - 32) × 5/9 + 273.15`;
      const intermediateC = (value - 32) * (5 / 9);
      steps.push(`Convert Fahrenheit to Celsius scale first: (${value} - 32) × (5/9) = ${intermediateC.toFixed(4)} °C`);
      steps.push(`Shift Celsius into Kelvin absolute scale: ${intermediateC.toFixed(4)} + 273.15 = ${convertedValue}`);
    } else if (fromId === 'K' && toId === 'F') {
      formula = `°F = (K - 273.15) × 9/5 + 32`;
      const intermediateC = value - 273.15;
      steps.push(`Shift Kelvin absolute scale to Celsius range first: ${value} - 273.15 = ${intermediateC.toFixed(4)} °C`);
      steps.push(`Convert Celsius into Fahrenheit: (${intermediateC.toFixed(4)} × 9/5) + 32 = ${convertedValue}`);
    } else {
      formula = `Value remains unchanged (same units)`;
      steps.push(`The source and target temperature scales are identical: ${value} °C = ${convertedValue} °C`);
    }
  } else {
    // Standard multipliers
    // baseValue = value * multiplierFrom
    // convertedValue = baseValue / multiplierTo
    // So convertedValue = value * (multiplierFrom / multiplierTo)

    const fromFactor = fromUnit.toBase(1);
    const toFactor = toUnit.toBase(1);

    if (fromId === toId) {
      formula = `Value remains unchanged`;
      steps.push(`The source unit is identical to the target unit.`);
    } else {
      const displayFromFactor = Number(fromFactor.toPrecision(10));
      const displayToFactor = Number(toFactor.toPrecision(10));
      const compositeFactor = fromFactor / toFactor;
      const displayCompositeFactor = Number(compositeFactor.toPrecision(10));

      const isMultiplicationClean = compositeFactor >= 1;
      
      if (isMultiplicationClean) {
        formula = `${toUnit.symbol} = ${fromUnit.symbol} × ${displayCompositeFactor}`;
        steps.push(`Multiply the input value by ${displayCompositeFactor} to convert ${fromUnit.name} directly into ${toUnit.name}:`);
        steps.push(`${value} × ${displayCompositeFactor} = ${convertedValue}`);
      } else {
        const divider = 1 / compositeFactor;
        const displayDivider = Number(divider.toPrecision(10));
        formula = `${toUnit.symbol} = ${fromUnit.symbol} ÷ ${displayDivider}`;
        steps.push(`Divide the input value by ${displayDivider} to convert ${fromUnit.name} directly into ${toUnit.name}:`);
        steps.push(`${value} ÷ ${displayDivider} = ${convertedValue}`);
      }
    }
  }

  return {
    inputValue: value,
    fromUnit,
    toUnit,
    convertedValue,
    category,
    formula,
    steps
  };
}
