import mongoose from 'mongoose'


const leaderSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    nickname: { type: String, required: true, },
    cookies: { type: Number, required: true, },
});

export default mongoose.model('rankings', leaderSchema, 'rankings')