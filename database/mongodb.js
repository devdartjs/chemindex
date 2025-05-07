import mongoose from 'mongoose';
import { DB_URI } from '../config/config.env.js';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('✅ Conectado ao MongoDB com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao conectar ao MongoDB:', err.message);
        console.error('Erro completo:', err);
    }
};

export default connectToMongoDB;
