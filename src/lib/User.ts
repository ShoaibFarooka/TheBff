
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name : String,
})

const user = mongoose.model("User" , UserSchema)
export default user