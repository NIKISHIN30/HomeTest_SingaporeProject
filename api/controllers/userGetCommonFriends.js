'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('Users'),
	intersect = require('intersect');
	
//Get common user between two users
exports.get_common_friends = (req, res) => {
    if (req.body.friends && req.body.friends.length == 2) {
        User.findOne({ email: req.body.friends[0] }, (err, first) => {
            if (err) res.send(err);
            if (first) {
                User.findOne({ email: req.body.friends[1] }, (err, second) => {
                    if (err) res.send(err);					
                    if (second) {
                        let firstFriends = JSON.parse(JSON.stringify(first.friends));
                        let secondFriends = JSON.parse(JSON.stringify(second.friends));
                        let commonFriends = intersect(firstFriends, secondFriends);

                        User.find({ _id: { $in: commonFriends } }).select("email -_id")
                            .exec((err, friends) => {
                                if (err) res.send(
                                    err);
                                friends = friends.map(x => x.email);
                                res.json({
                                    success: true,
                                    friends: friends,
                                    count: friends.length
                                });
                            });

                    } else {
                        res.status(404).send("SecondUser does not exist or Incorrect EmailID")
                    }
                });

            } else {
                res.status(404).send("FirstUser does not exist or Incorrect EmailID")
            }
        });
    } else {
        res.status(400).send("Check Parameters!")
    }
}