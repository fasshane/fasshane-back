import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createLocations() {
  const locationsData = [
    {
      name: "Кафе в центрі",
      address: "123 Головна вулиця, Київ",
      slug: "cafe-center",
      openTime: "09:00",
      closeTime: "22:00",
    },
    {
      name: "Ресторан на даху",
      address: "789 Вулиця Пагорбів, Львів",
      slug: "roof-restaurant",
      openTime: "10:00",
      closeTime: "23:00",
    },
    {
      name: "Кав’ярня біля парку",
      address: "321 Паркова вулиця, Харків",
      slug: "park-cafe",
      openTime: "08:00",
      closeTime: "21:00",
    },
  ];

  const createdLocations: Record<string, any> = {};

  for (const location of locationsData) {
    const created = await prisma.location.create({
      data: {
        name: location.name,
        address: location.address,
        slug: location.slug,
        openTime: location.openTime,
        closeTime: location.closeTime,
      },
    });
    createdLocations[location.slug] = created;
  }

  return createdLocations;
}