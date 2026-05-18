import { sequelize } from "../database/connection.js";

import { User } from "./user.model.js";
import { Category } from "./category.model.js";
import { Place } from "./place.model.js";
import { Review } from "./review.model.js";
import { Photo } from "./photo.model.js";

User.hasMany(Place, {
    foreignKey: {
        name: "userId",
        field: "user_id"
    },
    as: "places"
});

Place.belongsTo(User, {
    foreignKey: {
        name: "userId",
        field: "user_id"
    },
    as: "author"
});

Category.hasMany(Place, {
    foreignKey: {
        name: "categoryId",
        field: "category_id"
    },
    as: "places"
});

Place.belongsTo(Category, {
    foreignKey: {
        name: "categoryId",
        field: "category_id"
    },
    as: "category"
});

User.hasMany(Review, {
    foreignKey: {
        name: "userId",
        field: "user_id"
    },
    as: "reviews"
});

Review.belongsTo(User, {
    foreignKey: {
        name: "userId",
        field: "user_id"
    },
    as: "author"
});

Place.hasMany(Review, {
    foreignKey: {
        name: "placeId",
        field: "place_id"
    },
    as: "reviews"
});

Review.belongsTo(Place, {
    foreignKey: {
        name: "placeId",
        field: "place_id"
    },
    as: "place"
});

Place.hasMany(Photo, {
    foreignKey: {
        name: "placeId",
        field: "place_id"
    },
    as: "photos"
});

Photo.belongsTo(Place, {
    foreignKey: {
        name: "placeId",
        field: "place_id"
    },
    as: "place"
});

User.hasMany(Photo, {
    foreignKey: {
        name: "userId",
        field: "user_id"
    },
    as: "photos"
});

Photo.belongsTo(User, {
    foreignKey: {
        name: "userId",
        field: "user_id"
    },
    as: "author"
});

export {
    sequelize,
    User,
    Category,
    Place,
    Review,
    Photo
};