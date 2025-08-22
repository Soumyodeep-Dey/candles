"use client"

import { useRecentlyViewed } from "@/lib/recently-viewed-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import Link from "next/link"
import Image from "next/image"

export function RecentlyViewed() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed()
  const { dispatch } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  if (recentlyViewed.length === 0) {
    return null
  }

  const allowedSizes = ["small", "medium", "large"] as const;
  type Size = typeof allowedSizes[number];
  type Product = {
    id: string;
    name: string;
    image?: string;
    category: "scented" | "decorative" | "seasonal";
    scentType?: string;
    price: number;
    inStock: boolean;
    description: string;
    images: string[];
    size: Size;
    burnTime: string;
    // Add other properties as needed
  };

  const handleAddToCart = (product: Product) => {
    const allowedScentTypes = [
      "floral",
      "citrus",
      "woody",
      "vanilla",
      "fresh",
      "spicy",
    ] as const;

    const mappedProduct = {
      ...product,
      scentType: product.scentType && allowedScentTypes.includes(product.scentType as typeof allowedScentTypes[number])
        ? (product.scentType as typeof allowedScentTypes[number])
        : undefined,
      size: product.size && allowedSizes.includes(product.size as Size)
        ? (product.size as Size)
        : "small" as Size, // fallback to a default size if not valid
    };
    dispatch({ type: "ADD_ITEM", product: mappedProduct, quantity: 1 });
  }

  const allowedScentTypes = [
    "floral",
    "citrus",
    "woody",
    "vanilla",
    "fresh",
    "spicy",
  ] as const;

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      // Ensure scentType and size match the allowed union types
      const mappedProduct = {
        ...product,
        scentType: product.scentType && allowedScentTypes.includes(product.scentType as typeof allowedScentTypes[number])
          ? (product.scentType as typeof allowedScentTypes[number])
          : undefined,
        size: product.size && allowedSizes.includes(product.size as Size)
          ? (product.size as Size)
          : "small" as Size, // fallback to a default size if not valid
      };
      addToWishlist(mappedProduct);
    }
  }

  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-2">Recently Viewed</h2>
            <p className="text-muted-foreground">Products you&apos;ve recently explored</p>
          </div>
          <Button variant="outline" onClick={clearRecentlyViewed} className="text-sm bg-transparent">
            Clear History
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewed.slice(0, 4).map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <Heart
                      className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-600 text-red-600" : "text-gray-600"}`}
                    />
                  </Button>
                </div>
                <Badge className="absolute top-3 left-3 bg-primary/90">
                  <Eye className="h-3 w-3 mr-1" />
                  Recently Viewed
                </Badge>
              </div>
              <CardContent className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-serif font-semibold mb-2 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mb-3">
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
                  <span className="font-serif text-lg font-bold">${product.price}</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="h-8"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recentlyViewed.length > 4 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Showing 4 of {recentlyViewed.length} recently viewed products</p>
            <Button variant="outline" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
