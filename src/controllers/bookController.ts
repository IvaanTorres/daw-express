import { Request, Response } from 'express'

//! MODELS
import { Book, BookModel } from '../models/Book'

class BookController {
  /**
   * Display a listing of the resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const books: Book[] = await BookModel.find().lean() //? .lean() makes the arr of JSON Obj and not of Mongoose Obj
      res.render('books/index', { title: 'Book List', books })
    } catch (error) {
      res.render('error', { title: 'ERROR', error: error })
    }
  }

  /**
   * Display the specified resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public async show(req: Request, res: Response) {
    try {
      const book = await BookModel.findById(req.params.id).lean()
      res.render('books/show', { title: 'Book Details', book })
    } catch (error) {
      res.render('error', { error })
    }
  }

  /**
   * Show the form for creating a new resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public create(req: Request, res: Response) {
    res.status(200).render('books/create')
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public async store(req: Request, res: Response) {
    try {
      const { title, authorName, editorial, price } = req.body
      const book = new BookModel({
        title: title,
        editorial: editorial,
        price: price,
        author: {
          name: authorName,
        },
      })
      const newBook = await book.save()
      res.status(201).redirect('/books')
    } catch (error) {
      res.status(500).render('error')
    }
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public async edit(req: Request, res: Response) {
    try {
      const book = await BookModel.findById(req.params.id).lean()
      if (!book)
        return res.status(404).render('error', { error: 'Book Not Found' })
      res.status(200).render('books/edit', { book })
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }

  /**
   * Update the specified resource in storage.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  //? In case of wanting to update a subdocument, use promises or $set
  public async update(req: Request, res: Response) {
    try {
      const { title, authorName, editorial, price } = req.body
      let book = await BookModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: title,
            editorial: editorial,
            price: price,
            author: { name: authorName },
          },
        },
        { new: true }
      )
      res.status(201).redirect('/books')
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public async destroy(req: Request, res: Response) {
    try {
      const book = await BookModel.findByIdAndDelete(req.params.id)
      if (!book)
        return res.status(404).render('error', { error: 'Book Not Found' })
      res.redirect('/books')
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }
}

const bookController = new BookController()
export default bookController
