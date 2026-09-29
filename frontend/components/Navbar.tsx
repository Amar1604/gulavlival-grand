"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Search, Sparkles, Calendar } from 'lucide-react';
import styles from './Navbar.module.css';
import Button from './ui/Button';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { count } = useCart();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContainer}`}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <Sparkles className={styles.logoIcon} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={styles.logoText}>GULAVLIVAL GRAND</span>
                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, color: 'var(--primary, #d97706)' }}>
                            Stay • Dine • Experience
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>Home</Link>
                    <Link href="/menu" className={`${styles.navLink} ${pathname === '/menu' ? styles.active : ''}`}>Dining Menu</Link>
                    <Link href="/table-booking" className={`${styles.navLink} ${pathname === '/table-booking' ? styles.active : ''}`}>Table Booking</Link>
                    <Link href="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>About</Link>
                    <Link href="/gallery" className={`${styles.navLink} ${pathname === '/gallery' ? styles.active : ''}`}>Gallery</Link>
                    <Link href="/contact" className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}>Contact</Link>
                </nav>

                {/* Actions */}
                <div className={styles.actions}>
                    <Link href="/cart" className={styles.cartButton} aria-label="Cart">
                        <ShoppingBag size={20} />
                        {count > 0 && <span className={styles.badge}>{count}</span>}
                    </Link>

                    <div className={styles.desktopCta}>
                        <Link href="/menu">
                            <Button size="sm">Order Food</Button>
                        </Link>
                    </div>

                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link href="/" className={styles.mobileLink}>Home</Link>
                    <Link href="/menu" className={styles.mobileLink}>Dining Menu</Link>
                    <Link href="/table-booking" className={styles.mobileLink}>Table Booking</Link>
                    <Link href="/about" className={styles.mobileLink}>About</Link>
                    <Link href="/gallery" className={styles.mobileLink}>Gallery</Link>
                    <Link href="/contact" className={styles.mobileLink}>Contact</Link>
                    <div className={styles.mobileCta}>
                        <Link href="/menu" style={{ width: '100%' }}>
                            <Button fullWidth>Order Now</Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
