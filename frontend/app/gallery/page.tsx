import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const IMAGES = [
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800",
    "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800",
];

export default function GalleryPage() {
    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Moments at BIG BITE</h1>
            <div className={styles.grid}>
                {IMAGES.map((src, idx) => (
                    <div key={idx} className={styles.item}>
                        <Image
                            src={src}
                            alt={`Gallery ${idx}`}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
