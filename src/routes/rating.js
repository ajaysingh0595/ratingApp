const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all Ratings
router.get('/rating/', (req, res) => {
  mysqlConnection.query('SELECT * FROM rating', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An Rating
router.get('/rating/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM rating WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Rating
router.delete('/rating/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM rating WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Rating Deleted' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An Rating
router.post('/rating/', (req, res) => {
  const { rating, review, user_id } = req.body;
  var sql = `INSERT INTO rating(rating, review, user_id, create_at, updated_at) VALUES (${rating},'${review}',${user_id},NOW(),NOW())`;
  mysqlConnection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      res.json({ status: 'Rating can not be saved', error: true });
    }
    res.json({ status: 'Rating Saved', error: false });
  });

});

// UPDATE An Rating
router.put('/rating/:id', (req, res) => {
  const { rating, review, user_id } = req.body;
  const { id } = req.params;
  const sql =`UPDATE rating SET rating=${rating}, review='${review}', user_id=${user_id}, updated_at=NOW() WHERE id=${id}`;
  mysqlConnection.query(sql, function (err, result) {
    if (err) {
      res.json({ status: 'Rating can not be update', error: true });
    }
    res.json({ status: 'Rating Updated', error: false });
  });

});

module.exports = router;
