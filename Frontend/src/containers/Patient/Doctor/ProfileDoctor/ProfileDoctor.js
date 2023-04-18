import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import localization from 'moment/locale/vi';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { getProfileDoctorById } from '~/services/doctorService';
import style from './ProfileDoctor.module.scss';
import { LANGUAGES } from '~/utils';

const cx = classNames.bind(style);

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        if (this.props.getPrice) {
            this.props.getPrice(this.state.dataProfile);
        }
        this.setState({
            dataProfile: data,
        });
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            } else {
                result = {};
            }
        }
        return result;
    };
    renderTimeBooking = () => {
        let { language, dataTime } = this.props;
        let valueTime = '';
        if (dataTime && dataTime.date && dataTime.timeTypeData) {
            if (language === LANGUAGES.VI) {
                valueTime = dataTime.timeTypeData.valueVi + ' -- ' + moment(new Date(+dataTime.date)).format('dddd - DD / MM');
            } else {
                valueTime =
                    dataTime.timeTypeData.valueEn + ' -- ' + moment(new Date(+dataTime.date)).locale('en').format('dddd - DD/MM');
            }
        }
        return (
            <span>
                <p>{valueTime}</p>
                <p>{<FormattedMessage id="patient.booking-modal.free-schedule" />}</p>
            </span>
        );
    };
    renderPriceBooking = () => {
        let { dataProfile } = this.state;
        let { language } = this.props;
        let value = '';
        if (dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceTypeData && language === LANGUAGES.VI) {
            value = (
                <NumericFormat
                    value={dataProfile.Doctor_infor.priceTypeData.valueVi}
                    displayType="text"
                    thousandSeparator={true}
                    suffix=" VND"
                />
            );
        }
        if (dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceTypeData && language === LANGUAGES.EN) {
            value = (
                <NumericFormat
                    value={dataProfile.Doctor_infor.priceTypeData.valueEn}
                    displayType="text"
                    thousandSeparator={true}
                    suffix=" $"
                />
            );
        }
        return value;
    };
    render() {
        let { dataProfile } = this.state;

        let { language, isShowDescriptionDoctor, isShowPrice, isShowBtnDetail } = this.props;
        let urlImgage = '';
        if (dataProfile && !_.isEmpty(dataProfile) && dataProfile.image) {
            urlImgage = dataProfile.image;
        }
        let nameVi = '';
        let nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        return (
            <div className={cx('intro-doctor')}>
                <div className={cx('content-up')}>
                    <div className={cx('image-doctor')} style={{ backgroundImage: `url(${urlImgage})` }}></div>
                    <div className={cx('description-doctor')}>
                        <h1 className={cx('name-doctor')}>{language === LANGUAGES.VI ? nameVi : nameEn}</h1>
                        <div className={cx('summary-doctor')}>
                            {isShowDescriptionDoctor &&
                                dataProfile &&
                                dataProfile.Markdown &&
                                dataProfile.Markdown.description && <pre>{dataProfile.Markdown.description}</pre>}
                        </div>
                        <span className={cx('schedule-time')}>{this.renderTimeBooking()}</span>
                    </div>
                </div>
                <div className={cx('content-dow')}>
                    <span className={cx('show-price')}>{isShowPrice && <p>Giá khám: {this.renderPriceBooking()}</p>}</span>
                    <span className={cx('btn-detail')}>
                        {isShowBtnDetail && <Link to={`/detail-doctor/${this.props.doctorId}`}>Xem thêm</Link>}
                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
