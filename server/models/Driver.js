



import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['available', 'busy'], default: 'available' },
  bookingsAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
}, {
  timestamps: true // Optional: adds createdAt and updatedAt timestamps
});

const Driver =mongoose.models.Driver || mongoose.model('Driver', driverSchema);

export default Driver;
