'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function ChemistryCycleCalculator() {
  const [calcType, setCalcType] = useState<'molarity' | 'normality' | 'ph' | 'buffer'>('molarity');
  const [inputs, setInputs] = useState({
    moles: 1,
    volume: 1,
    molarity: 1,
    equivalents: 1,
    h_concentration: 0.00001,
    ka: 0.000018,
    pKa: 4.74,
    acid_conc: 0.1,
    conjugate_conc: 0.1,
  });
  const [result, setResult] = useState<any>(null);

  const calculateMolarity = () => {
    const moles = parseFloat(inputs.moles.toString());
    const volume = parseFloat(inputs.volume.toString());

    if (moles < 0 || volume <= 0) {
      alert('Invalid inputs. Volume must be > 0');
      return;
    }

    const molarity = moles / volume;

    setResult({
      type: 'Molarity Calculation',
      moles: moles.toFixed(4),
      volume: volume.toFixed(4),
      molarity: molarity.toFixed(4),
    });
  };

  const calculateNormality = () => {
    const equivalents = parseFloat(inputs.equivalents.toString());
    const volume = parseFloat(inputs.volume.toString());

    if (equivalents < 0 || volume <= 0) {
      alert('Invalid inputs. Volume must be > 0');
      return;
    }

    const normality = equivalents / volume;

    setResult({
      type: 'Normality Calculation',
      equivalents: equivalents.toFixed(4),
      volume: volume.toFixed(4),
      normality: normality.toFixed(4),
    });
  };

  const calculatePH = () => {
    const h_conc = parseFloat(inputs.h_concentration.toString());

    if (h_conc <= 0) {
      alert('H+ concentration must be > 0');
      return;
    }

    const pH = -Math.log10(h_conc);
    const pOH = 14 - pH;

    setResult({
      type: 'pH Calculation',
      h_concentration: h_conc.toExponential(2),
      pH: pH.toFixed(2),
      pOH: pOH.toFixed(2),
    });
  };

  const calculateBuffer = () => {
    const pKa = parseFloat(inputs.pKa.toString());
    const acid = parseFloat(inputs.acid_conc.toString());
    const conjugate = parseFloat(inputs.conjugate_conc.toString());

    if (acid <= 0 || conjugate <= 0) {
      alert('Concentrations must be > 0');
      return;
    }

    const pH = pKa + Math.log10(conjugate / acid);

    setResult({
      type: 'Henderson-Hasselbalch Equation',
      pKa: pKa.toFixed(2),
      acidConc: acid.toFixed(4),
      conjugateConc: conjugate.toFixed(4),
      pH: pH.toFixed(2),
      ratio: (conjugate / acid).toFixed(4),
    });
  };

  const handleCalculate = () => {
    switch (calcType) {
      case 'molarity':
        calculateMolarity();
        break;
      case 'normality':
        calculateNormality();
        break;
      case 'ph':
        calculatePH();
        break;
      case 'buffer':
        calculateBuffer();
        break;
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Chemistry Cycle Calculator</h1>
            <p className="text-gray-600">Calculate chemistry formulas and concentrations</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Calculator Type Selection */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Calculator</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { type: 'molarity', label: 'Molarity' },
                  { type: 'normality', label: 'Normality' },
                  { type: 'ph', label: 'pH' },
                  { type: 'buffer', label: 'Buffer pH' },
                ].map((calc) => (
                  <button
                    key={calc.type}
                    onClick={() => {
                      setCalcType(calc.type as any);
                      setResult(null);
                    }}
                    className={`px-3 py-2 rounded-lg font-semibold transition text-sm ${
                      calcType === calc.type
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {calc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Parameters</h2>
              <div className="space-y-4">
                {calcType === 'molarity' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Moles
                      </label>
                      <input
                        type="number"
                        value={inputs.moles}
                        onChange={(e) => setInputs({ ...inputs, moles: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Volume (L)
                      </label>
                      <input
                        type="number"
                        value={inputs.volume}
                        onChange={(e) => setInputs({ ...inputs, volume: parseFloat(e.target.value) })}
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </>
                )}

                {calcType === 'normality' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Equivalents
                      </label>
                      <input
                        type="number"
                        value={inputs.equivalents}
                        onChange={(e) => setInputs({ ...inputs, equivalents: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Volume (L)
                      </label>
                      <input
                        type="number"
                        value={inputs.volume}
                        onChange={(e) => setInputs({ ...inputs, volume: parseFloat(e.target.value) })}
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </>
                )}

                {calcType === 'ph' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      H+ Concentration (mol/L)
                    </label>
                    <input
                      type="number"
                      value={inputs.h_concentration}
                      onChange={(e) => setInputs({ ...inputs, h_concentration: parseFloat(e.target.value) })}
                      step="0.00001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Example: 0.00001 for pH 5</p>
                  </div>
                )}

                {calcType === 'buffer' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        pKa
                      </label>
                      <input
                        type="number"
                        value={inputs.pKa}
                        onChange={(e) => setInputs({ ...inputs, pKa: parseFloat(e.target.value) })}
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Acid Concentration (mol/L)
                      </label>
                      <input
                        type="number"
                        value={inputs.acid_conc}
                        onChange={(e) => setInputs({ ...inputs, acid_conc: parseFloat(e.target.value) })}
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Conjugate Base Concentration (mol/L)
                      </label>
                      <input
                        type="number"
                        value={inputs.conjugate_conc}
                        onChange={(e) => setInputs({ ...inputs, conjugate_conc: parseFloat(e.target.value) })}
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
            >
              Calculate
            </button>

            {/* Results */}
            {result && (
              <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border-2 border-orange-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{result.type} Results</h3>
                <div className="space-y-3">
                  {Object.entries(result).map(([key, value]) => {
                    if (key === 'type') return null;
                    const labels: { [key: string]: string } = {
                      moles: 'Moles',
                      molarity: 'Molarity (M)',
                      volume: 'Volume (L)',
                      equivalents: 'Equivalents',
                      normality: 'Normality (N)',
                      h_concentration: 'H+ Concentration',
                      pH: 'pH',
                      pOH: 'pOH',
                      pKa: 'pKa',
                      acidConc: 'Acid Concentration',
                      conjugateConc: 'Conjugate Base Concentration',
                      ratio: 'Base/Acid Ratio',
                    };
                    return (
                      <div key={key} className="flex justify-between items-center p-3 bg-white rounded border border-orange-200">
                        <span className="font-semibold text-gray-700">{labels[key]}:</span>
                        <span className="text-lg text-orange-600 font-bold">
                          {String(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
