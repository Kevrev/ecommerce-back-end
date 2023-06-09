const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        { model: Product }, 
      ],
    });
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error'});
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product },
      ],
    });

    if (!tag) {
      return res.status(404).json({ message: 'No tag found' });
    }
  
    res.json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error'});
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error'});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    return updateTag > 0 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;

    await Tag.destroy({ where: { id: tagId } });
    res.json({ message: `Tag deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error'});
  }
  // delete on tag by its `id` value
});

module.exports = router;
