const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No category with this id found' });
      return;
    }
    res.json(dbData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err),
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbData => {
    if (!dbData[0]) {
      res.status(404).json({ message: 'No category ound with this id' });
      return;
    }
    res.json(dbData);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
