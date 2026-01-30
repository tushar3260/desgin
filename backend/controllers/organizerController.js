import Organizer from '../models/Organizer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/organizers/register
export const registerOrganizer = async (req, res) => {
  const { name, email, password, organizationName } = req.body;
  
  const userExists = await Organizer.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Organizer already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const organizer = await Organizer.create({
    name, email, password: hashedPassword, organizationName
  });

  if (organizer) {
    res.status(201).json({
      _id: organizer.id,
      name: organizer.name,
      email: organizer.email,
      token: generateToken(organizer.id)
    });
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// POST /api/organizers/login
export const loginOrganizer = async (req, res) => {
  const { email, password } = req.body;
  const organizer = await Organizer.findOne({ email });

  if (organizer && (await bcrypt.compare(password, organizer.password))) {
    res.json({
      _id: organizer.id,
      name: organizer.name,
      email: organizer.email,
      organizationName: organizer.organizationName,
      token: generateToken(organizer.id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};