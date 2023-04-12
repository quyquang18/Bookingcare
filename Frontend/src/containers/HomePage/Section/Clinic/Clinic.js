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
            arrClinic: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllClinic('simple');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrClinic !== this.props.arrClinic) {
            this.setState({
                arrClinic: this.props.arrClinic,
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
        let { arrClinic } = this.state;
        return (
            <div className="section-wrapper">
                <div className="section-clinic">
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
                            <div className="slider-clinic">
                                <Slider {...settings}>
                                    {arrClinic &&
                                        arrClinic.length > 0 &&
                                        arrClinic.map((item, index) => {
                                            let imageBase64 = '';
                                            if (item.image) {
                                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                            }
                                            return (
                                                <div key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                    <a href="" key={index} style={{ width: '278px' }}>
                                                        <div className="out-bg clinic">
                                                            <div
                                                                className="image-item"
                                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                            ></div>
                                                        </div>
                                                        <h3 className="name-clinic">
                                                            <span>{item.name}</span>
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
        arrClinic: state.admin.arrClinic,
        language: state.app.language,
    };
};

const mapDispatchToProps = () => {
    return {
        fetchAllClinic: (mode) => dispatch(actions.fetchAllClinic(mode)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
