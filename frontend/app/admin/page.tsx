"use client";

import React, { useState } from 'react';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Settings, Plus, Edit2, Trash2 } from 'lucide-react';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import { MENU_ITEMS, MenuItem } from '@/lib/data';

// Realistic Gulavlival Orders
const ORDERS = [
    { id: "#GG-2048", customer: "Vikram Rathore", total: 640.00, status: "Preparing", time: "10:30 AM" },
    { id: "#GG-2047", customer: "Ananya Sharma", total: 420.00, status: "Delivered", time: "10:15 AM" },
    { id: "#GG-2046", customer: "Rohan Patel", total: 180.00, status: "Delivered", time: "09:45 AM" },
];

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders'>('overview');
    const [menuItems, setMenuItems] = useState(MENU_ITEMS);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setMenuItems(prev => prev.filter(item => item.id !== id));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.logo}>GULAVLIVAL <span className={styles.badge}>Grand Admin</span></div>
                <nav className={styles.nav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <LayoutDashboard size={20} /> Overview
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'menu' ? styles.active : ''}`}
                        onClick={() => setActiveTab('menu')}
                    >
                        <UtensilsCrossed size={20} /> Dining Menu
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <ShoppingBag size={20} /> Active Orders
                    </button>
                    <button className={styles.navItem}>
                        <Settings size={20} /> Settings
                    </button>
                </nav>
            </div>

            <div className={styles.content}>
                <header className={styles.header}>
                    <h2>
                        {activeTab === 'overview' && 'Operations Overview'}
                        {activeTab === 'menu' && 'Menu & Recipe Management'}
                        {activeTab === 'orders' && 'Live Kitchen & Dining Orders'}
                    </h2>
                    <Button size="sm">Log Out</Button>
                </header>

                <div className={styles.main}>
                    {activeTab === 'overview' && (
                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <h3>Today's Dining Revenue</h3>
                                <p className={styles.stat}>₹42,850</p>
                                <span className={styles.trend}>+15% from yesterday</span>
                            </div>
                            <div className={styles.card}>
                                <h3>Total Orders Today</h3>
                                <p className={styles.stat}>84</p>
                                <span className={styles.trend}>12 in kitchen queue</span>
                            </div>
                            <div className={styles.card}>
                                <h3>Active Menu Offerings</h3>
                                <p className={styles.stat}>{menuItems.length}</p>
                                <span className={styles.trend}>Across 9 categories</span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <div>
                            <div className={styles.toolbar}>
                                <Button size="sm"><Plus size={16} /> Add New Dish</Button>
                            </div>
                            <div className={styles.tableCard}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Dish Name</th>
                                            <th>Category</th>
                                            <th>Base Price</th>
                                            <th>Variants</th>
                                            <th>Rating</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menuItems.map(item => (
                                            <tr key={item.id}>
                                                <td><strong>{item.name}</strong></td>
                                                <td>{item.category}</td>
                                                <td>₹{item.price}</td>
                                                <td>{item.variants ? `${item.variants.length} sizes` : 'Single'}</td>
                                                <td>★ {item.rating}</td>
                                                <td>
                                                    <div className={styles.actions}>
                                                        <button className={styles.actionBtn} aria-label="Edit"><Edit2 size={16} /></button>
                                                        <button className={styles.actionBtn} onClick={() => handleDelete(item.id)} aria-label="Delete"><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className={styles.tableCard}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ORDERS.map(order => (
                                        <tr key={order.id}>
                                            <td><strong>{order.id}</strong></td>
                                            <td>{order.customer}</td>
                                            <td>₹{order.total.toFixed(2)}</td>
                                            <td>
                                                <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>{order.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
