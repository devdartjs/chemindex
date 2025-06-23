import mongoose from "mongoose";
import emailVal from "validator";
import bcrypt from "bcrypt";

const { isEmail } = emailVal;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },

  status: {
    type: String,
    enum: [
      "user",
      "user100",
      "user250",
      "user500",
      "user750",
      "user1000",
      "userTest",
      "admin",
    ],
    default: "user",
  },
});

userSchema.index({ status: 1 });

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.post("save", function (doc, next) {
  next();
});

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("incorrect email");
    }

    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    } else {
      throw new Error("incorrect password");
    }
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("user", userSchema);

export default User;
