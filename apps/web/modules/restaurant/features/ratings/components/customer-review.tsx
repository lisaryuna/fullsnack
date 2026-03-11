import React from 'react'

// 1. Definisikan tipe datanya sesuai persis dengan JSON dari API
export type CustomerReviewType = {
  id: string;
  rating: number;
  date: string;
  comment?: string; // Tanda tanya (?) berarti opsional/bisa kosong
  user: {
    id: string;
    name: string;
  };
}

// 2. Terapkan datanya ke komponen UI
export const CustomerReview = ({ review }: { review: CustomerReviewType }) => (
  <div className="bg-green-100 border-green-600 border-2 p-4 rounded-lg flex flex-col items-start justify-center font-mono text-green-600">
    
    {/* Bagian Nama dan Rating */}
    <div className="flex justify-between w-full mb-1">
      <span className="font-bold text-lg">{review.user.name}</span>
      <span className="text-sm">⭐ {review.rating}</span>
    </div>
    
    {/* Bagian Tanggal */}
    <p className="text-xs mb-3 opacity-70">{review.date}</p>
    
    {/* Bagian Komentar (Pakai logika kondisional kalau kosong) */}
    <p className="text-base italic">
      {review.comment ? `"${review.comment}"` : "Tidak ada komentar tertulis."}
    </p>
    
  </div>
)