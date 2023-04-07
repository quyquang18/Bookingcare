import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { verifyBookAppointment } from '~/services/patientService';
import classNames from 'classnames/bind';
import { ImSad } from 'react-icons/im';
import HomeHeader from '~/containers/HomePage/HomeHeader';
import styles from './VerifyEmail.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(styles);

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            let token = this.props.match.params.token;
            let res = await verifyBookAppointment(id, token);
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    render() {
        let { statusVerify } = this.state;
        return (
            <div>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <p className={cx('company-name')}>BookingCare</p>
                    </div>
                    <div className={cx('content')}>
                        <img className={cx('image')} src={images.anhJerry.default} alt=""></img>
                        {statusVerify ? (
                            <div className={cx('sub-content')}>
                                <h4>Bạn đã xác nhận đặt lịch khám thành công !</h4>
                                <p>Bạn vui lòng đến trước 30 phút để kiểm tra lại thông tin</p>
                                <Link to="/login">
                                    <button className={cx('btn-login')}>Ok</button>
                                </Link>
                            </div>
                        ) : (
                            <div className={cx('sub-content')}>
                                <h4>Ui, chưa xác nhận đặt lịch khám được rồi !</h4>
                                <p>Link đặt lại mật khẩu đã hết hạn. Bạn vui lòng thử lại nhé</p>
                                <ImSad className={cx('icon')} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
