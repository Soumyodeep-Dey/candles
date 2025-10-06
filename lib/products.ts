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
    id: "angel",
    name: "Angel",
    description:
      "A soothing blend of French lavender and vanilla that creates a peaceful, relaxing atmosphere perfect for unwinding after a long day.",
    price: 28.99,
    originalPrice: 34.99,
    images: ["https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353323/agenl_1_y3nuwd.webp", 
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353324/angel_2_c44kzg.webp"],
    category: "scented",
    scentType: "floral",
    size: "medium",
    burnTime: "45-50 hours",
    inStock: true,
    featured: true,
  },
  {
    id: "birthday",
    name: "Birthday",
    description:
      "An energizing combination of orange, lemon, and grapefruit that brightens any room with its fresh, invigorating scent.",
    price: 24.99,
    images: ["https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353325/birthday_1_lvhkdz.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353325/birthday_2_iatrkr.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353327/birthday_3_kcbmpl.webp"
    ],
    category: "scented",
    scentType: "citrus",
    size: "medium",
    burnTime: "40-45 hours",
    inStock: true,
  },
  {
    id: "five-flower",
    name: "Five Flower",
    description: "A delightful blend of five distinct floral fragrances that transport you to a blooming garden.",
    price: 32.99,
    images: ["https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353325/five_flower_1._rkogba.webp",
    ],
    category: "seasonal",
    scentType: "spicy",
    size: "large",
    burnTime: "60-65 hours",
    inStock: true,
    featured: true,
  },
  {
    id: "lotus",
    name: "Lotus",
    description: "A classic unscented pillar candle perfect for formal dining or creating sophisticated ambiance.",
    price: 18.99,
    images: ["https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353326/lotus_1_znkdms.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353323/lotus_2_agbndd.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353323/lotus_3_edf6ni.webp"
    ],
    category: "decorative",
    size: "large",
    burnTime: "50-55 hours",
    inStock: true,
  },
  {
    id: "packed-candles",
    name: "Packed Candles",
    description: "Rich Madagascar vanilla bean creates a warm, comforting atmosphere that feels like home.",
    price: 26.99,
    images: ["https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353323/pack_1_zm0ku5.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353322/pack_2_t9erpn.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353324/pack_3_ncohqe.webp"
    ],
    category: "scented",
    scentType: "vanilla",
    size: "medium",
    burnTime: "42-48 hours",
    inStock: true,
  },
  {
    id: "teddy-bear",
    name: "Teddy Bear",
    description: "A cozy and comforting scent that wraps you in warmth, like a hug from your favorite stuffed animal.",
    price: 35.99,
    images: ["https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353323/teddy_1_lvcnqw.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353324/teddy_2_tmxj1w.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353324/teddy_3_vlliba.webp"
    ],
    category: "scented",
    scentType: "woody",
    size: "large",
    burnTime: "55-60 hours",
    inStock: true,
  },
  {
    id: "two-flower",
    name: "Spring Garden",
    description: "Fresh jasmine and lily of the valley capture the essence of a blooming spring garden.",
    price: 29.99,
    images: ["https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353325/two_flower_1_z8c40w.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353326/two_flower_2_fr3mf5.webp"
    ],
    category: "seasonal",
    scentType: "floral",
    size: "medium",
    burnTime: "45-50 hours",
    inStock: true,
  },
  {
    id: "three-teddy-bears",
    name: "Three Teddy Bears",
    description: "A delightful trio of teddy bear candles, each with its own unique scent.",
    price: 45.99,
    images: ["https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353324/three_teddy_1_msf2z2.webp",
      "https://res.cloudinary.com/djoxmk3tk/image/upload/v1757353325/three_teddy_2_tro3uy.webp",
    ],
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
