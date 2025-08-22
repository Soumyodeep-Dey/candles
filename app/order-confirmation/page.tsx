import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = `LUM-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your order. We&apos;ve received your request and will begin processing it shortly.
          </p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-left space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Number</h3>
                  <p className="font-mono text-lg">{orderNumber}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                  <div className="text-center">
                    <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">Processing</h4>
                    <p className="text-sm text-muted-foreground">1-2 business days</p>
                  </div>
                  <div className="text-center">
                    <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">Shipping</h4>
                    <p className="text-sm text-muted-foreground">3-5 business days</p>
                  </div>
                  <div className="text-center">
                    <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">Updates</h4>
                    <p className="text-sm text-muted-foreground">Via email</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <div>
              <Button variant="outline" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
