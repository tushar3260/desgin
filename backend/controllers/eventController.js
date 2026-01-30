import Event from '../models/Event.js'; // Apne file path ke hisab se check kr lena

// @desc    Create a new Event (Protected Route)
// @route   POST /api/events/create
export const createEvent = async (req, res) => {
  try {
    // 1. Body se Event ka data nikalo (Organizer info chhodkar)
    const { 
      title, 
      description, 
      category, 
      startDate, 
      endDate, 
      location, 
      bannerImage, 
      rules,
      registrationLink,
      organizerPhone // Phone number optional alag se le sakte hain
    } = req.body;

    // 2. Basic Validation
    if (!title || !description || !category || !startDate || !endDate || !location) {
      return res.status(400).json({ 
        success: false, 
        message: "Please fill all required fields (Title, Desc, Category, Dates, Location)" 
      });
    }

    // 3. Organizer Info Auto-fill karna (Middleware se req.organizer milega)
    const organizerDetails = {
        name: req.organizer.organizationName, // Token se Organization Name (e.g., "Coding Club")
        email: req.organizer.email,          // Token se Email
        phone: organizerPhone || ""          // Agar form me phone number bhara h to wo, warna blank
    };

    // 4. New Event Object Create karo
    const newEvent = new Event({
      title,
      description,
      category,
      startDate,
      endDate,
      location,
      organizer: organizerDetails, // Ye humne upar auto-fill kiya
      bannerImage,
      rules,
      registrationLink,
      createdBy: req.organizer._id // (Optional) Database me reference ke liye
    });

    // 5. Database me save karo
    const savedEvent = await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: savedEvent
    });

  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not create event.",
      error: error.message
    });
  }
};

// @desc    Get All Events (Public Route)
// @route   GET /api/events/all
export const getAllEvents = async (req, res) => {
  try {
    // Naya event sabse pehle dikhega (sort by createdAt descending)
    const events = await Event.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ 
        success: false, 
        message: "Server Error. Could not fetch events.",
        error: error.message 
    });
  }
};