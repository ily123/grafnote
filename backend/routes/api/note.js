const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models/');
const { requireAuth } = require('../../utils/auth.js');

router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notes = await Note.findAll({ where: { userId } });
  res.json({ notes });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const note = await Note.findOne({ where: { id, userId } });
  res.json({ note });
}));

router.post('/', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { folderId, title, content } = req.body;
  const note = await Note.create({
    userId,
    folderId,
    title,
    content
  });
  res.json({ note });
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, content, folderId } = req.body;

  const [_, [note]] = await Note.update(
    { title, content, folderId: +folderId === 0 ? null : folderId },
    { where: { id, userId }, returning: true }
  );
  res.json({ note });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const success = await Note.destroy({ where: { id, userId } });
  res.json({ success: !!success });
}));

module.exports = router;
