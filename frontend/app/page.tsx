import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { MENU_ITEMS, TESTIMONIALS } from "@/lib/data";
import { ArrowRight, Star, Clock, Sparkles, Utensils, BedDouble } from "lucide-react";

export default function Home() {
  const popularItems = MENU_ITEMS.filter(item => item.popular).slice(0, 4);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', width: 'fit-content' }}>
            <Sparkles size={16} /> Welcome to Gulavlival Grand
          </div>
          <h1 className={`${styles.heroTitle} animate-fade-in`}>
            Stay • Dine • <br />
            <span className={styles.highlight}>Experience</span>
          </h1>
          <p className={styles.heroText}>
            An integrated luxury hotel & culinary destination. Savor authentic stone-baked pizzas, sizzlers, and regional delights, or indulge in a relaxing stay.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/menu">
              <Button size="lg">
                <Utensils size={18} style={{ marginRight: '0.5rem' }} /> Explore Dining Menu
              </Button>
            </Link>
            <Link href="/table-booking">
              <Button size="lg" variant="outline">
                <BedDouble size={18} style={{ marginRight: '0.5rem' }} /> Book Table / Stay
              </Button>
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <Clock size={24} className={styles.statIcon} />
              <div>
                <strong>Quick Service</strong>
                <span>Freshly prepared</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <Sparkles size={24} className={styles.statIcon} />
              <div>
                <strong>100% Authentic</strong>
                <span>Artisan recipes</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <div className={styles.heroImageBg} />
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
            alt="Gulavlival Grand Ambiance"
            width={600}
            height={600}
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* Featured Items */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Signature Favorites</h2>
              <p>The most loved recipes crafted by our master chefs.</p>
            </div>
            <Link href="/menu">
              <Button variant="ghost" className={styles.viewAll}>
                View All Menu <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className={styles.grid}>
            {popularItems.map((item) => (
              <Card key={item.id} hover className={styles.itemCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className={styles.itemImage}
                  />
                  {item.veg ?
                    <span className={styles.vegBadge}>Veg</span> :
                    <span className={styles.nonVegBadge}>Non-Veg</span>
                  }
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <h3>{item.name}</h3>
                    <span className={styles.price}>
                      {item.variants && item.variants.length > 0 
                        ? `From ₹${item.price}` 
                        : `₹${item.price}`
                      }
                    </span>
                  </div>
                  <p className={styles.itemDesc}>{item.description}</p>
                  <div className={styles.itemFooter}>
                    <div className={styles.rating}>
                      <Star size={16} fill="#F59E0B" stroke="#F59E0B" />
                      <span>{item.rating}</span>
                    </div>
                    <Link href="/menu">
                      <Button size="sm" variant="secondary">View & Order</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.section} ${styles.altSection}`}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} text-center`}>Guest Reviews</h2>
          <div className={`${styles.grid} ${styles.testimonialsGrid}`}>
            {TESTIMONIALS.map((t) => (
              <Card key={t.id} className={styles.testimonialCard}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" stroke="#F59E0B" />
                  ))}
                </div>
                <p className={styles.review}>"{t.comment}"</p>
                <div className={styles.reviewer} style={{ marginTop: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #d97706, #b45309)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280' }}>{t.role}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2>Experience Gulavlival Grand Today</h2>
          <p>Book your table, order hot fresh meals, or reserve a relaxing stay.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/menu">
              <Button size="lg" className={styles.ctaButton}>Explore Full Menu</Button>
            </Link>
            <Link href="/table-booking">
              <Button size="lg" variant="outline" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'white', color: 'white' }}>
                Reserve Table
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
