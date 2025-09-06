import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createMeals(products) {
  const mealsData = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper. Simple, rich, and comforting.',
      image: 'https://www.thespruceeats.com/thmb/PYLaIvVWXkv_4Ag0d7U5got6lj8=/425x300/filters:max_bytes(150000):strip_icc()/GettyImages-1056353422-54ec453c49e44d90abb8233187af32d3.jpg',
    },
    {
      name: 'Butter Chicken',
      description: 'Tender chicken pieces simmered in a luscious tomato-based curry, enriched with cream and butter. A North Indian favorite.',
      image: 'https://www.thespruceeats.com/thmb/-hBhOoNJuN6d3vjJo2uOyPMAkTk=/425x300/filters:max_bytes(150000):strip_icc()/instant-pot-butter-chicken-4582246-hero-01-d96120d1ae5c425985e68344c452f98e.jpg',
    },
    {
      name: 'Sushi Platter',
      description: 'An assortment of delicate sushi rolls and nigiri, filled with fresh fish, avocado, and vegetables, served with soy sauce, wasabi, and pickled ginger.',
      image: 'https://www.thespruceeats.com/thmb/havyTUN3t4IuyuY-c1H_1EXHI8c=/425x300/filters:max_bytes(150000):strip_icc()/what-is-futomaki-and-how-do-you-make-it-2031507-hero-01-1de0a6a6ca6042579a545ae3f30d8ab4.jpg',
    },
    {
      name: 'Beef Bourguignon',
      description: 'A classic French stew of beef braised in red wine with garlic, onions, carrots, and mushrooms. Deeply savory and satisfying.',
      image: 'https://www.thespruceeats.com/thmb/9bHcJtt9VacFlLw_hdDPHc7LclY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-classic-beef-bourguignon-recipe-7498352-step-16-fc657c2f9fcc42588c7ea30de37ad02b.jpg',
    },
    {
      name: 'Shakshuka',
      description: 'Poached eggs nestled in a spicy tomato and bell pepper sauce, seasoned with cumin and paprika. A Middle Eastern brunch staple.',
      image: 'https://www.thespruceeats.com/thmb/tT0LROJvr0PlSW4Adyms0nEHP-w=/425x300/filters:max_bytes(150000):strip_icc()/shakshuka-recipe-5212033-hero-01-1f0637d31f8a4d8ca7f0243f911b7d4d.jpg',
    },
    {
      name: 'Tacos al Pastor',
      description: 'Mexican-style tacos with marinated pork, grilled pineapple, onion, and cilantro, wrapped in soft corn tortillas.',
      image: 'https://www.thespruceeats.com/thmb/LnQugviYbwhtKtZThXl4cUkeGBI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/tacos-al-pastor-recipe-4172074-hero-01-7fb1a4455397486b8485ac8ec2ca3c5a.jpg',
    },
    {
      name: 'Pad Thai',
      description: 'Stir-fried rice noodles with shrimp, tofu, peanuts, eggs, and bean sprouts, tossed in a tangy tamarind sauce. A Thai street food favorite.',
      image: 'https://www.thespruceeats.com/thmb/gg97nWZSdlszEASValtU8eSrp58=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/pad-thai-with-shrimp-3217145-hero-01-f681d116aa9947cd9118cbce55faae47.jpg',
    },
    {
      name: 'Falafel Wrap',
      description: 'Crispy chickpea fritters tucked into warm pita with hummus, tahini, lettuce, tomatoes, and pickled veggies.',
      image: 'https://www.thespruceeats.com/thmb/c1O5wg7TvPW0-XQrCMhccIZBGl4=/425x300/filters:max_bytes(150000):strip_icc()/baked-falafel-recipe-2355687-hero-01-0f6e4341fd264953be65c15dfe7ede8b.jpg',
    },
    {
      name: 'Bibimbap',
      description: 'A Korean rice bowl topped with sautéed vegetables, bulgogi (marinated beef), a fried egg, and spicy gochujang sauce.',
      image: 'https://www.thespruceeats.com/thmb/-n3x4PO1-eI5ku_XM-Q9mM2nKJ8=/425x300/filters:max_bytes(150000):strip_icc()/classic-korean-bibimbap-recipe-2118765-hero-01-091c0e0f8c20426d8f70747955efa61d.jpg',
    },
    {
      name: 'Chicken Tikka Masala',
      description: 'Grilled chunks of chicken simmered in a creamy, spiced tomato sauce. Rich, flavorful, and best served with naan.',
      image: 'https://www.thespruceeats.com/thmb/diWbecaJRs6uY5s-MYc6jbQT00s=/425x300/filters:max_bytes(150000):strip_icc()/instant-pot-tikka-masala-recipe-4589222-final-5c8feea2c9e77c0001eb1c8e.jpg',
    },
    {
      name: 'Greek Moussaka',
      description: 'Layers of sautéed eggplant, spiced meat, and creamy béchamel sauce baked until golden. Comfort food from the Mediterranean.',
      image: 'https://www.thespruceeats.com/thmb/JjZ_HRIZmTaNd3tRcViLJ3RNUHI=/425x300/filters:max_bytes(150000):strip_icc()/moussaka-with-eggplant-1705452-Hero-5b79985446e0fb004f78ac34.jpg',
    },
    {
      name: 'Ramen',
      description: 'Japanese noodle soup with a savory broth, sliced pork, soft-boiled egg, nori, and green onions. Warm, hearty, and full of umami.',
      image: 'https://www.thespruceeats.com/thmb/xBUcyKDSGdQEDxQC5eO48V0XgTc=/425x300/filters:max_bytes(150000):strip_icc()/chilled-watermelon-ramen-5271021-hero-06-6a7d547c391b45439a0bcd09c41b2a5e.jpg',
    },
  ];

  for (const meal of mealsData) {
    await prisma.meal.create({
      data: {
        name: meal.name,
        description: meal.description,
        image: meal.image,
      },
    });
  }

  console.log('✅ Meals seeded successfully!');
}