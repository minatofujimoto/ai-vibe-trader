"use client";

import { Play, Pause, RefreshCw } from 'lucide-react';

interface AgentControlsProps {
  isRunning: boolean;
  onToggle: (running: boolean) => void;
  onRefresh: () => void;
}

export default function AgentControls({ isRunning, onToggle, onRefresh }: AgentControlsProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Agent Controls</h2>
          <p className="text-sm text-gray-400">
            Status: <span className={isRunning ? 'text-green-400' : 'text-gray-400'}>
              {isRunning ? 'Running' : 'Stopped'}
            </span>
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          
          <button
            onClick={() => onToggle(!isRunning)}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause size={18} />
                Stop Agent
              </>
            ) : (
              <>
                <Play size={18} />
                Start Agent
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
// Unit feature implementation - 20250325_0026
// Unit feature implementation - 20250407_0044
