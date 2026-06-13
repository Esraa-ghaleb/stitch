import Contact from "../models/Contact.js";

export async function submitContact(req, res, next) {
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    const contact = await Contact.create({ firstName, lastName, email, subject, message });
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: { contact: { id: contact._id } },
    });
  } catch (error) {
    next(error);
  }
}
