import { Router } from 'express'
import { AuthorModel } from '../models/Author'
const router = Router()

router.get('/', async (req, res) => {
  try {
    const authors = await AuthorModel.find()
    return res.status(200).json(authors)
  } catch (error) {
    return res.status(500).json(error)
  }
})
router.get('/:id', async (req, res) => {
  try {
    const author = await AuthorModel.findById(req.params.id)
    if (!author) return res.status(404).json({ msg: 'Author not found' })
    return res.status(200).json(author)
  } catch (error) {
    return res.status(500).json(error)
  }
})
router.post('/', async (req, res) => {
  try {
    const { name, yearBirth } = req.body
    const author = new AuthorModel({ name, yearBirth })
    const postedAuthor = await author.save()
    return res.status(201).json(postedAuthor)
  } catch (error) {
    return res.status(500).json(error)
  }
})
router.put('/:id', async (req, res) => {
  try {
    const author = await AuthorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    if (!author) return res.status(404).json({ msg: 'Author not found' })
    return res.status(201).json(author)
  } catch (error) {
    return res.status(500).json(error)
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const deletedAuthor = await AuthorModel.findByIdAndDelete(req.params.id)
    if (!deletedAuthor) return res.status(404).json({ msg: 'Author not found' })
    return res.status(200).json(deletedAuthor)
  } catch (error) {
    return res.status(500).json(error)
  }
})

export default router
