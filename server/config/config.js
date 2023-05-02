const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATA_BASE;

const connectDb = async () => {
    await  mongoose.connect(DATABASE_URL)
    console.log('database connected')
}

module.exports = {
    DATABASE_URL, 
    connectDb
}