import Cart from "../models/Cart.js";
import Service from "../models/Service.js";

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate("items.service");
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await Cart.findById(cart._id).populate("items.service");
  }
  return cart;
}

export async function getCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json({ success: true, data: { cart } });
  } catch (error) {
    next(error);
  }
}

export async function addToCart(req, res, next) {
  try {
    const { serviceId, quantity = 1 } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const existing = cart.items.find((i) => i.service._id.toString() === serviceId);

    if (existing) {
      existing.quantity += Math.max(1, parseInt(quantity, 10) || 1);
    } else {
      cart.items.push({ service: serviceId, quantity: Math.max(1, parseInt(quantity, 10) || 1) });
    }

    await cart.save();
    await cart.populate("items.service");
    res.json({ success: true, data: { cart } });
  } catch (error) {
    next(error);
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const { quantity } = req.body;
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    if (quantity <= 0) {
      item.deleteOne();
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.service");
    res.json({ success: true, data: { cart } });
  } catch (error) {
    next(error);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    item.deleteOne();
    await cart.save();
    await cart.populate("items.service");
    res.json({ success: true, data: { cart } });
  } catch (error) {
    next(error);
  }
}

export async function clearCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.json({ success: true, data: { cart } });
  } catch (error) {
    next(error);
  }
}
