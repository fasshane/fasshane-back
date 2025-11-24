import { type Location, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type LocInput = {
  name: string;
  address: string;
  slug: string;
  openTime?: string;
  closeTime?: string;
  phone?: string;
  avatar?: string;
};

export async function createLocations(): Promise<Record<string, Location>> {
  const locationsData: readonly LocInput[] = [
    {
      name: 'Кафе в центрі',
      address: '123 Головна вулиця, Київ',
      slug: 'cafe-center',
      openTime: '09:00',
      closeTime: '22:00',
      phone: '+380671112233',
      avatar: 'https://placehold.co/256x256?text=Cafe',
    },
    {
      name: 'Ресторан на даху',
      address: '789 Вулиця Пагорбів, Львів',
      slug: 'roof-restaurant',
      openTime: '10:00',
      closeTime: '23:00',
      phone: '+380501234567',
      avatar: 'https://placehold.co/256x256?text=Roof',
    },
    {
      name: 'Кав’ярня біля парку',
      address: '321 Паркова вулиця, Харків',
      slug: 'park-cafe',
      openTime: '08:00',
      closeTime: '21:00',
      phone: '+380931234567',
      avatar: 'https://placehold.co/256x256?text=Park',
    },
  ] as const;

  const createdLocations: Record<string, Location> = {};

  try {
    for (const l of locationsData) {
      const openingHours =
        l.openTime && l.closeTime
          ? {
              mon: [{ from: l.openTime, to: l.closeTime }],
              tue: [{ from: l.openTime, to: l.closeTime }],
              wed: [{ from: l.openTime, to: l.closeTime }],
              thu: [{ from: l.openTime, to: l.closeTime }],
              fri: [{ from: l.openTime, to: l.closeTime }],
              sat: [{ from: l.openTime, to: l.closeTime }],
              sun: [{ from: l.openTime, to: l.closeTime }],
            }
          : null;

      createdLocations[l.slug] = await prisma.location.upsert({
        where: { slug: l.slug },
        update: {
          name: l.name,
          address: l.address,
          phone: l.phone,
          avatar: l.avatar,
          ...(openingHours ? { openingHours } : {}),
        },
        create: {
          name: l.name,
          address: l.address,
          slug: l.slug,
          phone: l.phone,
          avatar: l.avatar,
          ...(openingHours ? { openingHours } : {}),
        },
      });
    }

    console.log(
      `✅ Created/updated ${Object.keys(createdLocations).length} locations`,
    );
    return createdLocations;
  } catch (err) {
    console.error('Error creating locations:', err);
    throw err;
  }
}
