
var ADMIN_USERS = ['angeline.tanjt@gmail.com', 'carlos.greblo@gmail.com'];
	function isAdmin(userId) {
	 	var user = Meteor.users.findOne({_id: userId});
		
		try {
			
			return ADMIN_USERS.indexOf(user.emails[0].address) !== -1
		
		} catch(e) {
	  		
	  		return false;
	}
}


// publish all users data only if user as an admin
Meteor.publish('users', function() {
	if (isAdmin(this.userId)){
		return Meteor.users.find({});
	}
});

// publish all users that are 'tutors'
// Meteor.publish('tutors', function() {
// 	return Meteor.users
// 		.find({identity: 'tutor'}, { fields: {
//             first_name: 1,
//             last_name: 1,
//             qualifications: 1,
//             experience: 1,
//             commitmentPeriod: 1
//             }
//         });
// });

// publish all users that are 'parents'
Meteor.publish('parents', function() {
	return Meteor.users.find({identity: 'parent'}, {});
});

// publish current logged in user
Meteor.publish('thisUser', function() {
	if (this.userId) {
		return Meteor.users
			.find({ _id: this.userId }, { fields: {
	 			favourites: 1,
	 			id: 1
	 			}
	 		});
	} else {
		return this.ready();
	}
});

Meteor.publish('favourites', function(favourites) {
	return Meteor.users
		.find({ _id: {$in: favourites } }, 
            { fields:
            	{ 
            		_id: 1,
         			first_name: 1,
   					last_name: 1
             	}
        	}
        );
});

Meteor.users.allow({
	remove: function(userId, user) {
		return true;
	}, 
	insert: function(userId, user) {
		return true;
	}, 
	update: function(userId, user, fields, modifier) {
		return userId;
	}
});

Accounts.onCreateUser(function(options, user) {
	user.first_name = '';
	user.last_name = '';
	user.gender = '';
	user.nric = '';
	user.mobileNo = '';
	user.dob = '';
	user.address = {};
	user.qualifications = {};
	user.commitmentPeriod = '';
	user.preferredLocations = {};
	user.teachingLevels = {};
	user.experience = {};
	user.favourites = [];
	user.identity = '';

	return user;
});


