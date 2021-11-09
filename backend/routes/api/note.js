const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models/');

router.get('/', asyncHandler(async (req, res) => {
  console.log('here I am');
  res.json({ test: 'this is a test of the notes routing.' });
}));

router.get('/:id', asyncHandler(async (req, res) => {

}));

router.post('/', asyncHandler(async (req, res) => {

}));

router.patch('/:id', asyncHandler(async (req, res) => {

}));

router.delete('/:id', asyncHandler(async (req, res) => {

}));

module.exports = router;
