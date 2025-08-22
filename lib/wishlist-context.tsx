"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "./products"

interface WishlistState {
  items: Product[]
  itemCount: number
}

type WishlistAction =
  | { type: "ADD_TO_WISHLIST"; product: Product }
  | { type: "REMOVE_FROM_WISHLIST"; productId: string }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; items: Product[] }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.items.find((item) => item.id === action.product.id)) {
        return state // Already in wishlist
      }
      const newItems = [...state.items, action.product]
      return {
        items: newItems,
        itemCount: newItems.length,
      }

    case "REMOVE_FROM_WISHLIST":
      const filteredItems = state.items.filter((item) => item.id !== action.productId)
      return {
        items: filteredItems,
        itemCount: filteredItems.length,
      }

    case "CLEAR_WISHLIST":
      return {
        items: [],
        itemCount: 0,
      }

    case "LOAD_WISHLIST":
      return {
        items: action.items,
        itemCount: action.items.length,
      }

    default:
      return state
  }
}

const WishlistContext = createContext<{
  state: WishlistState
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
} | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0,
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", items })
      } catch (error) {
        console.error("Failed to load wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items))
  }, [state.items])

  const addToWishlist = (product: Product) => {
    dispatch({ type: "ADD_TO_WISHLIST", product })
  }

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", productId })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (productId: string) => {
    return state.items.some((item) => item.id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
