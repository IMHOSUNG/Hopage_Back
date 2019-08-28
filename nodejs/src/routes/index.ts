import express from 'express';
const router = express.Router();

router.get('/', () => {console.log("route test")})

export default router;