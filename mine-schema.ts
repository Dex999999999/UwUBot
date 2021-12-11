import mongoose from 'mongoose'

const mineSchema = new mongoose.Schema({
    userID: { type: String, required: true},
    gameID: { type: String, required: true, }
});

export default mongoose.model('games', mineSchema, 'games')