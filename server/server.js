const express = require('express');
const app = express();
const userRouter = require('./router/userRoutes');
const cors = require('cors');
require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api',userRouter)

app.get('/', (req, res) => {
    res.send('working')
})


app.listen(PORT,(err) => {
    if (err) console.log('err on listen', err);
    console.log('port running on '+PORT)
});