import { Router } from 'express'
const router = Router()

//! CONTROLLERS
import authorController from '../controllers/authorController'

router.get('/', authorController.index)
router.post('/', authorController.store)
router.get('/add', authorController.create)
router.get('/:id', authorController.show) //? .show is down to let .create work
router.put('/:id', authorController.update)
router.get('/:id/edit', authorController.edit)
router.delete('/:id', authorController.destroy)

export default router
