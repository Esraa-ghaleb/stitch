import { body } from "express-validator";

export const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const contactValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("subject")
    .isIn(["treatment", "booking", "press", "other"])
    .withMessage("Invalid subject"),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 5000 }),
];

export const bookingValidation = [
  body("serviceId").notEmpty().withMessage("Service is required"),
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("phone").optional().trim(),
  body("date").notEmpty().withMessage("Date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("notes").optional().trim(),
  body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

export const reviewValidation = [
  body("serviceId").notEmpty().withMessage("Service is required"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("text").trim().notEmpty().withMessage("Review text is required"),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be 1-5"),
  body("authorName").optional().trim(),
];

export const cartAddValidation = [
  body("serviceId").notEmpty().withMessage("Service is required"),
  body("quantity").optional().isInt({ min: 1 }),
];

export const cartUpdateValidation = [
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be 0 or more"),
];
