const DBconnect = require('../MongoDB/dbconnection');
require('dotenv').config({path:"../.env"});
const movieModel =  require('../models/movieModel')
const userModel =  require('../models/userModel')
const reviewModel = require('../models/reviewModel')
const watchListModel = require('../models/watchlistModel')
const actorModel = require('../models/actorModel')
const {movies, users, reviews, actors} = require('./sampleData')

const init = async ()=>{
    try{
        await DBconnect(process.env.DB_URI)
        await movieModel.deleteMany()
        await userModel.deleteMany()
        await reviewModel.deleteMany()
        await watchListModel.deleteMany()
        await actorModel.deleteMany()
        //insert movies
        const movieList = await movieModel.create(movies)
        //insert users
        const userList = await userModel.create(users)

        const movieIds = movieList.map((movie)=>{
            return {movieId:movie._id}
        })
        const userIds = userList.map((user)=>{
            return {user:user._id}
        })

        //insert watchlists
        const watchList = await watchListModel.create(userIds)

        //get actor movie roles id
        const actorList = actors.map((actor)=>{
            const movies = actor.movies.map((a)=>{
               const movie = movieList.find(b => b.title == a.title)
               const movieRole = {
                movieId: movie._id,
                characterName: a.character
            }
            return movieRole
            })
            actor.movieRoles = movies
            // const newActor = {
            //     fullName: actor.fullName,
            //     country: actor.country,
            //     movieRoles: movies
            // }
            return actor
        })
        //console.log(movieList)
        //console.log(actorList)
        //insert actors
        await actorModel.create(actorList)

        //Max reviews = movie count * user count -1
        let movieCounter = 0
        let userCounter = 1
        const max = userList.length
        //add user id and movie id to review objects
        const toSaveReviews = reviews.map((review)=>{
            if(movieCounter < movieIds.length){
                review.user = userIds[userCounter].user
                review.movie = movieIds[movieCounter].movieId
                userCounter++
                if(userCounter == max){
                    movieCounter++
                    userCounter = 1
                }
                return review
            }
            return
        })
        const filteredReviews = toSaveReviews.filter(a => a != null)
        //insert reviews
        const reviewList = await reviewModel.create(filteredReviews)
        console.log('Sample data succcessfully inserted to the database')
        process.exit(0)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

init()

