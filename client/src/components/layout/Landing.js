import React from 'react'
//import { /*Link*/, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = (proptypes) => {
    // if (proptypes.isAuthenticated) {
    //     return <Redirect to='/' />; //!dashboard redirect
    // }
    return (
        <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
                <h1 className="title">
                    Find cool gifts,
                </h1>
                <h2 className="subtitle">
                    mofuckers!
                </h2>
            </div>
        </div>                        
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, {})(Landing);
