import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import image from '../assets/1.png'
import image2 from '../assets/2.png'
import image3 from '../assets/3.png'
import image4 from '../assets/4.png'
import image5 from '../assets/5.png'
import image6 from '../assets/6.png'
import image7 from '../assets/7.png'
import image8 from '../assets/8.png'
import image9 from '../assets/9.png'
import image10 from '../assets/10.png'
import image11 from '../assets/11.png'
import image12 from '../assets/12.png'


const DocumentationPage = ({ use, setUse }) => {

  useEffect(() => {
    const initializePage = async () => {
      try {
        const data = await axios.get('/apime/user/userCheck')
        setUse(data.data.user.username)
      }
      catch (error) {
        console.log(error)
      }
    }

    initializePage();

  }, [])

  return (
    <Wrapper className='section'>

      <div className="container">
        <div id="accordion">
          <div className="card">
            <div className="card-header" id="heading-1">
              <h5 className="mb-0">
                <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
                  Movie
                </a>
              </h5>
            </div>
            <div id="collapse-1" class="collapse show" data-parent="#accordion" aria-labelledby="heading-1">
              <div class="card-body">

                <div id="accordion-1">
                  <div class="card">
                    <div class="card-header" id="heading-1-1">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1" aria-expanded="false" aria-controls="collapse-1-1" >
                          <button
                            className="docButton float-left">
                            GET
                          </button>
                          /apime/movies</a> <br /><p>Get all movies</p>

                      </h5>
                    </div>
                    <div id="collapse-1-1" class="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                      <div class="card-body">
                        <p>Returns all movies</p>
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Parameter</th>
                              <th scope="col">Description</th>
                              <th scope="col">DataType</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>page=</td>
                              <td>page number</td>
                              <td>Integer</td>
                            </tr>
                            <tr>
                              <td>category=</td>
                              <td><i>filter on specific category. Available categories:</i>
                                <br />Action
                                <br />Adventure
                                <br />Drama
                                <br />Fantasy
                                <br />Horror
                                <br />Mystery
                                <br />Romance
                                <br />Sci-Fi
                                <br />Thriller
                              </td>
                              <td>String</td>
                            </tr>
                            <tr>
                              <td>title=</td>
                              <td>search for a movie by its title</td>
                              <td>String</td>
                            </tr>
                            <tr>
                              <td>sort=</td>
                              <td>sort movies by title
                                <br /><i>Available options:</i>
                                <br />-title
                                <br />title</td>
                              <td>String</td>
                            </tr>
                          </tbody>

                        </table>
                        <p>Response</p>
                        <img src={image2} alt='movie' />
                      </div>
                    </div>
                  </div>
                </div>
                <div id="accordion-2">
                  <div class="card">
                    <div class="card-header" id="heading-1-2">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-2" aria-expanded="false" aria-controls="collapse-1-2">
                          <button
                            className="docButton float-left">
                            GET
                          </button> /apime/movies/:id</a> <br /><p>Find movie by id</p>

                      </h5>
                    </div>
                    <div id="collapse-1-2" class="collapse" data-parent="#accordion-2" aria-labelledby="heading-1-2">
                      <div class="card-body">
                        <p>Returns a single movie</p>
                        <img src={image4} alt='movie' />
                      </div>
                    </div>
                  </div>
                </div>
                <div id="accordion-3">
                  <div class="card">
                    <div class="card-header" id="heading-1-3">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-3" aria-expanded="false" aria-controls="collapse-1-3">
                          <button
                            className="docButton float-left">POST</button>
                          /apime/movies/uploadMovieImage</a><br /> <p>Uploads an image</p>

                      </h5>
                    </div>
                    <div id="collapse-1-3" class="collapse" data-parent="#accordion-3" aria-labelledby="heading-1-3">
                      <div class="card-body">
                        <p>Returns url of the image</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="accordion-4">
                  <div class="card">
                    <div class="card-header" id="heading-1-4">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-4" aria-expanded="false" aria-controls="collapse-1-4">
                          <button className="docButton float-left">
                            POST </button> /apime/movies</a> <br /><p>Add movie</p>


                      </h5>
                    </div>
                    <div id="collapse-1-4" class="collapse" data-parent="#accordion-4" aria-labelledby="heading-1-4">
                      <div class="card-body">
                        <p>Movie object that needs to be added</p>

                        <img src={image} alt='movie' />
                      </div>
                    </div>
                  </div>
                </div>
                <div id="accordion-5">
                  <div class="card">
                    <div class="card-header" id="heading-1-5">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-5" aria-expanded="false" aria-controls="collapse-1-5">
                          <button className="docButton float-left">
                            DELETE </button> /apime/movies/:id</a> <br /><p>Deletes a movie</p>


                      </h5>
                    </div>
                    <div id="collapse-1-5" class="collapse" data-parent="#accordion-4" aria-labelledby="heading-1-5">
                      <div class="card-body">

                        <img src={image3} alt='movie' />
                      </div>
                    </div>
                  </div>
                </div>

                <div id="accordion-6">
                  <div class="card">
                    <div class="card-header" id="heading-1-6">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-6" aria-expanded="false" aria-controls="collapse-1-6">
                          <button className="docButton float-left">
                            PUT </button> /apime/movies/:id</a> <br /><p>Update a movie</p>

                      </h5>
                    </div>
                    <div id="collapse-1-6" class="collapse" data-parent="#accordion-6" aria-labelledby="heading-1-6">
                      <div class="card-body">

                        <p>Movie object that needs to be updated</p>
                        <img src={image} alt='movie' />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="heading-2">
            <h5 class="mb-0">
              <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                Review
              </a>
            </h5>
          </div>
          <div id="collapse-2" class="collapse" data-parent="#accordion" aria-labelledby="heading-2">
            <div class="card-body">
              <div id="accordion-2-1">
                <div class="card">
                  <div class="card-header" id="heading-2-1">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2-1-1" aria-expanded="false" aria-controls="collapse-2-1-1" >
                        <button
                          className="docButton float-left">
                          GET
                        </button>
                        /apime/reviews</a> <br /><p>Get all reviews</p>

                    </h5>
                  </div>
                  <div id="collapse-2-1-1" class="collapse" data-parent="#accordion-2-1" aria-labelledby="heading-2-1">
                    <div class="card-body">
                      <p>Returns all reviews</p>
                      <img src={image10} alt='movie' />
                    </div>
                  </div>
                </div>
              </div>
              <div id="accordion-2-2">
                <div class="card">
                  <div class="card-header" id="heading-2-2">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2-2" aria-expanded="false" aria-controls="collapse-2-2">
                        <button
                          className="docButton float-left">
                          GET
                        </button> /apime/reviews/:id</a> <br /><p>Find review by id</p>

                    </h5>
                  </div>
                  <div id="collapse-2-2" class="collapse" data-parent="#accordion-2-2" aria-labelledby="heading-2-2">
                    <div class="card-body">
                      <p>Returns a single review</p>
                      <img src={image11} alt='movie' />
                    </div>
                  </div>
                </div>
              </div>
              <div id="accordion-2-3">
                <div class="card">
                  <div class="card-header" id="heading-2-3">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2-3" aria-expanded="false" aria-controls="collapse-2-3">
                        <button
                          className="docButton float-left">POST</button>
                        /apime/reviews</a><br /> <p>Adds a review</p>

                    </h5>
                  </div>
                  <div id="collapse-2-3" class="collapse" data-parent="#accordion-2-3" aria-labelledby="heading-2-3">
                    <div class="card-body">
                      <p>Review object that needs to be added</p>
                      <img src={image} alt='movie' />
                    </div>
                  </div>
                </div>
              </div>
              <div id="accordion-2-4">
                <div class="card">
                  <div class="card-header" id="heading-2-4">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2-4" aria-expanded="false" aria-controls="collapse-2-4">
                        <button className="docButton float-left">
                          PUT </button> /apime/reviews/:id</a> <br /><p>Updates a review</p>

                    </h5>
                  </div>
                  <div id="collapse-2-4" class="collapse" data-parent="#accordion-2-4" aria-labelledby="heading-2-4">
                    <div class="card-body">
                      <p>Review object that needs to be updated</p>
                      <img src={image} alt='movie' />
                    </div>
                  </div>
                </div>
              </div>
              <div id="accordion-2-5">
                <div class="card">
                  <div class="card-header" id="heading-2-5">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2-5" aria-expanded="false" aria-controls="collapse-2-5">
                        <button className="docButton float-left">
                          DELETE </button> /apime/reviews/:id</a> <br /><p>Deletes a review</p>


                    </h5>
                  </div>
                  <div id="collapse-2-5" class="collapse" data-parent="#accordion-2-5" aria-labelledby="heading-2-5">
                    <div class="card-body">

                      <img src={image12} alt='movie' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="heading-3">
            <h5 class="mb-0">
              <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
                Watchlist
              </a>
            </h5>
          </div>
          <div id="collapse-3" class="collapse" data-parent="#accordion" aria-labelledby="heading-3">
            <div class="card-body">
              <div id="accordion-3-1">
                <div class="card">
                  <div class="card-header" id="heading-3-1">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3-1-1" aria-expanded="false" aria-controls="collapse-3-1-1" >
                        <button
                          className="docButton float-left">
                          GET
                        </button>
                        /apime/watchlist</a> <br /><p>Get all movies watchlist</p>

                    </h5>
                  </div>
                  <div id="collapse-3-1-1" class="collapse" data-parent="#accordion-3-1" aria-labelledby="heading-3-1">
                    <div class="card-body">
                      <p>Returns all watchlist</p>
                      <img src={image9} alt='watchlist' />
                    </div>
                  </div>
                </div>
              </div>
              <div id="accordion-3-3">
                <div class="card">
                  <div class="card-header" id="heading-3-3">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3-3" aria-expanded="false" aria-controls="collapse-3-3">
                        <button
                          className="docButton float-left">PUT</button>
                        /apime/watchlist/:movieId</a><br /> <p>Adds movie to watchlist</p>

                    </h5>
                  </div>
                  <div id="collapse-3-3" class="collapse" data-parent="#accordion-3-3" aria-labelledby="heading-3-3">
                    <div class="card-body">
                      <p>Response after movie added to watchlist</p>
                      <img src={image6} alt='watchlist' />
                    </div>
                  </div>
                </div>
              </div>
              <div id="accordion-3-4">
                <div class="card">
                  <div class="card-header" id="heading-3-4">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3-4" aria-expanded="false" aria-controls="collapse-3-4">
                        <button className="docButton float-left">
                          PUT </button> /apime/watchlist/haswatched/:movieId</a> <br /><p>Change watch status of a movie</p>

                    </h5>
                  </div>
                  <div id="collapse-3-4" class="collapse" data-parent="#accordion-3-4" aria-labelledby="heading-3-4">
                    <div class="card-body">
                      <p>Response</p>
                      <img src={image7} alt='movie' />
                    </div>
                  </div>
                </div>
              </div>
              <div id="accordion-3-5">
                <div class="card">
                  <div class="card-header" id="heading-3-5">
                    <h5 class="mb-0">
                      <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3-5" aria-expanded="false" aria-controls="collapse-3-5">
                        <button className="docButton float-left">
                          DELETE </button> /apime/watchlist/:movieId</a> <br /><p>Deletes movie from watchlist</p>


                    </h5>
                  </div>
                  <div id="collapse-3-5" class="collapse" data-parent="#accordion-3-5" aria-labelledby="heading-3-5">
                    <div class="card-body">

                      <img src={image8} alt='movie' />
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div class="accordion" id="accordion-7">
          <div class="card">
            <div class="card-header" id="heading-4">
              <h5 class="mb-0">
                <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4">
                  User
                </a>
              </h5>
            </div>
            <div id="collapse-4" class="collapse" data-parent="#accordion-7" aria-labelledby="heading-4">
              <div class="card-body">
                <div id="accordion-4-1">
                  <div class="card">
                    <div class="card-header" id="heading-4-1">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-4-1" aria-expanded="false" aria-controls="collapse-4-1" >
                          <button className="docButton float-left">
                            POST </button> /apime/user/register</a> <br /><p>Register a user</p>
                      </h5>
                    </div>
                    <div id="collapse-4-1" class="collapse" data-parent="#accordion-4-1" aria-labelledby="heading-4-1">
                      <div class="card-body">
                        <p>User object that needs to be added</p>
                        <img src={image5} alt='user' />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper >
  )
}
const Wrapper = styled.main`
        background: var(--clr-primary-00);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        h1 {
          font - size: 10rem;
  }
        h3 {
          text - transform: none;
        margin-bottom: 2rem;
        color: var(--clr-rust-1);
  }
        `

export default DocumentationPage