"use client";

import { Position } from '@/types/trading';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface PositionsPanelProps {
  positions: Position[];
}

export default function PositionsPanel({ positions }: PositionsPanelProps) {
  const totalPnL = positions.reduce((sum, p) => sum + p.pnl, 0);
  const winningPositions = positions.filter(p => p.pnl > 0).length;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Active Positions</h2>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Total P&L</p>
            <p className={`text-xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${totalPnL.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Win Rate</p>
            <p className="text-xl font-bold text-blue-400">
              {positions.length > 0 ? ((winningPositions / positions.length) * 100).toFixed(0) : 0}%
            </p>
          </div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <DollarSign className="mx-auto mb-3 opacity-50" size={48} />
          <p>No active positions</p>
          <p className="text-sm mt-1">Start the agent to begin trading</p>
        </div>
      ) : (
        <div className="space-y-3">
          {positions.map((position) => (
            <div
              key={position.id}
              className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{position.symbol}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      position.side === 'long' 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-red-600/20 text-red-400'
                    }`}>
                      {position.side.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Size</p>
                      <p className="font-medium">{position.size.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Entry</p>
                      <p className="font-medium">${position.entryPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Current</p>
                      <p className="font-medium">${position.currentPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">P&L</p>
                      <p className={`font-bold ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${position.pnl.toFixed(2)} ({position.pnlPercentage.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                  
                  {position.reasoning && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Reasoning:</p>
                      <p className="text-sm text-gray-300">{position.reasoning}</p>
                    </div>
                  )}
                </div>
                
                <div className="ml-4">
                  {position.pnl >= 0 ? (
                    <TrendingUp className="text-green-400" size={24} />
                  ) : (
                    <TrendingDown className="text-red-400" size={24} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// Unit feature implementation - 20250314_0012
// Unit feature implementation - 20250324_0025
// Unit feature implementation - 20250327_0035
// Unit feature implementation - 20250414_0057
// Unit feature implementation - 20250508_0108
// Unit feature implementation - 20250509_0111
// Unit feature implementation - 20250527_0142
// Unit feature implementation - 20250602_0152
// Unit feature implementation - 20250625_0190
// Unit feature implementation - 20250704_0206
// Unit feature implementation - 20250707_0208
