const Location = require("../models/Location");

const getAllLocations = async () => {
    return await Location.find();
};

const getLocationById = async (id) => {
    return await Location.findById(id);
};

const createLocation = async (locationData) => {
    const newLocation = new Location({
        name: locationData.name,
        description: locationData.description,
        latitude: locationData.latitude,
        longitude: locationData.longitude
    });

    return await newLocation.save();
};

const updateLocation = async (id, locationData) => {
    return await Location.updateOne(
        { _id: id },
        {
            $set: {
                name: locationData.name,
                description: locationData.description,
                latitude: locationData.latitude,
                longitude: locationData.longitude
            }
        }
    );
};

const deleteLocation = async (id) => {
    return await Location.deleteOne({ _id: id });
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
};