import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new message document
        const newMessage = new Message({
            name,
            email,
            message
        });

        // Save the message to the database
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};