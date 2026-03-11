import React from 'react'
import { CustomerReview, CustomerReviewType } from './components/customer-review'

export type RatingsData = {
  rating: number;
  numRatings: number;
  reviews: CustomerReviewType[];
};

// Fetch Functions & Model
async function fetchReviews(restaurantId: string) {
  const res = await fetch(`http://localhost:3002/restaurants/${restaurantId}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

async function fetchRestaurantSummary(restaurantId: string) {
  const res = await fetch(`http://localhost:3002/restaurants/${restaurantId}`);
  if (!res.ok) throw new Error('Failed to fetch restaurant data');
  return res.json();
}

async function getRatings(restaurantId: string): Promise<RatingsData> {
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

export const Ratings = async ({ restaurantId = "1" }: { restaurantId?: string }) => {
  const data = await getRatings(restaurantId);

  return (
    <div className="bg-purple-100 border-purple-600 border-2 p-4 rounded-lg flex flex-col items-center justify-center text-purple-600 font-mono">
      
      {/* Summary Section */}
      <div className="py-4 text-center">
        <h1 className="text-2xl">Ratings</h1>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {data.reviews.map((review) => (
          <CustomerReview key={review.id} review={review} />
        ))}
      </div>
      
    </div>
  )
}