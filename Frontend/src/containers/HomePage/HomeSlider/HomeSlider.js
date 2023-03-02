import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './HomeSlider.module.scss';
import { FormattedMessage } from 'react-intl';

import images from '~/assets/images';
import { SearchIcon } from '~/components/Icons';
import AppStoreSVG from '~/assets/images/app-store-badge-black.svg';
import CHPlaySVG from '~/assets/images/google-play-badge.svg';
import OptionService from '~/components/OptionService';
const cx = classNames.bind(styles);
class HomeSlider extends Component {
    render() {
        return (
            <div className={cx('slider-wrapper')}>
                <div
                    className={cx('background-slider')}
                    style={{ backgroundImage: `url(${images.backgroundHome.default})` }}
                >
                    <div className={cx('container-search')}>
                        <div className={cx('wrapper-search')}>
                            <div className={cx('wrapper-title')}>
                                <h1 className={cx('slider-title')}>
                                    <FormattedMessage id="home-slider.title" /> <br />
                                    <b>
                                        <FormattedMessage id="home-slider.sub-title" />
                                    </b>
                                </h1>
                                <div className={cx('search-form')} id="search_form">
                                    <div className={cx('search-wrapper')}>
                                        <SearchIcon className={cx('search-icon')} />
                                        <FormattedMessage id="home-slider.placehoder-search">
                                            {(msg) => (
                                                <input className={cx('input-search')} type="search" placeholder={msg} />
                                            )}
                                        </FormattedMessage>
                                    </div>
                                    {/* <div id="timkiem_chung_ketqua" class="timkiem-ketqua">
                                        <h3>Chuyên khoa</h3>
                                        <a href="/dich-vu-y-te/xet-nghiem-y-hoc/chuyen-khoa/tong-quat">
                                            <h4>Tổng quát</h4>
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                            <div className={cx('download-app')}>
                                <a href="https://bookingcare.vn/app/android">
                                    <img
                                        alt="Tải ứng dụng BookingCare trên Android"
                                        width="108"
                                        height="32"
                                        src={CHPlaySVG}
                                    />
                                </a>
                                <a href="https://bookingcare.vn/app/ios">
                                    <img
                                        alt="Tải ứng dụng BookingCare trên iOS"
                                        width="108"
                                        height="32"
                                        src={AppStoreSVG}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('container-options')}>
                        <OptionService />
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider);
