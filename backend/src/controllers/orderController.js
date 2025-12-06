import Order from '../models/Order.js';

export const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) res.json(order);
  else res.status(404).json({ message: 'Order not found' });
};

// Admin: Get All Orders
export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
};

// Admin: Update Status
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// User: Upload Proof
export const uploadPaymentProof = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.paymentResult = {
      status: 'Paid',
      update_time: Date.now(),
      proofImage: `/uploads/${req.file.filename}`,
    };
    order.status = 'Paid'; // Auto set to paid if proof uploaded (bisa diubah logicnya jd pending check)
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// AGGREGATION REPORTS
export const getOrderStats = async (req, res) => {
  try {
    // 1. Total Revenue
    const income = await Order.aggregate([
      { $match: { status: { $in: ['Paid', 'Shipped', 'Completed'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]);

    // 2. Best Selling Products
    const bestSellers = await Order.aggregate([
      { $unwind: '$orderItems' },
      { $group: { _id: '$orderItems.product', name: { $first: '$orderItems.name' }, count: { $sum: '$orderItems.qty' } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // 3. Sales per Date (Last 7 days example logic simplified)
    const dailySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // 4. Top Customers
    const topCustomers = await Order.aggregate([
      { $group: { _id: '$user', totalSpent: { $sum: '$totalPrice' }, orderCount: { $sum: 1 } } },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'userDetails' } },
      { $unwind: '$userDetails' },
      { $project: { name: '$userDetails.name', totalSpent: 1, orderCount: 1 } }
    ]);

    res.json({ income: income[0]?.totalRevenue || 0, bestSellers, dailySales, topCustomers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};