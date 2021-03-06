Images = new FS.Collection('images', {
	stores: [
		new FS.Store.GridFS('original')
	],
	filter: {
		allow: {
			contentTypes: ['image/*']
		}
	}
});

if (Meteor.isServer) {
	Images.allow({
		insert: function (userId) {
			return (userId ? true : false);
		}, 
		remove: function (userId) {
			return (userId ? true : false);
		}, 
		download: function() {
			return true;
		}, 
		update: function(userId) {
			return (userId ? true : false);
		}
	});

	// need redefine the images pub/sub
	Meteor.publish('images', function() {
		return Images.find({ owner: this._id });
	});

}