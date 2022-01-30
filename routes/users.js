const User = require("../models/User");

const router = require("express").Router();

router.get("/",(req,res) => {
    res.send("hey this is user routes!");

})

//update user
router.put("/:id", async (req,res) => {

    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    });
    res.status(200).json("Account has been updated!");

});


//delete user
router.delete("/:id", async (req,res) => {

    const user = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("Account has been deleted!");

});

//get a user


//follow a user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: { followers: req.body.userId }});
                await currentUser.updateOne({ $push: { following: req.params.id }});
                res.status(200).json("user has been followed 👍!");
            }
             else {
                res.status(403).json("you are already follow this user 😒");
            }
        } 
        catch(err){
          res.status(500).json(err);
        }
    } 
    else {
      res.status(403).json("you can't follow yourself 😒");
    }
});




//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if( req.body.userId !== req.params.id ){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: { followers: req.body.userId }});
                await currentUser.updateOne({ $pull: { following: req.params.id }});
                res.status(200).json("user has been unfollowed 👍!");
            }
            else {
                res.status(403).json("you are already unfollow this user 😒");
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("you can't unfollow yourself 😒");
    }
});


module.exports = router


