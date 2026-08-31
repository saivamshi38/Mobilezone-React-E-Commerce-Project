import React, { useState } from 'react';
import { Star, CheckCircle, Send } from 'lucide-react';
import { StarRating } from '../common/StarRating';
import { useToast } from '../../context/ToastContext';

export const ReviewSection = ({ product }) => {
  const { addToast } = useToast();
  const [reviews, setReviews] = useState(product.reviews || []);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      addToast('Please fill in your name and review', 'error');
      return;
    }

    const reviewObj = {
      id: Date.now(),
      author: newAuthor,
      rating: Number(newRating),
      date: 'Just now',
      title: newTitle || 'Verified Purchase Review',
      comment: newComment
    };

    setReviews([reviewObj, ...reviews]);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    setShowForm(false);
    addToast('Review submitted successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {product.rating}
          </div>
          <div>
            <StarRating rating={product.rating} size="md" showNumber={false} />
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
              Based on {product.reviewCount || reviews.length} verified ratings
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
        >
          {showForm ? 'Cancel Review' : 'Write a Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-blue-50/50 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-500/30 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Share your experience with {product.name}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Michael S."
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Rating</label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="5">★★★★★ (5 Stars - Outstanding)</option>
                <option value="4">★★★★☆ (4 Stars - Great)</option>
                <option value="3">★★★☆☆ (3 Stars - Average)</option>
                <option value="2">★★☆☆☆ (2 Stars - Below expectations)</option>
                <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Review Headline</label>
            <input
              type="text"
              placeholder="e.g. Best battery life and display quality"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Detailed Review</label>
            <textarea
              rows="3"
              placeholder="What did you like or dislike? How does it perform in real life?"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow"
          >
            <Send className="w-3.5 h-3.5" /> Submit Review
          </button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map(rev => (
          <div key={rev.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.author}</span>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <CheckCircle className="w-3 h-3" /> Verified Owner
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{rev.date}</span>
            </div>

            <StarRating rating={rev.rating} size="xs" showNumber={false} />

            {rev.title && (
              <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                {rev.title}
              </h5>
            )}

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
