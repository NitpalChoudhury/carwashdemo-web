import { motion } from "framer-motion";

function VideoSection() {
  const videos = [
    {
      title: "Professional Car Service Demo",
      url: "https://www.youtube.com/embed/8ZcmTl_1ER8",
    },
    {
      title: "Car Detailing Process",
      url: "https://www.youtube.com/embed/5qap5aO4i9A",
    },
    {
      title: "Garage Walkthrough",
      url: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
  ];

  return (
    <section className="py-20 px-6 bg-slate-900 text-white">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        Watch Our <span className="text-red-500">Service Process</span>
      </motion.h2>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {videos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700"
          >

            <div className="aspect-video">
              <iframe
                src={video.url}
                title={video.title}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold">
                {video.title}
              </h3>
            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default VideoSection;
