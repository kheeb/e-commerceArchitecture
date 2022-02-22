const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag },
      ]
    });
    if (!tagInfo) {
      res.status(404).json({ message: 'No data found.'});
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagInfo = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!tagInfo) {
      res.status(404).json({ message: 'No data found.'});
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status.apply(500).json(err);
  }
});

module.exports = router;
