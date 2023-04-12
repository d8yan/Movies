import React from 'react'
import { FaHome, FaUser,FaVoteYea} from "react-icons/fa"
import { GoDeviceCameraVideo, GoBook } from "react-icons/go";

import { BiLogIn } from "react-icons/bi";



export const links = [
    {
        id: 1,
        url: '/client/',
        text: 'Home',
        icon: <FaHome />
    },
    {
        id: 2,
        url: '/client/movies',
        text: 'Movies',
        icon: <GoDeviceCameraVideo />
    },
    {
        id: 3,
        url: '',
        text: 'Documentation',
        icon: <GoBook />
    },
    {
        id: 4,
        url: '/client/watchlist',
        text: 'WatchList',
        icon: <FaVoteYea />
    },
    {
        id: 5,
        url: '/client/login',
        text: 'Login',
        icon: <BiLogIn />
    },
    {
        id: 6,
        url: '/client/Register',
        text: 'Register',
        icon: <FaUser />
    }


]

export const movies_url = 'http://localhost:3500/apime/movies'
export const single_movie_url = 'http://localhost:3500/apime/movies/:id'
