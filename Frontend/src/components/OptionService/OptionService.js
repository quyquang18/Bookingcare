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
                        <a href="/#chuyenkhoa">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.clinicImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title1" />
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/#khamtuxa" dl-cuaso="khamtuxa">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.remoteExaminationImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title2" />
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/dich-vu-y-te/kham-tong-quat">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.generalExaminationImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title3" />
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/dich-vu-y-te/xet-nghiem-y-hoc">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.testingServiceImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title4" />
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/#khamtinhthan" dl-cuaso="khamtinhthan">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.mentalHealthmage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title5" />
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/nha-khoa-s33">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.dentistryImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title6" />
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/#goiphauthuat" dl-cuaso="goiphauthuat">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.surgeryImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title7" />
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/san-pham-y-te-svis9">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.homeExaminationImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title8" />
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="/suc-khoe-doanh-nghiep-sv10">
                            <div
                                className={cx('option-seriver')}
                                style={{ backgroundImage: `url(${images.businessHealthImage.default})` }}
                                data-src="https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg"
                            ></div>
                            <p>
                                <FormattedMessage id="home-options-service.title9" />
                            </p>
                        </a>
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
