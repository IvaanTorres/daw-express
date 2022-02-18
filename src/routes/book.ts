import { Router } from 'express'
const router = Router()
import { BookModel } from '../models/Book'

router.get('/', async (req, res) => {
  try {
    const books = await BookModel.find()
    res.status(200).send(books)
  } catch (error) {
    return res.status(500).json(error)
  }
})
router.get('/:id', async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' }) //In case of sending ID of 10 chars
    res.status(200).send(book)
  } catch (error) {
    return res.status(500).json(error)
  }
})
router.post('/', async (req, res) => {
  try {
    const { title, editorial, price } = req.body
    const book = new BookModel({ title, editorial, price })
    const postedBook = await book.save()
    res.status(201).json(postedBook)
  } catch (error) {
    return res.status(500).json(error)
  }
})
//! PREGUNTAR: COMO HACER QUE ACTUALICE SOLO SI EL DOCUMENTO TIENE TODOS LOS CAMPOS QUE SE ENVIAN EN EL REQ
router.put('/:id', async (req, res) => {
  try {
    const { title, editorial, price } = req.body

    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      { title, editorial, price },
      { new: true } //We say we want to fetch the updated book and not the old one
    )
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' }) //In case of sending ID of 10 chars
    return res.status(201).json(updatedBook)
  } catch (error) {
    return res.status(500).json(error)
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id)
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' }) //In case of sending ID of 10 chars
    return res.status(201).json(deletedBook)
  } catch (error) {
    return res.status(500).json(error)
  }
})

export default router
