
import express from 'express'; 
import layoutMiddleware from './middleware/layout.js';
import AuthRoute from './routes/Auth.route.js';
import connectDb from './connection/index.connection.js';
const port = process.env.PORT || 3000;
const app = express();
// Set EJS as the view engine
app.set('view engine', 'ejs');
// connecting to the database
connectDb()

// Use layout middleware
app.use(layoutMiddleware);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static('public'));
app.use('/auth', AuthRoute)

// Routes
app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/profile', (req, res) => {
  res.render('pages/profile');
});

app.get('/explore', (req, res) => {
  res.render('pages/explore');
});

app.get('/notifications', (req, res) => {
  res.render('pages/notifications');
});

app.get('/create', (req, res) => {
  res.render('pages/create');
});

app.get('/messages', (req, res) => {
  res.render('pages/messages');
});

// app.get('/auth/login', (req, res) => {
//   res.render('pages/login', { layout: 'auth' });
// });

app.get('/register', (req, res) => {
  res.render('pages/register', { layout: 'auth' });
});

app.get('/forgot-password', (req, res) => {
  res.render('pages/forgot-password', { layout: 'auth' });
});

app.get('/verify-code', (req, res) => {
  res.render('pages/verify-code', { layout: 'auth' });
});

app.get('/reset-password', (req, res) => {
  res.render('pages/reset-password', { layout: 'auth' });
});

app.get('/password-reset-success', (req, res) => {
  res.render('pages/password-reset-success', { layout: 'auth' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
