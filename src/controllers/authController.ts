import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

//! MODELS
import { UserModel } from '../models/Auth'

class AuthController {
  /**
   * Display the register form.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public showRegister(req: Request, res: Response) {
    try {
      res.status(200).render('auth/register', { title: 'Register' })
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }
  /**
   * Register.
   *
   * @param req Request
   * @param res Response
   * @return Template view (render)
   */
  public async register(req: Request, res: Response) {
    try {
      const { user, password } = req.body
      const searchedUser = await UserModel.findOne({
        user: user,
      })
      if (searchedUser)
        return res.status(500).render('auth/register', {
          title: 'Error',
          error: 'Username already taken',
        })
      const hashPassword = await bcrypt.hash(password, 10)
      const newUser = new UserModel({
        user: user,
        password: hashPassword,
        role: '0',
      })
      await newUser.save()
      res.redirect('/auth/login')
    } catch (error) {
      res.status(500).render('error', { error })
    }
  }

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
      const userFound = await UserModel.findOne({
        user: user,
      })
      const match = await bcrypt.compare(password, userFound?.password)
      if (userFound != null && match) {
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
