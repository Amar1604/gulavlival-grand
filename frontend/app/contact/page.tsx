"use client";

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <div className="container">
                <h1 className={styles.title}>Get in Touch</h1>

                <div className={styles.grid}>
                    {/* Info Side */}
                    <div className={styles.infoCard}>
                        <h2>Contact Information</h2>
                        <div className={styles.infoItems}>
                            <div className={styles.item}>
                                <MapPin className={styles.icon} />
                                <div>
                                    <h3>Visit Us</h3>
                                    <p>123 Culinary Avenue<br />Foodie City, FC 90210</p>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <Phone className={styles.icon} />
                                <div>
                                    <h3>Call Us</h3>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <Mail className={styles.icon} />
                                <div>
                                    <h3>Email Us</h3>
                                    <p>hello@bigbite.com</p>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <Clock className={styles.icon} />
                                <div>
                                    <h3>Opening Hours</h3>
                                    <p>Monday - Friday: 8am - 10pm</p>
                                    <p>Saturday - Sunday: 9am - 11pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className={styles.formCard}>
                        <h2>Send us a Message</h2>
                        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); alert('Thank you for contacting us! We will get back to you shortly.'); }}>
                            <div className={styles.row}>
                                <Input placeholder="First Name" />
                                <Input placeholder="Last Name" />
                            </div>
                            <Input placeholder="Email Address" type="email" />
                            <Input placeholder="Subject" />
                            <textarea
                                className={styles.textarea}
                                placeholder="Your Message..."
                                rows={5}
                            />
                            <Button size="lg" fullWidth>Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
