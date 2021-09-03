const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    // these deal with deprecation warnings
});

connect.then(() => {

    console.log('Connected correctly to server :)');

    // Campsite is the model we made - making new doc with it
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        console.log(campsite); // prints array

        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document' } // setting what field we want to change
        }, {
            new: true // returns updated document
        });
    })
    .then(campsite => {
        console.log(campsite); // returning original document

        // sub document to push into array
        campsite.comments.push({
            rating: 5,
            text: 'What a great view',
            author: 'Me'
        });

        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite); // returning the document we updated
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});