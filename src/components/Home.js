import React from 'react'
import { Jumbotron } from 'reactstrap'
import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Task Manager</h1>
                <p className="lead">This is a simple web app used for allocating and managing tasks.</p>
                <hr className="my-2" />
                <p>It specifies which tasks belongs to which meber an so on.</p>
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