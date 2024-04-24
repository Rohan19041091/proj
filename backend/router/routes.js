import express from 'express';
import mentorAuthentication from '../middleware/mentorAuthentication.js';
import { mentorLogin } from '../controllers/mentorLoginController.js';
import { displayMentors, findMentorByName, mentorInfo, registerMentor, updateMentorById,  } from '../controllers/mentorController.js';
const router = express.Router();

router.post("/mentorLogin",mentorLogin)
router.post("/registerMentor",registerMentor)
router.post("/findMentorByName",mentorAuthentication,findMentorByName)
router.post("/mentorInfo",mentorAuthentication,mentorInfo)
router.put("/updateMentorById",mentorAuthentication,updateMentorById)
router.get("/displayMentors",mentorAuthentication,displayMentors)
export default router;