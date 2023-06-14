import { Router } from 'express';

import search from './search.route';

const router = Router();

router.use('/search', search);

export default router;
