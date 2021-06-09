const mongoose = require("mongoose");

const details = mongoose.Schema({
	Name: {
		type: String,
		required: true,
	},
	RollNo: {
		type: Number,
		required: true,
	},
	City: {
		type: String,
		required: true,
	},
	Age: {
		type: Number,
		required: true,
	},
	Marks: {
		type: Number,
		default: 0,
	},
	DateofJoin: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("students", details);
