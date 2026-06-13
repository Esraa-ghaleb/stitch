import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

const DEPOSIT_RATE = 0.5;

function calcTotals(service, quantity, discountAmount = 0) {
  const subtotal = service.price * quantity;
  const depositAmount = Math.round(subtotal * DEPOSIT_RATE * 100) / 100;
  const total = Math.max(0, depositAmount - discountAmount);
  return { subtotal, depositAmount, total };
}

export async function createBooking(req, res, next) {
  try {
    const { serviceId, name, email, phone, date, time, notes, quantity = 1 } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const { subtotal, depositAmount, total } = calcTotals(service, qty);

    const booking = await Booking.create({
      user: req.user?._id,
      service: service._id,
      customerName: name,
      customerEmail: email,
      customerPhone: phone || "",
      date,
      time,
      notes: notes || "",
      quantity: qty,
      subtotal,
      depositAmount,
      total,
      status: "pending_deposit",
    });

    await booking.populate("service");
    res.status(201).json({ success: true, data: { booking } });
  } catch (error) {
    next(error);
  }
}

export async function getBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id).populate("service");
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, data: { booking } });
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const {
      quantity,
      discountCode,
      firstName,
      lastName,
      email,
      phone,
      healthNotes,
      paymentMethod,
    } = req.body;

    if (quantity) {
      booking.quantity = Math.max(1, parseInt(quantity, 10));
      const service = await Service.findById(booking.service);
      const totals = calcTotals(service, booking.quantity, booking.discountAmount);
      Object.assign(booking, totals);
    }

    if (discountCode !== undefined) {
      booking.discountCode = discountCode;
      const validCodes = { STITCH10: 10, WELCOME15: 15 };
      const discount = validCodes[discountCode?.toUpperCase()] || 0;
      booking.discountAmount = discount;
      const service = await Service.findById(booking.service);
      const totals = calcTotals(service, booking.quantity, discount);
      booking.total = totals.total;
      booking.subtotal = totals.subtotal;
      booking.depositAmount = totals.depositAmount;
    }

    if (firstName || lastName) {
      booking.customerName = [firstName, lastName].filter(Boolean).join(" ").trim() || booking.customerName;
    }
    if (email) booking.customerEmail = email;
    if (phone !== undefined) booking.customerPhone = phone;
    if (healthNotes !== undefined) booking.healthNotes = healthNotes;
    if (paymentMethod) booking.paymentMethod = paymentMethod;

    await booking.save();
    await booking.populate("service");
    res.json({ success: true, data: { booking } });
  } catch (error) {
    next(error);
  }
}

export async function confirmBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.status = "confirmed";
    await booking.save();
    await booking.populate("service");

    res.json({ success: true, message: "Booking confirmed", data: { booking } });
  } catch (error) {
    next(error);
  }
}

export async function getMyBookings(req, res, next) {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("service")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: { bookings } });
  } catch (error) {
    next(error);
  }
}
