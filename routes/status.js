import { Router } from 'express';
// Correct import for default export
import db from '../config/dbConfig.js';

const router = Router();



// Fetch All Status
router.get('/', (req, res) => {
    db.query('SELECT * FROM status', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching statuss: ' + err.message });
        } else {
            res.json(results);
        }
    });
});
// Add a status
router.post('/', (req, res) => {
    const { labelStatus } = req.body;
    const query = 'INSERT INTO `status` (`labelStatus`) VALUES (?)';

    db.query(query, [labelStatus], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error adding the task: ' + err.message });
        } else {
            res.status(201).json({ message: "Status successfully added", id: results.insertId });
        }
    });
});
// Update a status
router.put('/:id', (req, res) => {
    const idstatus = req.params.id;
    const {labelStatus} = req.body;
    const query = 'UPDATE status SET labelStatus = ? WHERE idstatus = ?';

    db.query(query, [labelStatus, idstatus], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error adding the task: ' + err.message });
        } else {
            res.status(201).json({ message: "Status successfully modified"});
        }
    });
});
// Delete a status by its ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM status WHERE idstatus = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting status: ' + err.message });
        } else {
            res.json({ message: "Status successfully deleted", id: id });
        }
    });
});

export default router;