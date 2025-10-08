"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { QuickViewModal } from "@/components/quick-view-modal"
import { type Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context" // Added wishlist hook
import { ShoppingCart, Filter, X, Eye, Search, Heart } from "lucide-react" // Added Heart icon
import Link from "next/link"
import Image from "next/image"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedScentType, setSelectedScentType] = useState<string>("all")
  const [selectedSize, setSelectedSize] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<number[]>([0, 50])
  const [showFilters, setShowFilters] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch('/api/candles')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const { dispatch } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist() // Added wishlist functions

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.scentType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())

      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
      const scentMatch = selectedScentType === "all" || product.scentType === selectedScentType
      const sizeMatch = selectedSize === "all" || product.size === selectedSize
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

      return searchMatch && categoryMatch && scentMatch && sizeMatch && priceMatch
    })
  }, [searchQuery, selectedCategory, selectedScentType, selectedSize, priceRange])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedScentType("all")
    setSelectedSize("all")
    setPriceRange([0, 50])
  }

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", product, quantity: 1 })
  }

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setIsQuickViewOpen(false)
    setQuickViewProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading candles...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground">Search & Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden hover:bg-accent"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div
                  className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"} lg:bg-card lg:p-6 lg:rounded-lg lg:border lg:shadow-sm`}
                >
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">Search Products</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search candles, scents, categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
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
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">Scent Type</label>
                    <Select value={selectedScentType} onValueChange={setSelectedScentType}>
                      <SelectTrigger className="w-full">
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
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">Size</label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger className="w-full">
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
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={50}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full bg-background hover:bg-accent transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">Our Candles</h1>
                <div className="flex items-center gap-4">
                  <p className="text-muted-foreground text-sm">
                    {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                    {searchQuery && ` found for "${searchQuery}"`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-border bg-card"
                  >
                    <div className="relative">
                      <Link href={`/products/${product.id}`}>
                        <div className="aspect-square overflow-hidden rounded-t-lg relative">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                              <svg
                                className="w-5 h-5 text-foreground"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`h-9 w-9 p-0 shadow-lg backdrop-blur-sm transition-colors ${isInWishlist(product.id)
                            ? "bg-red-50 hover:bg-red-100 text-red-600"
                            : "bg-white/95 hover:bg-white"
                            }`}
                          onClick={(e) => handleWishlistToggle(product, e)}
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-9 w-9 p-0 bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm"
                          onClick={(e) => handleQuickView(product, e)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-serif text-lg font-semibold hover:text-primary transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs font-medium">
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
                            <Badge variant="destructive" className="text-xs shrink-0">
                              Out of Stock
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg text-foreground">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => handleWishlistToggle(product, e)}
                              className={`shrink-0 lg:hidden ${isInWishlist(product.id)
                                ? "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                                : "hover:bg-accent"
                                }`}
                            >
                              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => handleQuickView(product, e)}
                              className="shrink-0 hover:bg-accent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              disabled={!product.inStock}
                              className="shrink-0 bg-primary hover:bg-primary/90"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                      {searchQuery ? (
                        <Search className="w-8 h-8 text-muted-foreground" />
                      ) : (
                        <Filter className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {searchQuery ? "No search results" : "No products found"}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery
                        ? `No products match "${searchQuery}". Try different keywords or clear your search.`
                        : "No products match your current filters. Try adjusting your search criteria."}
                    </p>
                    <Button variant="outline" onClick={clearFilters} className="bg-background hover:bg-accent">
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <QuickViewModal product={quickViewProduct} isOpen={isQuickViewOpen} onClose={closeQuickView} />
    </div>
  )
}
