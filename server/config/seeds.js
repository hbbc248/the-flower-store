const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'All' },
    { name: 'Birthday' },
    { name: 'Anniversary' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Dozen of red roses for Birthday',
      description:
        'Dozen of red roses looking very nice.',
      image: 'one-dozen-roses.jpg',
      category: [categories[0]._id, categories[1]._id],
      price: 59.99
    },
    {
      name: 'Dozen of red roses for Anniversary',
      description:
        'Dozen of red roses looking very nice.',
      image: 'one-dozen-roses.jpg',
      category: [categories[0]._id, categories[2]._id],
      price: 59.99
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Ibrahim',
    lastName: 'Zerlin',
    email: 'ibrahimzerlin@hotmail.com',
    password: 'abcd1234'
  });

  console.log('users seeded');

  process.exit();
});
