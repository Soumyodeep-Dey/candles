"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Product, getAllProducts } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface RelatedProductsProps {
  currentProduct: Product
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const { dispatch } = useCart()
  const allProducts = getAllProducts()

  // Find related products based on category and scent type
  const relatedProducts = allProducts
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (product.category === currentProduct.category || product.scentType === currentProduct.scentType),
    )
    .slice(0, 4) // Show max 4 related products

  if (relatedProducts.length === 0) {
    return null
  }

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", product, quantity: 1 })
  }

  return (
    <div className="mt-16 border-t pt-12">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl font-bold mb-2">You Might Also Like</h2>
        <p className="text-muted-foreground">Discover more candles that complement your selection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-48 bg-gradient-to-br from-background to-muted">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Sale</Badge>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">(12)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  {product.scentType && (
                    <Badge variant="outline" className="text-xs">
                      {product.scentType}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </div>
  )
}
