export interface Product {
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
}

export const products: Product[] = [
  {
    id: "lavender-dreams",
    name: "Lavender Dreams",
    description:
      "A soothing blend of French lavender and vanilla that creates a peaceful, relaxing atmosphere perfect for unwinding after a long day.",
    price: 28.99,
    originalPrice: 34.99,
    images: ["/lavender-candle-detail.png", "/lavender-candle-lit.png"],
    category: "scented",
    scentType: "floral",
    size: "medium",
    burnTime: "45-50 hours",
    inStock: true,
    featured: true,
  },
  {
    id: "citrus-burst",
    name: "Citrus Burst",
    description:
      "An energizing combination of orange, lemon, and grapefruit that brightens any room with its fresh, invigorating scent.",
    price: 24.99,
    images: ["/citrus-candle-detail.png"],
    category: "scented",
    scentType: "citrus",
    size: "medium",
    burnTime: "40-45 hours",
    inStock: true,
  },
  {
    id: "autumn-spice",
    name: "Autumn Spice",
    description: "Warm cinnamon, nutmeg, and clove create the perfect seasonal ambiance for cozy fall evenings.",
    price: 32.99,
    images: ["/autumn-spice-candle.png"],
    category: "seasonal",
    scentType: "spicy",
    size: "large",
    burnTime: "60-65 hours",
    inStock: true,
    featured: true,
  },
  {
    id: "elegant-pillar-white",
    name: "Elegant White Pillar",
    description: "A classic unscented pillar candle perfect for formal dining or creating sophisticated ambiance.",
    price: 18.99,
    images: ["/white-pillar-candle.png"],
    category: "decorative",
    size: "large",
    burnTime: "50-55 hours",
    inStock: true,
  },
  {
    id: "vanilla-bean",
    name: "Vanilla Bean Bliss",
    description: "Rich Madagascar vanilla bean creates a warm, comforting atmosphere that feels like home.",
    price: 26.99,
    images: ["/vanilla-candle-detail.png"],
    category: "scented",
    scentType: "vanilla",
    size: "medium",
    burnTime: "42-48 hours",
    inStock: true,
  },
  {
    id: "cedar-sandalwood",
    name: "Cedar & Sandalwood",
    description: "A sophisticated woody blend that brings the tranquility of a forest retreat to your space.",
    price: 35.99,
    images: ["/cedar-sandalwood-candle.png"],
    category: "scented",
    scentType: "woody",
    size: "large",
    burnTime: "55-60 hours",
    inStock: true,
  },
  {
    id: "spring-garden",
    name: "Spring Garden",
    description: "Fresh jasmine and lily of the valley capture the essence of a blooming spring garden.",
    price: 29.99,
    images: ["/spring-garden-candle.png"],
    category: "seasonal",
    scentType: "floral",
    size: "medium",
    burnTime: "45-50 hours",
    inStock: false,
  },
  {
    id: "mini-tea-lights",
    name: "Tea Light Collection",
    description: "Set of 12 unscented tea lights perfect for creating intimate lighting or floating displays.",
    price: 15.99,
    images: ["/tea-lights-collection.png"],
    category: "decorative",
    size: "small",
    burnTime: "4-5 hours each",
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getAllProducts(): Product[] {
  return products
}
