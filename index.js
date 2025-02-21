const express = require('express');
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("Testing route to check the status of server");
})

//POST
app.post('/bfhl', (req, res) => {
    try {
        const name = "Parth Saini";
        const dob = "29052004";
        const {data} = req.body;

        if(!name || !dob || !Array.isArray(data)) {
            return res.status(400).json({is_success: false, message: "Invalid input format"})
        }

        console.log("reaching here start")

        const user_id = `${name.split(" ").join("_").toLowerCase()}_${dob}`;
        const numbers = data.filter(item => /^[0-9]+$/.test(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        let highest_alphabet = [];
        if (alphabets.length > 0) {
            highest_alphabet = [alphabets.reduce((max, curr) => curr.toLowerCase() > max.toLowerCase() ? curr : max)];
        }
        
        console.log("reaching here end")

        res.json({
            is_success: true,
            user_id,
            email: "sainiparth299@gmail.com",
            roll_number: "22BCS15535",
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
})
//GET
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})