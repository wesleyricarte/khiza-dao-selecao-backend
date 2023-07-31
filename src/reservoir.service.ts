/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ReservoirService {
  private baseUrl = 'https://api.reservoir.tools/collections/v6';
  private apiKey = process.env.RESERVOIR_API_KEY;

  async getCollections(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get collection from Reservoir API');
    }
  }
}
