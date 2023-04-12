const mongoose = require('mongoose')

const WatchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieItems: {
        type: [{
        movieId: {
            type: mongoose.Types.ObjectId,
            ref: 'Movie'
        },
        hasWatched: {
            type: Boolean,
            default: false
        }
    }],
    validate: {
        validator: checkLimit,
        message: 'Watchlist has exceeded the movie limit of 10. Delete some movies to add other movies'
    }
}
})

function checkLimit(items){
    return items.length <= 10 ;
}

module.exports = mongoose.model('Watchlist', WatchlistSchema)