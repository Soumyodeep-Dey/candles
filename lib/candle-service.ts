import { MongoClient, Db, Collection } from 'mongodb'
import { Product } from './products'

const MONGODB_URI = process.env.MONGODB_URI!
const DB_NAME = process.env.DB_NAME || 'candles'

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(MONGODB_URI)
        globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(MONGODB_URI)
    clientPromise = client.connect()
}

async function getDatabase(): Promise<Db> {
    const client = await clientPromise
    return client.db(DB_NAME)
}

async function getCandlesCollection(): Promise<Collection<Product>> {
    const db = await getDatabase()
    return db.collection<Product>('candles')
}

export class CandleService {
    static async getAllCandles(): Promise<Product[]> {
        try {
            const collection = await getCandlesCollection()
            const candles = await collection.find({}).toArray()
            return candles
        } catch (error) {
            console.error('Error fetching candles:', error)
            throw new Error('Failed to fetch candles')
        }
    }

    static async getCandleById(id: string): Promise<Product | null> {
        try {
            const collection = await getCandlesCollection()
            const candle = await collection.findOne({ id })
            return candle
        } catch (error) {
            console.error('Error fetching candle by ID:', error)
            throw new Error('Failed to fetch candle')
        }
    }

    static async createCandle(candleData: Product): Promise<Product> {
        try {
            const collection = await getCandlesCollection()
            await collection.insertOne(candleData)
            return candleData
        } catch (error) {
            console.error('Error creating candle:', error)
            throw new Error('Failed to create candle')
        }
    }

    static async updateCandle(id: string, updateData: Partial<Product>): Promise<Product | null> {
        try {
            const collection = await getCandlesCollection()
            const result = await collection.findOneAndUpdate(
                { id },
                { $set: updateData },
                { returnDocument: 'after' }
            )
            return result
        } catch (error) {
            console.error('Error updating candle:', error)
            throw new Error('Failed to update candle')
        }
    }

    static async deleteCandle(id: string): Promise<boolean> {
        try {
            const collection = await getCandlesCollection()
            const result = await collection.deleteOne({ id })
            return result.deletedCount > 0
        } catch (error) {
            console.error('Error deleting candle:', error)
            throw new Error('Failed to delete candle')
        }
    }

    static async getFeaturedCandles(): Promise<Product[]> {
        try {
            const collection = await getCandlesCollection()
            const candles = await collection.find({ featured: true }).toArray()
            return candles
        } catch (error) {
            console.error('Error fetching featured candles:', error)
            throw new Error('Failed to fetch featured candles')
        }
    }

    static async getCandlesByCategory(category: string): Promise<Product[]> {
        try {
            const collection = await getCandlesCollection()
            const candles = await collection.find({ category: category as any }).toArray()
            return candles
        } catch (error) {
            console.error('Error fetching candles by category:', error)
            throw new Error('Failed to fetch candles by category')
        }
    }

    static async searchCandles(query: string): Promise<Product[]> {
        try {
            const collection = await getCandlesCollection()
            const candles = await collection.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } },
                    { scentType: { $regex: query, $options: 'i' } }
                ]
            }).toArray()
            return candles
        } catch (error) {
            console.error('Error searching candles:', error)
            throw new Error('Failed to search candles')
        }
    }

    static async getCandlesByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
        try {
            const collection = await getCandlesCollection()
            const candles = await collection.find({
                price: { $gte: minPrice, $lte: maxPrice }
            }).toArray()
            return candles
        } catch (error) {
            console.error('Error fetching candles by price range:', error)
            throw new Error('Failed to fetch candles by price range')
        }
    }
}

export default CandleService