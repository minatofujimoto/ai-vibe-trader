"use client";

import { AgentDecision } from '@/types/trading';
import { Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { format } from 'date-fns';

interface DecisionsPanelProps {
  decisions: AgentDecision[];
}

export default function DecisionsPanel({ decisions }: DecisionsPanelProps) {
  const recentDecisions = decisions.slice(-10).reverse();

  const getActionColor = (action: string) => {
    switch (action) {
      case 'buy': return 'text-green-400 bg-green-600/20';
      case 'sell': return 'text-red-400 bg-red-600/20';
      case 'close': return 'text-orange-400 bg-orange-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp size={16} className="text-green-400" />;
      case 'bearish': return <TrendingDown size={16} className="text-red-400" />;
      default: return <Minus size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold">AI Decisions</h2>
      </div>

      {recentDecisions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Brain className="mx-auto mb-3 opacity-50" size={48} />
          <p>No decisions yet</p>
          <p className="text-sm mt-1">The agent will log decisions here</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {recentDecisions.map((decision) => (
            <div
              key={decision.id}
              className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getActionColor(decision.action)}`}>
                    {decision.action}
                  </span>
                  <span className="text-lg font-semibold">{decision.symbol}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {format(new Date(decision.timestamp), 'HH:mm:ss')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-gray-400">Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          decision.confidence > 80 ? 'bg-green-500' :
                          decision.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${decision.confidence}%` }}
                      />
                    </div>
                    <span className="font-medium">{decision.confidence}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Sentiment</p>
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(decision.sentiment)}
                    <span className="font-medium capitalize">{decision.sentiment}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded p-3 text-sm">
                <p className="text-gray-400 text-xs mb-1">Reasoning:</p>
                <p className="text-gray-300">{decision.reasoning}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium">${decision.marketData.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Volume</p>
                  <p className="font-medium">${(decision.marketData.volume / 1000000).toFixed(2)}M</p>
                </div>
                <div>
                  <p className="text-gray-500">Volatility</p>
                  <p className="font-medium">{decision.marketData.volatility.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// Unit feature implementation - 20250310_0001
// Unit feature implementation - 20250312_0006
// Unit feature implementation - 20250414_0059
// Unit feature implementation - 20250416_0066
// Unit feature implementation - 20250425_0085
// Unit feature implementation - 20250602_0154
// Unit feature implementation - 20250611_0169
// Unit feature implementation - 20250616_0174
