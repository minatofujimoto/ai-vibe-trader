import axios, { AxiosInstance } from 'axios';
import { TradeOrder, AsterAPIResponse, Position, MarketData } from '@/types/trading';

class AsterAPI {
  private client: AxiosInstance;
  private apiKey: string;
  private apiSecret: string;

  constructor() {
    this.apiKey = process.env.ASTER_API_KEY || '';
    this.apiSecret = process.env.ASTER_API_SECRET || '';
    
    this.client = axios.create({
      baseURL: process.env.ASTER_API_URL || 'https://api.aster.trading',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use((config) => {
      const timestamp = Date.now().toString();
      const signature = this.generateSignature(timestamp);
      
      config.headers['X-TIMESTAMP'] = timestamp;
      config.headers['X-SIGNATURE'] = signature;
      
      return config;
    });
  }

  private generateSignature(timestamp: string): string {
    // In a real implementation, this would use HMAC-SHA256 with the API secret
    // For now, this is a placeholder
    const crypto = require('crypto');
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(timestamp + this.apiKey)
      .digest('hex');
  }

  async getMarketData(symbol: string): Promise<MarketData> {
    try {
      const response = await this.client.get(`/v1/market/${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }

  async getPositions(): Promise<Position[]> {
    try {
      const response = await this.client.get('/v1/positions');
      return response.data.positions || [];
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [];
    }
  }

  async executeTrade(order: TradeOrder): Promise<AsterAPIResponse> {
    try {
      // Check if trading is enabled
      if (process.env.TRADING_ENABLED !== 'true') {
        console.log('SIMULATION MODE - Trade not executed:', order);
        return {
          success: true,
          data: {
            orderId: `sim-${Date.now()}`,
            status: 'simulated',
            order,
          },
        };
      }

      const response = await this.client.post('/v1/orders', order);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Error executing trade:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async closePosition(positionId: string): Promise<AsterAPIResponse> {
    try {
      if (process.env.TRADING_ENABLED !== 'true') {
        console.log('SIMULATION MODE - Position close not executed:', positionId);
        return {
          success: true,
          data: { positionId, status: 'simulated' },
        };
      }

      const response = await this.client.delete(`/v1/positions/${positionId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Error closing position:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getAccountBalance(): Promise<number> {
    try {
      const response = await this.client.get('/v1/account/balance');
      return response.data.balance || 0;
    } catch (error) {
      console.error('Error fetching account balance:', error);
      return 0;
    }
  }
}

export default new AsterAPI();
// Unit feature implementation - 20250314_0010
// Unit feature implementation - 20250325_0027
// Unit feature implementation - 20250408_0049
// Unit feature implementation - 20250411_0054
// Unit feature implementation - 20250423_0077
