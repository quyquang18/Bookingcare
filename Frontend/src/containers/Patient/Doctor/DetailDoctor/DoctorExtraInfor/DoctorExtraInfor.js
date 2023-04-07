import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { AiFillLike, AiFillCalendar } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { getExtraInforDoctorById } from '~/services/userService';
import styles from './DoctorExtraInfor.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils';

const cx = classNames.bind(styles);
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowExtraPrice: false,
            extraInfor: {},
        };
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            // let allDays = this.getArrDays(this.props.language);
            // this.setState({
            //     allDays,
            // });
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getExtraInforDoctorById(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }
    handleShowHideExtraPrice = (isShowExtraPrice) => {
        this.setState({
            isShowExtraPrice,
        });
    };
    render() {
        let { isShowExtraPrice, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className={cx('doctor-extra-infor-container')}>
                <div className={cx('infor-address')}>
                    <h3 className={cx('title-infor')}>
                        <FormattedMessage id={'patient.extra-info-doctor.address-clinic'} />
                    </h3>
                    <div className={cx('name-clinic')}>{extraInfor.nameClinic || ''}</div>
                    <div className={cx('address-clinic')}>{extraInfor.addressClinic}</div>
                </div>
                <div className={cx('infor-price')}>
                    <h3 className={cx('title-infor')}>
                        <FormattedMessage id={'patient.extra-info-doctor.price'} />
                    </h3>
                    {!isShowExtraPrice && (
                        <div className={cx('content-hide')}>
                            <span>
                                {extraInfor.priceTypeData && language === LANGUAGES.VI && (
                                    <NumericFormat value={extraInfor.priceTypeData.valueVi} displayType="text" thousandSeparator={true} />
                                )}
                                {extraInfor.priceTypeData && language === LANGUAGES.EN && (
                                    <NumericFormat value={extraInfor.priceTypeData.valueEn} displayType="text" thousandSeparator={true} />
                                )}
                                <sup>{language === LANGUAGES.VI ? 'đ' : '$'}</sup>
                            </span>
                            <span className={cx('btn-show-hide')} onClick={() => this.handleShowHideExtraPrice(true)}>
                                <FormattedMessage id={'patient.extra-info-doctor.more-infor'} />
                            </span>
                        </div>
                    )}
                    {isShowExtraPrice && (
                        <>
                            <div className={cx('content-show')}>
                                <table>
                                    <thead>
                                        <tr></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="mb-1">
                                                    <FormattedMessage id={'patient.extra-info-doctor.price'} />
                                                </p>
                                                <small>
                                                    <FormattedMessage id={'patient.extra-info-doctor.note'} /> : {extraInfor && extraInfor.note}
                                                </small>
                                            </td>
                                            <td>
                                                {extraInfor.priceTypeData && language === LANGUAGES.VI && (
                                                    <NumericFormat
                                                        value={extraInfor.priceTypeData.valueVi}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                    />
                                                )}
                                                {extraInfor.priceTypeData && language === LANGUAGES.EN && (
                                                    <NumericFormat
                                                        value={extraInfor.priceTypeData.valueEn}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                    />
                                                )}
                                                <sup>{language === LANGUAGES.VI ? 'đ' : '$'}</sup>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="2">
                                                <FormattedMessage id={'patient.extra-info-doctor.text-payment'} />
                                                {extraInfor.paymentTypeData && language === LANGUAGES.VI
                                                    ? extraInfor.paymentTypeData.valueVi
                                                    : extraInfor.paymentTypeData.valueEn}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <span className={cx('btn-show-hide')} onClick={() => this.handleShowHideExtraPrice(false)}>
                                <FormattedMessage id={'patient.extra-info-doctor.hide-price'} />
                            </span>
                        </>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
