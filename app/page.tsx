"use client";

import { useState, useEffect } from 'react';
import TradingDashboard from '@/components/TradingDashboard';
import AgentControls from '@/components/AgentControls';
import { Position, PromptLog, AgentDecision } from '@/types/trading';

export default function Home() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [prompts, setPrompts] = useState<PromptLog[]>([]);
  const [decisions, setDecisions] = useState<AgentDecision[]>([]);
  const [isAgentRunning, setIsAgentRunning] = useState(false);

  const fetchPositions = async () => {
    try {
      const response = await fetch('/api/positions');
      const data = await response.json();
      setPositions(data.positions || []);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const fetchPrompts = async () => {
    try {
      const response = await fetch('/api/prompts');
      const data = await response.json();
      setPrompts(data.prompts || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };

  const fetchDecisions = async () => {
    try {
      const response = await fetch('/api/decisions');
      const data = await response.json();
      setDecisions(data.decisions || []);
    } catch (error) {
      console.error('Error fetching decisions:', error);
    }
  };

  useEffect(() => {
    fetchPositions();
    fetchPrompts();
    fetchDecisions();

    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      if (isAgentRunning) {
        fetchPositions();
        fetchPrompts();
        fetchDecisions();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAgentRunning]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
            AI Vibe Trader
          </h1>
          <p className="text-gray-400">
            Autonomous trading agent powered by AI • Live execution via Aster API
          </p>
        </header>

        <AgentControls 
          isRunning={isAgentRunning}
          onToggle={setIsAgentRunning}
          onRefresh={() => {
            fetchPositions();
            fetchPrompts();
            fetchDecisions();
          }}
        />

        <TradingDashboard
          positions={positions}
          prompts={prompts}
          decisions={decisions}
        />
      </div>
    </main>
  );
}
// Unit feature implementation - 20250319_0021
// Unit feature implementation - 20250320_0022
// Unit feature implementation - 20250324_0024
// Unit feature implementation - 20250421_0073
// Unit feature implementation - 20250515_0121
// Unit feature implementation - 20250522_0135
