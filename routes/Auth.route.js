import express from 'express'
import UserModel from '../models/User.model.js'
import bcrypt from "bcryptjs";
const AuthRoute = express.Router()
const salt = bcrypt.genSaltSync(10);

//routes and action for user register

AuthRoute.get("/register", (req, res) => {
    res.render("pages/register", { layout: 'auth' })
})
    .post("/register", async (req, res) => {
        const { userName, email, fullName, password, confirmPassword } = req.body;

        if (confirmPassword !== password) {
            res.json({
                status: "Failed",
                message: "Failed to register user",
                error: "Failed due to password does not match with confirm passwrod "
            })
        };
        const hashedPassword = encryptPassword(password)
        const newUser = await new UserModel({ userName, email, fullName, password: hashedPassword })
        try {
            await newUser.save()
            console.log(newUser)

            res.redirect("/auth/login")
        } catch (error) {

            res.json({
                status: "Failed",
                message: "Failed to register user",
                error: "Failed due to " + error
            })
        }
    })





AuthRoute.get("/login", (req, res) => {
    res.render("pages/login", { layout: 'auth' })

})

AuthRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const allUsers = await UserModel.find();
    const user = allUsers.find((user) => {
        const isPasswordIsCorrect = bcrypt.compareSync(password, user.password);
        if (user.email == email && isPasswordIsCorrect) return user
    });

    console.log(user)


    try {
        res.redirect("/")
    } catch (error) {
        res.json({
            status: "Failed",
            message: "Failed to login user",
            error: "Failed due to " + error
        })

    }

})

//////////Encrypt password//////////////
const encryptPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;

}


export default AuthRoute;