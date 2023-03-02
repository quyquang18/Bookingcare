import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeSlider from './HomeSlider';
import Section from './Section';
import { Fragment } from 'react';
class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <HomeHeader />
                <HomeSlider />
                <Section />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
