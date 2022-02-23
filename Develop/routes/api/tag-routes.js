const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagInfo = await Tag.findAll({
      include: [
        {model: Product, through: ProductTag, as: 'products' }
      ]
    });
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    });
   
    (!tagInfo)
    ? res.status(404).json({ message: 'No tag was found with this id.' })
    : res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagInfo = await Tag.update(req.body, {
      where: {id: req.params.id} 
    });

    (!tagInfo[0]) 
    ? res.status(404).json({ message: 'No tag was found with this id.' })
    : res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  };
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
      res.status(404).json({ message: 'No tag was found with this id.'});
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status.apply(500).json(err);
  }
});

module.exports = router;