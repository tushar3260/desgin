import jwt from 'jsonwebtoken';
import Organizer from '../models/Organizer.js';

export const protectOrganizer = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Token verify karein
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Sirf Organizer collection mein dhundhe
      req.organizer = await Organizer.findById(decoded.id).select('-password');

      if (!req.organizer) {
        return res.status(401).json({ message: 'Not authorized, organizer not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};