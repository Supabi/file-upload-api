const express = require('express');
const router = express.Router();

let products = [
  {
    id: 1,
    name: 'คีย์บอร์ดไร้สาย',
    price: 1290,
    stock: 25,
    category: 'electronics',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'หนังสือ Node.js',
    price: 450,
    stock: 10,
    category: 'books',
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: รายการสินค้า
 *     responses:
 *       200:
 *         description: รายการสินค้าทั้งหมด
 */
router.get('/', (req, res) => {
  res.json(products);
});

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: สร้างสินค้าใหม่
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: เมาส์ไร้สาย
 *               price:
 *                 type: number
 *                 example: 590
 *               stock:
 *                 type: integer
 *                 example: 20
 *               category:
 *                 type: string
 *                 example: electronics
 *     responses:
 *       201:
 *         description: สร้างสินค้าสำเร็จ
 */
router.post('/', (req, res) => {
  const { name, price, stock = 0, category } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      error: 'name and price are required'
    });
  }

  const product = {
    id: nextId++,
    name,
    price,
    stock,
    category,
    createdAt: new Date().toISOString()
  };

  products.push(product);

  res.status(201).json(product);
});

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: ดูสินค้าตาม ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: พบสินค้า
 *       404:
 *         description: ไม่พบสินค้า
 */
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: 'Product not found'
    });
  }

  res.json(product);
});

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: แก้ไขสินค้าทั้งรายการ
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: คีย์บอร์ด Mechanical
 *               price:
 *                 type: number
 *                 example: 1990
 *               stock:
 *                 type: integer
 *                 example: 15
 *               category:
 *                 type: string
 *                 example: electronics
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 *       404:
 *         description: ไม่พบสินค้า
 */
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: 'Product not found'
    });
  }

  const { name, price, stock, category } = req.body;

  if (!name || price === undefined || stock === undefined || !category) {
    return res.status(400).json({
      error: 'name, price, stock and category are required'
    });
  }

  products[index] = {
    ...products[index],
    name,
    price,
    stock,
    category
  };

  res.json(products[index]);
});

/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: แก้ไขสินค้าบางฟิลด์
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: เมาส์ Gaming
 *               price:
 *                 type: number
 *                 example: 790
 *               stock:
 *                 type: integer
 *                 example: 30
 *               category:
 *                 type: string
 *                 example: electronics
 *     responses:
 *       200:
 *         description: แก้ไขสำเร็จ
 *       404:
 *         description: ไม่พบสินค้า
 */
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: 'Product not found'
    });
  }

  products[index] = {
    ...products[index],
    ...req.body
  };

  res.json(products[index]);
});

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: ลบสินค้า
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: ลบสินค้าสำเร็จ
 *       404:
 *         description: ไม่พบสินค้า
 */
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: 'Product not found'
    });
  }

  products.splice(index, 1);

  res.status(204).send();
});

module.exports = router;