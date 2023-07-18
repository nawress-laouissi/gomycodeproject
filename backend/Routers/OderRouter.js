const express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const { isAuth } = require('../middleWare/isAuth.js');
const Order = require('../models/order.js');
const { isAdmin } = require('../middleWare/isAdmin');
const orderRouter = express.Router();
orderRouter.post('/newOrder', isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.body.user._id,
  });

  const order = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', order });
});
orderRouter.get('/summary', isAuth, isAdmin, async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);
  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      },
    },
  ]);
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orders: { $sum: 1 },
        sales: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const productCategories = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);
  res.send({ users, orders, dailyOrders, productCategories });
});

orderRouter.get('/order/mine', isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ order: req.user._id });
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
  }
});
orderRouter.get('/order/:id', isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404).send({ message: 'order not found' });
  }
});
orderRouter.put('/:id/pay', isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.user._id;
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
});

module.exports = orderRouter;
