import React from 'react'
import { Jumbotron } from 'reactstrap'
import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Online Book Reservation Web App</h1>
                <p className="lead">This is a simple web app used for management of books and providing it for users.</p>
                <hr className="my-2" />
                <p>Here you can reserve the book you want.</p>
                <p className="lead">New User?
                <Link to= '/register'>Sign Up</Link>
                </p>
                <p className="lead">Have account?
                <Link to= '/login'>Sign In</Link> 
                </p>
            </Jumbotron>
        </div>
    )
}
