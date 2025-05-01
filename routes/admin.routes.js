import { Router } from 'express';

const adminRouter = Router(); 
// api/v1/admin/

adminRouter.get('/', getAdminPage);
adminRouter.get('/login', getAdminPage);
adminRouter.get('/sign-up', getAdminPage);
adminRouter.get('/logout', getAdminPage);
adminRouter.get('/users', getAllUsers);
adminRouter.get('/users/:user', getEspecificUser);
adminRouter.post('/users/', createUser);
adminRouter.put('/users/:user', updateUser);
adminRouter.delete('/users/:user', deleteUser);
adminRouter.get('/products', getAllProducts);
adminRouter.get('/products/:user', getUserProducts);
adminRouter.get('/products/:user/:CAS-Number', getUserProduct);
adminRouter.post('/products/:user/', createUserProduct);
adminRouter.put('/products/:user/:CAS-Number', updateUserProduct);
adminRouter.delete('/products/:user/:CAS-Number', deleteUserProduct);

export default adminRouter;
