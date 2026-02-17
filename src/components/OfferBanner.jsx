import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function OfferBanner() {
  const offers = [
    {
      title: "Flat 20% OFF on Premium Service",
      description: "Free Pickup & Delivery included.",
      code: "AUTO20",
      discount: "20%",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    },
    {
      title: "Free AC Checkup This Week",
      description: "Book now and get free cooling inspection.",
      code: "ACFREE",
      discount: "FREE",
      image:
        "https://images.unsplash.com/photo-1511910849309-0dffb7b4e0b3",
    },
    {
      title: "₹500 OFF on First Booking",
      description: "New customers special offer.",
      code: "NEW500",
      discount: "₹500",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
    },
  ];

  return (
    <section className="py-16 bg-slate-950 text-white px-6">

      <div className="max-w-7xl mx-auto">

        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="offer-swiper rounded-3xl overflow-hidden"
        >
          {offers.map((offer, index) => (
            <SwiperSlide key={index}>
              <div className="relative bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-8 md:p-12 grid lg:grid-cols-3 gap-10 items-center shadow-2xl">

                {/* LEFT CONTENT */}
                <div className="space-y-6 text-center lg:text-left">

                  <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                    {offer.title}
                  </h2>

                  <p className="text-white/90 text-sm md:text-base">
                    {offer.description}
                  </p>

                  <div className="inline-block bg-black/40 backdrop-blur-lg border border-white/20 px-5 py-2 rounded-xl text-sm">
                    Use Code:{" "}
                    <span className="font-bold text-yellow-300">
                      {offer.code}
                    </span>
                  </div>

                  <div>
                    <Link
                      to="/booking"
                      className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition shadow-lg"
                    >
                      Claim Offer
                    </Link>
                  </div>

                </div>

                {/* CENTER IMAGE */}
                <div className="relative flex justify-center">
                  <img
                    src={offer.image}
                    alt="Offer"
                    className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                </div>

                {/* RIGHT BADGE */}
                <div className="flex justify-center">
                  <div className="bg-white text-red-600 rounded-full h-40 w-40 md:h-56 md:w-56 flex flex-col items-center justify-center shadow-2xl border-4 border-white/40">

                    <span className="text-3xl md:text-5xl font-bold">
                      {offer.discount}
                    </span>

                    <span className="text-sm md:text-lg font-semibold mt-2">
                      OFF
                    </span>

                    <span className="text-xs mt-1">
                      Limited Deal
                    </span>

                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Custom Arrow Styling */}
      <style jsx>{`
        .offer-swiper .swiper-button-next,
        .offer-swiper .swiper-button-prev {
          color: white;
          font-weight: bold;
        }

        .offer-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.6;
        }

        .offer-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>

    </section>
  );
}

export default OfferBanner;
