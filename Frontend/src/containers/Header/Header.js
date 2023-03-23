import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AiOutlineLogout } from 'react-icons/ai';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { LANGUAGES, USER_ROLE } from '~/utils';
import { changeLanguage } from '~/store/actions';
import _ from 'lodash';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    handleChangeLanguage = (language) => {
        this.props.setLanguage(language);
    };
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu,
        });
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className={cx('header-container')}>
                {/* thanh navigator */}
                <div className={cx('header-tabs-container')}>
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className={cx('select-language')}>
                    <span className={cx('welcome')}>
                        <FormattedMessage id="home-header.welcome" />
                        {userInfo && userInfo.lastName ? userInfo.lastName : ''} !
                    </span>
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
                    {/* nút logout */}
                    <div className={cx('btn', 'btn-logout')} onClick={processLogout}>
                        <AiOutlineLogout />
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        setLanguage: (language) => dispatch(changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
