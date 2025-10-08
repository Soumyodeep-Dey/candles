import { NextRequest, NextResponse } from 'next/server'
import CandleService from '@/lib/candle-service'

export async function GET() {
    try {
        const candles = await CandleService.getAllCandles()
        return NextResponse.json(candles, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/candles:', error)
        return NextResponse.json(
            { error: 'Failed to fetch candles' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const candleData = await request.json()
        const newCandle = await CandleService.createCandle(candleData)
        return NextResponse.json(newCandle, { status: 201 })
    } catch (error) {
        console.error('Error in POST /api/candles:', error)
        return NextResponse.json(
            { error: 'Failed to create candle' },
            { status: 500 }
        )
    }
}