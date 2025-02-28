const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
  // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      // required:true,
    },
    bio: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: null,
    },
    suggesstions: {
      type: String,
      default: "",
    },
    image: {
     type:String
    //  data: Buffer, 
    //  contentType: String
    },
  },
  { timestamps: true }
);

// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     try {
//       const hashedPassword = await bcrypt.hash(this.password, saltRounds);
//       this.password = hashedPassword;
//       next();
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     next();
//   }
// });

const User = mongoose.model("users", UserSchema);

module.exports = User;










