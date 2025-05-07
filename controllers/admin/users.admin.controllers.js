import User from '../../models/user.model.js';

export const getUsers = async (req, res) => {    
    
    try{        
        const allUsers = await User.find({ status: 'user' });

        if(allUsers.length === 0 || !allUsers){
            return res.status(400).json({ message: 'There is no users here'});
        };
    
        res.status(200).json({ totalUsers: allUsers.length, allUsers });
        
    } catch(error){
        return res. status(500).json({ error: error.message});
    };
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id, status: 'user'});

        if (!user || user.status !== 'user') {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const existingUser = await User.findOne({ email: email.trim() });
        if(existingUser) return res.status(400).json({ message: 'User already exists'});

        const userAdmin = await User.create({ email, password });
        if(!userAdmin) throw new Error('Error while creating new user');

        res.status(200).json({ userAdmin });

    } catch(error){
        return res.status(500).json({ error: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            {_id: id, status: 'user'},
            { $set: { email, password } },
            { new: true, runValidators: true }
        );

        if (!updatedUser || updatedUser.status !== 'user') {
            return res.status(404).json({ message: 'User not found or not a regular user' });
        }

        res.status(200).json({ updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        const deletedUser = await User.findOneAndDelete({_id: id, status: 'user'});
        if(!deletedUser) throw new Error('Error while deleting');

        res.status(200).json({ message: 'The user has been deleted'});

    } catch(error){
        return res.status(500).json({ error: error.message});
    }
};
