import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";

const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        next(errorHandler(404, "Listing not found!"));
        return;
    }

    if (req.user.id !== listing.userRef) {
        next(errorHandler(401, "You can only delete your own listings!"));
        return;
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted!");
    } catch (error) {
        next(error);
    }
};

export {
    createListing,
    deleteListing,
}