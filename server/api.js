Picker.route('/api/meetwhere', function (params, req, res, next) {
    const addresses = _.values(params.query); // response is in the form of { 0: 'location1', 1: 'location2'}
    const calculatedResults = Meteor.call('getCenterAndFeatures', addresses);
    res.end(JSON.stringify(calculatedResults)); // put your response here
});

Picker.route('/api/meetwhere/location', function (params, req, res, next) {
    const locations = _.values(params.query); // response is in the form of { 0: 'location1', 1: 'location2'}
    const parsedLocations = locations.map(locationString => {
        return locationString
            .split(',')
            .map(latOrLong => {
                return parseFloat(latOrLong);
            });
    });
    const calculatedResults = Meteor.call('getCenterAndFeaturesFromLatLong', parsedLocations);
    res.end(JSON.stringify(calculatedResults)); // put your response here
});
