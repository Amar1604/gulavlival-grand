"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Footer.module.css';
import Button from './ui/Button';
import Input from './ui/Input';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.grid}`}>
                {/* Brand */}
                <div className={styles.brand}>
                    <h3 className={styles.logoText}>GULAVLIVAL GRAND</h3>
                    <p className={styles.tagline}>
                        Stay • Dine • Experience. An integrated hotel, dining, and luxury hospitality platform delivering memorable experiences.
                    </p>
                    <div className={styles.socials}>
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Links */}
                <div className={styles.section}>
                    <h4>Quick Links</h4>
                    <nav className={styles.nav}>
                        <Link href="/">Home</Link>
                        <Link href="/menu">Dining Menu</Link>
                        <Link href="/table-booking">Book a Table</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>
                </div>

                {/* Contact */}
                <div className={styles.section}>
                    <h4>Contact Us</h4>
                    <div className={styles.contactItem}>
                        <MapPin size={18} className={styles.icon} />
                        <span>Gulavlival Grand Resort & Restaurant, Main Road</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Phone size={18} className={styles.icon} />
                        <span>+91 98765 43210</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Mail size={18} className={styles.icon} />
                        <span>concierge@gulavlivalgrand.com</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Clock size={18} className={styles.icon} />
                        <span>Dining: 10:00 AM - 11:00 PM | Hotel: 24/7 Front Desk</span>
                    </div>
                </div>

                {/* Newsletter */}
                <div className={styles.section}>
                    <h4>Exclusive Offers</h4>
                    <p>Subscribe for exclusive staycation packages and chef's specials.</p>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <Input placeholder="Your email address" type="email" />
                        <Button size="sm" fullWidth>Subscribe</Button>
                    </form>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Gulavlival Grand. All rights reserved. Integrated Hospitality Platform.</p>
                </div>
            </div>
        </footer>
    );
}
