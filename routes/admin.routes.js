import { Router } from 'express';

const adminRouter = Router(); 
// api/v1/admin
adminRouter.get('/', getAdminPage);

// api/v1/admin
adminRouter.post('/login', login); //verificar se login é reutilizável
adminRouter.post('/sign-up', sign-up);
adminRouter.get('/logout', logout);

// api/v1/admin/users
adminRouter.get('/users', getAllUsers);
adminRouter.get('/users/:user', getEspecificUser);
adminRouter.post('/users/', createUser);
adminRouter.put('/users/:user', updateUser);
adminRouter.delete('/users/:user', deleteUser);

// api/v1/admin/reagents
adminRouter.get('/reagents', getAllReagents);
adminRouter.get('/reagents/:user', getUserReagents);
adminRouter.get('/reagents/:user/:CAS-Number', getUserReagent);
adminRouter.post('/reagents/:user/', createUserReagent);
adminRouter.put('/reagents/:user/:CAS-Number', updateUserReagent);
adminRouter.delete('/reagents/:user/:CAS-Number', deleteUserReagent);

export default adminRouter;
