import mongoose, { Schema, Document } from 'mongoose'

export interface ICandle extends Document {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    images: string[]
    category: "scented" | "decorative" | "seasonal"
    scentType?: "floral" | "citrus" | "woody" | "vanilla" | "fresh" | "spicy"
    size: "small" | "medium" | "large"
    burnTime: string
    inStock: boolean
    featured?: boolean
    createdAt: Date
    updatedAt: Date
}

const CandleSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: false
    },
    images: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        enum: ["scented", "decorative", "seasonal"],
        required: true
    },
    scentType: {
        type: String,
        enum: ["floral", "citrus", "woody", "vanilla", "fresh", "spicy"],
        required: false
    },
    size: {
        type: String,
        enum: ["small", "medium", "large"],
        required: true
    },
    burnTime: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true
    },
    featured: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
})

// Create or get the model
export const Candle = mongoose.models.Candle || mongoose.model<ICandle>('Candle', CandleSchema)