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
