export const selectFields = {
  id: true,
  name: true,
  email: true,
  rating: true,
  phone: true,
  avatar: true,
  active: true,
  createAt: true,
  updatedAt: true,
  _count: {
    select: {
      products: true,
      orders: true,
    },
  },
};
