const express = require('express');
const connectDB = require('./config/connectionDb');
const app = express();
connectDB();
app.use(express.json());
app.use('/api/products', require('./Routers/productRouters'));
app.use('/api/users', require('./Routers/UserRouters'));
app.use('/api/orders', require('./Routers/OderRouter'));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
const port = 5000;
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
