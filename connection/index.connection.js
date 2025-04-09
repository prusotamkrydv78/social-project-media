import mongoose from "mongoose";

const connectDb = () => {

    mongoose.connect("mongodb://localhost:27017/socialMedia").then(() => {
        console.log("Database connected sucessfully")

    }).catch((err) => {
        console.log("Error while connecting to the database", err)
    })
}
export default connectDb;