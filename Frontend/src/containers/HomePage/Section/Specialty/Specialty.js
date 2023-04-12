import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import SliderSlick from '~/components/SliderSlick';
import { LANGUAGES } from '~/utils';
// import './CustumizeStyleSlickSlider.scss';
import * as actions from '~/store/actions';
import { dispatch } from '~/redux';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
        };
    }
    componentDidMount() {
        this.props.loadAllSpecialty();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrSpecialty !== this.props.arrSpecialty) {
            this.setState({
                arrSpecialty: this.props.arrSpecialty,
            });
        }
    }
    handleViewDetailDoctor = (inforSpecialty) => {
        this.props.history.push(`/detail-specialty/${inforSpecialty.id}`);
    };
    render() {
        console.log();
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            swipe: true,
        };
        let { arrSpecialty } = this.state;
        return (
           <div className='section-wrapper'>
           <div className="section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        <div className="slider-specialty">
                            <Slider {...settings}>
                                {arrSpecialty &&
                                    arrSpecialty.length > 0 &&
                                    arrSpecialty.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                <a href="" key={index} style={{ width: '278px' }}>
                                                    <div className="out-bg specialty">
                                                        <div
                                                            className="image-item"
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        ></div>
                                                    </div>
                                                    <h3 className="name-specialty">
                                                        <span>
                                                            {this.props.language === LANGUAGES.VI ? item.nameVn : item.nameEn}
                                                        </span>
                                                    </h3>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        arrSpecialty: state.admin.arrSpecialty,
        language: state.app.language,
    };
};

const mapDispatchToProps = () => {
    return {
        loadAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
