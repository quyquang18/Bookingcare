import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Specialty from './Specialty';
import OutStandingDoctor from './OutStandingDoctor';
import Promotion from './Promotion';
import Clinic from './Clinic';
import './CustumizeStyleSlickSlider.scss';
class Section extends Component {
    render() {
        return (
            <div className="section-wrapper">
                <Promotion sliderWidth={247.5} />
                <Specialty />
                <OutStandingDoctor />
                <Clinic />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Section);
