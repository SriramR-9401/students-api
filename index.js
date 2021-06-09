const express = require("express");
const mongoose = require("mongoose");
const details = require("./schema");
const cors = require("cors");
require("dotenv/config");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send(
		"'display' for all student data, 'addEntry' for enter a new student data, 'deleteEntry' for deleting a student entry using roll no"
	);
});

app.get("/display", async (req, res) => {
	try {
		const student = await details.find().sort({ RollNo: 1 });
		res.json(student);
	} catch (err) {
		res.json({ message: err });
	}
});

app.post("/addEntry", async (req, res) => {
	const student = new details({
		Name: req.body.name,
		RollNo: req.body.rollno,
		City: req.body.city,
		Age: req.body.age,
		Marks: req.body.marks,
	});
	try {
		const push = await student.save();
		res.json(push);
	} catch (err) {
		res.json({ message: err });
	}
});

app.patch("/updateEntry/:rollno", async (req, res) => {
	try {
		const student = await details.updateOne(
			{ RollNo: req.params.rollno },
			{
				$set: {
					Name: req.body.name,
					Marks: req.body.marks,
					City: req.body.city,
					Age: req.body.age,
					RollNo: req.body.rollno,
				},
			}
		);
		res.json(student);
	} catch (err) {
		res.json({ message: err });
	}
});

app.delete("/deleteEntry/:rollno", async (req, res) => {
	try {
		const student = await details.deleteOne({ RollNo: req.params.rollno });
		res.json(student);
	} catch (err) {
		res.json({ message: err });
	}
});

app.listen(7000, () => {
	mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	mongoose.connection
		.once("open", () => console.log("Successfully connected to database"))
		.on("error", (err) => {
			console.log("message: ", err);
		});
});
