import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className={styles.section}>
                <div className={styles.text}>
                    <h1 className={styles.title}>Our Story</h1>
                    <p>
                        Founded in 2024, BIG BITE started with a simple mission: to serve the perfect cup of coffee
                        and the most comforting food in a space that feels like home.
                    </p>
                    <p>
                        We believe in quality, sustainability, and community. Every ingredient is sourced locally
                        whenever possible, and our coffee beans are ethically traded.
                    </p>
                </div>
                <div className={styles.imageWrapper}>
                    <Image
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
                        alt="Cafe Interior"
                        width={600}
                        height={400}
                        className={styles.image}
                    />
                </div>
            </div>

            <div className={`${styles.section} ${styles.reverse}`}>
                <div className={styles.text}>
                    <h2 className={styles.title}>Meet Our Chef</h2>
                    <p>
                        Chef Alexander has over 15 years of culinary experience in top restaurants across Europe.
                        His passion for fusing traditional textures with modern flavors brings a unique touch to our menu.
                    </p>
                </div>
                <div className={styles.imageWrapper}>
                    <Image
                        src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop"
                        alt="Chef"
                        width={600}
                        height={400}
                        className={styles.image}
                    />
                </div>
            </div>
        </div>
    );
}
