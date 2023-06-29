const express = require('express');
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require("./routes/auth");
const chapterRoutes = require("./routes/chapteRo")

// Middleware and configuration
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


// Routes
app.use("/auth",authRoutes);
app.use("/chapter",chapterRoutes)

// Start the server
const PORT = process.env.PORT || 8089;

const Connect =()=>{
    return mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
}

app.listen(PORT, async ()=>{

    try {
        await Connect();
        console.log(`listing on port ${PORT}`)
    } catch (error) {
        console.log(error);
    }
})
