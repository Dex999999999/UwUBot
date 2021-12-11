import mongoose from 'mongoose'


const smashSchema = new mongoose.Schema({
    challongeID: { type: Array, required: true, },
    // challongeID: [{
    //     type: String
    // }]
    challongeNick: { type: String, required: true, },
    //discord nn for now can change later
    discNick: { type: String, required: true, },
    discordID: { type: Number, required: true, },
    heroes: { type: String, required: false, },
});

export default mongoose.model('usernames', smashSchema)