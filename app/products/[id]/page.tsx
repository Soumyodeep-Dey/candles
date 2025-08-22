"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getProductById } from "@/lib/products"
import { useCart } from "@/lib/cart-context" // Added cart hook
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { dispatch } = useCart() // Get cart dispatch function
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", product, quantity })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-20 overflow-hidden rounded-md border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-border"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="font-serif text-3xl font-bold">{product.name}</h1>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                {product.scentType && <Badge variant="outline">{product.scentType}</Badge>}
                <Badge variant="outline">{product.size}</Badge>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(24 reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>

            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Burn Time:</span>
                    <p className="text-muted-foreground">{product.burnTime}</p>
                  </div>
                  <div>
                    <span className="font-medium">Size:</span>
                    <p className="text-muted-foreground capitalize">{product.size}</p>
                  </div>
                  <div>
                    <span className="font-medium">Category:</span>
                    <p className="text-muted-foreground capitalize">{product.category}</p>
                  </div>
                  <div>
                    <span className="font-medium">Stock:</span>
                    <p className={product.inStock ? "text-green-600" : "text-red-600"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={handleAddToCart} // Added click handler
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button variant="outline" size="lg">
                  Buy Now
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-serif text-lg font-semibold mb-3">Product Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Hand-poured with premium soy wax</li>
                <li>• Cotton wick for clean burning</li>
                <li>• Natural fragrance oils</li>
                <li>• Reusable glass container</li>
                <li>• Made in small batches</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
