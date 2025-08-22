"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "The lavender vanilla candle is absolutely divine! It fills my entire living room with the most relaxing scent. The quality is exceptional and it burns evenly for hours.",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment:
      "I bought the seasonal autumn collection and couldn't be happier. The craftsmanship is outstanding and the scents perfectly capture the essence of fall. Highly recommend!",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    comment:
      "These candles make the perfect gift! I've ordered multiple times for friends and family. The packaging is beautiful and the candles themselves are works of art.",
    location: "Austin, TX",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    comment:
      "As someone who's very particular about home fragrances, I can say these are the best candles I've ever purchased. Clean burn, amazing scents, and they last forever.",
    location: "Seattle, WA",
  },
  {
    id: 5,
    name: "Lisa Park",
    rating: 5,
    comment:
      "The decorative pillar candles are stunning centerpieces for my dining room. Even when not lit, they add such elegance to the space. The quality is unmatched.",
    location: "Chicago, IL",
  },
]

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="w-full flex-shrink-0">
              <Card className="mx-auto max-w-4xl border-border/50">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed font-medium">
                    &quot;{review.comment}&quot;
                  </blockquote>
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
