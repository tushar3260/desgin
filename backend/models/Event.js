import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Event description is required"],
  },
  category: {
    type: String,
    required: true,
    enum: ['Hackathon', 'Workshop', 'Cultural', 'Sports', 'Seminar', 'Other'], 
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true, 
  },
  organizer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
  },
  bannerImage: {
    type: String,
    default: "https://via.placeholder.com/800x400.png?text=Event+Banner", 
  },
  registrationStatus: {
    type: String,
    enum: ['Open', 'Closed', 'Coming Soon'],
    default: 'Open'
  },
  registrationLink: {
    type: String,
  },
  rules: [
    { type: String }
  ]
}, { timestamps: true });

// ES Module Export
const Event = mongoose.model('Event', eventSchema);
export default Event;