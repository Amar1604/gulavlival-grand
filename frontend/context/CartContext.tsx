"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MenuItem, MenuVariant } from '@/lib/data';

export interface CartItem extends MenuItem {
    quantity: number;
    cartItemId: string;
    selectedVariant?: MenuVariant;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: MenuItem, variant?: MenuVariant) => void;
    removeItem: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, delta: number) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('gulavlival-cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('gulavlival-cart', JSON.stringify(items));
        }
    }, [items, isInitialized]);

    const addItem = (item: MenuItem, variant?: MenuVariant) => {
        const cartItemId = variant ? `${item.id}-${variant.id}` : item.id;
        const itemPrice = variant ? variant.price : item.price;
        const itemName = variant ? `${item.name} (${variant.name})` : item.name;

        setItems(current => {
            const existing = current.find(i => i.cartItemId === cartItemId || i.id === cartItemId);
            if (existing) {
                return current.map(i =>
                    (i.cartItemId === cartItemId || i.id === cartItemId)
                        ? { ...i, quantity: i.quantity + 1 } 
                        : i
                );
            }
            return [
                ...current, 
                { 
                    ...item, 
                    name: itemName,
                    price: itemPrice, 
                    quantity: 1, 
                    cartItemId,
                    selectedVariant: variant 
                }
            ];
        });
    };

    const removeItem = (cartItemId: string) => {
        setItems(current => current.filter(i => (i.cartItemId || i.id) !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, delta: number) => {
        setItems(current => {
            return current.map(i => {
                if ((i.cartItemId || i.id) === cartItemId) {
                    const newQty = i.quantity + delta;
                    return newQty > 0 ? { ...i, quantity: newQty } : i;
                }
                return i;
            });
        });
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const count = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
