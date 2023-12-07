const express = require('express');
const router = express.Router();
const db = require('../db/mysql');



// 获取所有订单
router.get('/', (req, res) => {
    db.query('SELECT * FROM orders', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ orders: results });
    });
});

// 创建订单
router.post('/', (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ error: 'ProductId and quantity are required' });
    }

    // 在实际应用中，你可能需要检查产品是否存在，库存是否足够等业务逻辑

    const order = { productId, quantity, status: 'Pending' };

    db.query('INSERT INTO orders SET ?', order, (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Order created successfully', order });
    });
});

// 查询订单状态
router.get('/:orderId/status', (req, res) => {
    const orderId = req.params.orderId;

    db.query('SELECT status FROM orders WHERE id = ?', orderId, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ status: results[0].status });
    });
});

// 更新订单状态（示例）
router.put('/:orderId/status', (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    // 在实际应用中，你可能需要添加更多的业务逻辑，如检查状态是否合法等

    db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Order status updated successfully' });
    });
});

module.exports = router;
