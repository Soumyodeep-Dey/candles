import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Leaf, Flame, Users } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Handcrafted with Love",
      description:
        "Every candle is carefully hand-poured in small batches, ensuring attention to detail and quality in each piece.",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainable Practices",
      description:
        "We use eco-friendly soy wax, cotton wicks, and recyclable packaging to minimize our environmental impact.",
    },
    {
      icon: <Flame className="h-8 w-8" />,
      title: "Premium Quality",
      description:
        "Only the finest natural fragrances and materials make it into our candles, creating long-lasting, clean burns.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Focused",
      description:
        "We believe in supporting local artisans and giving back to the communities that inspire our creations.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Born from a passion for creating moments of tranquility and warmth, Luminous Candles began as a small dream
            in a home kitchen and has grown into a beloved brand that brings light to homes across the country.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img src="/candle-making-process.png" alt="Candle making process" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold">The Beginning</h2>
            <p className="text-muted-foreground leading-relaxed">
              It all started in 2018 when our founder, Sarah, was searching for the perfect candle to create a cozy
              atmosphere in her new home. Disappointed by the synthetic fragrances and poor burn quality of store-bought
              options, she decided to learn the art of candle making herself.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What began as a hobby quickly became a passion. Friends and family were amazed by the quality and beauty
              of Sarah's handcrafted candles, encouraging her to share her creations with the world. Today, Luminous
              Candles continues to honor that original vision of creating exceptional candles that transform any space
              into a sanctuary.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from sourcing materials to crafting each candle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 lg:order-2">
            <h2 className="font-serif text-3xl font-bold">Our Process</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Sourcing</h4>
                  <p className="text-muted-foreground">
                    We carefully select premium soy wax and natural fragrance oils from trusted suppliers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Blending</h4>
                  <p className="text-muted-foreground">
                    Each fragrance is expertly blended to create unique, balanced scent profiles.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Hand-Pouring</h4>
                  <p className="text-muted-foreground">
                    Every candle is hand-poured in small batches to ensure quality and consistency.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Quality Testing</h4>
                  <p className="text-muted-foreground">
                    Each candle is tested for burn quality, scent throw, and overall performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:order-1">
            <img src="/artisan-workspace.png" alt="Artisan workspace" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-muted/30 rounded-lg p-12">
          <h2 className="font-serif text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To create exceptional candles that bring warmth, comfort, and joy to every home. We believe that the right
            candle can transform not just a space, but a moment—turning the ordinary into something magical. Through our
            commitment to quality, sustainability, and craftsmanship, we aim to light up lives one candle at a time.
          </p>
        </div>
      </div>
    </div>
  )
}
