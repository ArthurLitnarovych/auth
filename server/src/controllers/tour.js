import mongoose from "mongoose";
import tourModel from "../models/tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new tourModel({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newTour.save();
    return res.status(200).json(newTour);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await tourModel.find();
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await tourModel.findById(id);
    return res.status(200).json(tour);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

export const getToursByUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn`t exist" });
  }

  const tours = await tourModel.find({ creator: id });
  return res.status(200).json(tours);
};
