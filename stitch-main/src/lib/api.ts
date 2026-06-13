const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  errors?: { field: string; message: string }[];

  constructor(message: string, status: number, errors?: { field: string; message: string }[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      data.message || "Request failed",
      res.status,
      data.errors
    );
  }

  return data as T;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Service {
  _id: string;
  slug: string;
  category: string;
  titleKey: string;
  descKey: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  duration: number;
  price: number;
  rating: number;
  reviewsCount: number;
  badgeKey?: string;
  imageUrl: string;
  bannerUrl?: string;
  processDescEn?: string;
  processDescAr?: string;
  ingredientsEn?: string;
  ingredientsAr?: string;
  aftercareEn?: string;
  aftercareAr?: string;
}

export interface Review {
  _id: string;
  authorName: string;
  title: string;
  text: string;
  rating: number;
}

export interface Booking {
  _id: string;
  reference: string;
  service: Service;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  notes: string;
  healthNotes: string;
  quantity: number;
  discountCode: string;
  discountAmount: number;
  subtotal: number;
  depositAmount: number;
  total: number;
  paymentMethod: string;
  status: string;
  specialist: string;
}

export interface EditorialPost {
  _id: string;
  slug: string;
  titleKey: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
}

export interface CartItem {
  _id: string;
  service: Service;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
}

export const api = {
  auth: {
    register: (body: { name: string; email: string; password: string }) =>
      request<{ success: boolean; data: { user: User } }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    login: (body: { email: string; password: string }) =>
      request<{ success: boolean; data: { user: User } }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    logout: () =>
      request<{ success: boolean }>("/api/auth/logout", { method: "POST" }),
    me: () =>
      request<{ success: boolean; data: { user: User } }>("/api/auth/me"),
  },
  services: {
    list: (params?: { category?: string; sort?: string }) => {
      const q = new URLSearchParams();
      if (params?.category) q.set("category", params.category);
      if (params?.sort) q.set("sort", params.sort);
      const qs = q.toString();
      return request<{ success: boolean; data: { services: Service[] } }>(
        `/api/services${qs ? `?${qs}` : ""}`
      );
    },
    byCategory: (category: string) =>
      request<{ success: boolean; data: { category: string; bannerUrl: string; services: Service[] } }>(
        `/api/services/category/${category}`
      ),
    get: (id: string) =>
      request<{ success: boolean; data: { service: Service; reviews: Review[] } }>(
        `/api/services/${id}`
      ),
  },
  bookings: {
    create: (body: Record<string, unknown>) =>
      request<{ success: boolean; data: { booking: Booking } }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    get: (id: string) =>
      request<{ success: boolean; data: { booking: Booking } }>(`/api/bookings/${id}`),
    update: (id: string, body: Record<string, unknown>) =>
      request<{ success: boolean; data: { booking: Booking } }>(`/api/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    confirm: (id: string) =>
      request<{ success: boolean; data: { booking: Booking } }>(`/api/bookings/${id}/confirm`, {
        method: "POST",
      }),
    mine: () =>
      request<{ success: boolean; data: { bookings: Booking[] } }>("/api/bookings/me"),
  },
  contact: {
    submit: (body: Record<string, string>) =>
      request<{ success: boolean; message: string }>("/api/contact", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },
  cart: {
    get: () => request<{ success: boolean; data: { cart: Cart } }>("/api/cart"),
    add: (serviceId: string, quantity = 1) =>
      request<{ success: boolean; data: { cart: Cart } }>("/api/cart", {
        method: "POST",
        body: JSON.stringify({ serviceId, quantity }),
      }),
    updateItem: (itemId: string, quantity: number) =>
      request<{ success: boolean; data: { cart: Cart } }>(`/api/cart/items/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      }),
    removeItem: (itemId: string) =>
      request<{ success: boolean; data: { cart: Cart } }>(`/api/cart/items/${itemId}`, {
        method: "DELETE",
      }),
  },
  editorial: {
    list: () =>
      request<{ success: boolean; data: { posts: EditorialPost[] } }>("/api/editorial"),
  },
  reviews: {
    create: (body: Record<string, unknown>) =>
      request<{ success: boolean }>("/api/reviews", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },
};

export function serviceTitle(service: Service, lang: "en" | "ar", t: (k: string) => string) {
  if (lang === "ar" && service.titleAr) return service.titleAr;
  const translated = t(service.titleKey);
  if (translated !== service.titleKey) return translated;
  return service.titleEn;
}

export function serviceDesc(service: Service, lang: "en" | "ar", t: (k: string) => string) {
  if (lang === "ar" && service.descAr) return service.descAr;
  const translated = t(service.descKey);
  if (translated !== service.descKey) return translated;
  return service.descEn;
}
