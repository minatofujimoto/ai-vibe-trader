import { NextResponse } from 'next/server';
import tradingAgent from '@/lib/trading-agent';

export async function GET() {
  try {
    const prompts = tradingAgent.getPromptHistory();
    return NextResponse.json({ prompts });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json({ prompts: [] }, { status: 500 });
  }
}
// Unit feature implementation - 20250407_0045
