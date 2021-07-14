const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'All' },
    { name: 'Anniversary' },
    { name: 'Birthday' },
    { name: 'Get well' },
    { name: 'Just Because'}
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Pretty in Pastel',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'pretty-pastel.jpeg',
      category: [ categories[0]._id, categories[1],categories[3]._id ],
      price: 59.99
    },
    {
      name: 'Colors of the Rainbow',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'rainbow-colors.jpeg',
      category: [ categories[0]._id, categories[1], categories[4]._id],
      price: 69.99
    },
    {
      name: 'Spring Bouquet',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'spring.jpeg',
      category:[ categories[0]._id, categories[1] ],
      price: 59.99
    },
    {
      name: 'Summer Bouquet',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'summer.jpeg',
      category: [ categories[0]._id, categories[1], categories[3]._id],
      price: 59.99
    },
    {
      name: 'A Special Gift for Mom',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'mother.jpeg',
      category: [categories[0]._id, categories[2]._id, categories[4]._id],
      price: 59.99
    },
    {
      name: 'Pretty in Pink',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'pretty-in-pink.jpeg',
      category: [categories[0]._id, categories[2]._id, categories[3]._id],
      price: 59.99
    },
    {
      name: 'Sweet Thoughts',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'sweet-thought.jpeg',
      category: [categories[0]._id, categories[2]._id, categories[4]._id],
      price: 59.99
    },
    {
      name: 'Violet All Over',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'violet-allover.jpeg',
      category: [categories[0]._id, categories[2]._id],
      price: 59.99
    },
    {
      name: 'Joyful Memory',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'joyful-memory.jpeg',
      category: [categories[0]._id, categories[3]._id, categories[2]._id],
      price: 59.99
    },
    {
      name: 'A Touch of Blue',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'touch-of-blue.jpeg',
      category: [categories[0]._id, categories[3]._id, categories[1]._id],
      price: 59.99
    },
    {
      name: 'Bright Colors for Brighter Days',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'bright-colors.jpeg',
      category: [categories[0]._id, categories[4]._id],
      price: 59.99
    },
    {
      name: 'Dozen of red roses',
      description:
        'Dozen of red roses looking very nice.',
      image: 'one-dozen-roses.jpg',
      category: [categories[0]._id, categories[4]._id, categories[1]._id],
      price: 59.99
    },
    {
      name: 'Yellow Spring Flowers',
      description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corporis excepturi ipsam delectus aliquid reiciendis laboriosam ea necessitatibus enim dignissimos consequuntu',
      image: 'yellow-spring.jpeg',
      category: [categories[0]._id, categories[4]._id, categories[2]._id],
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
