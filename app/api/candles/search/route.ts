import { NextRequest, NextResponse } from 'next/server'
import CandleService from '@/lib/candle-service'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get('q')

        if (!query) {
            return NextResponse.json(
                { error: 'Search query is required' },
                { status: 400 }
            )
        }

        const candles = await CandleService.searchCandles(query)
        return NextResponse.json(candles, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/candles/search:', error)
        return NextResponse.json(
            { error: 'Failed to search candles' },
            { status: 500 }
        )
    }
}