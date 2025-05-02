import { NextResponse } from 'next/server';
import asterAPI from '@/lib/aster-api';

export async function GET() {
  try {
    const positions = await asterAPI.getPositions();
    return NextResponse.json({ positions });
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json({ positions: [] }, { status: 500 });
  }
}
// Unit feature implementation - 20250314_0011
// Unit feature implementation - 20250414_0056
// Unit feature implementation - 20250424_0079
// Unit feature implementation - 20250501_0097
// Unit feature implementation - 20250502_0098
