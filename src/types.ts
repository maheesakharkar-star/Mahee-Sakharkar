/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'decor' | 'corporate' | 'custom' | 'festival';
  description: string;
  price: number;
  image: string;
  originalMaterial: string; // E.g., "Discarded Glass Bottles", "Upcycled Saree fabric"
  artisanGroup: string; // E.g., "Marginalized Women of West Bengal", "Traditional Weavers of Varanasi"
  wasteDivertedKg: number;
  details: string[];
  inStock: boolean;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  date: string;
  time: string;
  facilitator: string;
  materialsProvided: string[];
  maxSeats: number;
  seatsBooked: number;
  image: string;
}

export interface Tour {
  id: string;
  title: string;
  duration: string;
  price: number;
  date: string;
  location: string;
  image: string;
  description: string;
  itinerary: string[];
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'tips' | 'diy' | 'impact';
  summary: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: string;
  likes: number;
  image: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizationNote?: string;
}

export interface WorkshopRegistration {
  id: string;
  workshopId: string;
  workshopTitle: string;
  fullName: string;
  email: string;
  phone: string;
  ticketsCount: number;
  paymentMethod: string;
  registrationDate: string;
}

export interface TourBooking {
  id: string;
  tourId: string;
  tourTitle: string;
  fullName: string;
  email: string;
  phone: string;
  groupSize: number;
  bookingDate: string;
  specialRequests?: string;
}

export interface Application {
  id: string;
  type: 'internship' | 'volunteer';
  fullName: string;
  email: string;
  phone: string;
  role: string;
  skills: string;
  motivation: string;
  availableFrom: string;
  submittedDate: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  submittedDate: string;
}

export interface MaterialTransformation {
  id: string;
  rawMaterial: string;
  wasteSource: string;
  endProductTitle: string;
  endProductCategory: string;
  image: string;
  artisanCluster: string;
  craftProcess: string[];
  impactFacts: {
    wasteDivertedKg: number;
    waterSavedLiters?: number;
    co2AvoidedKg: number;
  };
}
