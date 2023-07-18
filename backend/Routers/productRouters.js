const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// router.get('/test', (req,res)=>{
//     res.send('this is test')
// })
router.post('/createProduct', async (req, res) => {
  const { name, price, description, quantity, image, category } = req.body;
  try {
    const product = new Product({
      name,
      price,
      description,
      quantity,
      image,
      category,
    });
    await product.save();
    res.status(201).send({ msg: 'product added', product });
  } catch (error) {
    res.status(500).send('server error');
  }
});
router.get('/getProducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ msg: 'all products', products });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get('/getOneProduct/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).send({ msg: 'one product', product });
  } catch (error) {
    res.status(500).send(error.msg);
  }
});
router.get('/categories', async (req, res) => {
  const categories = await Product.find().distinct('category');
  res.send(categories);
});
const PAGE_SIZE = 3;
router.get('/search', async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const price = query.price || '';

  const order = query.order || '';
  const searchQuery = query.query || '';
  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          // 1-50
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};
  const sortOrder =
    order === 'featured'
      ? { featured: -1 }
      : order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : order === 'newest'
      ? { createdAt: -1 }
      : { _id };

  try {
    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    });
    res.status(200).send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/deleteProduct/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).send('product deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.put('/updateProduct/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      ($set = { ...req.body }),
      { new: true }
    );
    res.status(200).send({ msg: 'product updated', updatedProduct });
  } catch (error) {
    res.status(500).send(error.msg);
  }
});

module.exports = router;
