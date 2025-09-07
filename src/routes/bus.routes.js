import express from "express";
import { addBus,updateBus,deleteBus,listBuses } from "../controllers/bus.controller.js";
import { auth} from "../middleware/auth.middleware.js";
import { permit } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", auth, permit('admin'), addBus);
router.put("/update/:id", auth, permit('admin'), updateBus);
router.delete("/delete/:id", auth, permit('admin'), deleteBus);
router.get("/list", auth, permit('admin','driver'), listBuses);

export default router;