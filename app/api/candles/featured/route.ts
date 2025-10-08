import { NextResponse } from 'next/server'
import CandleService from '@/lib/candle-service'

export async function GET() {
    try {
        const featuredCandles = await CandleService.getFeaturedCandles()
        return NextResponse.json(featuredCandles, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/candles/featured:', error)
        return NextResponse.json(
            { error: 'Failed to fetch featured candles' },
            { status: 500 }
        )
    }
}