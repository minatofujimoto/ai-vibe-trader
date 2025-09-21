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
// Unit feature implementation - 20250409_0050
// Unit feature implementation - 20250409_0051
// Unit feature implementation - 20250425_0082
// Unit feature implementation - 20250428_0087
// Unit feature implementation - 20250507_0107
// Unit feature implementation - 20250519_0128
// Unit feature implementation - 20250521_0134
// Unit feature implementation - 20250625_0189
// Unit feature implementation - 20250921_0215
