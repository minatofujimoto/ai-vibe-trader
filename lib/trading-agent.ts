import OpenAI from 'openai';
import { AgentDecision, MarketData, Position, PromptLog } from '@/types/trading';
import asterAPI from './aster-api';

class TradingAgent {
  private openai: OpenAI;
  private promptHistory: PromptLog[] = [];
  private decisionHistory: AgentDecision[] = [];

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeMarket(symbol: string, marketData: MarketData): Promise<AgentDecision> {
    const positions = await asterAPI.getPositions();
    const existingPosition = positions.find(p => p.symbol === symbol);

    const prompt = this.buildAnalysisPrompt(symbol, marketData, positions, existingPosition);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert crypto trading AI assistant. Analyze market data and provide trading recommendations.
            
Your response MUST be a valid JSON object with this exact structure:
{
  "action": "buy" | "sell" | "hold" | "close",
  "confidence": 0-100,
  "reasoning": "detailed explanation",
  "sentiment": "bullish" | "bearish" | "neutral",
  "riskLevel": "low" | "medium" | "high"
}

Consider:
- Current market price and volatility
- 24h price change and volume
- Risk management (max 2% of portfolio per trade)
- Existing positions and overall exposure
- Market sentiment and trends`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const responseText = response.choices[0].message.content || '{}';
      const analysis = JSON.parse(responseText);

      // Log the prompt and response
      const promptLog: PromptLog = {
        id: `prompt-${Date.now()}`,
        timestamp: new Date().toISOString(),
        prompt,
        response: responseText,
        model: 'gpt-4',
        tokensUsed: response.usage?.total_tokens || 0,
      };
      this.promptHistory.push(promptLog);

      // Create decision object
      const decision: AgentDecision = {
        id: `decision-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: analysis.action,
        symbol,
        reasoning: analysis.reasoning,
        confidence: analysis.confidence,
        marketData: {
          price: marketData.price,
          volume: marketData.volume,
          volatility: Math.abs(marketData.change24h),
        },
        sentiment: analysis.sentiment,
      };

      this.decisionHistory.push(decision);
      return decision;

    } catch (error) {
      console.error('Error analyzing market:', error);
      throw error;
    }
  }

  private buildAnalysisPrompt(
    symbol: string,
    marketData: MarketData,
    positions: Position[],
    existingPosition?: Position
  ): string {
    const totalPnL = positions.reduce((sum, p) => sum + p.pnl, 0);
    const portfolioValue = 10000; // This should come from account balance

    return `Analyze ${symbol} and provide a trading decision.

CURRENT MARKET DATA:
- Symbol: ${symbol}
- Current Price: $${marketData.price}
- 24h Change: ${marketData.change24h.toFixed(2)}%
- 24h Volume: $${marketData.volume.toLocaleString()}
- 24h High: $${marketData.high24h}
- 24h Low: $${marketData.low24h}
- Time: ${marketData.timestamp}

PORTFOLIO STATUS:
- Total Portfolio Value: $${portfolioValue.toLocaleString()}
- Active Positions: ${positions.length}
- Total P&L: $${totalPnL.toFixed(2)}

${existingPosition ? `
EXISTING POSITION IN ${symbol}:
- Side: ${existingPosition.side}
- Size: ${existingPosition.size}
- Entry Price: $${existingPosition.entryPrice}
- Current P&L: $${existingPosition.pnl.toFixed(2)} (${existingPosition.pnlPercentage.toFixed(2)}%)
- Duration: ${this.calculateDuration(existingPosition.openedAt)}
` : 'No existing position in this symbol.'}

Provide your analysis as a JSON object with action, confidence, reasoning, sentiment, and riskLevel.`;
  }

  private calculateDuration(openedAt: string): string {
    const opened = new Date(openedAt);
    const now = new Date();
    const diffMs = now.getTime() - opened.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} minutes`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days`;
  }

  async executeDecision(decision: AgentDecision): Promise<boolean> {
    try {
      const maxPositionSize = parseFloat(process.env.MAX_POSITION_SIZE || '1000');
      
      if (decision.action === 'buy' && decision.confidence > 70) {
        const result = await asterAPI.executeTrade({
          symbol: decision.symbol,
          side: 'buy',
          size: maxPositionSize / decision.marketData.price,
          type: 'market',
        });
        return result.success;
      }

      if (decision.action === 'sell' && decision.confidence > 70) {
        const positions = await asterAPI.getPositions();
        const position = positions.find(p => p.symbol === decision.symbol);
        
        if (position) {
          const result = await asterAPI.closePosition(position.id);
          return result.success;
        }
      }

      return false;
    } catch (error) {
      console.error('Error executing decision:', error);
      return false;
    }
  }

  getPromptHistory(): PromptLog[] {
    return [...this.promptHistory];
  }

  getDecisionHistory(): AgentDecision[] {
    return [...this.decisionHistory];
  }

  clearHistory(): void {
    this.promptHistory = [];
    this.decisionHistory = [];
  }
}

export default new TradingAgent();
// Unit feature implementation - 20250314_0013
// Unit feature implementation - 20250317_0015
// Unit feature implementation - 20250410_0053
// Unit feature implementation - 20250502_0100
// Unit feature implementation - 20250506_0104
// Unit feature implementation - 20250507_0105
// Unit feature implementation - 20250508_0109
// Unit feature implementation - 20250520_0131
// Unit feature implementation - 20250523_0139
// Unit feature implementation - 20250530_0149
// Unit feature implementation - 20250606_0162
