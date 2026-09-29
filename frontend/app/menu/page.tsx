"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, Star, ShoppingBag, Check } from 'lucide-react';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { MENU_ITEMS, CATEGORIES, Category, MenuItem, MenuVariant } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"popular" | "price_asc" | "price_desc">("popular");
    const [selectedVariants, setSelectedVariants] = useState<Record<string, MenuVariant>>({});
    const [addedAlert, setAddedAlert] = useState<string | null>(null);

    const { addItem } = useCart();

    const filteredItems = useMemo(() => {
        return MENU_ITEMS.filter(item => {
            const matchesCategory = activeCategory === "All" || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        }).sort((a, b) => {
            if (sortBy === "price_asc") return a.price - b.price;
            if (sortBy === "price_desc") return b.price - a.price;
            return b.rating - a.rating;
        });
    }, [activeCategory, searchQuery, sortBy]);

    const handleSelectVariant = (itemId: string, variant: MenuVariant) => {
        setSelectedVariants(prev => ({
            ...prev,
            [itemId]: variant
        }));
    };

    const handleAddToCart = (item: MenuItem) => {
        const variant = selectedVariants[item.id] || (item.variants && item.variants.length > 0 ? item.variants[0] : undefined);
        addItem(item, variant);
        
        const label = variant ? `${item.name} (${variant.name})` : item.name;
        setAddedAlert(label);
        setTimeout(() => setAddedAlert(null), 2500);
    };

    return (
        <div className={styles.container}>
            {/* Added Toast Notification */}
            {addedAlert && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 9999,
                    fontWeight: 500,
                    animation: 'fadeIn 0.2s ease-in-out'
                }}>
                    <Check size={18} /> Added "{addedAlert}" to cart!
                </div>
            )}

            {/* Header */}
            <div className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Gulavlival Grand Dining Menu</h1>
                    <p className={styles.subtitle}>Handcrafted pizzas, artisan snacks, wok specialties & refreshments.</p>

                    <div className={styles.controls}>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Search menu (e.g. Paneer Makhani, Maggi, Kulhad Tea)..."
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className={styles.sortWrapper}>
                            <SlidersHorizontal size={20} />
                            <select
                                className={styles.sortSelect}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                            >
                                <option value="popular">Popularity</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Categories */}
                <div className={styles.categories}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`${styles.categoryBtn} ${activeCategory === cat ? styles.activeCat : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => {
                            const activeVariant = selectedVariants[item.id] || (item.variants && item.variants.length > 0 ? item.variants[0] : null);
                            const currentPrice = activeVariant ? activeVariant.price : item.price;

                            return (
                                <Card key={item.id} hover className={styles.itemCard}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className={styles.itemImage}
                                        />
                                        {item.veg ?
                                            <span className={styles.vegBadge}>Veg</span> :
                                            <span className={styles.nonVegBadge}>Non-Veg</span>
                                        }
                                    </div>
                                    <div className={styles.itemContent}>
                                        <div className={styles.itemHeader}>
                                            <h3>{item.name}</h3>
                                            <span className={styles.price}>₹{currentPrice}</span>
                                        </div>
                                        <p className={styles.itemDesc}>{item.description}</p>

                                        {/* Variants Selector */}
                                        {item.variants && item.variants.length > 0 && (
                                            <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    Select Size / Portion:
                                                </span>
                                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                                                    {item.variants.map((v) => {
                                                        const isSelected = activeVariant?.id === v.id;
                                                        return (
                                                            <button
                                                                key={v.id}
                                                                type="button"
                                                                onClick={() => handleSelectVariant(item.id, v)}
                                                                style={{
                                                                    padding: '4px 8px',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: isSelected ? 600 : 400,
                                                                    borderRadius: '6px',
                                                                    border: isSelected ? '1.5px solid #d97706' : '1px solid #e5e7eb',
                                                                    backgroundColor: isSelected ? '#fef3c7' : '#ffffff',
                                                                    color: isSelected ? '#92400e' : '#374151',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.15s ease'
                                                                }}
                                                            >
                                                                {v.name} • ₹{v.price}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        <div className={styles.itemFooter}>
                                            <div className={styles.rating}>
                                                <Star size={16} fill="#F59E0B" stroke="#F59E0B" />
                                                <span>{item.rating}</span>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleAddToCart(item)}
                                                className={styles.addBtn}
                                            >
                                                <ShoppingBag size={16} /> Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })
                    ) : (
                        <div className={styles.noResults}>
                            <h3>No dishes found</h3>
                            <p>Try searching for pizza, maggi, chowmein, or shakes.</p>
                            <Button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}>
                                Reset Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
