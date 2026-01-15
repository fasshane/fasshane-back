import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type MealSeed = {
  name: string;
  description?: string;
  composition: string;
  image?: string;
  price: number;
  weightMin: number;
  weightMax: number;
  allergens: string[];
  categorySlug: string;
  locationSlugs: string[];
  ingredients: { product: string; quantity: number }[];
};

const defaultImage = 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg';

export const mealsData: MealSeed[] = [
  {
    name: 'Класична фруктова вівсянка',
    description:
      'Ніжна вівсянка на молоці з бананом, яблуком і ягодами. Легкий та збалансований сніданок.',
    composition: 'Вівсяні пластівці, молоко, банан, яблуко, ягоди, мед.',
    image: 'https://davniyhalych.com.ua/wp-content/uploads/2025/12/ak-gotuvaty-vivsanku-na-vodi.jpg',
    price: 145,
    weightMin: 350,
    weightMax: 380,
    allergens: ['глютен', 'молочні продукти'],
    categorySlug: 'porridge',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'вівсяні пластівці', quantity: 80 },
      { product: 'молоко', quantity: 200 },
      { product: 'банан', quantity: 60 },
      { product: 'яблуко', quantity: 60 },
      { product: 'ягоди', quantity: 40 },
      { product: 'мед', quantity: 10 },
    ],
  },
  {
    name: 'Вівсянка з ягодами',
    description:
      'Вівсяна каша на молоці з міксом ягід та легким медовим акцентом.',
    composition: 'Вівсяні пластівці, молоко, мікс ягід, мед.',
    image: 'https://www.svitstyle.com.ua/wp-content/uploads/2025/12/yak-varyty-vivsyanku-na-moloczi.jpg',
    price: 150,
    weightMin: 350,
    weightMax: 380,
    allergens: ['глютен', 'молочні продукти'],
    categorySlug: 'porridge',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'вівсяні пластівці', quantity: 80 },
      { product: 'молоко', quantity: 200 },
      { product: 'ягоди', quantity: 80 },
      { product: 'мед', quantity: 10 },
    ],
  },
  {
    name: 'Вівсянка з горіхами та медом',
    description:
      'Ситна вівсянка на молоці з міксом горіхів і натуральним медом.',
    composition: 'Вівсяні пластівці, молоко, горіхи, мед.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Fruit_and_Honey_French_Oatmeal.jpg',
    price: 155,
    weightMin: 340,
    weightMax: 370,
    allergens: ['глютен', 'молочні продукти', 'горіхи'],
    categorySlug: 'porridge',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'вівсяні пластівці', quantity: 80 },
      { product: 'молоко', quantity: 200 },
      { product: 'горіхи', quantity: 40 },
      { product: 'мед', quantity: 10 },
    ],
  },
  {
    name: 'Шоколадно-бананова вівсянка',
    description:
      'Вівсянка з бананом, какао та шоколадом. Десертний сніданок з насиченим смаком.',
    composition: 'Вівсяні пластівці, молоко, банан, какао, чорний шоколад.',
    image: 'https://shuba.life/static/content/thumbs/1824x912/d/af/iffibk---c2x1x50px50p-up--296314a4ce42eefff6e766bb60665afd.jpg',
    price: 160,
    weightMin: 350,
    weightMax: 380,
    allergens: ['глютен', 'молочні продукти'],
    categorySlug: 'porridge',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'вівсяні пластівці', quantity: 80 },
      { product: 'молоко', quantity: 200 },
      { product: 'банан', quantity: 80 },
      { product: 'какао', quantity: 10 },
      { product: 'чорний шоколад', quantity: 20 },
    ],
  },
  {
    name: 'Йогурт-боул з гранолою та фруктами',
    description:
      'Грецький йогурт з гранолою, фруктами та ягодами. Хрусткий і свіжий сніданок.',
    composition: 'Грецький йогурт, гранола, фрукти, ягоди, мед.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo8pMYsFNZ457xiFhVKJeIg2S2POrsLrSrHQ&s',
    price: 165,
    weightMin: 280,
    weightMax: 310,
    allergens: ['молочні продукти', 'глютен', 'горіхи'],
    categorySlug: 'yogurt-bowls',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'грецький йогурт', quantity: 180 },
      { product: 'гранола', quantity: 60 },
      { product: 'банан', quantity: 50 },
      { product: 'яблуко', quantity: 40 },
      { product: 'ягоди', quantity: 40 },
      { product: 'мед', quantity: 10 },
    ],
  },
  {
    name: 'Йогурт-боул з ягодами',
    description:
      'Йогуртовий боул з великою порцією ягід і легким медовим смаком.',
    composition: 'Грецький йогурт, мікс ягід, мед, насіння чіа.',
    image: 'https://topfood.club/uploads/recipes-small/3702.jpg',
    price: 170,
    weightMin: 260,
    weightMax: 290,
    allergens: ['молочні продукти'],
    categorySlug: 'yogurt-bowls',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'грецький йогурт', quantity: 180 },
      { product: 'ягоди', quantity: 100 },
      { product: 'мед', quantity: 10 },
      { product: 'насіння чіа', quantity: 10 },
    ],
  },
  {
    name: 'Тропічний йогурт-боул',
    description:
      'Йогурт з манго, ананасом і бананом. Яскравий тропічний смак.',
    composition: 'Грецький йогурт, манго, ананас, банан, кокосова стружка.',
    image: 'https://bit.ua/wp-content/uploads/2018/09/Turmeric-mango-smoothie-bowl-2-1-of-1.jpg',
    price: 175,
    weightMin: 260,
    weightMax: 290,
    allergens: ['молочні продукти'],
    categorySlug: 'yogurt-bowls',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'грецький йогурт', quantity: 180 },
      { product: 'манго', quantity: 60 },
      { product: 'ананас', quantity: 60 },
      { product: 'банан', quantity: 40 },
      { product: 'кокосова стружка', quantity: 10 },
    ],
  },
  {
    name: 'Йогурт-боул з горіхами та медом',
    description:
      'Густий йогурт з горіхами та медом. Ситний і поживний варіант.',
    composition: 'Грецький йогурт, горіхи, мед, гранола.',
    image: 'https://topfood.club/uploads/recipes-small/3668.jpg',
    price: 180,
    weightMin: 260,
    weightMax: 290,
    allergens: ['молочні продукти', 'горіхи', 'глютен'],
    categorySlug: 'yogurt-bowls',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'грецький йогурт', quantity: 180 },
      { product: 'горіхи', quantity: 40 },
      { product: 'мед', quantity: 10 },
      { product: 'гранола', quantity: 30 },
    ],
  },
  {
    name: 'Гречана каша на молоці',
    description:
      'Домашня гречана каша на молоці з вершковим маслом.',
    composition: 'Гречка, молоко, вершкове масло, цукор.',
    image:
      'https://www.smachni-vytivky.com/wp-content/uploads/2023/11/%D1%84%D0%BE%D1%82%D0%BE-%D0%B3%D1%80%D0%BA%D1%87%D0%BA%D0%B8-%D0%B7-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE%D0%BC-%D0%B2-%D0%BC%D0%B8%D1%81%D1%86%D1%96-%D1%84%D0%BE%D1%82%D0%BE-%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B5-%D0%90%D0%86.png',
    price: 185,
    weightMin: 300,
    weightMax: 330,
    allergens: ['молочні продукти'],
    categorySlug: 'ukrainian-milk-porridges',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'гречка', quantity: 90 },
      { product: 'молоко', quantity: 200 },
      { product: 'вершкове масло', quantity: 10 },
      { product: 'цукор', quantity: 5 },
    ],
  },
  {
    name: 'Кукурудзяна каша на молоці',
    description:
      'Ніжна кукурудзяна каша на молоці з вершковим маслом.',
    composition: 'Кукурудзяна крупа, молоко, вершкове масло, цукор.',
    image: 'https://media.ovkuse.ru/images/recipes/a33a5631-b4ac-4a85-baad-94172b298685/a33a5631-b4ac-4a85-baad-94172b298685_420_420.webp',
    price: 190,
    weightMin: 290,
    weightMax: 320,
    allergens: ['молочні продукти'],
    categorySlug: 'ukrainian-milk-porridges',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'кукурудзяна крупа', quantity: 90 },
      { product: 'молоко', quantity: 200 },
      { product: 'вершкове масло', quantity: 10 },
      { product: 'цукор', quantity: 5 },
    ],
  },
  {
    name: 'Вермішелева каша на молоці',
    description:
      'Класична молочна каша з вермішеллю та вершковим маслом.',
    composition: 'Вермішель, молоко, вершкове масло, цукор.',
    image: 'https://static.1000.menu/img/content-v2/47/8c/24486/vermishelevaya-kasha_1727070894_prev_hor.jpg',
    price: 195,
    weightMin: 290,
    weightMax: 320,
    allergens: ['глютен', 'молочні продукти', 'яйця'],
    categorySlug: 'ukrainian-milk-porridges',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'вермішель', quantity: 80 },
      { product: 'молоко', quantity: 200 },
      { product: 'вершкове масло', quantity: 10 },
      { product: 'цукор', quantity: 5 },
    ],
  },
  {
    name: 'Мікс круп на молоці',
    description:
      'Каша з міксу круп на молоці з вершковим маслом.',
    composition: 'Вівсяні пластівці, рис, пшоно, молоко, вершкове масло.',
    image: 'https://img.iamcook.ru/2023/upl/recipes/cat/u-938dd0dd081e55de7d56b63078aa82eb.jpg',
    price: 200,
    weightMin: 300,
    weightMax: 330,
    allergens: ['глютен', 'молочні продукти'],
    categorySlug: 'ukrainian-milk-porridges',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'вівсяні пластівці', quantity: 50 },
      { product: 'рис', quantity: 50 },
      { product: 'пшоно', quantity: 50 },
      { product: 'молоко', quantity: 200 },
      { product: 'вершкове масло', quantity: 10 },
    ],
  },
  {
    name: 'Боул з авокадо та яйцем',
    description:
      'Ситний боул з авокадо, яйцем та кіноа з легким зеленим салатом.',
    composition: 'Авокадо, яйце, кіноа, чері, зелень, оливкова олія.',
    image: 'https://yasensvit.ua/uploads/recipes/prev/632c4a93b9ad4.webp',
    price: 205,
    weightMin: 260,
    weightMax: 290,
    allergens: ['яйця'],
    categorySlug: 'savory-bowls',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'авокадо', quantity: 80 },
      { product: 'яйце', quantity: 2 },
      { product: 'кіноа', quantity: 100 },
      { product: 'томати чері', quantity: 50 },
      { product: 'зелень', quantity: 20 },
      { product: 'оливкова олія', quantity: 10 },
    ],
  },
  {
    name: 'Овочева вівсянка',
    description:
      'Солона вівсянка з овочами та яйцем, подається з зеленню.',
    composition: 'Вівсяні пластівці, овочі, яйце, шпинат, оливкова олія.',
    image: 'https://cdn.cookery.com.ua/uploads/images/100/7567/75670.jpg',
    price: 210,
    weightMin: 300,
    weightMax: 330,
    allergens: ['глютен', 'яйця'],
    categorySlug: 'savory-bowls',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'вівсяні пластівці', quantity: 90 },
      { product: 'овочева суміш', quantity: 200 },
      { product: 'томати чері', quantity: 40 },
      { product: 'шпинат', quantity: 30 },
      { product: 'яйце', quantity: 1 },
      { product: 'оливкова олія', quantity: 10 },
    ],
  },
  {
    name: 'Боул з булгуром та творогом',
    description:
      'Булгур з м’яким творогом та свіжими овочами, заправлений оливковою олією.',
    composition: 'Булгур, творог, огірок, помідор, зелень, оливкова олія.',
    image: 'https://i.ytimg.com/vi/9yzpkx-YF2Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBsToCpJmERk9CwyskXgfz8KH7I2g',
    price: 215,
    weightMin: 290,
    weightMax: 320,
    allergens: ['глютен', 'молочні продукти'],
    categorySlug: 'savory-bowls',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'булгур', quantity: 100 },
      { product: 'творог', quantity: 80 },
      { product: 'огірок', quantity: 60 },
      { product: 'помідор', quantity: 60 },
      { product: 'зелень', quantity: 10 },
      { product: 'оливкова олія', quantity: 10 },
    ],
  },
  {
    name: 'Солоний рисовий боул',
    description:
      'Рисовий боул з овочами, яйцем та соєвим соусом.',
    composition: 'Рис, яйце, овочі, гриби, соєвий соус, зелена цибуля.',
    image: 'https://recipeday.ru/wp-content/uploads/2025/02/file_536-680x680.jpg.webp',
    price: 220,
    weightMin: 300,
    weightMax: 330,
    allergens: ['яйця', 'соя', 'глютен'],
    categorySlug: 'savory-bowls',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'рис', quantity: 120 },
      { product: 'яйце', quantity: 1 },
      { product: 'гриби', quantity: 60 },
      { product: 'овочі', quantity: 60 },
      { product: 'соєвий соус', quantity: 15 },
      { product: 'зелена цибуля', quantity: 10 },
    ],
  },
  {
    name: 'Спагеті Карбонара',
    description:
      'Кремова італійська паста з яйцями, сиром, панчеттою та чорним перцем. Просто, насичено й затишно.',
    composition: 'Спагеті, яйця, сир пармезан, панчетта, чорний перець, оливкова олія.',
    image:
      'https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg',
    price: 23,
    weightMin: 280,
    weightMax: 310,
    allergens: ['глютен', 'яйця', 'молочні продукти'],
    categorySlug: 'pasta',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'спагеті', quantity: 120 },
      { product: 'панчетта', quantity: 70 },
      { product: 'пармезан', quantity: 30 },
      { product: 'яйце', quantity: 1 },
      { product: 'оливкова олія', quantity: 10 },
      { product: 'чорний перець', quantity: 2 },
    ],
  },
  {
    name: 'Курка в маслі',
    description:
      'Ніжні шматочки курки, тушковані в томатному соусі з вершками та маслом. Улюблена страва Північної Індії.',
    composition:
      'Курка, томати, вершки, вершкове масло, цибуля, часник, імбир, спеції масала.',
    image:
      'https://www.mysavoryadventures.com/wp-content/uploads/2023/04/restaurant-style-butter-chicken-768x1024.jpg',
    price: 24,
    weightMin: 265,
    weightMax: 295,
    allergens: ['молочні продукти'],
    categorySlug: 'main-courses',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'куряче філе', quantity: 160 },
      { product: 'томатний соус', quantity: 90 },
      { product: 'вершки', quantity: 40 },
      { product: 'вершкове масло', quantity: 15 },
      { product: 'цибуля', quantity: 30 },
      { product: 'часник', quantity: 5 },
      { product: 'імбир', quantity: 5 },
    ],
  },
  {
    name: 'Сет Суші',
    description:
      'Набір делікатних ролів і ніґірі з рибою, авокадо та овочами, подається з соєвим соусом, васабі та імбирем.',
    composition:
      'Рис для суші, риба (лосось/тунець), авокадо, огірок, норі, соєвий соус, васабі, маринований імбир.',
    image: 'https://www.craftoria.com/cdn/shop/files/sushi_platter.jpg?v=1697443699',
    price: 25,
    weightMin: 335,
    weightMax: 365,
    allergens: ['риба', 'соя', 'глютен'],
    categorySlug: 'appetizers',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'рис для суші', quantity: 180 },
      { product: 'лосось', quantity: 60 },
      { product: 'тунець', quantity: 40 },
      { product: 'авокадо', quantity: 50 },
      { product: 'огірок', quantity: 40 },
      { product: 'норі', quantity: 5 },
      { product: 'соєвий соус', quantity: 20 },
      { product: 'імбир маринований', quantity: 15 },
    ],
  },
  {
    name: 'Яловичина Бургіньйон',
    description:
      'Класичне французьке рагу з яловичини, тушкованої у червоному вині з часником, цибулею, морквою та грибами.',
    composition:
      'Яловичина, червоне вино, гриби, морква, цибуля, часник, бульйон, тим’ян.',
    image:
      'https://www.thespruceeats.com/thmb/9bHcJtt9VacFlLw_hdDPHc7LclY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-classic-beef-bourguignon-recipe-7498352-step-16-fc657c2f9fcc42588c7ea30de37ad02b.jpg',
    price: 26,
    weightMin: 385,
    weightMax: 415,
    allergens: ['сульфіти'],
    categorySlug: 'main-courses',
    locationSlugs: ['park-cafe', 'cafe-center'],
    ingredients: [
      { product: 'яловичина', quantity: 220 },
      { product: 'червоне вино', quantity: 80 },
      { product: 'гриби', quantity: 60 },
      { product: 'морква', quantity: 50 },
      { product: 'цибуля', quantity: 50 },
      { product: 'часник', quantity: 5 },
      { product: 'бульйон', quantity: 40 },
    ],
  },
  {
    name: 'Шакшука',
    description:
      'Яйця пашот у гострому соусі з томатів та перцю, приправлені кумином і паприкою. Популярна страва Близького Сходу.',
    composition:
      'Яйця, томати, болгарський перець, цибуля, часник, кумин, паприка, зелень.',
    image:
      'https://assets.bonappetit.com/photos/66b0f58d0166f714b46433a9/1:1/w_3333,h_3333,c_limit/30-min-shakshuka_LEDE_071824_0935_VOG_final.jpg',
    price: 27,
    weightMin: 305,
    weightMax: 335,
    allergens: ['яйця'],
    categorySlug: 'breakfast',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'яйце', quantity: 2 },
      { product: 'томати', quantity: 160 },
      { product: 'болгарський перець', quantity: 80 },
      { product: 'цибуля', quantity: 40 },
      { product: 'часник', quantity: 5 },
      { product: 'зелень', quantity: 5 },
    ],
  },
  {
    name: 'Тако аль Пастор',
    description:
      'Мексиканські тако з маринованою свининою, ананасом, цибулею та кінзою у кукурудзяних тортильях.',
    composition:
      'Свинина, ананас, цибуля, кінза, тортильї, лайм, спеції.',
    image:
      'https://www.thespruceeats.com/thmb/wQd2RvxH1Lh9536W5LY1T_VSyT8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tacos-al-pastor-recipe-4172074-hero-01-7fb1a4455397486b8485ac8ec2ca3c5a.jpg',
    price: 28,
    weightMin: 235,
    weightMax: 265,
    allergens: ['глютен'],
    categorySlug: 'drinks',
    locationSlugs: ['cafe-center', 'park-cafe'],
    ingredients: [
      { product: 'свинина', quantity: 120 },
      { product: 'ананас', quantity: 40 },
      { product: 'цибуля', quantity: 30 },
      { product: 'кінза', quantity: 5 },
      { product: 'тортильї пшеничні', quantity: 2 },
      { product: 'лайм', quantity: 10 },
    ],
  },
  {
    name: 'Пад Тай',
    description:
      'Смажена рисова локшина з креветками, тофу, арахісом, яйцями та паростками квасолі у кисло-солодкому соусі з тамаринду.',
    composition:
      'Рисова локшина, креветки, тофу, яйця, арахіс, паростки квасолі, соєвий соус, тамаринд.',
    image: 'https://san-j.com/wp-content/uploads/2023/09/Crispy-Chicken-Pad-Thai.jpeg',
    price: 29,
    weightMin: 315,
    weightMax: 345,
    allergens: ['морепродукти', 'соя', 'яйця', 'арахіс', 'глютен'],
    categorySlug: 'vegetarian',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'рисова локшина', quantity: 160 },
      { product: 'креветки', quantity: 80 },
      { product: 'тофу', quantity: 60 },
      { product: 'яйце', quantity: 1 },
      { product: 'арахіс', quantity: 15 },
      { product: 'паростки квасолі', quantity: 40 },
      { product: 'соєвий соус', quantity: 20 },
    ],
  },
  {
    name: 'Фалафель у піті',
    description:
      'Хрусткі кульки з нуту у теплому піті з хумусом, тахіні, овочами та соліннями.',
    composition:
      'Нут, піта, хумус, тахіні, огірок, помідор, салат, соління.',
    image:
      'https://fooddoodz.tv/assets/images/2020-05-19-Falafel-Wraps/2020-05-19-Falafel-Wraps--Hero-Image-900.jpg',
    price: 30,
    weightMin: 265,
    weightMax: 295,
    allergens: ['глютен', 'кунжут'],
    categorySlug: 'vegetarian',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'нут', quantity: 120 },
      { product: 'піта', quantity: 1 },
      { product: 'хумус', quantity: 60 },
      { product: 'тахіні', quantity: 20 },
      { product: 'огірок', quantity: 40 },
      { product: 'помідор', quantity: 40 },
      { product: 'листя салату', quantity: 15 },
    ],
  },
  {
    name: 'Бібімбап',
    description:
      'Корейська рисова страва з овочами, маринованою яловичиною, смаженим яйцем та соусом кочуджан.',
    composition:
      'Рис, яловичина, морква, шпинат, проростки, яйце, кочуджан, кунжутна олія.',
    image:
      'https://res.cloudinary.com/hellochef/image/upload/c_fit/q_auto/dpr_auto/n4fjbctl5ffexe634ti5?_a=E',
    price: 31,
    weightMin: 335,
    weightMax: 365,
    allergens: ['яйця', 'соя', 'кунжут'],
    categorySlug: 'breakfast',
    locationSlugs: ['roof-restaurant', 'cafe-center'],
    ingredients: [
      { product: 'рис', quantity: 180 },
      { product: 'яловичина', quantity: 90 },
      { product: 'морква', quantity: 40 },
      { product: 'шпинат', quantity: 30 },
      { product: 'проростки', quantity: 30 },
      { product: 'яйце', quantity: 1 },
      { product: 'соус кочуджан', quantity: 20 },
    ],
  },
  {
    name: 'Курка Тікка Масала',
    description:
      'Запечені шматочки курки у вершково-пряному томатному соусі. Найкраще смакує з нааном.',
    composition:
      'Курка, томатний соус, вершки, цибуля, часник, імбир, спеції тікка.',
    image:
      'https://realfood.tesco.com/media/images/1400x919-Chicken-tikka-masala-43fcdbd8-eb86-4b55-951d-adda29067afa-0-1400x919.jpg',
    price: 32,
    weightMin: 305,
    weightMax: 335,
    allergens: ['молочні продукти'],
    categorySlug: 'main-courses',
    locationSlugs: ['cafe-center', 'park-cafe'],
    ingredients: [
      { product: 'куряче філе', quantity: 170 },
      { product: 'томатний соус', quantity: 80 },
      { product: 'вершки', quantity: 40 },
      { product: 'цибуля', quantity: 30 },
      { product: 'часник', quantity: 5 },
      { product: 'імбир', quantity: 5 },
    ],
  },
  {
    name: 'Грецька Мусака',
    description:
      'Шари обсмажених баклажанів, м’яса зі спеціями та ніжного бешамельного соусу, запечені до золотистої скоринки.',
    composition:
      'Баклажан, картопля, фарш, томати, молоко, масло, борошно, сир.',
    image:
      'https://www.dianekochilas.com/wp-content/uploads/2023/11/Moussaka-Recipe-Greek-Eggplant-Casserole.jpg',
    price: 33,
    weightMin: 385,
    weightMax: 415,
    allergens: ['молочні продукти', 'глютен', 'яйця'],
    categorySlug: 'main-courses',
    locationSlugs: ['roof-restaurant', 'park-cafe'],
    ingredients: [
      { product: 'баклажан', quantity: 150 },
      { product: 'картопля', quantity: 120 },
      { product: 'фарш', quantity: 140 },
      { product: 'томатний соус', quantity: 60 },
      { product: 'молоко', quantity: 60 },
      { product: 'борошно', quantity: 15 },
      { product: 'сир', quantity: 25 },
    ],
  },
  {
    name: 'Рамен',
    description:
      'Японська локшина в ароматному бульйоні з м’ясом, яйцем, норі та зеленню. Ситна й зігріваюча страва.',
    composition:
      'Пшенична локшина, бульйон, м’ясо, яйце, норі, зелена цибуля, гриби, соєвий соус.',
    image:
      'https://images.gastronom.ru/kfXGMYFcHvgNNJj4w9FVkqrjjX7pWxjq2GpzsdN1M1E/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzJjMWMzYzIzLTc3OGMtNDJhNC04YzkwLTFmYTA0NzdkYzRjMS5qcGc.webp',
    price: 34,
    weightMin: 335,
    weightMax: 365,
    allergens: ['глютен', 'яйця', 'соя'],
    categorySlug: 'breakfast',
    locationSlugs: ['roof-restaurant', 'cafe-center'],
    ingredients: [
      { product: 'пшенична локшина', quantity: 160 },
      { product: 'бульйон', quantity: 300 },
      { product: 'м’ясо', quantity: 80 },
      { product: 'яйце', quantity: 1 },
      { product: 'норі', quantity: 5 },
      { product: 'зелена цибуля', quantity: 10 },
      { product: 'гриби', quantity: 40 },
    ],
  },
];

const toDecimal = (value?: number | null) =>
  value != null ? new Prisma.Decimal(String(value)) : null;

export async function createMeals(
  categories: Record<string, any>,
  locations: Record<string, any>,
) {
  try {
    for (const meal of mealsData) {
      const category = categories[meal.categorySlug];
      if (!category) {
        console.error(`Missing category ${meal.categorySlug} for meal "${meal.name}"`);
        continue;
      }

      const existing = await prisma.meal.findFirst({
        where: { name: meal.name },
      });

      const baseData = {
        description: meal.description ?? meal.composition,
        image: meal.image ?? defaultImage,
        price: new Prisma.Decimal(String(meal.price)),
        weightMin: toDecimal(meal.weightMin),
        weightMax: toDecimal(meal.weightMax),
        weight: toDecimal((meal.weightMin + meal.weightMax) / 2),
        allergens: meal.allergens,
        categoryId: category.id,
      };

      const createdOrUpdated = existing
        ? await prisma.meal.update({
          where: { id: existing.id },
          data: baseData,
        })
        : await prisma.meal.create({
          data: {
            name: meal.name,
            ...baseData,
          },
        });

      for (const locationSlug of meal.locationSlugs) {
        const location = locations[locationSlug];
        if (!location) {
          console.error(
            `Missing location ${locationSlug} for meal "${meal.name}"`,
          );
          continue;
        }

        const lm = await prisma.locationMeal.findFirst({
          where: { locationId: location.id, mealId: createdOrUpdated.id },
        });

        if (lm) {
          await prisma.locationMeal.update({
            where: { id: lm.id },
            data: {
              price: new Prisma.Decimal(String(meal.price)),
              available: true,
              stock: lm.stock ?? 10,
            },
          });
        } else {
          await prisma.locationMeal.create({
            data: {
              locationId: location.id,
              mealId: createdOrUpdated.id,
              price: new Prisma.Decimal(String(meal.price)),
              available: true,
              stock: 15,
            },
          });
        }
      }
    }

    console.log('✅ Meals seeded/updated');
  } catch (err) {
    console.error('Error during seed meals:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
