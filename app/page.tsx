import { Navigation } from "@/components/navigation"
import { CustomerReviews } from "@/components/customer-reviews"
import { RecentlyViewed } from "@/components/recently-viewed" // Added recently viewed import
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Flame, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const collections = [
    {
      id: "scented",
      title: "Scented Collection",
      description: "Aromatic candles that transform your space with captivating fragrances",
      image: "/lavender-vanilla-candles.png",
      icon: <Sparkles className="h-6 w-6" />,
      itemCount: "24 candles",
    },
    {
      id: "decorative",
      title: "Decorative Collection",
      description: "Artfully crafted candles that serve as stunning centerpieces",
      image: "/elegant-pillar-candles.png",
      icon: <Heart className="h-6 w-6" />,
      itemCount: "18 candles",
    },
    {
      id: "seasonal",
      title: "Seasonal Collection",
      description: "Limited edition candles celebrating the beauty of each season",
      image: "/autumn-candles.png",
      icon: <Flame className="h-6 w-6" />,
      itemCount: "12 candles",
    },
  ]

  const features = [
    {
      title: "Hand-Poured Excellence",
      description: "Each candle is carefully hand-poured using premium soy wax for a clean, long-lasting burn.",
    },
    {
      title: "Natural Ingredients",
      description: "We use only natural fragrances and cotton wicks for a pure, toxin-free experience.",
    },
    {
      title: "Sustainable Practices",
      description: "Our eco-friendly approach includes recyclable packaging and sustainable sourcing.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Illuminate Your World with
            <span className="text-primary block mt-2">Luminous Candles</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover our handcrafted collection of premium candles, designed to create ambiance, evoke memories, and
            transform any space into a sanctuary of warmth and elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/products">
                Shop Collections <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/about">Learn Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      <RecentlyViewed />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Signature Collections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each collection tells a unique story, crafted with passion and attention to detail
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">{collection.icon}</div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-foreground">{collection.title}</h3>
                      <p className="text-sm text-muted-foreground">{collection.itemCount}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{collection.description}</p>
                  <Button asChild variant="ghost" className="w-full group-hover:bg-primary/5 transition-colors">
                    <Link href={`/products?category=${collection.id}`}>
                      Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Luminous Candles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality, sustainability, and artistry in every candle we create
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Flame className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their spaces with our candles
            </p>
          </div>
          <CustomerReviews />
        </div>
      </section>

      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Light Up Your Space?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Browse our complete collection and find the perfect candles to create your ideal ambiance
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/products">
              Shop All Candles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <div className="h-4 w-1 bg-primary-foreground rounded-full"></div>
            </div>
            <span className="font-serif text-xl font-bold text-foreground">Luminous Candles</span>
          </div>
          <p className="text-muted-foreground">© 2024 Luminous Candles. Handcrafted with love.</p>
        </div>
      </footer>
    </div>
  )
}
