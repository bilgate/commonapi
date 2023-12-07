const express = require('express');
const router = express.Router();
const db = require('../db/mysql');


// 获取所有商品
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ products: results });
  });
});

// 创建商品
router.post('/', (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const product = { name, price, description };

  db.query('INSERT INTO products SET ?', product, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Product created successfully' });
  });
});

// 获取单个商品
router.get('/:productId', (req, res) => {
  const productId = req.params.productId;

  db.query('SELECT * FROM products WHERE id = ?', productId, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product: results[0] });
  });
});

// 更新商品信息
router.put('/:productId', (req, res) => {
  const productId = req.params.productId;
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const updatedProduct = { name, price, description };

  db.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// 删除商品
router.delete('/:productId', (req, res) => {
  const productId = req.params.productId;

  db.query('DELETE FROM products WHERE id = ?', productId, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;
