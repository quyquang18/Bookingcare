import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

import { DatePicker } from '~/components/Input';
import styles from './ManagePatient.module.scss';
import { doctorConfirmSchedule, getListPatientForDoctor } from '~/services/doctorService';
import _ from 'lodash';
import moment from 'moment';
import { LANGUAGES } from '~/utils';
import ConfirmModal from '../ConfirmModal';
import { toast } from 'react-toastify';
import { changeStatusReactLoading } from '~/store/actions';
const cx = classNames.bind(styles);

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenConfirmModal: false,
            dataModal: {},
        };
    }
    componentDidMount() {
        let { selectedDate } = this.state;
        let doctorId;
        let { user } = this.props;
        if (user && !_.isEmpty(user)) {
            doctorId = this.props.user.id;
        }
        let fomatedDate = new Date(selectedDate).getTime();
        this.getDataPatient(doctorId, fomatedDate);
    }
    getDataPatient = async (doctorId, fomatedDate) => {
        let res = await getListPatientForDoctor(doctorId, fomatedDate);
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user !== prevProps.user) {
            let { selectedDate } = this.state;
            let doctorId;
            let { user } = this.props;
            if (user && !_.isEmpty(user)) {
                doctorId = this.props.user.id;
            }
            let fomatedDate = new Date(selectedDate).getTime();
            this.getDataPatient(doctorId, fomatedDate);
        }
    }

    handleChangeDatePicker = (date) => {
        this.setState(
            {
                selectedDate: date[0],
            },
            () => {
                let { selectedDate } = this.state;
                let doctorId;
                let { user } = this.props;
                if (user && !_.isEmpty(user)) {
                    doctorId = this.props.user.id;
                }
                let fomatedDate = new Date(selectedDate).getTime();
                this.getDataPatient(doctorId, fomatedDate);
            },
        );
    };
    handleBtnConfirm = (item, actions) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            phoneNumber: item.patientData.phoneNumber,
            name: item.patientData.firstName,
            gender: item.patientData.genderData.valueVi,
            date: item.date,
            reason: item.reason,
            birthday: item.birthday,
            timeType: item.timeTypeDataPatient.valueVi,
            actions,
        };
        this.setState({
            isOpenConfirmModal: true,
            dataModal: data,
        });
    };
    toggleConfirmModal = () => {
        this.setState({
            isOpenConfirmModal: false,
        });
    };
    handleConfirmSchedule = async (noteToPatient) => {
        this.props.setStatusLoading(true);
        let dataMore = this.state.dataPatient[0];
        let dataSend = this.state.dataModal;
        dataSend.noteToPatient = noteToPatient;
        dataSend.doctorName = dataMore.User.firstName + ' ' + dataMore.User.LastName;
        dataSend.address = dataMore.patientData.address;
        let res = await doctorConfirmSchedule(dataSend);
        if (res && res.errCode === 0) {
            this.props.setStatusLoading(false);
            toast.success('Confirm Scheduel Succeed !');
        } else {
            this.props.setStatusLoading(false);
            toast.error('Confirm Scheduel Error !');
        }
    };
    handleSendRemedy = async (imageBase64) => {
        let dataSend = this.state.dataModal;
        dataSend.imageBase64 = imageBase64;
        this.props.setStatusLoading(true);
        let res = await doctorConfirmSchedule(dataSend);
        if (res && res.errCode === 0) {
            this.props.setStatusLoading(false);
            toast.success('Confirm Scheduel Succeed !');
        } else {
            this.props.setStatusLoading(false);
            toast.error('Confirm Scheduel Error !');
        }
    };
    render() {
        let { dataModal, dataPatient } = this.state;
        let language = this.props.language;
        return (
            <>
                <ConfirmModal
                    isOpen={this.state.isOpenConfirmModal}
                    dataModal={dataModal}
                    toggleConfirmModal={this.toggleConfirmModal}
                    handleConfirm={this.handleConfirmSchedule}
                    handleSendRemedy={this.handleSendRemedy}
                />
                <div className={cx('manage-patient-container')}>
                    <div className="wrapper">
                        <div className="title pb-3">
                            <FormattedMessage id="manage-patient.title" />
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('col-4', 'form-group')}>
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker
                                    className={cx('form-control')}
                                    onChange={this.handleChangeDatePicker}
                                    // minDate={getCurentDate}
                                    defaulevalue={this.state.selectedDate}
                                    value={this.state.selectedDate}
                                />
                            </div>
                        </div>
                        <div className={cx('users-table', 'mt-4 ')}>
                            <table className={cx('table-user')}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ tên</th>
                                        <th>Số điện thoại</th>
                                        <th>Trạng thái</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ? (
                                        dataPatient.map((item, index) => {
                                            let time =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeDataPatient.valueVi
                                                    : item.timeTypeDataPatient.valueEn;
                                            let gender =
                                                language === LANGUAGES.VI
                                                    ? item.patientData.genderData.valueVi
                                                    : item.patientData.genderData.valueEn;
                                            let status =
                                                language === LANGUAGES.VI ? item.statusData.valueVi : item.patientData.valueEn;
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName || ''}</td>
                                                    <td>{item.patientData.phoneNumber}</td>
                                                    <td>{status}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        {item.statusId === 'S2' && (
                                                            <div className={cx('btn-action-wrapper')}>
                                                                <button
                                                                    className={cx('btn-action', 'btn-confirm')}
                                                                    onClick={() => this.handleBtnConfirm(item, 'Confirm')}
                                                                >
                                                                    Xác nhận
                                                                </button>
                                                                <button
                                                                    className={cx('btn-action', 'btn-refuse')}
                                                                    onClick={() => this.handleBtnConfirm(item, 'Refuse')}
                                                                >
                                                                    Từ chối
                                                                </button>
                                                            </div>
                                                        )}
                                                        {item.statusId === 'S3' && (
                                                            <div className={cx('btn-action-wrapper')}>
                                                                <button
                                                                    className={cx('btn-action', 'btn-confirm')}
                                                                    onClick={() => this.handleBtnConfirm(item, 'Confirm')}
                                                                >
                                                                    Xác nhận đã khám
                                                                </button>
                                                            </div>
                                                        )}
                                                        {item.statusId === 'S4' && (
                                                            <div className={cx('btn-action-wrapper')}>
                                                                <button
                                                                    className={cx('btn-action', 'btn-confirm')}
                                                                    onClick={() => this.handleBtnConfirm(item, 'Export')}
                                                                >
                                                                    Gửi hóa đơn cho bệnh nhân
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="8">No data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStatusLoading: (status) => dispatch(changeStatusReactLoading(status)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
