Meteor.startup(function () {
    // code to run on server at startup
    if ( Meteor.users.find().count() === 0 ) {
        
        Accounts.createUser({
            username: 'admin',
            email: 'admin@mytutorjungle.com',
            password: 'admin',
            profile: {
                first_name: 'Carlos',
                last_name: 'Greblo',
                company: 'My Tutor Jungle',
            }
        });
	};
});