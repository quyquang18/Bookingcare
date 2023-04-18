import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
// import styles from './Specialty.module.scss';
import * as actions from '~/store/actions';
import images from '~/assets/images';
import { dispatch } from '~/redux';
import { LANGUAGES } from '~/utils';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
        };
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctor: this.props.topDoctors,
            });
        }
    }
    handleViewDetailDoctor = (inforDoctor) => {
        this.props.history.push(`/detail-doctor/${inforDoctor.id}`);
    };
    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            swipe: true,
        };
        let { arrDoctor } = this.state;
        return (
            <div className="section-wrapper">
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
                                {arrDoctor &&
                                    arrDoctor.length > 0 &&
                                    arrDoctor.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let valueVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                        let valueEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                                        return (
                                            <div key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className="item is-boder" key={index} style={{ width: '278px' }}>
                                                    <div className="out-bg outstanding-doctor">
                                                        <div
                                                            className="image-item "
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        ></div>
                                                    </div>
                                                    <h3 className="name-position">
                                                        {this.props.language === LANGUAGES.VI ? valueVi : valueEn}
                                                    </h3>
                                                    <h4 className="specialty-doctor">
                                                        {item.Doctor_infor && item.Doctor_infor.id && (
                                                            <span>
                                                                {this.props.language === LANGUAGES.VI
                                                                    ? item.Doctor_infor.SpecialtyData.nameVn
                                                                    : item.Doctor_infor.SpecialtyData.nameEn}
                                                            </span>
                                                        )}
                                                    </h4>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.arrTopDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = () => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
