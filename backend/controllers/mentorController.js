import Mentor from "../models/mentorModel.js";
import MentorInfo from "../models/MentorInfoModel.js";
import bcrypt from "bcrypt";
import { sendResponse, sendErrorResponse } from "../utils/helper.js";

const registerMentor = async (req, res) => {
  const { name, email, password, phoneNo } = req.body;
 
  const existingUser = await Mentor.findOne({ email }).exec();
    if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newMentor = await new Mentor({
    name,
    email,
    password: hashedPassword,
    phoneNo,
    startTime:"",
    endTime:"",
    description:"",
    experience:"",
    domain:"",
    linkdin:""
  });
  try {
    await newMentor.save();
    sendResponse(res, "User created", newMentor);
  } catch (error) {
    sendErrorResponse(res, 500, "Error creating user");
    console.log(error)
  }
};

const findMentorByName = async (req, res) => {
  const { name } = req.body;
  try {
    // Search for the mentor by name
    const mentor = await Mentor.findOne({ name });

    if (!mentor) {
      // If mentor is not found, return a response indicating that
      sendResponse(res, "Mentor not found", null);
    } else {
      // If mentor is found, return the mentor object
      sendResponse(res, "Mentor found", mentor);
    }
  } catch (error) {
    // If an error occurs during the search, handle it and return an error response
    sendErrorResponse(res, 500, "Error finding mentor");
  }
};

const mentorInfo = async (req, res) => {
  const { email, startTime, endTime, description, experience } = req.body;

  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Find user by email
  try {
    // Find user by email
    const user = await Mentor.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with description and experience
    user.description = description;
    user.experience = experience;
    user.startTime=startTime;
    user.endTime=endTime;
    user.domain=domain;
    user.linkdin=linkdin

    await user.save();

    res.status(200).json({ message: 'Description added successfully', user });
  } catch (error) {
    console.error('Adding description failed:', error.message);
    res.status(500).json({ message: 'Adding description failed' });
  }
}



const displayMentors = async (req, res) => {
  try {
    // Fetch all mentors from the MongoDB database
    const mentors = await Mentor.find();

    // Send the mentors data as a response
    res.status(200).json({
      success: true,
      data: mentors,
    });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({
      success: false,
      error: "Failed to fetch mentors",
    });
  }
};

const updateMentorById = async (req, res) => {
  const { id, ...updateData } = req.body; // Destructure id and extract other update data

  try {
      // Ensure you use the correct model for updating (assuming your model is named 'User')
      const updatedUser = await Mentor.findByIdAndUpdate(
          id,
          updateData,
          { new: true } // Return the updated document
      );

      if (!updatedUser) {
          return sendErrorResponse(res, 404, 'User not found');
      }

      sendResponse(res, "User updated successfully", updatedUser);
  } catch (error) {
      console.error(error);
      sendErrorResponse(res, 500, 'Error updating user');
  }
};

export { findMentorByName, registerMentor, mentorInfo,displayMentors,updateMentorById };
