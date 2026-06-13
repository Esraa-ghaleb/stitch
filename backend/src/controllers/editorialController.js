import Editorial from "../models/Editorial.js";

export async function getEditorials(_req, res, next) {
  try {
    const posts = await Editorial.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    res.json({ success: true, data: { posts } });
  } catch (error) {
    next(error);
  }
}

export async function getEditorialBySlug(req, res, next) {
  try {
    const post = await Editorial.findOne({ slug: req.params.slug }).lean();
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, data: { post } });
  } catch (error) {
    next(error);
  }
}
