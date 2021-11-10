const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth.js');
const { Note } = require('../../db/models/');

router.use(restoreUser);

router.get('/', asyncHandler(async (req, res) => {
  // if no user, pretend it is user with id of 1 (initial dev mocking only)
  const userId = req.user?.id || 1;
  const notes = await Note.findAll({ where: { userId } });
  res.json({ notes });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { id } = req.params;
  // const note = Note.findByPk(id);
  const note = await Note.findOne({ where: { id, userId } });
  res.json({ note });
}));

router.post('/', asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
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
  const userId = req.user?.id || 1;
  const { id } = req.params;
  const { title, content } = req.body;
  const [_, [note]] = await Note.update(
    { title, content },
    { where: { id }, returning: true }
  );
  console.log('this is the note', note);
  res.json({ note });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const userId = req.user?.id || 1;
  const { id } = req.params;
  const success = await Note.destroy({ where: { id, userId } });
  res.json({ success: !!success });
}));

module.exports = router;
