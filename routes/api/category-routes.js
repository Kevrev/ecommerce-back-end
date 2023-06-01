const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        { model: Product }
      ],
    });

    if (!category) {
      return res.status(404).json({ message: 'No category not found' });
    }
  
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error'});
  }
});


router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error'});
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
