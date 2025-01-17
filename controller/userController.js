import User from "../models/userModel.js"; // Assuming your user model file is named user.js
// Get users based on search keyword

// Get users based on search email
export const getUsers = async(req, res) => {
    try {
        const email = req.params.email; // Extracting email from request params

        let query = {}; // Initial query to find all users

        // If email is provided, update the query to filter by email field
        if (email) {
            query = { email: { $regex: email, $options: 'i' } }; // Using regex for case-insensitive search
        }

        // Fetch users based on the updated query
        const users = await User.find(query);

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get User by ID
export const getUserById = async(req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};