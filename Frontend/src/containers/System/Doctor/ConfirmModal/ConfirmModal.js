import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ConfirmModal.module.scss';
import { emitter } from '~/utils/emitter';
import { CommonUtils } from '~/utils';
import moment from 'moment';
const cx = classNames.bind(styles);
class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteToPatient: '',
            messError: '',
            imageBase64: '',
        };
    }
    componentDidMount() {}

    toggle = () => {
        this.props.toggleConfirmModal();
    };

    handleConfirm = () => {
        if (this.state.noteToPatient && this.state.noteToPatient.length > 0) {
            this.props.handleConfirm(this.state.noteToPatient);
            this.setState({
                noteToPatient: '',
                messError: '',
            });
            this.toggle();
        } else {
            this.setState({
                messError: 'Please enter notes sent to the patient !',
            });
        }
    };
    handleSendRemedy = () => {
        if (this.state.imageBase64) {
            this.props.handleSendRemedy(this.state.imageBase64);
            this.setState({
                imageBase64: '',
            });
            this.toggle();
        } else {
            this.setState({
                messError: 'Please select the invoice to send to the patient!',
            });
        }
    };
    getAge = (dateTimeInput) => {
        let age = '';
        if (dateTimeInput) {
            let dateOfBirth = new Date(+dateTimeInput).getTime();
            let today = new Date().getTime();
            let diffInMilliseconds = today - dateOfBirth;
            let diffInDays = diffInMilliseconds / (1000 * 3600 * 24);
            let diffInMonths = diffInDays / 30;
            let diffInWeeks = diffInDays / 7;
            if (diffInMonths >= 12) {
                age = Math.floor(diffInMonths / 12) + ' tuổi';
            } else if (diffInMonths >= 1) {
                age = Math.floor(diffInMonths) + ' tháng';
            } else if (diffInWeeks >= 1) {
                age = Math.floor(diffInWeeks) + ' tuần';
            } else {
                age = Math.floor(diffInDays) + ' ngày';
            }
        }
        return age;
    };
    handleChangeTextarea = (event) => {
        this.setState({
            noteToPatient: event.target.value,
        });
    };
    handleChangeImage = async (event, key) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };
    renderContentConfirm = () => {
        return (
            <div className="row">
                <div className="col-12">
                    <div className={cx('form-group')}>
                        <label className={cx('lable-input')}>Ghi chú đến bệnh nhân :</label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={this.state.noteToPatient}
                            onChange={(event) => this.handleChangeTextarea(event)}
                        />
                    </div>
                </div>
            </div>
        );
    };
    renderContentRefuse = () => {
        return (
            <div className="row">
                <div className="col-12">
                    <div className={cx('form-group')}>
                        <label className={cx('lable-input')}>Lí do từ chối:</label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={this.state.noteToPatient}
                            onChange={(event) => this.handleChangeTextarea(event)}
                        />
                    </div>
                </div>
            </div>
        );
    };
    renderContentExport = () => {
        return (
            <div className="row">
                <div className="col-12">
                    <div className={cx('form-group')}>
                        <label className={cx('lable-input')}>Ảnh hóa đơn:</label>
                        <input type="file" className="form-control" onChange={(event) => this.handleChangeImage(event)} />
                    </div>
                </div>
            </div>
        );
    };
    render() {
        let { dataModal } = this.props;
        let formatedDate = moment(+dataModal.date).format('dddd -- DD-MM-YYYY');
        let formatedAge = this.getAge(dataModal.birthday);
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="xl">
                <ModalHeader toggle={() => this.toggle()} className="px-2">
                    Xác nhận đặt lịch
                </ModalHeader>
                <ModalBody>
                    <div className={cx('modal-wrapper')}>
                        <div>
                            <h4>Thông tin bệnh nhân</h4>
                            <form>
                                <div className="row">
                                    <div className="col-3">
                                        <div className={cx('form-group')}>
                                            <label className={cx('lable-input')}>Email:</label>
                                            <input type="text" className="form-control" disabled={true} value={dataModal.email} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className={cx('form-group')}>
                                            <label className={cx('lable-input')}>Name:</label>
                                            <input type="text" className="form-control" disabled value={dataModal.name} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className={cx('form-group')}>
                                            <label className={cx('lable-input')}>Phone Number:</label>
                                            <input type="text" className="form-control" disabled value={dataModal.phoneNumber} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className={cx('form-group')}>
                                            <label className={cx('lable-input')}>Giới tính:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                disabled={true}
                                                value={dataModal.gender}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <div className={cx('form-group')}>
                                            <label className={cx('lable-input')}>Tuổi:</label>
                                            <input type="text" className="form-control" disabled value={formatedAge} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className={cx('form-group')}>
                                            <label className={cx('lable-input')}>Ngày đặt lịch khám:</label>
                                            <input type="text" className="form-control" disabled value={formatedDate} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className={cx('form-group')}>
                                            <label className={cx('lable-input')}>Thời gian khám:</label>
                                            <input type="text" className="form-control" disabled value={dataModal.timeType} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className={cx('form-group')}>
                                            <label className={cx('lable-input')}>Lí do khám:</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                disabled={true}
                                                value={dataModal.reason || ''}
                                                rows="1"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {dataModal.actions === 'Confirm' && this.renderContentConfirm()}
                                {dataModal.actions === 'Refuse' && this.renderContentRefuse()}
                                {dataModal.actions === 'Export' && this.renderContentExport()}
                            </form>
                        </div>
                        <p style={{ color: 'red', textAlign: 'center', fontStyle: 'italic' }}>{this.state.messError}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {dataModal.actions === 'Export' ? (
                        <Button className="px-3" color="primary" onClick={() => this.handleSendRemedy()}>
                            Send
                        </Button>
                    ) : (
                        <Button className="px-3" color="primary" onClick={() => this.handleConfirm()}>
                            Oke
                        </Button>
                    )}

                    <Button className="px-3" color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
