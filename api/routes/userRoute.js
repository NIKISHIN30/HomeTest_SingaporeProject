'use strict';
module.exports = function (app) {
    const userList = require('../controllers/userController');
	const getfriends = require('../controllers/userGetFriends');
	const commonfriends = require('../controllers/userGetCommonFriends');
	const follow = require('../controllers/userFollow');
	const unfollow = require('../controllers/userUnFollow');
	const getfollowers = require('../controllers/userGetFollowers');

    app.route('/friends_api')
        .get(userList.list_all_users); 
		
	// API 1. As a user, I need an API to create a friend connection between two email addresses.
	// {"friends": "andy@example.com", "target": "john@example.com"}
    app.route('/friends_api/addfriend')
        .post(userList.add_a_friend);
		
	// API 2. As a user, I need an API to retrieve the friends list for an email address.
	// { "email": "andy@example.com" }
    app.route('/friends_api/getfriends')
        .post(getfriends.get_friends);
		
	// API 3. As a user, I need an API to retrieve the common friends list between two email addresses.
	// { "friends": [ "andy@example.com", "john@example.com" ] }
    app.route('/friends_api/commonfriends')
        .post(commonfriends.get_common_friends);
		
	// API 4. As a user, I need an API to subscribe to updates from an email address.
	// { "requestor": "andy@example.com", "target": "john@example.com" }
    app.route('/friends_api/follow')
        .post(follow.follow_a_user);
		
	// API 5. As a user, I need an API to block updates from an email address.
	// { "requestor": "andy@example.com", "target": "john@example.com" }
    app.route('/friends_api/unfollow')
        .post(unfollow.unfollow_a_user);
	
	// API 6. As a user, I need an API to retrieve all email addresses that can receive updates from an email address.
	// { "sender": "john@example.com", "text": "Hello World! kate@example.com" }
    app.route('/friends_api/getfollowers')
        .post(getfollowers.get_all_followers);
		
};
