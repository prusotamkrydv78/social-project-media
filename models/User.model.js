import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [String],

    story: [String],
    following: [String],
    followers: [String],
    notifications: [String],
    mentions: [String],
    profileImage: [String],
    coverImage: [String],
    bio: {
        address: String,
        webLinks: [String],
        description: String,
    },
    isPro: Boolean,
    favoritePosts:[String],
    isAdmin: Boolean,
    isVerified: Boolean,
    isBanned: Boolean,
    isPrivate: Boolean, 
    blockAccounts: [String],
    likedPosts: [String]

})

export default  new mongoose.model("users",UserSchema);