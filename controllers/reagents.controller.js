import Reagent from "../models/reagents.model.js";

export const getReagents = async (req, res) => {
    try{
        const userId = res.locals.user?._id;    
        if (!userId) return res.status(401).json({ message: 'User not allowed.' });

        const reagents = await Reagent.find({ createdBy: userId});
        if (reagents.length === 0) return res.status(400).json({ message: 'There is no reagents here!'});

        return res.status(200).json({ quantity: reagents.length, reagents });

    } catch(err){
        return res.status(500).json({ message: 'Server Error', err: err.message});
    }
    
};

export const getReagent = async(req, res) => {
        
    try{
        const userId = res.locals.user?._id;
        if (!userId) return res.status(400).json({ message: 'User not allowed'});

        const { casNumber } = req.params;
        if(!casNumber) return res.status(400).json({ message: 'Invalid CAS-Number'});

        const reagent = await Reagent.find({ casNumber: casNumber.trim(), createdBy: userId});
        if(reagent.length === 0) return res.status(400).json({ message: 'There is no reagent associated with this CAS-Number'});

        return res.status(200).json({ reagent: reagent});

    } catch(err){
        return res.status(500).json({ message: 'Server Error', err: err.message});
    }

}

export const createReagent = async (req, res) => {
    try {        
        const userId = res.locals.user?._id;
        if (!userId) return res.status(401).json({ message: 'User not allowed.' });

        const reagents = await Reagent.find({ createdBy: userId});
        if(reagents.length >= 16){
            alert('To create more reagents, you need to update your account. Click ok and fill out the form');
            return res.redirect('wainting-list-form');
            //return res.status(403).json({ message: 'To create more reagents, you need to update your account'});
        }

        const { casNumber, ...fields } = req.body;
        if (!casNumber) return res.status(400).json({ message: 'Invalid casNumber'});
        
        console.log('userId-controller:', userId, 'casNumber:', casNumber);     

        const existingReagent = await Reagent.findOne({ casNumber: casNumber.trim(), createdBy: userId});
        if(existingReagent) return res.status(400).json({ message: 'Reagent already exists!'});
    
        const newReagent = await Reagent.create({
            ...req.body,
            createdBy: userId
        });
        
        console.log('new Reagent:', newReagent);
        return res.status(201).json({ reagent: newReagent });

    } catch (err) {
        console.error('Error while creating reagent:', err.message);
        return res.status(500).json({ message: 'Server Error', err: err.message });
    }
};

export const updateReagent = async (req, res) => {
    try {
        const userId = res.locals.user?._id;
        if(!userId) return res.status(400).json({ message: 'User not allowed'});
        
        const { casNumber, ...updateFields } = req.body;
        if(!casNumber || Object.keys(updateFields).length === 0) return res.status(400).json({ message: 'Invalid request format!: review your fields'});
        
        const existingProduct = await Reagent.findOne({ casNumber: casNumber.trim(), createdBy: userId });
        if (!existingProduct) return res.status(404).json({ error: "Product not found!" });

        const updatedProduct = await Reagent.findOneAndUpdate(
            { casNumber },
            { $set: { ...updateFields } },
            { new: true }
        );

        if (!updatedProduct) return res.status(400).json({ error: "No changes were made." });

        res.status(200).json({ message: "Product updated successfully!", updatedProduct });

    } catch (error) {
        console.error("Error while updating product:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const deleteReagent = async (req, res) => {
    try {
        const userId = res.locals.user?._id;
            if(!userId) return res.status(400).json({ message: 'User not allowed'});
        
        const { casNumber } = req.params;
            if(!casNumber) return res.status(400).json({ message: 'invalid CAS-Number'});

        const deletedProduct = await Reagent.findOneAndDelete({ casNumber: casNumber.trim(), createdBy: userId });
            console.log('console-(2):', deletedProduct);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found or already deleted." });
        }

        res.status(200).json({ message: "Product deleted successfully!" });

    } catch (error) {
        console.error('console-(error):', error);
        res.status(500).json({ error: error.message });
    }
};


