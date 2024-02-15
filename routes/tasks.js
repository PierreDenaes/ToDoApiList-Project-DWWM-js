import { Router } from 'express';
// Correct import for default export
import db from '../config/dbConfig.js';

const router = Router();


// Fetch all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM task WHERE isFinished = 0 AND status_idstatus=2', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching tasks: ' + err.message });
        } else {
            res.json(results);
        }
    });
});
// Fetch tasks by status doing
router.get('/doing', (req, res) => {
    db.query('SELECT * FROM task JOIN status ON idstatus = status_idstatus WHERE idstatus=1 AND isFinished=0', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching tasks: ' + err.message });
        } else {
            res.json(results);
        }
    });
});
// Add a task
router.post('/', (req, res) => {
    const { taskTitle, taskContent } = req.body;
    const status_idstatus = 2; // Default value set to 2
    const isFinished = 0;
    const query = 'INSERT INTO `task` (`taskTitle`, `taskContent`, `createdAt`, `isFinished`, `status_idstatus`) VALUES (?, ?, NOW(), ?, ?)';

    db.query(query, [taskTitle, taskContent, isFinished, status_idstatus], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error adding the task: ' + err.message });
        } else {
            res.status(201).json({ message: "Task successfully added", id: results.insertId });
        }
    });
});
// Delete a task by its ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM task WHERE idtask = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting task: ' + err.message });
        } else {
            res.json({ message: "Task successfully deleted", id: id });
        }
    });
});

// Fetch a task by its ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM task WHERE idtask = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching task: ' + err.message });
        } else {
            res.json(results);
        }
    });
});

// Fetch tasks by their status ID
router.get('/status/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT taskTitle, taskContent, labelStatus FROM task JOIN status ON idstatus = status_idstatus WHERE idstatus = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching tasks by status: ' + err.message });
        } else {
            res.json(results);
        }
    });
});

// Update a Task Status
router.patch('/:id/status', (req, res) => {
    const idtask = req.params.id;
    const {status_idstatus} = req.body;
    const query = 'UPDATE task SET status_idstatus = ? WHERE idtask = ?';

    db.query(query, [status_idstatus, idtask], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error adding the task: ' + err.message });
        } else {
            res.status(201).json({ message: "Status successfully modified"});
        }
    });
});
router.patch('/:id/archived', (req, res) => {
    const idtask = req.params.id;
    const { isFinished } = req.body;
    const updateQuery = 'UPDATE task SET isFinished = ? WHERE idtask = ?';

    // Mise à jour du statut de la tâche
    db.query(updateQuery, [isFinished, idtask], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating the task: ' + err.message });
        }

        // Insérer une nouvelle entrée dans archivedTask
        const insertQuery = 'INSERT INTO archivedTask (archivedAt, task_idtask) VALUES (NOW(),?)';
        
        _query(insertQuery, [idtask], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error archiving the task: ' + err.message });
            }
            res.status(201).json({ message: "Task successfully archived" });
        });
    });
});
// Update a Task Status
router.patch('/:id/status', (req, res) => {
    const idtask = req.params.id;
    const {status_idstatus} = req.body;
    const query = 'UPDATE task SET status_idstatus = ? WHERE idtask = ?';

    db.query(query, [status_idstatus, idtask], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error adding the task: ' + err.message });
        } else {
            res.status(201).json({ message: "Status successfully modified"});
        }
    });
});
router.patch('/:id/archived', (req, res) => {
    const idtask = req.params.id;
    const { isFinished } = req.body;
    const updateQuery = 'UPDATE task SET isFinished = ? WHERE idtask = ?';

    // Mise à jour du statut de la tâche
    db.query(updateQuery, [isFinished, idtask], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating the task: ' + err.message });
        }

        // Insérer une nouvelle entrée dans archivedTask
        const insertQuery = 'INSERT INTO archivedTask (archivedAt, task_idtask) VALUES (NOW(),?)';
        
        db.query(insertQuery, [idtask], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error archiving the task: ' + err.message });
            }
            res.status(201).json({ message: "Task successfully archived" });
        });
    });
});


export default router;