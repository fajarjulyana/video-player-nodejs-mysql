const express = require('express');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const bcrypt = require('bcrypt'); // Tambahkan bcrypt untuk hashing password
const { Video } = require('./models');
const sequelize = require('./config/sequelize_instance');
const User = require('./models/user');
const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
    try {
      await sequelize.sync({ force: true }); // Hati-hati: force: true akan menghapus tabel yang ada dan membuat yang baru
      console.log("Database synchronized");
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  })();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key', // Replace with a more secure secret
  resave: false,
  saveUninitialized: false
}));

// Multer setup for video upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  const videos = await Video.findAll();
  res.render('index', { videos, session: req.session });
});

app.get('/upload', (req, res) => {
  if (req.session.loggedIn) {
    res.render('upload');
  } else {
    res.redirect('/login');
  }
});

app.post('/upload', upload.single('video'), async (req, res) => {
  if (req.session.loggedIn) {
    await Video.create({
      title: req.body.title,
      filename: req.file.filename
    });
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// Admin routes
app.get('/admin', async (req, res) => {
  if (req.session.loggedIn) {
    const videos = await Video.findAll();
    res.render('admin', { videos, session: req.session });
  } else {
    res.redirect('/login');
  }
});

app.get('/admin/edit/:id', async (req, res) => {
  if (req.session.loggedIn) {
    const video = await Video.findByPk(req.params.id);
    res.render('edit', { video, session: req.session });
  } else {
    res.redirect('/login');
  }
});

app.post('/admin/edit/:id', async (req, res) => {
  if (req.session.loggedIn) {
    const video = await Video.findByPk(req.params.id);
    await video.update({
      title: req.body.title
    });
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});

app.post('/admin/delete/:id', async (req, res) => {
  if (req.session.loggedIn) {
    const video = await Video.findByPk(req.params.id);
    await video.destroy();
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.render('login', { session: req.session });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.loggedIn = true;
      res.redirect('/admin');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Rute untuk menampilkan formulir pendaftaran
app.get('/register', (req, res) => {
  res.render('register');
});

// Rute untuk memproses pendaftaran
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Simpan pengguna ke database
    await User.create({
      username,
      password: hashedPassword
    });
    
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
});
// Rute untuk logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Gagal logout');
      }
      res.redirect('/login'); // Ganti dengan rute halaman login Anda
    });
  });
  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
