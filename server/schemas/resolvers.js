const { AuthenticationError, defaultMergedResolver } = require('apollo-server-express');
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

        // reform Order in the back end to send email. 
        const productsIds = args.products;
        let products = []

        for (let i = 0; i < productsIds.length; i++) {
          const item = await Product.findById(productsIds[i]);
          products.push(item);
        }

        // create new products array and quantities array
        const newProductsArray = [];
        const quantitiesArray = [];
        // While there is still products on initial array
        while (products.length > 0) {
          // Push first product into new array and get Id
          const firstProductId = products[0].name;
          newProductsArray.push(products[0]);
          // filter Original array with name to find out how many are the same. 
          const filterArray = []
          for (let i = 0; i < products.length; i++) {
            if (products[i].name === firstProductId) {
              filterArray.push(products[i])
            }
          }
          // Slice the ones that are the same from original array
          products = products.slice(filterArray.length);
          // push quantity into quantity array
          quantitiesArray.push({ "purchaseQuantity": filterArray.length });
        }
        let newArray = [];
        // Blend both new arrays into one.
        for (let i = 0; i < newProductsArray.length; i++) {
          newArray.push({
            ...newProductsArray[i],
            ...quantitiesArray[i]
          });
        }
        // Get total pay for the order
        let totalPaid = 0;
        for (let i = 0; i < newArray.length; i++) {
          totalPaid = totalPaid + (newArray[i]._doc.price * newArray[i].purchaseQuantity);
        }
        const newTotalPaid = totalPaid.toFixed(2);
        const emailData = {
          shipTo: args.shipTo,
          address: args.shipToAddress,
          message: args.message,
          totalPaid: newTotalPaid,
          productsOrdered: newArray,
        }
        const email = context.user.email;
        sendEmail(email, emailData);

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
