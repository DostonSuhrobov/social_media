const router = require("express").Router();
const User = require("../models/User");


// Register

router.post("/register", async (req,res) => {
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }

})

router.get("/",(req,res) => {
    res.send("hey this is auth routes!");
})

// Login

router.post("/login", async (req,res) => {

    try 
        {    
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(404).send("user not found");

            if( req.body.password == user.password){
                res.status(200).json(user);
            }
            else{
                res.status(400).json("wrong password!");
            }
            
        }
    catch (err)
        {
        
            console.log(err);
            res.status(500).json(err);
        }
});




module.exports = router


