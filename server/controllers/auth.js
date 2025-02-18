import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


/* Register user */
export const register = async (req, res) => {
    try{
        const{
            firstName, 
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const encrypt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, encrypt);

        const newUser = new User({
            firstName, 
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }

    catch(err){
        res.status(500).json({ error: err.msg});
    }
}

/* Login user */
export const login = async (req, res) => {
    try { 
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ msg: "User doesn't exist"});
        

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Invalid password!"})
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token, user });
    }

    catch(err) {
        res.status(400).json({ error: err.message });
    }
}