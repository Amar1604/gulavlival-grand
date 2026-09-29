"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, count } = useCart();
    const tax = total * 0.05; // 5% GST
    const deliveryFee = total > 350 || total === 0 ? 0 : 30;
    const finalTotal = total + tax + deliveryFee;

    if (items.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <div className="container text-center" style={{ padding: '4rem 1rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <ShoppingBag size={40} />
                    </div>
                    <h2>Your dining cart is empty</h2>
                    <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Looks like you haven't added any delicacies from our menu yet.</p>
                    <Link href="/menu">
                        <Button size="lg">Explore Gulavlival Menu</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className="container">
                <h1 className={styles.title}>Your Dining Order ({count} {count === 1 ? 'item' : 'items'})</h1>

                <div className={styles.layout}>
                    {/* Cart Items */}
                    <div className={styles.itemsList}>
                        {items.map((item) => {
                            const uniqueKey = item.cartItemId || item.id;
                            return (
                                <div key={uniqueKey} className={styles.cartItem}>
                                    <div className={styles.itemImageWrapper}>
                                        <Image src={item.image} alt={item.name} fill className={styles.itemImage} />
                                    </div>

                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemHeader}>
                                            <h3>{item.name}</h3>
                                            <span className={styles.price}>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className={styles.unitPrice}>₹{item.price.toFixed(2)} each</p>

                                        <div className={styles.itemActions}>
                                            <div className={styles.quantityControl}>
                                                <button
                                                    className={styles.qtyBtn}
                                                    onClick={() => updateQuantity(uniqueKey, -1)}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className={styles.qtyValue}>{item.quantity}</span>
                                                <button
                                                    className={styles.qtyBtn}
                                                    onClick={() => updateQuantity(uniqueKey, 1)}
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                className={styles.removeBtn}
                                                onClick={() => removeItem(uniqueKey)}
                                            >
                                                <Trash2 size={18} />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <Link href="/menu" className={styles.continueLink}>
                            <ArrowLeft size={16} /> Add More Items
                        </Link>
                    </div>

                    {/* Summary */}
                    <div className={styles.summary}>
                        <div className={styles.summaryCard}>
                            <h3>Bill Details</h3>

                            <div className={styles.summaryRow}>
                                <span>Item Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>GST (5%)</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Delivery / Packaging</span>
                                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
                            </div>

                            <div className={styles.divider} />

                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Grand Total</span>
                                <span>₹{finalTotal.toFixed(2)}</span>
                            </div>

                            <Link href="/checkout" style={{ width: '100%' }}>
                                <Button fullWidth size="lg" className={styles.checkoutBtn}>
                                    Proceed to Checkout <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
