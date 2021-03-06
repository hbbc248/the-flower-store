const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/nodemailer')


// Stripe payment
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }
      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const { products } = await order.populate('products').execPopulate();

      const line_items = [];

      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: (products[i].price * 100).toFixed(0),
          currency: 'usd',
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1
        });

      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/cart`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {

      const email = args.email;
      const user = await User.findOne({ email });

      if (user) {
        throw new AuthenticationError('The email entered is already registered on our site, Please log in or use a different email.');
      }

      const newUser = await User.create(args);
      const token = signToken(newUser);

      return { token, newUser };
    },
    addOrder: async (parent, args, context) => {
      if (context.user) {
        const order = new Order(args);

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        const email = context.user.email;
        sendEmail(email, args);      

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {

      if (context.user) {
        const user = await User.findById(context.user._id);
        const correctPw = await user.isCorrectPassword(args.password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password');
        }
        args.password = await bcrypt.hash(args.password, 8);

        const newUser = await User.findByIdAndUpdate(context.user._id, args, { new: true });

        const token = signToken(newUser);

        return { token, newUser };
      }
      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);

      return { token, user };
    },
    deleteUser: async (parent, { password }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password');
        }

        return await User.findByIdAndDelete(context.user._id);
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;
