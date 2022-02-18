import { Request, Response } from 'express'

//! MODELS
import { AuthorModel } from '../models/Author'

class AuthorController {
  /**
   * Display a listing of the resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public index(req: Request, res: Response) {}

  /**
   * Display the specified resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public show(req: Request, res: Response) {}

  /**
   * Show the form for creating a new resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public create(req: Request, res: Response) {}

  /**
   * Store a newly created resource in storage.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public store(req: Request, res: Response) {}

  /**
   * Show the form for editing the specified resource.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public edit(req: Request, res: Response) {}

  /**
   * Update the specified resource in storage.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public update(req: Request, res: Response) {}

  /**
   * Remove the specified resource from storage.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public destroy(req: Request, res: Response) {}
}

const authorController = new AuthorController()
export default authorController
