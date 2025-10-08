import { NextRequest, NextResponse } from 'next/server'
import CandleService from '@/lib/candle-service'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const candle = await CandleService.getCandleById(id)

        if (!candle) {
            return NextResponse.json(
                { error: 'Candle not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(candle, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/candles/[id]:', error)
        return NextResponse.json(
            { error: 'Failed to fetch candle' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const updateData = await request.json()

        const updatedCandle = await CandleService.updateCandle(id, updateData)

        if (!updatedCandle) {
            return NextResponse.json(
                { error: 'Candle not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(updatedCandle, { status: 200 })
    } catch (error) {
        console.error('Error in PUT /api/candles/[id]:', error)
        return NextResponse.json(
            { error: 'Failed to update candle' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const deleted = await CandleService.deleteCandle(id)

        if (!deleted) {
            return NextResponse.json(
                { error: 'Candle not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Candle deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error in DELETE /api/candles/[id]:', error)
        return NextResponse.json(
            { error: 'Failed to delete candle' },
            { status: 500 }
        )
    }
}