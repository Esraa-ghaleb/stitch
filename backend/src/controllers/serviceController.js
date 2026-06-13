import Service from "../models/Service.js";
import Review from "../models/Review.js";

export async function getServices(req, res, next) {
  try {
    const { category, sort } = req.query;
    const filter = { isActive: true };
    if (category && category !== "all") filter.category = category;

    let query = Service.find(filter);

    if (sort === "price_low") query = query.sort({ price: 1 });
    else if (sort === "price_high") query = query.sort({ price: -1 });
    else query = query.sort({ createdAt: -1 });

    const services = await query.lean();
    res.json({ success: true, data: { services } });
  } catch (error) {
    next(error);
  }
}

export async function getServicesByCategory(req, res, next) {
  try {
    const { category } = req.params;
    const services = await Service.find({ category, isActive: true }).sort({ price: 1 }).lean();
    const bannerUrl = services[0]?.bannerUrl || "";
    res.json({ success: true, data: { category, bannerUrl, services } });
  } catch (error) {
    next(error);
  }
}

export async function getServiceById(req, res, next) {
  try {
    const service = await Service.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
      isActive: true,
    }).lean();

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const reviews = await Review.find({ service: service._id }).sort({ createdAt: -1 }).limit(10).lean();
    res.json({ success: true, data: { service, reviews } });
  } catch (error) {
    next(error);
  }
}
