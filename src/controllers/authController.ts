import { Request, Response } from 'express'

//! MODELS
import { userModel } from '../models/Auth'

class AuthController {
  /**
   * Display the login form.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public showLogin(req: Request, res: Response) {
    try {
      res.render('auth/login', { title: 'Login' })
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }

  /**
   * Login.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public async login(req: Request, res: Response) {
    try {
      const { user, password } = req.body
      const userFound = await userModel.findOne({
        user: user,
        password: password,
      })
      if (userFound != null) {
        req.session.user = user
        req.session.role = userFound.role
        res.redirect('/')
      } else {
        res
          .status(200)
          .render('auth/login', { error: 'User or Password not correct' })
      }
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }

  /**
   * Logout.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public logout(req: Request, res: Response) {
    try {
      req.session.destroy(() => {
        res.redirect('/')
      })
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }
}

const authController = new AuthController()
export default authController
