import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createMeals(products) {
  const mealsData = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper. Simple, rich, and comforting.',
      image: 'https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg',
    },
    {
      name: 'Butter Chicken',
      description: 'Tender chicken pieces simmered in a luscious tomato-based curry, enriched with cream and butter. A North Indian favorite.',
      image: 'https://www.mysavoryadventures.com/wp-content/uploads/2023/04/restaurant-style-butter-chicken-768x1024.jpg',
    },
    {
      name: 'Sushi Platter',
      description: 'An assortment of delicate sushi rolls and nigiri, filled with fresh fish, avocado, and vegetables, served with soy sauce, wasabi, and pickled ginger.',
      image: 'https://www.craftoria.com/cdn/shop/files/sushi_platter.jpg?v=1697443699',
    },
    {
      name: 'Beef Bourguignon',
      description: 'A classic French stew of beef braised in red wine with garlic, onions, carrots, and mushrooms. Deeply savory and satisfying.',
      image: 'https://www.thespruceeats.com/thmb/9bHcJtt9VacFlLw_hdDPHc7LclY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-classic-beef-bourguignon-recipe-7498352-step-16-fc657c2f9fcc42588c7ea30de37ad02b.jpg',
    },
    {
      name: 'Shakshuka',
      description: 'Poached eggs nestled in a spicy tomato and bell pepper sauce, seasoned with cumin and paprika. A Middle Eastern brunch staple.',
      image: 'https://assets.bonappetit.com/photos/66b0f58d0166f714b46433a9/1:1/w_3333,h_3333,c_limit/30-min-shakshuka_LEDE_071824_0935_VOG_final.jpg',
    },
    {
      name: 'Tacos al Pastor',
      description: 'Mexican-style tacos with marinated pork, grilled pineapple, onion, and cilantro, wrapped in soft corn tortillas.',
      image: 'https://www.thespruceeats.com/thmb/wQd2RvxH1Lh9536W5LY1T_VSyT8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tacos-al-pastor-recipe-4172074-hero-01-7fb1a4455397486b8485ac8ec2ca3c5a.jpg',
    },
    {
      name: 'Pad Thai',
      description: 'Stir-fried rice noodles with shrimp, tofu, peanuts, eggs, and bean sprouts, tossed in a tangy tamarind sauce. A Thai street food favorite.',
      image: 'https://san-j.com/wp-content/uploads/2023/09/Crispy-Chicken-Pad-Thai.jpeg',
    },
    {
      name: 'Falafel Wrap',
      description: 'Crispy chickpea fritters tucked into warm pita with hummus, tahini, lettuce, tomatoes, and pickled veggies.',
      image: 'https://fooddoodz.tv/assets/images/2020-05-19-Falafel-Wraps/2020-05-19-Falafel-Wraps--Hero-Image-900.jpg',
    },
    {
      name: 'Bibimbap',
      description: 'A Korean rice bowl topped with sautéed vegetables, bulgogi (marinated beef), a fried egg, and spicy gochujang sauce.',
      image: 'https://res.cloudinary.com/hellochef/image/upload/c_fit/q_auto/dpr_auto/n4fjbctl5ffexe634ti5?_a=E',
    },
    {
      name: 'Chicken Tikka Masala',
      description: 'Grilled chunks of chicken simmered in a creamy, spiced tomato sauce. Rich, flavorful, and best served with naan.',
      image: 'https://realfood.tesco.com/media/images/1400x919-Chicken-tikka-masala-43fcdbd8-eb86-4b55-951d-adda29067afa-0-1400x919.jpg',
    },
    {
      name: 'Greek Moussaka',
      description: 'Layers of sautéed eggplant, spiced meat, and creamy béchamel sauce baked until golden. Comfort food from the Mediterranean.',
      image: 'https://www.dianekochilas.com/wp-content/uploads/2023/11/Moussaka-Recipe-Greek-Eggplant-Casserole.jpg',
    },
    {
      name: 'Ramen',
      description: 'Japanese noodle soup with a savory broth, sliced pork, soft-boiled egg, nori, and green onions. Warm, hearty, and full of umami.',
      image: 'https://images.gastronom.ru/kfXGMYFcHvgNNJj4w9FVkqrjjX7pWxjq2GpzsdN1M1E/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzJjMWMzYzIzLTc3OGMtNDJhNC04YzkwLTFmYTA0NzdkYzRjMS5qcGc.webp',
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