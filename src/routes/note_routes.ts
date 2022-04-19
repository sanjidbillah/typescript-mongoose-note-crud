import express from 'express';
import controller from '../controllers/note_controller';
const router = express.Router();

router.get('/notes', controller.getAllNote);
router.post('/create', controller.createNote);
router.post('/delete', controller.deleteNote);
router.post('/update', controller.updateNote);

export = router;