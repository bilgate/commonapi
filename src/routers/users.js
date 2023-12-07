const express = require('express');
const router = express.Router();
const db = require('../db/mysql');

// 获取所有用户
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             example:
 *               users: [{ id: 1, username: 'john_doe' }, { id: 2, username: 'jane_doe' }]
 */
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ users: results });
  });
});

// 创建用户
router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = { username, email, password };

  pool.query('INSERT INTO users SET ?', user, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'User created successfully' });
  });
});

// 获取单个用户
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  db.query('SELECT * FROM users WHERE id = ?', userId, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: results[0] });
  });
});

// 更新用户信息
router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const updatedUser = { username, email, password };

  db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// 删除用户
router.delete('/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.query('DELETE FROM users WHERE id = ?', userId, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
