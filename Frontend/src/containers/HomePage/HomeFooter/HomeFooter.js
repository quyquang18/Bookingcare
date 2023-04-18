import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { ImLocation2 } from 'react-icons/im';
import { MdDone } from 'react-icons/md';
import Logoimg from '~/assets/images/logo.svg';
import Certify from '~/assets/images/bo-cong-thuong.svg';
import styles from './HomeFooter.module.scss';

const cx = classNames.bind(styles);

class HomeFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    render() {
        return (
            <div className={cx('home-footer-container')}>
                <div className="wrapper">
                    <div className="row">
                        <div className="col-6">
                            <div className={cx('img-logo')} style={{ backgroundImage: `url(${Logoimg})` }}></div>
                            <div className={cx('infor-company')}>
                                <h3 className={cx('name-company')}>Công ty Cổ phần Công nghệ BookingCare</h3>
                                <p>
                                    <span>
                                        <ImLocation2 />
                                    </span>
                                    Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội,
                                    Việt Nam
                                </p>
                                <p>
                                    <span>
                                        <MdDone />
                                    </span>
                                    ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                                </p>
                            </div>
                            <div className={cx('img-certify')} style={{ backgroundImage: `url(${Certify})` }}></div>
                        </div>
                        <div className="col-3">
                            <div className={cx('list-contact')}>
                                <ul>
                                    <li>Liên hệ hợp tác</li>
                                    <li>Sức khỏe doanh nghiệp</li>
                                    <li>Gói chuyển đổi số doanh nghiệp</li>
                                    <li>Tuyển dụng</li>
                                    <li>Câu hỏi thường gặp</li>
                                    <li>Điều khoản sử dụng</li>
                                    <li>Chính sách Bảo mật</li>
                                    <li>Quy trình hỗ trợ giải quyết khiếu nại</li>
                                    <li>Quy chế hoạt động</li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('headquarters', 'col-3')}>
                            <span>
                                <p>
                                    <strong>Trụ sở tại Hà Nội</strong>
                                    <br />
                                    Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội,
                                    Việt Nam
                                </p>
                            </span>
                            <span>
                                <p>
                                    <strong>Văn phòng tại TP Hồ Chí Minh</strong>
                                    <br />
                                    Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                                </p>
                            </span>
                            <span>
                                <p>
                                    <strong>Hỗ trợ khách hàng</strong>
                                    <br />
                                    support@bookingcare.vn (7h30 - 18h)
                                </p>
                            </span>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
