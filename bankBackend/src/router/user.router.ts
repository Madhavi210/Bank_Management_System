
import express from 'express';
import UserController from '../controller/user.controller';
import upload from '../utils/fileUpload';

export default class UserRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    // POST /api/users - Create a new user
    this.router.post('/',  upload.single('profilePic'), UserController.createUser);

    // GET /api/users/:id - Get user by ID
    this.router.get('/:id', UserController.getUserById);

    // DELETE /api/users/:id - Delete user by ID
    this.router.delete('/:id', UserController.deleteUser);

    // PUT /api/users/:id - Update user by ID
    this.router.put('/:id',upload.single('profilePic'), UserController.updateUser);

    // GET /api/users - Get all users (requires admin authentication)
    this.router.get('/', UserController.getAllUsers);

    // POST /api/users/login - User login
    this.router.post('/login', UserController.loginUser);

  }

  public getRouter() {
    return this.router;
  }
}