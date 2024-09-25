import express, { Router } from "express";
import runVISITALL from "../algos/VISITALL.ts";

const router: Router = express.Router();
let path;
router.get("", async (req, res) => {
    path = await runVISITALL();
    res.send(path);
});
export default router;
