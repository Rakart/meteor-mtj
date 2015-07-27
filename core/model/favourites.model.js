// collection of all users' favourites
Favourites = new Mongo.Collection('favourites');

if (Meteor.isServer) {
	Favourites.allow({
		insert: function(userId) {
			return (userId ? true : false);
		}, 
		remove: function(userId) {
			return (userId ? true : false);
		}, 
		update: function(userId) {
			return (userId ? true : false);
		}
	});
}