import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

import styles from './HomeHeader.module.scss';
import { MenuIcon, HelpIcon } from '~/components/Icons';
import Logoimg from '~/assets/images/logo.svg';
import { LANGUAGES } from '~/utils';
import { changeLanguage } from '~/store/actions';
const cx = classNames.bind(styles);
class HomeHeader extends Component {
    handleChangeLanguage = (language) => {
        this.props.setLanguage(language);
    };
    render() {
        let language = this.props.language;
        return (
            <div className={cx('header-wrapper')}>
                <div className={cx('header-content')}>
                    <div className={cx('logo-menu')}>
                        <MenuIcon />
                        <div className={cx('img-logo')} style={{ backgroundImage: `url(${Logoimg})` }}></div>
                    </div>
                    <div className={cx('header-options')}>
                        <ul>
                            <li>
                                <div className={cx('item-options')} href="/#chuyenkhoa" dl-cuaso="chuyenkhoa">
                                    <span>
                                        <FormattedMessage id="home-header.specialty" />
                                    </span>
                                    <span className={cx('sub-title-options')}>
                                        <FormattedMessage id="home-header.search-doctor" />
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('item-options')} href="/#cosoyte" dl-cuaso="cosoyte">
                                    <span>
                                        <FormattedMessage id="home-header.health-facility" />
                                    </span>
                                    <span className={cx('sub-title-options')}>
                                        <FormattedMessage id="home-header.select-room" />
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('item-options')} href="/#bacsi" dl-cuaso="bacsi">
                                    <span>
                                        <FormattedMessage id="home-header.doctor" />
                                    </span>
                                    <span className={cx('sub-title-options')}>
                                        <FormattedMessage id="home-header.select-doctor" />
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={cx('item-options')} href="/dich-vu-y-te/kham-tong-quat">
                                    <span>
                                        <FormattedMessage id="home-header.fee" />
                                    </span>
                                    <span className={cx('sub-title-options')}>
                                        <FormattedMessage id="home-header.check-health" />
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('header-help')}>
                        <div className={cx('wrapper-help')}>
                            <HelpIcon width="1.8rem" height="1.8rem" />
                            <span className={cx('text-help')}>
                                <FormattedMessage id="home-header.support" />
                            </span>
                        </div>
                        {/* <div className={cx('select-language')}>
                            <span
                                className={cx('language-vi', language === 'vi' && 'action')}
                                onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                            >
                                VI
                            </span>
                            <span
                                className={cx('language-en', language === 'en' && 'action')}
                                onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                            >
                                EN
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (language) => dispatch(changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
