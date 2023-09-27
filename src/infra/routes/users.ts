import { userController } from 'infra/controllers';
import { Router } from 'express';
import { roleController } from 'infra/controllers';
import { permissionController } from 'infra/controllers';
const router = Router();

router.get("users", userController.getAll)

router.get("users/:id", userController.getById)

router.put("users/:id", userController.update)

router.delete("users/:id", userController.delete)

//Role
router.post('/roles', roleController.create);

router.get("roles", roleController.getAll)

router.get("roles/:id", roleController.getById)

router.put("roles/:id", roleController.update)

router.delete("roles/:id", roleController.delete)

// Permission
router.post('/permissions', permissionController.create);

router.get("permissions", permissionController.getAll)

router.get("permissions/:id", permissionController.getById)

router.put("permissions/:id", permissionController.update)

router.delete("permissions/:id", permissionController.delete)

export { router };
