const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://icodelabs:icodelabs@vendor-next-door.eob05.mongodb.net/demo?retryWrites=true&w=majority&appName=vendor-next-door";
// const mongoURI ="mongodb+srv://Cluster16976:varunvarun@demo.34zt3.mongodb.net/sampleusers?retryWrites=true&w=majority&appName=Demo"
const connectDb = () =>
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

module.exports = connectDb;
