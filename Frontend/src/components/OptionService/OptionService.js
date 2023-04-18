import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

import styles from './OptionService.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
class HomeSlider extends Component {
    render() {
        return (
            <div className={cx('options-sevices-wrapper')}>
                <ul>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.clinicImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title1" />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.remoteExaminationImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title2" />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.generalExaminationImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title3" />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.testingServiceImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title4" />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.mentalHealthmage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title5" />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.dentistryImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title6" />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.surgeryImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title7" />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.homeExaminationImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title8" />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className={cx('item-options')}>
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.businessHealthImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title9" />
                            </p>
                        </div>
                    </li>
                </ul>
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
