'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function PhysicsCycleCalculator() {
  const [calcType, setCalcType] = useState<'carnot' | 'otto' | 'diesel'>('carnot');
  const [inputs, setInputs] = useState({
    thot: 373, // Kelvin
    tcold: 273,
    qhot: 1000,
    qcold: 600,
    v1: 1,
    v2: 4,
    gamma: 1.4,
  });
  const [result, setResult] = useState<any>(null);

  const calculateCarnot = () => {
    const thot = parseFloat(inputs.thot.toString());
    const tcold = parseFloat(inputs.tcold.toString());
    const qhot = parseFloat(inputs.qhot.toString());

    if (thot <= 0 || tcold <= 0 || tcold >= thot) {
      alert('Invalid temperatures. Cold temperature must be less than hot temperature and both > 0K');
      return;
    }

    const carnot_efficiency = 1 - (tcold / thot);
    const qcold = qhot * (1 - carnot_efficiency);
    const work = qhot - qcold;
    const cop = tcold / (thot - tcold);

    setResult({
      type: 'Carnot Cycle',
      efficiency: (carnot_efficiency * 100).toFixed(2),
      qhot: qhot.toFixed(2),
      qcold: qcold.toFixed(2),
      work: work.toFixed(2),
      cop: cop.toFixed(2),
    });
  };

  const calculateOtto = () => {
    const v1 = parseFloat(inputs.v1.toString());
    const v2 = parseFloat(inputs.v2.toString());
    const gamma = parseFloat(inputs.gamma.toString());

    if (v1 <= 0 || v2 <= 0 || v2 <= v1) {
      alert('Invalid volumes. V2 must be greater than V1 and both > 0');
      return;
    }

    const compressionRatio = v2 / v1;
    const otto_efficiency = 1 - (1 / Math.pow(compressionRatio, gamma - 1));

    setResult({
      type: 'Otto Cycle',
      compressionRatio: compressionRatio.toFixed(2),
      efficiency: (otto_efficiency * 100).toFixed(2),
    });
  };

  const calculateDiesel = () => {
    const v1 = parseFloat(inputs.v1.toString());
    const v2 = parseFloat(inputs.v2.toString());
    const gamma = parseFloat(inputs.gamma.toString());

    if (v1 <= 0 || v2 <= 0) {
      alert('Invalid volumes. Both volumes must be > 0');
      return;
    }

    const compressionRatio = v2 / v1;
    const cutoff = 1.3; // Typical cutoff ratio
    const diesel_efficiency = 1 - (1 / Math.pow(compressionRatio, gamma - 1)) * ((Math.pow(cutoff, gamma) - 1) / (gamma * (cutoff - 1)));

    setResult({
      type: 'Diesel Cycle',
      compressionRatio: compressionRatio.toFixed(2),
      cutoffRatio: cutoff.toFixed(2),
      efficiency: (diesel_efficiency * 100).toFixed(2),
    });
  };

  const handleCalculate = () => {
    switch (calcType) {
      case 'carnot':
        calculateCarnot();
        break;
      case 'otto':
        calculateOtto();
        break;
      case 'diesel':
        calculateDiesel();
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Physics Cycle Calculator</h1>
            <p className="text-gray-600">Calculate thermodynamic cycle parameters and efficiency</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Cycle Type Selection */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Cycle Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { type: 'carnot', label: 'Carnot Cycle' },
                  { type: 'otto', label: 'Otto Cycle' },
                  { type: 'diesel', label: 'Diesel Cycle' },
                ].map((cycle) => (
                  <button
                    key={cycle.type}
                    onClick={() => {
                      setCalcType(cycle.type as any);
                      setResult(null);
                    }}
                    className={`px-4 py-3 rounded-lg font-semibold transition ${
                      calcType === cycle.type
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cycle.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Parameters</h2>
              <div className="space-y-4">
                {calcType === 'carnot' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hot Reservoir Temperature (K)
                      </label>
                      <input
                        type="number"
                        value={inputs.thot}
                        onChange={(e) => setInputs({ ...inputs, thot: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cold Reservoir Temperature (K)
                      </label>
                      <input
                        type="number"
                        value={inputs.tcold}
                        onChange={(e) => setInputs({ ...inputs, tcold: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Heat Input (Qh) [Joules]
                      </label>
                      <input
                        type="number"
                        value={inputs.qhot}
                        onChange={(e) => setInputs({ ...inputs, qhot: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </>
                )}

                {(calcType === 'otto' || calcType === 'diesel') && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Volume 1 (V1) [m³]
                      </label>
                      <input
                        type="number"
                        value={inputs.v1}
                        onChange={(e) => setInputs({ ...inputs, v1: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Volume 2 (V2) [m³]
                      </label>
                      <input
                        type="number"
                        value={inputs.v2}
                        onChange={(e) => setInputs({ ...inputs, v2: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Heat Capacity Ratio (γ)
                      </label>
                      <input
                        type="number"
                        value={inputs.gamma}
                        step="0.01"
                        onChange={(e) => setInputs({ ...inputs, gamma: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Typical: Air = 1.4, Diatomic = 1.4, Monatomic = 1.67</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
            >
              Calculate
            </button>

            {/* Results */}
            {result && (
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{result.type} Results</h3>
                <div className="space-y-3">
                  {Object.entries(result).map(([key, value]) => {
                    if (key === 'type') return null;
                    const labels: { [key: string]: string } = {
                      efficiency: 'Efficiency',
                      qhot: 'Heat Input (Qh)',
                      qcold: 'Heat Output (Qc)',
                      work: 'Work Output',
                      cop: 'Coefficient of Performance',
                      compressionRatio: 'Compression Ratio',
                      cutoffRatio: 'Cutoff Ratio',
                    };
                    const units: { [key: string]: string } = {
                      efficiency: '%',
                      qhot: 'J',
                      qcold: 'J',
                      work: 'J',
                      cop: '',
                      compressionRatio: '',
                      cutoffRatio: '',
                    };
                    return (
                      <div key={key} className="flex justify-between items-center p-3 bg-white rounded border border-green-200">
                        <span className="font-semibold text-gray-700">{labels[key]}:</span>
                        <span className="text-lg text-green-600 font-bold">
                          {String(value)}{units[key]}
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
