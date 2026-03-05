import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required."});
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) { 
            return res.status(400).json({ message: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email, password                                                                   : hashedPassword
    });

    return res.status(201).json({
        _id : user_id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    });
    } catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
};


const login = async (res, req) => {
    try { 
        const {email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required."});
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
};

export { registerUser, loginUser };
