const Car = require("../models/Car");

const getAllCars = async () => {
    return await Car.find();
};

const getCarById = async (id) => {
    return await Car.findById(id);
};

const createCar = async (carData) => {
    const newCar = new Car({
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        capacity: carData.capacity
    });

    return await newCar.save();
};

const updateCar = async (id, carData) => {
    return await Car.updateOne(
        { _id: id },
        {
            $set: {
                brand: carData.brand,
                model: carData.model,
                year: carData.year,
                capacity: carData.capacity
            }
        }
    );
};

const deleteCar = async (id) => {
    return await Car.deleteOne({ _id: id });
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};