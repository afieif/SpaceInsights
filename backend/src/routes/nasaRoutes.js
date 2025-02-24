import express from 'express';
import { getNotifications } from '../controllers/notificationController.js';
import { getApod } from '../controllers/apodController.js';
import { getEventCounts } from '../controllers/eventsCountController.js';
import { getCME } from '../controllers/cmeController.js';
import { getFLR } from '../controllers/flrController.js';

const router = express.Router();

router.get('/notifications', getNotifications);
router.get('/apod', getApod);
router.get("/event-counts", getEventCounts);
router.get("/cme", getCME);
router.get("/flr", getFLR);



export default router;
