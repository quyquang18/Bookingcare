import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
// import styles from './Specialty.module.scss';
// import 'slick-carousel/slick/slick.css';
import SliderSlick from '~/components/SliderSlick';
import images from '~/assets/images';
import './CustumizeStyleSlickSlider.scss';
// import 'slick-carousel/slick/slick-theme.css';
// const cx = classNames.bind(styles);

class Specialty extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            swipe: true,
        };
        return (
            <div className='section-specialty'>
                
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
