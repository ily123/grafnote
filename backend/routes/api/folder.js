const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Folder } = require('../../db/models/');

router.get('/', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const folders = await Folder.findAll({ where: { userId } });
  res.json({ folders });
}));

router.post('/', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;
  const folder = await Folder.create({
    userId,
    title
  });
  res.json({ folder });
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title } = req.body;
  const [_, [folder]] = await Folder.update(
    { title },
    { where: { id, userId }, returning: true }
  );
  res.json({ folder });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const folder = await Folder.findOne({ where: { id, userId } });
  const success = await folder.destroy();
  res.json({ success: !!success });
}));

module.exports = router;
