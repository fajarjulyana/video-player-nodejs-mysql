const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Gagal logout');
    }
    res.redirect('/login'); // Ganti dengan rute halaman login Anda
  });
});

module.exports = router;
