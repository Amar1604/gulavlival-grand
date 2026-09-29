export type Category = 
  | "All" 
  | "Pizza" 
  | "Bread" 
  | "Burger" 
  | "Maggi" 
  | "Chinese" 
  | "Momos" 
  | "Shakes" 
  | "Tea/Coffee";

export interface MenuVariant {
  id: string;
  name: string;
  price: number; // in INR (₹)
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // default / base price in INR
  image: string;
  category: Category;
  rating: number;
  popular: boolean;
  veg: boolean;
  calories?: number;
  variants?: MenuVariant[];
}

export const CATEGORIES: Category[] = [
  "All", 
  "Pizza", 
  "Bread", 
  "Burger", 
  "Maggi", 
  "Chinese", 
  "Momos", 
  "Shakes", 
  "Tea/Coffee"
];

export const MENU_ITEMS: MenuItem[] = [
  // --- PIZZAS (Single Price & Variants) ---
  {
    id: "p-1",
    name: "Cheese Pizza",
    description: "Classic golden baked crust loaded with 100% mozzarella cheese and aromatic Italian herbs.",
    price: 90,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 280,
  },
  {
    id: "p-2",
    name: "Cheese & Onion Pizza",
    description: "Crunchy red onions paired with rich mozzarella on our signature herb tomato sauce.",
    price: 110,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.7,
    popular: false,
    veg: true,
    calories: 290,
  },
  {
    id: "p-3",
    name: "Cheese & Corn Pizza",
    description: "Sweet American golden corn layered with bubbling mozzarella cheese.",
    price: 120,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 310,
  },
  {
    id: "p-4",
    name: "Cheese & Capsicum Pizza",
    description: "Crispy green bell peppers roasted to perfection over melted mozzarella cheese.",
    price: 120,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.6,
    popular: false,
    veg: true,
    calories: 285,
  },
  {
    id: "p-5",
    name: "Cheese & Tomato Pizza",
    description: "Sun-ripened juicy tomato slices with fragrant basil and melted mozzarella.",
    price: 120,
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.6,
    popular: false,
    veg: true,
    calories: 275,
  },
  {
    id: "p-6",
    name: "Cheese Onion Paneer Pizza",
    description: "Tender spiced paneer cubes, diced red onions, and gooey mozzarella cheese.",
    price: 140,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 340,
  },
  {
    id: "p-7",
    name: "Cheese Corn Red Pepper Pizza",
    description: "Sweet golden corn paired with fiery roasted red peppers and mozzarella.",
    price: 140,
    image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.7,
    popular: false,
    veg: true,
    calories: 310,
  },
  {
    id: "p-8",
    name: "Cheese Onion Corn Pizza",
    description: "A delightful harmony of crisp onions, sweet corn kernels, and double cheese.",
    price: 140,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.8,
    popular: false,
    veg: true,
    calories: 320,
  },
  {
    id: "p-9",
    name: "Veg Treat Pizza",
    description: "Onion, crisp capsicum, juicy tomatoes, and golden sweet corn.",
    price: 140,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 350,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 140 },
      { id: "med", name: "Medium (10\")", price: 260 },
      { id: "lar", name: "Large (12\")", price: 350 },
    ]
  },
  {
    id: "p-10",
    name: "Mexican Delight Pizza",
    description: "Spicy Mexican salsa sauce, jalapeños, onions, capsicum, and melted mozzarella.",
    price: 140,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 360,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 140 },
      { id: "med", name: "Medium (10\")", price: 260 },
      { id: "lar", name: "Large (12\")", price: 350 },
    ]
  },
  {
    id: "p-11",
    name: "Spicy Pizza",
    description: "Zesty red paprika, green chillies, onions, and spicy tomato sauce.",
    price: 180,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.7,
    popular: false,
    veg: true,
    calories: 330,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 180 },
      { id: "med", name: "Medium (10\")", price: 330 },
      { id: "lar", name: "Large (12\")", price: 450 },
    ]
  },
  {
    id: "p-12",
    name: "Spicy Paneer Pizza",
    description: "Marinated spicy paneer cubes, red paprika, bell peppers, and bubbling cheese.",
    price: 180,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 390,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 180 },
      { id: "med", name: "Medium (10\")", price: 330 },
      { id: "lar", name: "Large (12\")", price: 450 },
    ]
  },
  {
    id: "p-13",
    name: "Golden Cheese Pizza",
    description: "Triple blend of mozzarella, cheddar, and gouda with a fragrant garlic butter crust.",
    price: 180,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.8,
    popular: false,
    veg: true,
    calories: 420,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 180 },
      { id: "med", name: "Medium (10\")", price: 330 },
      { id: "lar", name: "Large (12\")", price: 450 },
    ]
  },
  {
    id: "p-14",
    name: "Mexican Veg Wonder Pizza",
    description: "Crispy nachos seasoning, exotic veggies, black olives, jalapeños, and spiced cheese.",
    price: 180,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.8,
    popular: false,
    veg: true,
    calories: 375,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 180 },
      { id: "med", name: "Medium (10\")", price: 330 },
      { id: "lar", name: "Large (12\")", price: 450 },
    ]
  },
  {
    id: "p-15",
    name: "Veg Lover Pizza",
    description: "Loaded gourmet pizza with broccoli, baby corn, olives, bell peppers, and cheese.",
    price: 180,
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.7,
    popular: false,
    veg: true,
    calories: 340,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 180 },
      { id: "med", name: "Medium (10\")", price: 330 },
      { id: "lar", name: "Large (12\")", price: 450 },
    ]
  },
  {
    id: "p-16",
    name: "Paneer Makhani Pizza",
    description: "Rich buttery makhani gravy base topped with succulent cottage cheese and kasuri methi.",
    price: 200,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 5.0,
    popular: true,
    veg: true,
    calories: 440,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 200 },
      { id: "med", name: "Medium (10\")", price: 370 },
      { id: "lar", name: "Large (12\")", price: 550 },
    ]
  },
  {
    id: "p-17",
    name: "Veg Delight Pizza",
    description: "Mushrooms, onions, crisp capsicum, golden corn, and extra mozzarella.",
    price: 200,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 4.8,
    popular: false,
    veg: true,
    calories: 380,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 200 },
      { id: "med", name: "Medium (10\")", price: 370 },
      { id: "lar", name: "Large (12\")", price: 550 },
    ]
  },
  {
    id: "p-18",
    name: "Tandoori Paneer Pizza",
    description: "Charcoal-smoked tandoori paneer tikka, pickled red onions, mint drizzle, and cheese.",
    price: 200,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop",
    category: "Pizza",
    rating: 5.0,
    popular: true,
    veg: true,
    calories: 450,
    variants: [
      { id: "reg", name: "Regular (7\")", price: 200 },
      { id: "med", name: "Medium (10\")", price: 370 },
      { id: "lar", name: "Large (12\")", price: 550 },
    ]
  },

  // --- BREADS ---
  {
    id: "b-1",
    name: "Garlic Bread",
    description: "Crispy toasted French baguette brushed with roasted garlic herb butter.",
    price: 100,
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=600&auto=format&fit=crop",
    category: "Bread",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 220,
  },
  {
    id: "b-2",
    name: "Stuff Garlic Bread",
    description: "Oven-fresh bread stuffed with sweet corn, jalapeños, and gooey melted cheese.",
    price: 150,
    image: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?q=80&w=600&auto=format&fit=crop",
    category: "Bread",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 340,
  },

  // --- BURGERS ---
  {
    id: "bg-1",
    name: "King Burger",
    description: "Crispy seasoned vegetable patty, crunchy iceberg lettuce, tomatoes, and secret mayo.",
    price: 60,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    category: "Burger",
    rating: 4.7,
    popular: true,
    veg: true,
    calories: 380,
  },
  {
    id: "bg-2",
    name: "Cheese Paneer Burger",
    description: "Golden spiced paneer steak with melted cheddar cheese slice, chipotle mayo, and onions.",
    price: 100,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop",
    category: "Burger",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 490,
  },

  // --- MAGGI ---
  {
    id: "m-1",
    name: "Veg Masala Maggi",
    description: "Classic street-style 2-minute noodles tossed with fresh chopped onions, tomatoes, and spices.",
    price: 60,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=600&auto=format&fit=crop",
    category: "Maggi",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 250,
    variants: [
      { id: "half", name: "Half Portion", price: 60 },
      { id: "full", name: "Full Portion", price: 110 },
    ]
  },
  {
    id: "m-2",
    name: "Corn Maggi",
    description: "Steaming hot masala noodles packed with sweet corn and butter.",
    price: 70,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
    category: "Maggi",
    rating: 4.7,
    popular: false,
    veg: true,
    calories: 280,
    variants: [
      { id: "half", name: "Half Portion", price: 70 },
      { id: "full", name: "Full Portion", price: 130 },
    ]
  },
  {
    id: "m-3",
    name: "Cheese Maggi",
    description: "Creamy comfort noodles smothered in molten cheddar and mozzarella cheese.",
    price: 90,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=600&auto=format&fit=crop",
    category: "Maggi",
    rating: 5.0,
    popular: true,
    veg: true,
    calories: 360,
    variants: [
      { id: "half", name: "Half Portion", price: 90 },
      { id: "full", name: "Full Portion", price: 150 },
    ]
  },

  // --- CHINESE ---
  {
    id: "c-1",
    name: "Chilli Potato",
    description: "Crispy fried potato fingers coated in spicy Indo-Chinese garlic soy glaze.",
    price: 70,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop",
    category: "Chinese",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 310,
    variants: [
      { id: "half", name: "Half Portion", price: 70 },
      { id: "full", name: "Full Portion", price: 130 },
    ]
  },
  {
    id: "c-2",
    name: "French Fries",
    description: "Golden crispy salted French fries served with gourmet tomato relish.",
    price: 100,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop",
    category: "Chinese",
    rating: 4.6,
    popular: false,
    veg: true,
    calories: 290,
  },
  {
    id: "c-3",
    name: "Simple Chowmein",
    description: "Wok-tossed noodles with shredded cabbage, capsicum, carrots, and light soy sauce.",
    price: 50,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=600&auto=format&fit=crop",
    category: "Chinese",
    rating: 4.7,
    popular: true,
    veg: true,
    calories: 320,
    variants: [
      { id: "half", name: "Half Portion", price: 50 },
      { id: "full", name: "Full Portion", price: 90 },
    ]
  },
  {
    id: "c-4",
    name: "Hotka Noodles",
    description: "Spicy Schezwan wok noodles with fiery chillies, garlic, and fresh spring vegetables.",
    price: 80,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop",
    category: "Chinese",
    rating: 4.8,
    popular: false,
    veg: true,
    calories: 350,
    variants: [
      { id: "half", name: "Half Portion", price: 80 },
      { id: "full", name: "Full Portion", price: 150 },
    ]
  },
  {
    id: "c-5",
    name: "Singapore Noodles",
    description: "Fragrant yellow curry-infused thin rice noodles tossed with crunchy peppers and sesame.",
    price: 80,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
    category: "Chinese",
    rating: 4.7,
    popular: false,
    veg: true,
    calories: 340,
    variants: [
      { id: "half", name: "Half Portion", price: 80 },
      { id: "full", name: "Full Portion", price: 150 },
    ]
  },

  // --- MOMOS ---
  {
    id: "mo-1",
    name: "Steam Veg Momos",
    description: "Authentic delicate steamed dumplings stuffed with finely minced garden vegetables.",
    price: 60,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
    category: "Momos",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 180,
    variants: [
      { id: "half", name: "Half (5 pcs)", price: 60 },
      { id: "full", name: "Full (10 pcs)", price: 100 },
    ]
  },
  {
    id: "mo-2",
    name: "Steam Paneer Momos",
    description: "Steamed Himalayan dumplings packed with seasoned paneer, coriander, and scallions.",
    price: 70,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=600&auto=format&fit=crop",
    category: "Momos",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 220,
    variants: [
      { id: "half", name: "Half (5 pcs)", price: 70 },
      { id: "full", name: "Full (10 pcs)", price: 120 },
    ]
  },
  {
    id: "mo-3",
    name: "Fried Veg Momos",
    description: "Deep fried golden crispy vegetable momos served with spicy red chutney and mayo.",
    price: 60,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
    category: "Momos",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 260,
    variants: [
      { id: "half", name: "Half (5 pcs)", price: 60 },
      { id: "full", name: "Full (10 pcs)", price: 100 },
    ]
  },
  {
    id: "mo-4",
    name: "Paneer Fried Momos",
    description: "Crispy fried dumplings stuffed with spiced cottage cheese.",
    price: 70,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=600&auto=format&fit=crop",
    category: "Momos",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 290,
    variants: [
      { id: "half", name: "Half (5 pcs)", price: 70 },
      { id: "full", name: "Full (10 pcs)", price: 140 },
    ]
  },

  // --- SHAKES ---
  {
    id: "sh-1",
    name: "Vanilla Shake",
    description: "Classic smooth and creamy milkshake crafted with premium vanilla bean ice cream.",
    price: 100,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop",
    category: "Shakes",
    rating: 4.7,
    popular: false,
    veg: true,
    calories: 280,
  },
  {
    id: "sh-2",
    name: "Strawberry Shake",
    description: "Fresh strawberry puree churned with chilled milk and ice cream.",
    price: 100,
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=600&auto=format&fit=crop",
    category: "Shakes",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 290,
  },
  {
    id: "sh-3",
    name: "Pineapple Shake",
    description: "Tropical sweet pineapple shake blended to a frothy chilled delight.",
    price: 100,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=600&auto=format&fit=crop",
    category: "Shakes",
    rating: 4.6,
    popular: false,
    veg: true,
    calories: 260,
  },
  {
    id: "sh-4",
    name: "Chocolate Shake",
    description: "Indulgent Belgian cocoa blend with chocolate fudge drizzle and whipped cream.",
    price: 140,
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=600&auto=format&fit=crop",
    category: "Shakes",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 380,
  },
  {
    id: "sh-5",
    name: "Butterscotch Shake",
    description: "Caramelized butterscotch crunch milkshake with buttery toffee sauce.",
    price: 100,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop",
    category: "Shakes",
    rating: 4.8,
    popular: false,
    veg: true,
    calories: 320,
  },

  // --- TEA / COFFEE ---
  {
    id: "tc-1",
    name: "Tea",
    description: "Special freshly brewed Indian milk chai with aromatic cardamom and ginger.",
    price: 20,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    category: "Tea/Coffee",
    rating: 4.8,
    popular: true,
    veg: true,
    calories: 70,
  },
  {
    id: "tc-2",
    name: "Coffee",
    description: "Hot whipped frothy cafe-style espresso coffee with steamed milk.",
    price: 40,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    category: "Tea/Coffee",
    rating: 4.7,
    popular: true,
    veg: true,
    calories: 90,
  },
  {
    id: "tc-3",
    name: "Kulhad Tea",
    description: "Traditional piping-hot masala tea served in an earthen clay kulhad for authentic rustic flavor.",
    price: 30,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600&auto=format&fit=crop",
    category: "Tea/Coffee",
    rating: 5.0,
    popular: true,
    veg: true,
    calories: 85,
  },
  {
    id: "tc-4",
    name: "Cold Coffee",
    description: "Creamy whipped chilled iced coffee served with chocolate drizzle and vanilla ice cream scoop.",
    price: 100,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop",
    category: "Tea/Coffee",
    rating: 4.9,
    popular: true,
    veg: true,
    calories: 240,
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Vikram Rathore",
    comment: "The Tandoori Paneer Pizza and Kulhad Tea are sensational! Luxury hospitality at its finest.",
    rating: 5,
    role: "Hotel & Dining Guest"
  },
  {
    id: "2",
    name: "Ananya Sharma",
    comment: "Flawless service, beautiful rooms, and the food arrived piping hot to our table.",
    rating: 5,
    role: "Staycation Guest"
  },
  {
    id: "3",
    name: "Rohan Patel",
    comment: "Gulavlival Grand has set a new benchmark for dine & stay in the region. Highly recommended!",
    rating: 5,
    role: "Regular Visitor"
  }
];
