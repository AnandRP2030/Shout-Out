const mongoose = require('mongoose');

const connectDb = async () => {
    await  mongoose.connect(process.env.DATABASE_URL)
    console.log('database connected')
}

module.exports = {
    connectDb
}