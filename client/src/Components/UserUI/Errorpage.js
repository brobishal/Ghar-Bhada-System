import React from 'react'
import {NavLink} from 'react-router-dom';
const Errorpage = () => {
  return (
    <>
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>We are sorry, pagenot found!</h2>
                <p className="mb-5">
                        temporly page not found

                </p>
                
                <NavLink to="/"> Back To Homepage</NavLink>
            </div> 

        </div>
    </>
  )
}

export default Errorpage
