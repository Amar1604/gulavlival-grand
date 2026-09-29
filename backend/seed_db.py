import sys
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from app.core.config import settings
from app.core.database import Base
from app.core.security import get_password_hash
from app.models.identity import User, Role, UserRole
from app.models.menu import Category, MenuItem, MenuVariant

# Import menu data
MENU_DATA = [
    # Category, Name, Desc, Price, Image, Veg, Popular, Variants [(name, price)]
    # PIZZA
    ("Pizza", "Cheese Pizza", "Classic golden baked crust loaded with 100% mozzarella cheese and Italian herbs.", 90, "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Pizza", "Cheese & Onion", "Crunchy red onions paired with rich mozzarella on herb tomato sauce.", 110, "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop", True, False, []),
    ("Pizza", "Cheese & Corn", "Sweet American golden corn layered with bubbling mozzarella cheese.", 120, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Pizza", "Cheese & Capsicum", "Crispy green bell peppers roasted to perfection over melted mozzarella cheese.", 120, "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop", True, False, []),
    ("Pizza", "Cheese & Tomato", "Sun-ripened juicy tomato slices with fragrant basil and melted mozzarella.", 120, "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=600&auto=format&fit=crop", True, False, []),
    ("Pizza", "Cheese Onion Paneer", "Tender spiced paneer cubes, diced red onions, and gooey mozzarella cheese.", 140, "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Pizza", "Cheese Corn Red Pepper", "Sweet golden corn paired with fiery roasted red peppers and mozzarella.", 140, "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=600&auto=format&fit=crop", True, False, []),
    ("Pizza", "Cheese Onion Corn", "A delightful harmony of crisp onions, sweet corn kernels, and double cheese.", 140, "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=600&auto=format&fit=crop", True, False, []),
    ("Pizza", "Veg Treat", "Onion, crisp capsicum, juicy tomatoes, and golden sweet corn.", 140, "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", True, True, [("Regular (7\")", 140), ("Medium (10\")", 260), ("Large (12\")", 350)]),
    ("Pizza", "Mexican Delight", "Spicy Mexican salsa sauce, jalapeños, onions, capsicum, and melted mozzarella.", 140, "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop", True, True, [("Regular (7\")", 140), ("Medium (10\")", 260), ("Large (12\")", 350)]),
    ("Pizza", "Spicy Pizza", "Zesty red paprika, green chillies, onions, and spicy tomato sauce.", 180, "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop", True, False, [("Regular (7\")", 180), ("Medium (10\")", 330), ("Large (12\")", 450)]),
    ("Pizza", "Spicy Paneer", "Marinated spicy paneer cubes, red paprika, bell peppers, and bubbling cheese.", 180, "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop", True, True, [("Regular (7\")", 180), ("Medium (10\")", 330), ("Large (12\")", 450)]),
    ("Pizza", "Golden Cheese", "Triple blend of mozzarella, cheddar, and gouda with garlic butter crust.", 180, "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop", True, False, [("Regular (7\")", 180), ("Medium (10\")", 330), ("Large (12\")", 450)]),
    ("Pizza", "Mexican Veg Wonder", "Crispy nachos seasoning, exotic veggies, black olives, jalapeños, and spiced cheese.", 180, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop", True, False, [("Regular (7\")", 180), ("Medium (10\")", 330), ("Large (12\")", 450)]),
    ("Pizza", "Veg Lover", "Loaded gourmet pizza with broccoli, baby corn, olives, bell peppers, and cheese.", 180, "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=600&auto=format&fit=crop", True, False, [("Regular (7\")", 180), ("Medium (10\")", 330), ("Large (12\")", 450)]),
    ("Pizza", "Paneer Makhani", "Rich buttery makhani gravy base topped with succulent cottage cheese and kasuri methi.", 200, "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop", True, True, [("Regular (7\")", 200), ("Medium (10\")", 370), ("Large (12\")", 550)]),
    ("Pizza", "Veg Delight", "Mushrooms, onions, crisp capsicum, golden corn, and extra mozzarella.", 200, "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", True, False, [("Regular (7\")", 200), ("Medium (10\")", 370), ("Large (12\")", 550)]),
    ("Pizza", "Tandoori Paneer", "Charcoal-smoked tandoori paneer tikka, pickled red onions, mint drizzle, and cheese.", 200, "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop", True, True, [("Regular (7\")", 200), ("Medium (10\")", 370), ("Large (12\")", 550)]),

    # BREAD
    ("Bread", "Garlic Bread", "Crispy toasted French baguette brushed with roasted garlic herb butter.", 100, "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Bread", "Stuff Garlic Bread", "Oven-fresh bread stuffed with sweet corn, jalapeños, and gooey melted cheese.", 150, "https://images.unsplash.com/photo-1549611016-3a70d82b5040?q=80&w=600&auto=format&fit=crop", True, True, []),

    # BURGER
    ("Burger", "King Burger", "Crispy seasoned vegetable patty, crunchy iceberg lettuce, tomatoes, and secret mayo.", 60, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Burger", "Cheese Paneer Burger", "Golden spiced paneer steak with melted cheddar cheese slice, chipotle mayo, and onions.", 100, "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop", True, True, []),

    # MAGGI
    ("Maggi", "Veg Masala Maggi", "Classic street-style noodles tossed with fresh chopped onions, tomatoes, and spices.", 60, "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=600&auto=format&fit=crop", True, True, [("Half Portion", 60), ("Full Portion", 110)]),
    ("Maggi", "Corn Maggi", "Steaming hot masala noodles packed with sweet corn and butter.", 70, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop", True, False, [("Half Portion", 70), ("Full Portion", 130)]),
    ("Maggi", "Cheese Maggi", "Creamy comfort noodles smothered in molten cheddar and mozzarella cheese.", 90, "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=600&auto=format&fit=crop", True, True, [("Half Portion", 90), ("Full Portion", 150)]),

    # CHINESE
    ("Chinese", "Chilli Potato", "Crispy fried potato fingers coated in spicy Indo-Chinese garlic soy glaze.", 70, "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop", True, True, [("Half Portion", 70), ("Full Portion", 130)]),
    ("Chinese", "French Fries", "Golden crispy salted French fries served with gourmet tomato relish.", 100, "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop", True, False, []),
    ("Chinese", "Simple Chowmein", "Wok-tossed noodles with shredded cabbage, capsicum, carrots, and light soy sauce.", 50, "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=600&auto=format&fit=crop", True, True, [("Half Portion", 50), ("Full Portion", 90)]),
    ("Chinese", "Hotka Noodles", "Spicy Schezwan wok noodles with fiery chillies, garlic, and fresh spring vegetables.", 80, "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop", True, False, [("Half Portion", 80), ("Full Portion", 150)]),
    ("Chinese", "Singapore Noodles", "Fragrant yellow curry-infused thin rice noodles tossed with crunchy peppers.", 80, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop", True, False, [("Half Portion", 80), ("Full Portion", 150)]),

    # MOMOS
    ("Momos", "Steam Veg Momos", "Authentic delicate steamed dumplings stuffed with finely minced garden vegetables.", 60, "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop", True, True, [("Half (5 pcs)", 60), ("Full (10 pcs)", 100)]),
    ("Momos", "Steam Paneer Momos", "Steamed Himalayan dumplings packed with seasoned paneer, coriander, and scallions.", 70, "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=600&auto=format&fit=crop", True, True, [("Half (5 pcs)", 70), ("Full (10 pcs)", 120)]),
    ("Momos", "Fried Veg Momos", "Deep fried golden crispy vegetable momos served with spicy red chutney and mayo.", 60, "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop", True, True, [("Half (5 pcs)", 60), ("Full (10 pcs)", 100)]),
    ("Momos", "Paneer Fried Momos", "Crispy fried dumplings stuffed with spiced cottage cheese.", 70, "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=600&auto=format&fit=crop", True, True, [("Half (5 pcs)", 70), ("Full (10 pcs)", 140)]),

    # SHAKES
    ("Shakes", "Vanilla Shake", "Classic smooth and creamy milkshake crafted with premium vanilla bean ice cream.", 100, "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop", True, False, []),
    ("Shakes", "Strawberry Shake", "Fresh strawberry puree churned with chilled milk and ice cream.", 100, "https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Shakes", "Pineapple Shake", "Tropical sweet pineapple shake blended to a frothy chilled delight.", 100, "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=600&auto=format&fit=crop", True, False, []),
    ("Shakes", "Chocolate Shake", "Indulgent Belgian cocoa blend with chocolate fudge drizzle and whipped cream.", 140, "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Shakes", "Butterscotch Shake", "Caramelized butterscotch crunch milkshake with buttery toffee sauce.", 100, "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop", True, False, []),

    # TEA / COFFEE
    ("Tea/Coffee", "Tea", "Special freshly brewed Indian milk chai with aromatic cardamom and ginger.", 20, "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Tea/Coffee", "Coffee", "Hot whipped frothy cafe-style espresso coffee with steamed milk.", 40, "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Tea/Coffee", "Kulhad Tea", "Traditional piping-hot masala tea served in an earthen clay kulhad for authentic rustic flavor.", 30, "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600&auto=format&fit=crop", True, True, []),
    ("Tea/Coffee", "Cold Coffee", "Creamy whipped chilled iced coffee served with chocolate drizzle and vanilla ice cream.", 100, "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop", True, True, []),
]

ROLES = [
    ("Super Admin", "Full access to platform configuration, users, roles, reports, and settings"),
    ("Restaurant Manager", "Manages menu, kitchen queue, tables, offers, and dining analytics"),
    ("Hotel Manager", "Manages rooms, guest stays, housekeeping, and hotel operations"),
    ("Kitchen Staff", "Views KDS order queue and manages preparation status"),
    ("Receptionist", "Handles guest check-in/out and room assignments"),
    ("Billing Staff", "Manages folios, invoices, payments, and settlements"),
    ("Inventory Manager", "Monitors stock, recipes, BOM, suppliers, and wastage"),
    ("Housekeeping", "Room cleanliness and maintenance task management"),
    ("Delivery Staff", "Handles delivery dispatch and transit updates"),
    ("Customer", "Browse menu, order food, book rooms, and reserve tables"),
]


def seed():
    print("🌱 Connecting to PostgreSQL and creating tables...")
    sync_engine = create_engine(settings.DATABASE_URL_SYNC)
    Base.metadata.create_all(bind=sync_engine)
    Session = sessionmaker(bind=sync_engine)
    session = Session()

    try:
        # 1. Seed Roles
        print("👥 Seeding 10 system roles...")
        role_map = {}
        for role_name, desc in ROLES:
            existing = session.query(Role).filter_by(name=role_name).first()
            if not existing:
                new_role = Role(name=role_name, description=desc)
                session.add(new_role)
                session.flush()
                role_map[role_name] = new_role
            else:
                role_map[role_name] = existing

        # 2. Seed Default Admin User
        admin_email = "admin@gulavlivalgrand.com"
        existing_admin = session.query(User).filter_by(email=admin_email).first()
        if not existing_admin:
            print(f"👤 Creating default admin: {admin_email}")
            admin_user = User(
                email=admin_email,
                full_name="Gulavlival Grand Admin",
                phone="+91 98765 00000",
                password_hash=get_password_hash("admin123"),
                is_active=True,
                is_verified=True,
            )
            session.add(admin_user)
            session.flush()

            # Assign Super Admin role
            super_admin_role = role_map["Super Admin"]
            user_role = UserRole(user_id=admin_user.id, role_id=super_admin_role.id)
            session.add(user_role)
        else:
            print("👤 Default admin already exists.")

        # 3. Seed Categories & Menu Items
        print("🍽️ Seeding official 44+ Gulavlival menu items with variants...")
        cat_order = 0
        cat_map = {}

        for cat_name, name, desc, price, img, veg, popular, variants in MENU_DATA:
            if cat_name not in cat_map:
                existing_cat = session.query(Category).filter_by(name=cat_name).first()
                if not existing_cat:
                    new_cat = Category(name=cat_name, sort_order=cat_order)
                    cat_order += 1
                    session.add(new_cat)
                    session.flush()
                    cat_map[cat_name] = new_cat
                else:
                    cat_map[cat_name] = existing_cat

            cat = cat_map[cat_name]

            # Check if item exists
            existing_item = session.query(MenuItem).filter_by(name=name).first()
            if not existing_item:
                item = MenuItem(
                    name=name,
                    description=desc,
                    category_id=cat.id,
                    category_name=cat.name,
                    base_price=price,
                    image=img,
                    veg=veg,
                    popular=popular,
                    rating=5.0 if popular else 4.8,
                    is_available=True,
                )
                session.add(item)
                session.flush()

                # Add variants if any
                for v_name, v_price in variants:
                    variant = MenuVariant(
                        menu_item_id=item.id,
                        name=v_name,
                        price=v_price,
                        is_available=True,
                    )
                    session.add(variant)

        session.commit()
        print("✅ Database seeding completed successfully in PostgreSQL!")

    except Exception as e:
        session.rollback()
        print(f"❌ Error seeding database: {e}")
        raise
    finally:
        session.close()


if __name__ == "__main__":
    seed()
