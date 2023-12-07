const express = require('express');
const router = express.Router();
const db = require('../db/mysql');


// 获取所有组织机构
router.get('/', (req, res) => {
    db.query('SELECT * FROM organizations', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ organizations: results });
  });
});

// 创建组织机构
router.post('/', (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const organization = { name, description };

  db.query('INSERT INTO organizations SET ?', organization, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Organization created successfully' });
  });
});

// 获取单个组织机构
router.get('/:orgId', (req, res) => {
  const orgId = req.params.orgId;

  db.query('SELECT * FROM organizations WHERE id = ?', orgId, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json({ organization: results[0] });
  });
});

// 更新组织机构信息
router.put('/:orgId', (req, res) => {
  const orgId = req.params.orgId;
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const updatedOrganization = { name, description };

  db.query('UPDATE organizations SET ? WHERE id = ?', [updatedOrganization, orgId], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Organization updated successfully' });
  });
});

// 删除组织机构
router.delete('/:orgId', (req, res) => {
  const orgId = req.params.orgId;

  db.query('DELETE FROM organizations WHERE id = ?', orgId, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Organization deleted successfully' });
  });
});

module.exports = router;
