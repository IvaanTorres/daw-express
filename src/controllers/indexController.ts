import { Request, Response } from 'express'

class IndexController {
  /**
   * Display a listing of the resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public index(req: Request, res: Response) {
    res.render('index')
  }

  /**
   * Display a listing of the resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public error(req: Request, res: Response) {
    res.render('error')
  }
}

const indexController = new IndexController()
export default indexController
