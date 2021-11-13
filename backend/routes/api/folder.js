const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth.js');
const { Folder } = require('../../db/models/');

router.use(restoreUser);

router.get('/', asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const folders = await Folder.findAll({ where: { userId } });
  console.log('backend-------------', folders);
  res.json({ folders });
}));

router.post('/', asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { title } = req.body;
  const folder = await Folder.create({
    userId,
    title
  });
  res.json({ folder });
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { id } = req.params;
  const { title } = req.body;
  console.log('this is the id', id);
  console.log('this is the title', title);
  const [_, [folder]] = await Folder.update(
    { title },
    { where: { id }, returning: true }
  );
  console.log(folder);
  res.json({ folder });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { id } = req.params;
  const success = await Folder.destroy({ where: { id, userId } });
  res.json({ success: !!success });
}));

module.exports = router;
