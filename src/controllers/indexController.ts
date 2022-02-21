import { Request, Response } from 'express'

class IndexController {
  /**
   * Display Index
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public index(req: Request, res: Response) {
    try {
      res.status(200).render('index', { title: 'Welcome' })
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }

  /**
   * Display Error.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public error(req: Request, res: Response) {
    try {
      res.status(200).render('error')
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }
}

const indexController = new IndexController()
export default indexController
