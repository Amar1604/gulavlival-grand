"use client";

import React, { useState, useEffect } from 'react';
import { Check, Truck, ChefHat, Package, MapPin } from 'lucide-react';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const STEPS = [
    { id: 1, label: "Order Received", icon: Package },
    { id: 2, label: "Preparing", icon: ChefHat },
    { id: 3, label: "Out for Delivery", icon: Truck },
    { id: 4, label: "Delivered", icon: MapPin },
];

export default function OrderTrackingPage() {
    const [currentStep, setCurrentStep] = useState(1);

    // Simulate progress
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep(prev => (prev < 4 ? prev + 1 : prev));
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.container}>
            <div className="container">
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1>Order #2048</h1>
                        <span className={styles.estimated}>Estimated Delivery: 25 mins</span>
                    </div>

                    <div className={styles.tracker}>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                            />
                        </div>

                        <div className={styles.steps}>
                            {STEPS.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = step.id <= currentStep;
                                const isCurrent = step.id === currentStep;

                                return (
                                    <div
                                        key={step.id}
                                        className={`${styles.step} ${isActive ? styles.active : ''} ${isCurrent ? styles.current : ''}`}
                                    >
                                        <div className={styles.iconWrapper}>
                                            {isActive ? <Check size={18} /> : <Icon size={18} />}
                                        </div>
                                        <span className={styles.label}>{step.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.infoBlock}>
                            <h3>Delivery To</h3>
                            <p>Home (John Doe)</p>
                            <p>123 Street Name, City</p>
                        </div>
                        <div className={styles.infoBlock}>
                            <h3>Order Items</h3>
                            <p>2x Artisan Cappuccino</p>
                            <p>1x Avocado Toast</p>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button variant="outline">Call Driver</Button>
                        <Link href="/menu">
                            <Button>Order More</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
