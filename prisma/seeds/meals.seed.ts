import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createMeals(products, categories: Record<string, any>, locations: Record<string, any>) {
  const mealsData = [
    {
      name: "Спагеті Карбонара",
      description:
        "Кремова італійська паста з яйцями, сиром, панчеттою та чорним перцем. Просто, насичено й затишно.",
      image:
        "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg",
      price: 23,
      weight: 300,
      categorySlug: "pasta",
      locationSlugs: ["cafe-center", "roof-restaurant"],
    },
    {
      name: "Курка в маслі",
      description:
        "Ніжні шматочки курки, тушковані в томатному соусі з вершками та маслом. Улюблена страва Північної Індії.",
      image:
        "https://www.mysavoryadventures.com/wp-content/uploads/2023/04/restaurant-style-butter-chicken-768x1024.jpg",
      price: 24,
      weight: 280,
      categorySlug: "main-courses",
      locationSlugs: ["cafe-center", "roof-restaurant"],
    },
    {
      name: "Сет Суші",
      description:
        "Набір делікатних ролів і ніґірі з рибою, авокадо та овочами, подається з соєвим соусом, васабі та імбирем.",
      image:
        "https://www.craftoria.com/cdn/shop/files/sushi_platter.jpg?v=1697443699",
      price: 25,
      weight: 350,
      categorySlug: "appetizers",
      locationSlugs: ["cafe-center", "roof-restaurant"],
    },
    {
      name: "Яловичина Бургіньйон",
      description:
        "Класичне французьке рагу з яловичини, тушкованої у червоному вині з часником, цибулею, морквою та грибами.",
      image:
        "https://www.thespruceeats.com/thmb/9bHcJtt9VacFlLw_hdDPHc7LclY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-classic-beef-bourguignon-recipe-7498352-step-16-fc657c2f9fcc42588c7ea30de37ad02b.jpg",
      price: 26,
      weight: 400,
      categorySlug: "main-courses",
      locationSlugs: ["park-cafe", "cafe-center"],
    },
    {
      name: "Шакшука",
      description:
        "Яйця пашот у гострому соусі з томатів та перцю, приправлені кумином і паприкою. Популярна страва Близького Сходу.",
      image:
        "https://assets.bonappetit.com/photos/66b0f58d0166f714b46433a9/1:1/w_3333,h_3333,c_limit/30-min-shakshuka_LEDE_071824_0935_VOG_final.jpg",
      price: 27,
      weight: 320,
      categorySlug: "breakfast",
      locationSlugs: ["cafe-center", "roof-restaurant"],
    },
    {
      name: "Тако аль Пастор",
      description:
        "Мексиканські тако з маринованою свининою, ананасом, цибулею та кінзою у кукурудзяних тортильях.",
      image:
        "https://www.thespruceeats.com/thmb/wQd2RvxH1Lh9536W5LY1T_VSyT8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tacos-al-pastor-recipe-4172074-hero-01-7fb1a4455397486b8485ac8ec2ca3c5a.jpg",
      price: 28,
      weight: 250,
      categorySlug: "drinks",
      locationSlugs: ["cafe-center", "park-cafe"],
    },
    {
      name: "Пад Тай",
      description:
        "Смажена рисова локшина з креветками, тофу, арахісом, яйцями та паростками квасолі у кисло-солодкому соусі з тамаринду.",
      image:
        "https://san-j.com/wp-content/uploads/2023/09/Crispy-Chicken-Pad-Thai.jpeg",
      price: 29,
      weight: 330,
      categorySlug: "vegetarian",
      locationSlugs: ["roof-restaurant"],
    },
    {
      name: "Фалафель у піті",
      description:
        "Хрусткі кульки з нуту у теплому піті з хумусом, тахіні, овочами та соліннями.",
      image:
        "https://fooddoodz.tv/assets/images/2020-05-19-Falafel-Wraps/2020-05-19-Falafel-Wraps--Hero-Image-900.jpg",
      price: 30,
      weight: 280,
      categorySlug: "vegetarian",
      locationSlugs: ["cafe-center", "roof-restaurant"],
    },
    {
      name: "Бібімбап",
      description:
        "Корейська рисова страва з овочами, маринованою яловичиною, смаженим яйцем та соусом кочуджан.",
      image:
        "https://res.cloudinary.com/hellochef/image/upload/c_fit/q_auto/dpr_auto/n4fjbctl5ffexe634ti5?_a=E",
      price: 31,
      weight: 350,
      categorySlug: "breakfast",
      locationSlugs: ["roof-restaurant", "cafe-center"],
    },
    {
      name: "Курка Тikka Масала",
      description:
        "Запечені шматочки курки у вершково-пряному томатному соусі. Найкраще смакує з нааном.",
      image:
        "https://realfood.tesco.com/media/images/1400x919-Chicken-tikka-masala-43fcdbd8-eb86-4b55-951d-adda29067afa-0-1400x919.jpg",
      price: 32,
      weight: 320,
      categorySlug: "main-courses",
      locationSlugs: ["cafe-center", "park-cafe"],
    },
    {
      name: "Грецька Мусака",
      description:
        "Шари обсмажених баклажанів, м’яса зі спеціями та ніжного бешамельного соусу, запечені до золотистої скоринки.",
      image:
        "https://www.dianekochilas.com/wp-content/uploads/2023/11/Moussaka-Recipe-Greek-Eggplant-Casserole.jpg",
      price: 33,
      weight: 400,
      categorySlug: "main-courses",
      locationSlugs: ["roof-restaurant", "park-cafe"],
    },
    {
      name: "Рамен",
      description:
        "Японська локшина в ароматному бульйоні з м’ясом, яйцем, норі та зеленню. Ситна й зігріваюча страва.",
      image:
        "https://images.gastronom.ru/kfXGMYFcHvgNNJj4w9FVkqrjjX7pWxjq2GpzsdN1M1E/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzJjMWMzYzIzLTc3OGMtNDJhNC04YzkwLTFmYTA0NzdkYzRjMS5qcGc.webp",
      price: 34,
      weight: 350,
      categorySlug: "breakfast",
      locationSlugs: ["roof-restaurant", "cafe-center"],
    },
  ];

for (const meal of mealsData) {
    const category = categories[meal.categorySlug];
    if (!category) {
      console.error(`Категорія не знайдена: ${meal.categorySlug}`);
      continue;
    }

    const createdMeal = await prisma.meal.create({
      data: {
        name: meal.name,
        description: meal.description,
        image: meal.image,
        price: meal.price,
        weight: meal.weight,
        categoryId: category.id,
      },
    });

    for (const locationSlug of meal.locationSlugs) {
      const location = locations[locationSlug];
      if (!location) {
        console.error(`Локація не знайдена: ${locationSlug}`);
        continue;
      }

      await prisma.locationMeal.create({
        data: {
          locationId: location.id,
          mealId: createdMeal.id,
          price: meal.price,
          available: true,
          stock: Math.floor(Math.random() * 20) + 5,
        },
      });
    }
  }

  console.log("✅ Страви успішно додані з категоріями, вагами та локаціями!");

}
