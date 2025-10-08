import { MongoClient } from 'mongodb'
import { products } from '../lib/products'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/candles'
const DB_NAME = process.env.DB_NAME || 'candles'

async function seedDatabase() {
    const client = new MongoClient(MONGODB_URI)

    try {
        await client.connect()
        console.log('Connected to MongoDB')

        const db = client.db(DB_NAME)
        const collection = db.collection('candles')

        // Clear existing data
        await collection.deleteMany({})
        console.log('Cleared existing candles')

        // Insert products
        const result = await collection.insertMany(products)
        console.log(`Inserted ${result.insertedCount} candles`)

        // Create indexes for better performance
        await collection.createIndex({ id: 1 }, { unique: true })
        await collection.createIndex({ category: 1 })
        await collection.createIndex({ featured: 1 })
        await collection.createIndex({ name: 'text', description: 'text' })

        console.log('Created indexes')
        console.log('Database seeded successfully!')

    } catch (error) {
        console.error('Error seeding database:', error)
    } finally {
        await client.close()
    }
}

// Run the seeding function
seedDatabase()