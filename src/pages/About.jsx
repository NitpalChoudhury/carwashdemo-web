import { motion } from "framer-motion";

function About() {
  return (
    <div className="bg-slate-950 text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="py-24 px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          About <span className="text-red-500">AutoCare</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-400 max-w-3xl mx-auto"
        >
          We deliver premium car servicing with pickup & delivery,
          ensuring transparency, reliability, and expert care for your vehicle.
        </motion.p>

      </section>


      {/* OUR STORY */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-400 mb-4">
              AutoCare was founded to simplify car servicing for busy
              professionals and families. We believe car maintenance should be
              convenient, transparent, and stress-free.
            </p>
            <p className="text-gray-400">
              Our expert team ensures every vehicle gets top-level attention
              with genuine parts and modern diagnostic tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-800 p-10 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">
              Why Choose Us?
            </h3>
            <p className="text-gray-400">
              ✔ Certified mechanics <br />
              ✔ Transparent pricing <br />
              ✔ Genuine spare parts <br />
              ✔ On-time delivery
            </p>
          </motion.div>

        </div>
      </section>


      {/* MISSION & VISION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-slate-800 p-8 rounded-xl shadow"
          >
            <h3 className="text-2xl font-bold mb-4 text-red-500">
              Our Mission
            </h3>
            <p className="text-gray-400">
              To provide reliable, affordable, and professional automotive
              services with maximum customer satisfaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="bg-slate-800 p-8 rounded-xl shadow"
          >
            <h3 className="text-2xl font-bold mb-4 text-red-500">
              Our Vision
            </h3>
            <p className="text-gray-400">
              To become the most trusted and technology-driven car service
              platform across the country.
            </p>
          </motion.div>

        </div>
      </section>


      {/* STATS SECTION */}
      <section className="py-20 px-6 bg-slate-900 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Our Achievements
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">

          {[
            { number: "500+", label: "Cars Serviced" },
            { number: "50+", label: "Expert Mechanics" },
            { number: "4.8★", label: "Customer Rating" },
            { number: "5+", label: "Years Experience" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-red-500">
                {stat.number}
              </h3>
              <p className="text-gray-400 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </section>


      {/* TEAM SECTION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Meet Our Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {["Rajesh Kumar", "Amit Singh", "Sandeep Roy"].map(
            (member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-800 p-6 rounded-xl shadow"
              >
                <div className="h-24 w-24 mx-auto bg-red-500 rounded-full mb-4"></div>
                <h3 className="font-semibold text-lg">
                  {member}
                </h3>
                <p className="text-gray-400 text-sm">
                  Automotive Expert
                </p>
              </motion.div>
            )
          )}

        </div>
      </section>

    </div>
  );
}

export default About;
