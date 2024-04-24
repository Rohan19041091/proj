import mongoose from "mongoose";

const mentorSchema= new mongoose.Schema({
    name:String,
    email:{ type: String, unique: true },
    phoneNo:{ type: Number, unique: true },
    password:String,
    startTime: {
        type: String,
      },
    endTime: {
        type: String,

      },
    despcription:String,
    Domain:String,
    experience:String

})
const Mentor=new mongoose.model("mentor",mentorSchema)
export default Mentor