import React from 'react'

// 1. Define the data type exactly matching the JSON from the API
export type CustomerReviewType = {
  id: string;
  rating: number;
  date: string;
  comment?: string; // The question mark (?) means it is optional/can be empty
  user: {
    id: string;
    name: string;
  };
}

// 2. Apply the data to the UI component
export const CustomerReview = ({ review }: { review: CustomerReviewType }) => (
  <div className="bg-green-100 border-green-600 border-2 p-4 rounded-lg flex flex-col items-start justify-center font-mono text-green-600">
    
    {/* Name and Rating Section */}
    <div className="flex justify-between w-full mb-1">
      <span className="font-bold text-lg">{review.user.name}</span>
      <span className="text-sm">⭐ {review.rating}</span>
    </div>
    
    {/* Date Section */}
    <p className="text-xs mb-3 opacity-70">{review.date}</p>
    
    {/* Comment Section (Using conditional logic if empty) */}
    <p className="text-base italic">
      {review.comment ? `"${review.comment}"` : "No written comment provided."}
    </p>
    
  </div>
)