import React from 'react'
// UPDATE: Import juga tipenya dari file customer-review
import { CustomerReview, CustomerReviewType } from './components/customer-review'

// 1. Tipe Data (Entity)
export type Ratings = {
  rating: number;
  numRatings: number;
  reviews: CustomerReviewType[]; // UPDATE: Ganti any[] menjadi CustomerReviewType[]
};

// 2. Fungsi Fetch & Model
async function fetchReviews(restaurantId: string) {
  const res = await fetch(`http://localhost:3002/restaurants/${restaurantId}/reviews`);
  if (!res.ok) throw new Error('Gagal mengambil reviews');
  return res.json();
}

async function fetchRestaurantSummary(restaurantId: string) {
  const res = await fetch(`http://localhost:3002/restaurants/${restaurantId}`);
  if (!res.ok) throw new Error('Gagal mengambil data restaurant');
  return res.json();
}

async function getRatings(restaurantId: string): Promise<Ratings> {
  const [restaurant, reviews] = await Promise.all([
    fetchRestaurantSummary(restaurantId),
    fetchReviews(restaurantId)
  ]);

  return {
    rating: restaurant.rating,
    numRatings: restaurant.numRatings,
    reviews: reviews
  };
}

// 3. Implementasi di Komponen UI
export const RatingsComponent = async ({ restaurantId }: { restaurantId: string }) => {
  const data = await getRatings(restaurantId);

  return (
    <div className="bg-purple-100 border-purple-600 border-2 p-4 rounded-lg flex flex-col items-center justify-center text-purple-600">
      
      {/* Summary */}
      <div className="py-4 text-center font-mono">
        <h1 className="text-2xl font-bold">Ratings: {data.rating} / 5</h1>
        <p className="text-sm">Berdasarkan {data.numRatings} ulasan</p>
      </div>

      {/* List Review */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {data.reviews.map((review) => (
          <CustomerReview key={review.id} review={review} />
        ))}
      </div>
      
    </div>
  )
}