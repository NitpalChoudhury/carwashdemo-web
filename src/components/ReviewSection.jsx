import { motion } from "framer-motion";

function ReviewSection() {
  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      text: "Excellent service! Pickup was on time and my car feels brand new.",
    },
    {
      name: "Amit Verma",
      rating: 4,
      text: "Very professional mechanics. Transparent pricing and smooth experience.",
    },
    {
      name: "Sneha Roy",
      rating: 5,
      text: "Loved the service tracking feature. Highly recommended!",
    },
  ];

  return (
    <section className="py-20 px-6 bg-slate-950 text-white">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        What Our <span className="text-red-500">Customers Say</span>
      </motion.h2>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800"
          >

            {/* Stars */}
            <div className="flex mb-4 text-yellow-400">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p className="text-gray-400 mb-6 text-sm">
              "{review.text}"
            </p>

            <h3 className="font-semibold">
              — {review.name}
            </h3>

          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default ReviewSection;
