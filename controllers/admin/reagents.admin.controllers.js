import User from '../../models/user.model.js';
import Reagent from '../../models/reagents.model.js';

export const getAllReagents = async (req, res) => {

    try{
        const allReagents = await Reagent.find();
        if(!allReagents || allReagents.length === 0) return res.status(400).json({ message: 'There is no reagents here'});

        res. status(200).json({ totalReagentsAdmin: allReagents.length, allReagents });       
        
    } catch(error){
        return res.status(500).json({ error: error.message});
    }

};

export const getUserReagents = async (req, res) => {
    try{
    const { userId } = req.params;
    const userReagents = await Reagent.find({ createdBy: userId});
    if(!userReagents || userReagents.length === 0) return res.status(400).json({ message: 'There is no reagents for this user'});

    res. status(200).json({ totalUserReagents: userReagents.length, userReagents });

    } catch(error){
        return res.status(500).json({ error: error.message});
    }
};

export const getUserReagent = async (req, res) => {
    try{
        const { userId, casNumber } = req.params;

        const userReagent = await Reagent.find({ createdBy: userId, casNumber: casNumber.trim()});
        if(!userReagent || userReagent.length === 0) return res.status(400).json({ message: 'There is no reagents for this user'});

        res. status(200).json({ totalUserReagents: userReagent.length, userReagent });

    } catch(error){
        return res.status(500).json({ error: error.message});
    };
};

export const createUserReagent = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId, status: 'user' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { casNumber, ...fields } = req.body;
        if (!casNumber) return res.status(400).json({ message: 'Missing required fields' });

        const newReagent = await Reagent.create({
            ...req.body,
            createdBy: userId
        });

        if(!newReagent) throw new Error('Error while creating user reagent');

        res.status(201).json({ message: 'Reagent created', reagent: newReagent });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateUserReagent = async (req, res) => {
    try {
        const { userId, casNumber } = req.params;
        const updateData = req.body;

        const updatedReagent = await Reagent.findOneAndUpdate(
            { createdBy: userId, casNumber: casNumber.trim() },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedReagent) return res.status(404).json({ message: 'Reagent not found' });

        res.status(200).json({ message: 'Reagent updated', updatedReagent });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteUserReagent = async (req, res) => {
    try {
        const { userId, casNumber } = req.params;

        const deletedReagent = await Reagent.findOneAndDelete({ createdBy: userId, casNumber: casNumber.trim() });
        if (!deletedReagent) return res.status(404).json({ message: 'Reagent not found' });

        res.status(200).json({ message: 'Reagent deleted successfully', deletedReagent });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
