import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import * as actions from '~/store/actions';
import { dispatch } from '~/redux';

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopClinic: [],
        };
    }
    componentDidMount() {
        this.props.fetchTopClinic(19);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrTopClinic !== this.props.arrTopClinic) {
            this.setState({
                arrTopClinic: this.props.arrTopClinic,
            });
        }
    }
    handleViewDetailDoctor = (inforClinic) => {
        this.props.history.push(`/detail-clinic/${inforClinic.id}`);
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
        let { arrTopClinic } = this.state;
        return (
            <div className="section-wrapper">
                <div className="section-clinic">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="homepage.outstanding-clinic" />
                            </span>
                            <button className="btn-section">
                                <FormattedMessage id="homepage.more-info" />
                            </button>
                        </div>
                        <div className="section-body">
                            <div className="slider-clinic">
                                <Slider {...settings}>
                                    {arrTopClinic &&
                                        arrTopClinic.length > 0 &&
                                        arrTopClinic.map((item, index) => {
                                            let imageBase64 = '';
                                            if (item.avatar) {
                                                imageBase64 = new Buffer(item.avatar, 'base64').toString('binary');
                                            }
                                            return (
                                                <div
                                                    className="item"
                                                    key={index}
                                                    onClick={() => this.handleViewDetailDoctor(item)}
                                                >
                                                    <div key={index} style={{ width: '278px' }}>
                                                        <div className="out-bg clinic">
                                                            <div
                                                                className="image-item"
                                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                            ></div>
                                                        </div>
                                                        <h3 className="name-clinic">
                                                            <span>{item.name}</span>
                                                        </h3>
                                                    </div>
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
        arrTopClinic: state.admin.arrTopClinic,
        language: state.app.language,
    };
};

const mapDispatchToProps = () => {
    return {
        fetchTopClinic: (mode) => dispatch(actions.fetchTopClinic(mode)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
