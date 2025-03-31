"use client";

import { PromptLog } from '@/types/trading';
import { MessageSquare, Zap } from 'lucide-react';
import { format } from 'date-fns';

interface PromptsPanelProps {
  prompts: PromptLog[];
}

export default function PromptsPanel({ prompts }: PromptsPanelProps) {
  const recentPrompts = prompts.slice(-10).reverse();

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 h-full">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-blue-400" size={24} />
        <h2 className="text-2xl font-bold">Prompt History</h2>
      </div>

      {recentPrompts.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <MessageSquare className="mx-auto mb-3 opacity-50" size={48} />
          <p>No prompts yet</p>
          <p className="text-sm mt-1">AI interactions will appear here</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {recentPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-gray-900 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-xs font-mono text-gray-400">{prompt.model}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{prompt.tokensUsed} tokens</span>
                  <span>{format(new Date(prompt.timestamp), 'HH:mm:ss')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <p className="text-xs font-semibold text-blue-400">PROMPT</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3 text-sm text-gray-300 max-h-40 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-xs">
                      {prompt.prompt.length > 300 
                        ? prompt.prompt.substring(0, 300) + '...' 
                        : prompt.prompt}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-xs font-semibold text-green-400">RESPONSE</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3 text-sm text-gray-300">
                    <pre className="whitespace-pre-wrap font-mono text-xs">
                      {prompt.response}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// Unit feature implementation - 20250318_0019
// Unit feature implementation - 20250319_0020
// Unit feature implementation - 20250331_0038
