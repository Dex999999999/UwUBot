import mongoose, { mongo, Schema } from 'mongoose'

const reqString = {
    type: String,
    required: true
}
const notreqString = {
    type: String,
    required: false
}

const welcomeSchema = new Schema({
    //guild id
    _id: reqString,
    channelId: notreqString,
    text: notreqString,
    image: notreqString,
    LchannelId: notreqString,
    Ltext: notreqString,
})

const name = 'welcome-message'
export default mongoose.models[name] || mongoose.model(name, welcomeSchema, name)