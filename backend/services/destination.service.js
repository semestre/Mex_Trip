const Destination = require("../models/Destination");

const getAllDestinations = async () => {
    return await Destination.find().populate("car");
};

const getDestinationById = async (id) => {
    return await Destination.findById(id).populate("car");
};

const createDestination = async (destinationData) => {
    const newDestination = new Destination({
        name: destinationData.name,
        description: destinationData.description,
        duration: destinationData.duration,

        pointA: {
            latitude: destinationData.pointA.latitude,
            longitude: destinationData.pointA.longitude
        },

        pointB: {
            latitude: destinationData.pointB.latitude,
            longitude: destinationData.pointB.longitude
        },

        schedule: destinationData.schedule,

        car: destinationData.car
    });

    return await newDestination.save();
};

const updateDestination = async (id, destinationData) => {
    return await Destination.updateOne(
        { _id: id },
        {
            $set: {
                name: destinationData.name,
                description: destinationData.description,
                duration: destinationData.duration,

                pointA: {
                    latitude: destinationData.pointA.latitude,
                    longitude: destinationData.pointA.longitude
                },

                pointB: {
                    latitude: destinationData.pointB.latitude,
                    longitude: destinationData.pointB.longitude
                },

                schedule: destinationData.schedule,

                car: destinationData.car
            }
        }
    );
};

const deleteDestination = async (id) => {
    return await Destination.deleteOne({ _id: id });
};

module.exports = {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination
};