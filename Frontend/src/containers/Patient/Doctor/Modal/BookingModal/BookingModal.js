import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import { GrClose } from 'react-icons/gr';
import { BsFillTelephoneFill, BsCalendar3 } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import _ from 'lodash';
import { NumericFormat } from 'react-number-format';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';

import style from './BookingModal.module.scss';
import { LANGUAGES } from '~/utils';
import ProfileDoctor from '../../ProfileDoctor';
import SelectProvinceVN from '~/components/SelectProvinceVN';
import { DatePicker } from '~/components/Input';
import * as actions from '~/store/actions';
import { postPatientBookAppointment } from '~/services/patientService';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);
let getCurentDate = new Date();
getCurentDate.setHours(0, 0, 0, 0);

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            email: '',
            genders: [],
            timeType: '',
            date: '',
        };
    }
    async componentDidMount() {
        this.props.getGenderStart();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let { doctorId, date, timeType } = this.props.dataTime;
                this.setState({
                    doctorId,
                    date,
                    timeType,
                });
            }
        }
    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
                object.value = item.keyMap;
                result.push(object);
                return true;
            });
        }
        return result;
    };
    priceBookingFromChild = (dataInput) => {
        let { language } = this.props;
        let value = '';
        if (dataInput && dataInput.Doctor_infor && dataInput.Doctor_infor.priceTypeData && language === LANGUAGES.VI) {
            value = (
                <NumericFormat
                    value={dataInput.Doctor_infor.priceTypeData.valueVi}
                    displayType="text"
                    thousandSeparator={true}
                    suffix=" VND"
                />
            );
        }
        if (dataInput && dataInput.Doctor_infor && dataInput.Doctor_infor.priceTypeData && language === LANGUAGES.EN) {
            value = (
                <NumericFormat
                    value={dataInput.Doctor_infor.priceTypeData.valueEn}
                    displayType="text"
                    thousandSeparator={true}
                    suffix=" $"
                />
            );
        }
        return value;
    };
    getProvinceFromChild = (value) => {
        this.setState({
            address: value,
        });
    };
    handleOnchangeInput = (item, key) => {
        let coppyState = { ...this.state };
        coppyState[key] = item.target.value;
        this.setState({
            ...coppyState,
        });
    };
    handleChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    };
    handleSelectGender = (item) => {
        this.setState({
            selectedGender: item,
        });
    };
    checkValidateInput = () => {
        const checkArr = ['fullName', 'phoneNumber', 'birthday', 'email', 'selectedGender', 'address', 'reason'];
        let isValid = true;
        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                toast.error(`This input is required: ${checkArr[i]}`);
                isValid = false;
                break;
            }
        }
        return isValid;
    };
    handleConfirmBooking = async () => {
        let valid = this.checkValidateInput();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime.doctorData);
        console.log(doctorName);
        if (valid) {
            let res = await postPatientBookAppointment({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                reason: this.state.reason,
                date: this.state.date,
                gender: this.state.selectedGender.value,
                doctorId: this.state.doctorId,
                email: this.state.email,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString,
                doctorName: doctorName,
            });
            if (res && res.errCode === 0) {
                toast.success('Booking a new apointment succeed!');
                this.props.closeModalBooking();
            } else {
                toast.error('Booking a new apointment error!');
            }
        }
    };
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        let valueTime = '';
        if (dataTime && dataTime.date && dataTime.timeTypeData) {
            if (language === LANGUAGES.VI) {
                valueTime = dataTime.timeTypeData.valueVi + ' -- ' + moment(new Date(+dataTime.date)).format('dddd - DD / MM');
            } else {
                valueTime =
                    dataTime.timeTypeData.valueEn + ' -- ' + moment(new Date(+dataTime.date)).locale('en').format('dddd - DD/MM');
            }
        }
        return valueTime;
    };
    buildDoctorName = (dataName) => {
        let { language } = this.props;
        let valueName = '';
        if (dataName && dataName.firstName) {
            valueName =
                language === LANGUAGES.VI
                    ? `${dataName.firstName} ${dataName.lastName} `
                    : `${dataName.lastName} ${dataName.firstName} `;
        }
        return valueName;
    };
    render() {
        let { isOpenModal, closeModalBooking, dataTime } = this.props;

        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        return (
            <Modal className={cx('modal-booking-container')} isOpen={isOpenModal} size="lg">
                <div className={cx('modal-booking-content')}>
                    <div className={cx('modal-booking-header')}>
                        <span className={cx('header-booking-title')}>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className={cx('btn-booking-close')} onClick={closeModalBooking}>
                            <GrClose />
                        </span>
                    </div>
                    <div className={cx('modal-booking-body')}>
                        <div className={cx('doctor-infor')}>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                isShowPrice={true}
                                isShowBtnDetail={false}
                                dataTime={dataTime}
                                getPrice={this.priceBookingFromChild}
                            />
                            <div className={cx('form-input-patient')}>
                                <div className={cx('wrapper-radios')}>
                                    <div className={cx('form-check', 'col-3')}>
                                        <input type="radio" name="flexRadioDefault" className={cx('small')} />
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.book-yourself" />
                                        </label>
                                    </div>
                                    <div className={cx('form-check', 'col-3')}>
                                        <input type="radio" name="flexRadioDefault" />
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.book-relatives" />
                                        </label>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-5">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.name-patient" />
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <FaUser />
                                                </span>
                                            </div>
                                            <input
                                                type="email"
                                                className="form-control min-height-38"
                                                onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                            />
                                        </div>
                                        <small className="form-text text-muted">
                                            <FormattedMessage id="patient.booking-modal.sub-name" />
                                        </small>
                                    </div>
                                    <div className="col-4">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.phone" />
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <BsFillTelephoneFill />
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control min-height-38"
                                                onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.birthday" />
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <BsCalendar3 />
                                                </span>
                                            </div>
                                            <DatePicker
                                                className={cx('form-control min-height-38')}
                                                onChange={this.handleChangeDatePicker}
                                                maxDate={getCurentDate}
                                                defaulevalue={this.state.selectedDate}
                                                value={this.state.selectedDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-9">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.email" />
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <AiOutlineMail />
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control min-height-38"
                                                onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.gender" />
                                        </label>
                                        <Select
                                            value={this.state.selectedGender}
                                            options={this.state.genders}
                                            onChange={(item) => this.handleSelectGender(item)}
                                            placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                                        />
                                    </div>
                                </div>
                                <SelectProvinceVN getProvince={this.getProvinceFromChild} />

                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.reason" />
                                        </label>
                                        <textarea
                                            className="form-control min-height-38"
                                            // onChange={(event) => this.handleChangeText(event, 'description')}
                                            onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                            // value={description}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.payment" />
                                        </label>
                                        <div className={cx('wrapper-radios')}>
                                            <div className={cx('form-check', 'col-12')}>
                                                <input type="radio" name="" className={cx('small')} defaultChecked />
                                                <label>
                                                    <FormattedMessage id="patient.booking-modal.pay-medical-facility" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('expense')}>
                                    <div className={cx('expense-content')}>
                                        <span>
                                            <FormattedMessage id="patient.booking-modal.examination-price" />
                                        </span>
                                        <span>{this.priceBookingFromChild()}</span>
                                    </div>
                                    <div className={cx('expense-content')}>
                                        <span>
                                            <FormattedMessage id="patient.booking-modal.booking-fee" />
                                        </span>
                                        <span>
                                            <FormattedMessage id="patient.booking-modal.free" />
                                        </span>
                                    </div>
                                    <hr />
                                    <div className={cx('expense-content')}>
                                        <span>
                                            <FormattedMessage id="patient.booking-modal.total" />
                                        </span>
                                        <span className="color-red">300.000đ</span>
                                    </div>
                                </div>
                                <p className={cx('note')}>
                                    <FormattedMessage id="patient.booking-modal.note-1" />
                                </p>
                                <div className={cx('warning')}>
                                    <p>
                                        <b>
                                            <FormattedMessage id="patient.booking-modal.warning" />
                                        </b>
                                    </p>
                                    <p>
                                        <FormattedMessage id="patient.booking-modal.warning-1" />
                                    </p>
                                    <ul>
                                        <li>
                                            <FormattedMessage id="patient.booking-modal.warning-2" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="patient.booking-modal.warning-3" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('modal-booking-footer')}>
                        <button className={cx('btn-booking-confirm', 'btn-booking')} onClick={() => this.handleConfirmBooking()}>
                            <FormattedMessage id="patient.booking-modal.confirm" />
                        </button>
                        <button className={cx('btn-booking-cancle', 'btn-booking')} onClick={closeModalBooking}>
                            <FormattedMessage id="patient.booking-modal.cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
