'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('Users');
	
//Get user friend list by email
exports.get_friends = (req, res) => {
    if (req.body.email) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) res.send(err);
            if (user) {
                User.find({ _id: { $in: user.friends } }).select("email -_id")
                    .exec((err, friends) => {
                        if (err) res.send(err);
                        if (friends && friends.length > 0) {
                            friends = friends.map(x => x.email);
                            res.json({
                                success: true,
                                friends: friends,
                                count: friends.length
                            });
                        } else {
                            res.status(200).send("Requested user has no friends yet!")
                        }
                    });
            } else {
                res.status(404).send("Requested user does not exist")
            }

        });
    } else {
        res.status(400).send("Check parameters!")
    }
}