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
      'Cheerfull and calming bouqet filled with light pink roses and calming eucalyptus to soothe the soul. The perfect get well bouquet that speaks to the soul and the journey to better health.',
      image: 'pretty-pastel.jpeg',
      category: [ categories[0]._id, categories[1]._id,categories[3]._id ],
      price: 80.00
    },
    {
      name: 'Colors of the Rainbow',
      description:
        'Putting a bright start in somebody’s day starts with a beautiful gift. Our delightfully vibrant bouquet is filled with a medley of blooms in cheerful pops of orange, pink and yellow, with plenty of lush greenery mixed in. It’s the perfect pick-me-up surprise, whatever the sentiment.',
      image: 'rainbow-colors.jpeg',
      category: [ categories[0]._id, categories[1]._id, categories[4]._id],
      price: 49.99
    },
    {
      name: 'Spring Bouquet',
      description:
      'A grand collection of highly colorful organically and locally grown roses. The best of the spring is right here.',
      image: 'spring.jpeg',
      category:[ categories[0]._id, categories[1]._id ],
      price: 79.99
    },
    {
      name: 'Summer Bouquet',
      description:
      'Our best selling summer bouquet inspired by the shores of the California coast. Bright orange roses contrast against the beautiful blue lavender stems. The best way to show those loved ones what they mean to you.',
      image: 'summer.jpeg',
      category: [ categories[0]._id, categories[1]._id, categories[3]._id],
      price: 44.99
    },
    {
      name: 'A Special Gift for Mom',
      description:
      'Give mom the most delightful surprise with this sweet bouquet filled with pink and white blooms that show mom how much you really care.',
      image: 'mother.jpeg',
      category: [categories[0]._id, categories[2]._id, categories[4]._id],
      price: 69.99
    },
    {
      name: 'Pretty in Pink',
      description:
      'Magnificent is the only way to describe our all-pink bouquet. We’ve gathered one dozen long-stem roses with six, multi-bloomed Asiatic lilies for a gift that’s sure to make an impression.',
      image: 'pretty-in-pink.jpeg',
      category: [categories[0]._id, categories[2]._id, categories[3]._id],
      price: 39.99
    },
    {
      name: 'Sweet Thoughts',
      description:
      'A small dark accent of lillies wiith cascading green bushes create a sense of calm and love exuding from the base to the very last flower on top.',
      image: 'sweet-thought.jpeg',
      category: [categories[0]._id, categories[2]._id, categories[4]._id],
      price: 39.99
    },
    {
      name: 'Violet All Over',
      description:
      'Some sweet affection for the people you love. Our everyday bouquet is loosely gathered with a mix of pastel blooms inside our striking, new fluted violet gathering vase. Designed in vintage pressed glass with ribbed detailing, it’s a gift full of warmth and beauty',
      image: 'violet-allover.jpeg',
      category: [categories[0]._id, categories[2]._id],
      price: 49.99
    },
    {
      name: 'Joyful Memory',
      description:
      'Lovely memories are made with thoughtful gifts for the ones we care about. Our charming bouquet is loosely gathered with a medley of lavender & white blooms. Hand-designed inside a clear cylinder vase with cascading greenery all around, it’s a wonderful way to express the sentiments you have inside your heart.',
      image: 'joyful-memory.jpeg',
      category: [categories[0]._id, categories[3]._id, categories[2]._id],
      price: 99.99
    },
    {
      name: 'A Touch of Blue',
      description:
      ' Inspired by the soothing shades of a seaside retreat, our popular bouquet will bring its tranquil beauty to someone special. Artistically designed in our grey-washed wooden cube featuring soft, natural tones and textures, it’s finished with a touch of raffia to deliver your sentiments in cool, summery style.',
      image: 'touch-of-blue.jpeg',
      category: [categories[0]._id, categories[3]._id, categories[1]._id],
      price: 80.00
    },
    {
      name: 'Bright Colors for Brighter Days',
      description:
      'Shades of golden yellow and rich blue pop against lush greenery, creating a timeless gift for someone special to enjoy.',
      image: 'bright-colors.jpeg',
      category: [categories[0]._id, categories[4]._id],
      price: 49.99
    },
    {
      name: 'Dozen of red roses',
      description:
        'Dozen of red roses looking very nice.',
      image: 'one-dozen-roses.jpg',
      category: [categories[0]._id, categories[4]._id, categories[1]._id],
      price: 39.99
    },
    {
      name: 'Yellow Spring Flowers',
      description:
      'Our beach-inspired bouquet captures the blissful beauty of a seaside retreat. Bunches of blooms in cool, soothing shades are arranged in a glass vase tied with raffia for an extra touch of coastal style. It’s a gift that celebrates the carefree spirit of summer, while surprising the people you care about most.',
      image: 'yellow-spring.jpeg',
      category: [categories[0]._id, categories[4]._id, categories[2]._id],
      price: 69.99
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
