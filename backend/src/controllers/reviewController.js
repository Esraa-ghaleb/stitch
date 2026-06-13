import Review from "../models/Review.js";
import Service from "../models/Service.js";

export async function createReview(req, res, next) {
  try {
    const { serviceId, title, text, rating, authorName } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const review = await Review.create({
      service: serviceId,
      user: req.user?._id,
      authorName: authorName || req.user?.name || "Guest",
      title,
      text,
      rating,
    });

    const reviews = await Review.find({ service: serviceId });
    service.reviewsCount = reviews.length;
    service.rating =
      Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
    await service.save();

    res.status(201).json({ success: true, data: { review } });
  } catch (error) {
    next(error);
  }
}

export async function getReviews(req, res, next) {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: { reviews } });
  } catch (error) {
    next(error);
  }
}
