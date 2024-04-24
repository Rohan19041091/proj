import mongoose from "mongoose";

const mentorInfoSchema= new mongoose.Schema({
    email:String,
    startTime: {
        type: String,
        required: true,
      },
    endTime: {
        type: String,
        required: true,
      },
    dispcription:String,
    experience:Number

})
const MentorInfo= new mongoose.model("mentorInfo",mentorInfoSchema)
export default MentorInfo