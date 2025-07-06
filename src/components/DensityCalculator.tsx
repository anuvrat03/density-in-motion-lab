import React, { useState, useEffect } from 'react';
import { RotateCcw, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DensityCalculator = () => {
  const [density, setDensity] = useState(1.0);
  const [volume, setVolume] = useState(1000);
  const [inputValue, setInputValue] = useState('1.0');
  const [liquidHeight, setLiquidHeight] = useState(100);
  
  const MASS = 1000; // constant mass in grams
  const MAX_VOLUME = 1000; // maximum bottle capacity in ml
  const BEAKER_HEIGHT = 300; // beaker height in pixels

  useEffect(() => {
    // Calculate volume: V = m / ρ
    const newVolume = MASS / density;
    setVolume(newVolume);
    
    // Calculate liquid height as percentage of beaker (leaving space at top)
    const heightPercentage = Math.min((newVolume / MAX_VOLUME) * 85, 85); // 85% max to show open top
    setLiquidHeight(heightPercentage);
  }, [density]);

  const handleDensityChange = (value: string) => {
    setInputValue(value);
    
    // Validate input
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 10) {
      setDensity(numValue);
    }
  };

  const handleReset = () => {
    setDensity(1.0);
    setInputValue('1.0');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Density & Volume Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Explore how density affects volume when mass stays constant
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl p-8">
          {/* Left Side - Beaker Visualization */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Beaker className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-semibold text-gray-700">
                Laboratory Beaker
              </h2>
            </div>
            
            <div className="relative flex items-center">
              {/* Volume markings on the left */}
              <div className="flex flex-col-reverse mr-4 space-y-reverse">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((mark) => {
                  const position = (mark / MAX_VOLUME) * 85; // 85% to match liquid max height
                  return (
                    <div
                      key={mark}
                      className="flex items-center justify-end"
                      style={{ 
                        height: `${BEAKER_HEIGHT * 0.85 / 10}px`,
                        marginBottom: position === 10 ? '0' : `${(BEAKER_HEIGHT * 0.85 / 10) - (BEAKER_HEIGHT * 0.85 / 10)}px`
                      }}
                    >
                      <span className="text-sm font-medium text-gray-700 mr-2">
                        {mark}ml
                      </span>
                      <div className="w-3 h-0.5 bg-gray-700" />
                    </div>
                  );
                })}
              </div>

              {/* Beaker container with background */}
              <div className="relative bg-gray-50 rounded-lg p-6 shadow-lg">
                {/* Laboratory beaker shape */}
                <div 
                  className="relative bg-transparent border-4 border-gray-700 shadow-inner"
                  style={{ 
                    width: '140px', 
                    height: `${BEAKER_HEIGHT}px`,
                    clipPath: 'polygon(20% 0%, 80% 0%, 85% 100%, 15% 100%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Blue liquid inside beaker */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700 via-blue-500 to-blue-400 transition-all duration-700 ease-out"
                    style={{ 
                      height: `${liquidHeight}%`,
                      clipPath: 'polygon(20% 0%, 80% 0%, 85% 100%, 15% 100%)',
                      opacity: 0.9
                    }}
                  >
                    {/* Liquid surface effect */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-300 opacity-60" />
                    {/* Light reflection on liquid */}
                    <div 
                      className="absolute top-3 left-6 w-6 h-8 bg-white opacity-20 rounded-full blur-sm"
                    />
                  </div>
                </div>

                {/* Beaker base */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full shadow-md" />
              </div>
            </div>

            {/* Volume Display */}
            <div className="text-center bg-blue-50 rounded-xl p-4 w-full max-w-xs shadow-inner border-2 border-blue-200">
              <div className="text-sm font-medium text-gray-600 mb-1">Current Volume</div>
              <div className="text-3xl font-bold text-blue-600">
                {volume.toFixed(1)} ml
              </div>
              {volume > MAX_VOLUME && (
                <div className="text-sm text-red-500 mt-2 flex items-center justify-center gap-1">
                  ⚠️ Volume exceeds beaker capacity!
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Controls */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Controls & Information
            </h2>

            {/* Mass Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-600">
                Constant Mass
              </Label>
              <div className="text-2xl font-bold text-gray-800">
                {MASS} g
              </div>
            </div>

            {/* Density Input */}
            <div className="space-y-2">
              <Label htmlFor="density" className="text-sm font-medium text-gray-700">
                Density (g/ml)
              </Label>
              <Input
                id="density"
                type="number"
                value={inputValue}
                onChange={(e) => handleDensityChange(e.target.value)}
                step="0.1"
                min="0.1"
                max="10"
                className="text-lg font-semibold"
                placeholder="Enter density..."
              />
              <p className="text-xs text-gray-500">
                Valid range: 0.1 - 10.0 g/ml
              </p>
            </div>

            {/* Current Density Display */}
            <div className="bg-indigo-50 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-600">
                Current Density
              </Label>
              <div className="text-2xl font-bold text-indigo-600">
                {density.toFixed(2)} g/ml
              </div>
            </div>

            {/* Calculation Display */}
            <div className="bg-green-50 rounded-lg p-4 space-y-2">
              <Label className="text-sm font-medium text-gray-600">
                Calculation
              </Label>
              <div className="text-lg font-mono">
                Volume = Mass ÷ Density
              </div>
              <div className="text-lg font-mono text-green-700">
                {volume.toFixed(1)} ml = {MASS} g ÷ {density.toFixed(2)} g/ml
              </div>
            </div>

            {/* Educational Info */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">
                💡 Learning Tip
              </h3>
              <p className="text-sm text-yellow-700">
                As density increases, volume decreases proportionally. 
                This inverse relationship is fundamental in physics and chemistry!
              </p>
            </div>

            {/* Reset Button */}
            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </div>

        {/* Additional Examples */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Real-World Examples
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-700">Water</div>
              <div className="text-sm text-gray-600">≈ 1.0 g/ml</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-gray-700">Aluminum</div>
              <div className="text-sm text-gray-600">≈ 2.7 g/ml</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="font-semibold text-yellow-700">Gold</div>
              <div className="text-sm text-gray-600">≈ 19.3 g/ml</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DensityCalculator;
