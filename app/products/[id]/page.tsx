"use client"

import { useState, useEffect, use } from "react"
import { Navigation } from "@/components/navigation"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { type Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useRecentlyViewed } from "@/lib/recently-viewed-context"
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { RelatedProducts } from "@/components/related-products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  // Migration-safe: handle both Promise and object for params
  let id: string
  if (typeof (params as unknown as Promise<{ id: string }>).then === "function") {
    id = use(params as unknown as Promise<{ id: string }>).id
  } else {
    id = (params as { id: string }).id
  }

  const { dispatch } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed()

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await fetch(`/api/candles/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
          }
          throw new Error('Failed to fetch product')
        }
        const productData = await response.json()
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product)
    }
  }, [product, addToRecentlyViewed]) // Added missing dependency

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", product, quantity })
    }
  }

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading product...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
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
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="font-serif text-3xl font-bold">{product.name}</h1>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className={`transition-colors ${isInWishlist(product.id)
                      ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                      : "hover:text-red-600 hover:bg-red-50"
                      }`}
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
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
                <Button size="lg" className="flex-1" disabled={!product.inStock} onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={`${isInWishlist(product.id)
                    ? "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                    : "hover:bg-accent"
                    }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
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

        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  )
}
