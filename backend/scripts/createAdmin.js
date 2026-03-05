require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../src/config/db");
const User = require("../src/models/User");

const parseArgs = () => {
  const args = process.argv.slice(2);
  const values = {
    name: process.env.ADMIN_NAME || "",
    email: process.env.ADMIN_EMAIL || "",
    password: process.env.ADMIN_PASSWORD || "",
  };

  args.forEach((arg) => {
    if (arg.startsWith("--name=")) values.name = arg.replace("--name=", "").trim();
    if (arg.startsWith("--email=")) values.email = arg.replace("--email=", "").trim().toLowerCase();
    if (arg.startsWith("--password=")) values.password = arg.replace("--password=", "").trim();
  });

  return values;
};

const ensureInput = ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error(
      "Missing input. Provide --name, --email, --password or set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD in .env"
    );
  }
};

const run = async () => {
  try {
    const { name, email, password } = parseArgs();
    ensureInput({ name, email, password });

    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          email,
          password: hashedPassword,
          role: "admin",
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Admin ready: ${user.email} (${user._id.toString()})`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
};

run();
