import { Router } from "express";
import {
  translate,
  analyze,
  optimize,
  explain,
  runAll,  // Add this
} from "../controllers/code.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

// All code routes need the user to be logged in
router.use(authenticate);

// New endpoint: Run all 4 operations at once
router.post("/run-all", runAll);

// Individual endpoints
router.post("/translate", translate);
router.post("/analyze", analyze);
router.post("/optimize", optimize);
router.post("/explain", explain);

export default router;