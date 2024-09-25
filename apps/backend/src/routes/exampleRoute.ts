import express, { Router } from "express";

const router: Router = express.Router();
type Feedback = {
    name: string;
    message: string;
};

router.post("/", async (req, res) => {
    const feedback: Feedback = req.body as Feedback;
    res.status(200).json({
        message: feedback.name + " said: " + feedback.message,
    });
});

export default router;
