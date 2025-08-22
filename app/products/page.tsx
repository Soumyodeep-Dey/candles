"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { products, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context" // Added cart hook
import { ShoppingCart, Filter, X } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedScentType, setSelectedScentType] = useState<string>("all")
  const [selectedSize, setSelectedSize] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<number[]>([0, 50])
  const [showFilters, setShowFilters] = useState(false)

  const { dispatch } = useCart() // Get cart dispatch function

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
      const scentMatch = selectedScentType === "all" || product.scentType === selectedScentType
      const sizeMatch = selectedSize === "all" || product.size === selectedSize
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

      return categoryMatch && scentMatch && sizeMatch && priceMatch
    })
  }, [selectedCategory, selectedScentType, selectedSize, priceRange])

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedScentType("all")
    setSelectedSize("all")
    setPriceRange([0, 50])
  }

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", product, quantity: 1 })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="scented">Scented</SelectItem>
                    <SelectItem value="decorative">Decorative</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Scent Type Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">Scent Type</label>
                <Select value={selectedScentType} onValueChange={setSelectedScentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scents</SelectItem>
                    <SelectItem value="floral">Floral</SelectItem>
                    <SelectItem value="citrus">Citrus</SelectItem>
                    <SelectItem value="woody">Woody</SelectItem>
                    <SelectItem value="vanilla">Vanilla</SelectItem>
                    <SelectItem value="fresh">Fresh</SelectItem>
                    <SelectItem value="spicy">Spicy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Size Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={50} min={0} step={1} className="w-full" />
              </div>

              <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-3xl font-bold">Our Candles</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-serif text-lg font-semibold hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          {product.scentType && (
                            <Badge variant="outline" className="text-xs">
                              {product.scentType}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {!product.inStock && (
                        <Badge variant="destructive" className="text-xs">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        disabled={!product.inStock}
                        className="shrink-0"
                        onClick={() => handleAddToCart(product)} // Added click handler
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products match your current filters.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
