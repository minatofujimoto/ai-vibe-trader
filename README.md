# AI Vibe Trader 

An autonomous AI-powered trading agent that executes live trades via the Aster API. The system features a comprehensive dashboard displaying the agent's decision-making logic, prompt history, and active positions.

![AI Vibe Trader](https://img.shields.io/badge/AI-Trading-blue) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green)

##  Features

- **AI-Powered Trading**: Uses GPT-4 to analyze market conditions and make trading decisions
- **Live Trade Execution**: Integrates with Aster API for real-time trade execution
- **Comprehensive Dashboard**: 
  - Real-time position tracking with P&L
  - AI decision history with confidence scores
  - Complete prompt/response logs from the LLM
  - Market sentiment analysis
- **Safety Features**: 
  - Simulation mode for testing
  - Risk management (configurable position sizes)
  - Confidence thresholds before execution
- **Modern UI**: Beautiful, responsive dashboard built with Next.js and Tailwind CSS

## Architecture

```

##  Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Aster API credentials (API key and secret)

### Installation

1. **Clone or navigate to the project**:
```bash
cd e:\aster
```

2. **Install dependencies** (already done):
```bash
npm install
```

3. **Configure environment variables**:

Edit `.env.local` with your credentials:

```env
# OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key-here

# Aster API Configuration
ASTER_API_KEY=your_aster_api_key_here
ASTER_API_SECRET=your_aster_api_secret_here
ASTER_API_URL=https://api.aster.trading

# Trading Configuration
TRADING_ENABLED=false  # Set to 'true' to enable live trading
MAX_POSITION_SIZE=1000  # Maximum USD per position
RISK_PERCENTAGE=2  # Max risk per trade as percentage
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

##  Dashboard Components

### 1. Positions Panel
- Shows all active trading positions
- Real-time P&L calculations
- Entry price vs current price
- Position reasoning from AI
- Win rate statistics

### 2. AI Decisions Panel
- Complete history of AI decisions
- Confidence scores with visual indicators
- Market sentiment (bullish/bearish/neutral)
- Detailed reasoning for each decision
- Market data snapshot at decision time

### 3. Prompts Panel
- Full prompt history sent to GPT-4
- Complete LLM responses
- Token usage tracking
- Timestamps for audit trail
- Model information

### 4. Agent Controls
- Start/Stop the trading agent
- Refresh data manually
- Agent status indicator

##  How the AI Agent Works

1. **Market Analysis**: The agent fetches current market data from Aster API
2. **AI Processing**: Sends market data + portfolio status to GPT-4 for analysis
3. **Decision Making**: GPT-4 returns a structured decision with:
   - Action: buy/sell/hold/close
   - Confidence score (0-100)
   - Detailed reasoning
   - Sentiment analysis
   - Risk assessment
4. **Execution**: If confidence > 70%, the agent executes the trade via Aster API
5. **Logging**: All prompts, responses, and decisions are logged for transparency

##  Safety & Risk Management

- **Simulation Mode**: Test the agent without real trades (TRADING_ENABLED=false)
- **Position Limits**: Configurable maximum position size
- **Confidence Threshold**: Only executes trades with >70% confidence
- **Risk Percentage**: Limits risk per trade (default 2%)
- **Complete Audit Trail**: All decisions and prompts are logged

##  API Routes

- `GET /api/positions` - Fetch current positions
- `GET /api/decisions` - Get AI decision history
- `GET /api/prompts` - Get prompt/response logs
- `POST /api/agent/analyze` - Trigger market analysis for a symbol
- `GET /api/demo` - Get demo data for testing

##  Usage Example

### Start the Agent

1. Configure your API keys in `.env.local`
2. Start in simulation mode first (TRADING_ENABLED=false)
3. Click "Start Agent" in the dashboard
4. The agent will begin analyzing markets and logging decisions
5. Review the decisions and prompts before enabling live trading

### Enable Live Trading

 **Warning**: Only enable after thorough testing in simulation mode

1. Set `TRADING_ENABLED=true` in `.env.local`
2. Ensure your Aster API has sufficient balance
3. Monitor the dashboard closely
4. Start with small position sizes

##  Demo Mode

To test the UI without API credentials:

```bash
# Leave API keys blank or use dummy values
# The system will work with mock data
npm run dev
```

Visit `/api/demo` to see sample data.

##  Customization

### Modify Trading Strategy

Edit `lib/trading-agent.ts`:
- Adjust the system prompt for different trading styles
- Modify confidence thresholds
- Change risk management parameters
- Add technical indicators to the analysis

### Customize Dashboard

Edit components in `components/`:
- Add new panels or charts
- Modify color schemes in Tailwind classes
- Add real-time updates with WebSockets
- Integrate additional data sources

##  Troubleshooting

### Agent not making trades
- Check TRADING_ENABLED in .env.local
- Verify confidence scores are > 70%
- Check API credentials
- Review console logs for errors

### API errors
- Verify Aster API credentials
- Check API endpoint URL
- Ensure sufficient account balance
- Review rate limits

### Missing data in dashboard
- Ensure agent is running
- Check browser console for errors
- Verify API routes are working
- Try the demo endpoint: /api/demo

##  License

MIT License - Feel free to use and modify!

##  Disclaimer

This is an experimental trading system. Trading cryptocurrencies involves significant risk. Only use this with funds you can afford to lose. The authors are not responsible for any financial losses.

##  Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---
 Next.js, TypeScript, GPT-4, and the Aster API
<!-- Unit feature - 20250313_0008 -->
<!-- Unit feature - 20250326_0031 -->
<!-- Unit feature - 20250328_0037 -->
<!-- Unit feature - 20250416_0065 -->
<!-- Unit feature - 20250418_0070 -->
<!-- Unit feature - 20250523_0136 -->
