import mongoose from 'mongoose';

const printSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentName: { type: String, required: true },
    pages: { type: Number, required: true },
    status: { type: String, enum: ['pendiente', 'completado', 'cancelado'], default: 'pendiente' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Print', printSchema);
