"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Banknote, Smartphone, CheckCircle } from 'lucide-react';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const router = useRouter();
    const { total, clearCart, items } = useCart();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const tax = total * 0.05; // 5% GST
    const deliveryFee = total > 350 || total === 0 ? 0 : 30;
    const finalTotal = total + tax + deliveryFee;

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate order placement
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setSuccess(true);
        clearCart();

        setTimeout(() => {
            router.push('/order-tracking');
        }, 2000);
    };

    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
        if (items.length === 0 && !success) {
            router.push('/menu');
        }
    }, [items.length, success, router]);

    if (!isMounted || (items.length === 0 && !success)) {
        return null;
    }

    if (success) {
        return (
            <div className={styles.successContainer}>
                <CheckCircle size={64} color="#10B981" />
                <h1>Order Placed Successfully!</h1>
                <p>Gulavlival Grand kitchen has received your order and is preparing it fresh.</p>
                <p>Redirecting to live order status...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className="container">
                <Link href="/cart" className={styles.backLink}>
                    <ArrowLeft size={16} /> Back to Cart
                </Link>

                <h1 className={styles.title}>Checkout & Dining Confirmation</h1>

                <div className={styles.layout}>
                    <form className={styles.form} onSubmit={handlePlaceOrder}>
                        <section className={styles.section}>
                            <h2>1. Guest & Service Details</h2>
                            <div className={styles.row}>
                                <Input label="Full Name" placeholder="Rajesh Kumar" required />
                                <Input label="Phone Number" placeholder="+91 98765 43210" required />
                            </div>
                            <div className={styles.row}>
                                <Input label="Table No. (if dine-in)" placeholder="Table 5" />
                                <Input label="Room No. (if hotel guest)" placeholder="Room 204" />
                            </div>
                            <Input label="Delivery / Dining Address" placeholder="Room/Table or Complete Street Address" required />
                            <Input label="Kitchen Notes / Special Requests" placeholder="e.g. Less spicy, extra oregano" />
                        </section>

                        <section className={styles.section}>
                            <h2>2. Payment Method</h2>
                            <div className={styles.paymentMethods}>
                                <label className={styles.paymentOption}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="UPI" 
                                        checked={paymentMethod === "UPI"} 
                                        onChange={() => setPaymentMethod("UPI")} 
                                    />
                                    <div className={styles.methodCard}>
                                        <Smartphone size={24} />
                                        <span>UPI (GPay / PhonePe)</span>
                                    </div>
                                </label>
                                <label className={styles.paymentOption}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="CARD" 
                                        checked={paymentMethod === "CARD"} 
                                        onChange={() => setPaymentMethod("CARD")} 
                                    />
                                    <div className={styles.methodCard}>
                                        <CreditCard size={24} />
                                        <span>Debit / Credit Card</span>
                                    </div>
                                </label>
                                <label className={styles.paymentOption}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="CASH" 
                                        checked={paymentMethod === "CASH"} 
                                        onChange={() => setPaymentMethod("CASH")} 
                                    />
                                    <div className={styles.methodCard}>
                                        <Banknote size={24} />
                                        <span>Cash / Pay at Counter</span>
                                    </div>
                                </label>
                            </div>

                            {paymentMethod === "CARD" && (
                                <div className={styles.cardDetails}>
                                    <Input label="Card Number" placeholder="4111 2222 3333 4444" />
                                    <div className={styles.row}>
                                        <Input label="Expiry" placeholder="MM/YY" />
                                        <Input label="CVV" placeholder="123" />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "UPI" && (
                                <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '1rem' }}>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#4b5563' }}>
                                        Instant UPI payment via QR code or VPA on order submission.
                                    </p>
                                </div>
                            )}
                        </section>

                        <Button
                            type="submit"
                            size="lg"
                            fullWidth
                            disabled={loading}
                            className={styles.submitBtn}
                        >
                            {loading ? 'Processing Order...' : `Confirm & Pay ₹${finalTotal.toFixed(2)}`}
                        </Button>
                    </form>

                    <div className={styles.summary}>
                        <div className={styles.summaryCard}>
                            <h3>Order Summary</h3>
                            <div className={styles.itemsScroll}>
                                {items.map(item => (
                                    <div key={item.cartItemId || item.id} className={styles.summaryItem}>
                                        <span className={styles.qty}>x{item.quantity}</span>
                                        <span className={styles.name}>{item.name}</span>
                                        <span className={styles.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.divider} />

                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
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

                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Total Amount</span>
                                <span>₹{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
