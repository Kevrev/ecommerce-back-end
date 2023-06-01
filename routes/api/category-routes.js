const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return updateCategory > 0 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    await Category.destroy({ where: { id: categoryId } });
    res.json({ message: `Category deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error'});
  }
});

module.exports = router;
