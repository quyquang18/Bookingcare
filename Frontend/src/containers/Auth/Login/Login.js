import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import classNames from 'classnames/bind';
import * as actions from '../../../store/actions';
import { KeyCodeUtils, LanguageUtils } from '../../../utils';
import { BsFacebook, BsGoogle, BsTwitter, BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';
// import userIcon from '~/assets/images/user.svg';
// import passIcon from '~/assets/images/pass.svg';
import styles from './Login.module.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '~/services/userService';

const cx = classNames.bind(styles);
class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
    }

    initialState = {
        username: '',
        password: '',
        loginError: '',
        errMessage: '',
        isShowPassword: false,
    };

    state = {
        ...this.initialState,
    };

    refresh = () => {
        this.setState({
            ...this.initialState,
        });
    };

    onUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    redirectToSystemPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/system/user-manage';
        navigate(`${redirectPath}`);
    };

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            event.preventDefault();
            if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
            this.btnLogin.current.click();
        }
    };
    handleLogin = async () => {
        const { userLoginSuccess, userLoginFail } = this.props;
        this.setState({
            errMessage: '',
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                userLoginSuccess(data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };
    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    };
    render() {
        const { username, password, errMessage } = this.state;
        const { lang } = this.props;
        return (
            <div className={cx('login-wrapper')}>
                <div className={cx('login-container')}>
                    <div className={cx('form_login')}>
                        <div className={cx('col-12 text-center', 'header-login-title')}>Login</div>
                        <div className="col-12 form-group mt-4">
                            <label className={cx('label-input')}>Username:</label>
                            <input
                                className={cx('form-control', 'login-input')}
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(event) => this.onUsernameChange(event)}
                            ></input>
                        </div>
                        <div className="col-12 form-group mt-4">
                            <label className={cx('label-input')}>Password:</label>
                            <div className="position-relative">
                                <input
                                    className={cx('form-control', 'login-input')}
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => this.onPasswordChange(event)}
                                    onKeyDown={(event) => {
                                        this.handleKeyDown(event);
                                    }}
                                ></input>
                                <span className={cx('hide-show-icon')} onClick={this.handleShowHidePassword}>
                                    {this.state.isShowPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className={cx('login-error')}>{errMessage}</span>
                        </div>
                        <div className="col-12 text-center">
                            <button className={cx('btn-login')} onClick={this.handleLogin}>
                                login
                            </button>
                        </div>
                        <div className="col-12 mt-3 mb-3">
                            <span className={cx('forgot-password')}>Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className={cx('title-login-social')}>Or login with: </span>
                            <div className={cx('col-12', 'social-login')}>
                                <BsFacebook className={cx('icon-social', 'facebook-icon')} />
                                <BsGoogle className={cx('icon-social', 'google-icon')} />
                                <BsTwitter className={cx('icon-social', 'twitter-icon')} />
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
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
