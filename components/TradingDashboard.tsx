"use client";

import { Position, PromptLog, AgentDecision } from '@/types/trading';
import PositionsPanel from './PositionsPanel';
import PromptsPanel from './PromptsPanel';
import DecisionsPanel from './DecisionsPanel';

interface TradingDashboardProps {
  positions: Position[];
  prompts: PromptLog[];
  decisions: AgentDecision[];
}

export default function TradingDashboard({ positions, prompts, decisions }: TradingDashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="lg:col-span-2">
        <PositionsPanel positions={positions} />
      </div>
      
      <div>
        <DecisionsPanel decisions={decisions} />
      </div>
      
      <div>
        <PromptsPanel prompts={prompts} />
      </div>
    </div>
  );
}
// Unit feature implementation - 20250311_0002
// Unit feature implementation - 20250318_0017
