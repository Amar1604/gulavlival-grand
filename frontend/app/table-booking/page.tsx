"use client";

import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function TableBookingPage() {
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
    };

    if (success) {
        return (
            <div className={styles.successContainer}>
                <CheckCircle size={64} color="#10B981" />
                <h1>Table Reserved!</h1>
                <p>We've sent a confirmation email to you.</p>
                <p>We look forward to hosting you.</p>
                <Link href="/">
                    <Button>Back Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.imageSide} />
                    <div className={styles.formSide}>
                        <h1>Book a Table</h1>
                        <p className={styles.subtitle}>Reserve your spot for an unforgettable dining experience.</p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <Calendar size={18} className={styles.icon} />
                                    <Input type="date" required className={styles.inputWithIcon} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <Clock size={18} className={styles.icon} />
                                    <Input type="time" required className={styles.inputWithIcon} />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <Users size={18} className={styles.icon} />
                                <select className={styles.select} required>
                                    <option value="">Number of Guests</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <option key={n} value={n}>{n} People</option>
                                    ))}
                                    <option value="more">More (Call us)</option>
                                </select>
                            </div>

                            <Input placeholder="Full Name" required />
                            <Input placeholder="Phone Number" type="tel" required />
                            <Input placeholder="Special Request (Optional)" />

                            <Button type="submit" size="lg" fullWidth>Confirm Reservation</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
