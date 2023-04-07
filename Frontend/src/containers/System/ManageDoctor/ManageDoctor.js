import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

import styles from './ManageDoctor.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES, CRUD_ACTIONS, INFOR_DOCTOR } from '~/utils';
import { getDetailDoctorById } from '~/services/doctorService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            listDoctor: [],
            actions: CRUD_ACTIONS.CREATE,
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null,
            nameClinic: '',
            addressClinic: '',
            note: '',
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let buildDataDoctor = this.buildDataInputSelect(this.props.allDoctors, INFOR_DOCTOR.NAME);
            let buildDataPrice = this.buildDataInputSelect(this.props.arrPrice, INFOR_DOCTOR.PRICE);
            let buildDataPayment = this.buildDataInputSelect(this.props.arrPayment, INFOR_DOCTOR.PAYMANET);
            let buildDataProvince = this.buildDataInputSelect(this.props.arrProvince, INFOR_DOCTOR.PROVINCE);
            this.setState({
                listDoctor: buildDataDoctor,
                listPrice: buildDataPrice,
                listPayment: buildDataPayment,
                listProvince: buildDataProvince,
                selectedDoctor: null,
                selectedPrice: null,
                selectedPayment: null,
                selectedProvince: null,
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
            });
        }
        if (this.props.allDoctors !== prevProps.allDoctors) {
            let buildData = this.buildDataInputSelect(this.props.allDoctors, INFOR_DOCTOR.NAME);
            this.setState({
                listDoctor: buildData,
            });
        }
        if (this.props.arrPrice !== prevProps.arrPrice) {
            let buildData = this.buildDataInputSelect(this.props.arrPrice, INFOR_DOCTOR.PRICE);
            this.setState({
                listPrice: buildData,
            });
        }
        if (this.props.arrPayment !== prevProps.arrPayment) {
            let buildData = this.buildDataInputSelect(this.props.arrPayment, INFOR_DOCTOR.PAYMANET);
            this.setState({
                listPayment: buildData,
            });
        }
        if (this.props.arrProvince !== prevProps.arrProvince) {
            let buildData = this.buildDataInputSelect(this.props.arrProvince, INFOR_DOCTOR.PROVINCE);
            this.setState({
                listProvince: buildData,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };
    checkValidateInput = () => {
        const checkArr = [
            'selectedDoctor',
            'selectedPrice',
            'selectedPayment',
            'selectedProvince',
            'nameClinic',
            'addressClinic',
            'note',
            'description',
            'contentMarkdown',
            'contentHTML',
        ];
        let isValid = true;
        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                isValid = false;
                toast.error(`This input is required: ${checkArr[i]}`);
                break;
            }
        }
        return isValid;
    };
    handleSaveContentMarkdown = () => {
        const { contentMarkdown, contentHTML, description, actions } = this.state;
        const { selectedDoctor, selectedPrice, selectedPayment, selectedProvince } = this.state;
        const { nameClinic, addressClinic, note } = this.state;

        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.saveDetailDoctor({
                contentMarkdown,
                contentHTML,
                description,
                doctorId: selectedDoctor.value,
                options: actions,
                selectedPrice: selectedPrice.value,
                selectedPayment: selectedPayment.value,
                selectedProvince: selectedProvince.value,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
            });
        }
    };
    handleChangeDoctor = async (selectedDoctor) => {
        let { listPayment, listPrice, listProvince } = this.state;
        this.setState({ selectedDoctor });
        let res = await getDetailDoctorById(selectedDoctor.value);
        if (res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentMarkdown) {
            let markdown = res.data.Markdown;
            let nameClinic = '',
                addressClinic = '',
                note = '',
                priceId = '',
                paymentId = '',
                provinceId = '',
                selectedPrice = '',
                selectedPayment = '',
                selectedProvince = '';

            let doctorInfor = res.data.Doctor_infor;
            if (doctorInfor) {
                nameClinic = doctorInfor.nameClinic;
                addressClinic = doctorInfor.addressClinic;
                note = doctorInfor.note;

                priceId = doctorInfor.priceId;
                paymentId = doctorInfor.paymentId;
                provinceId = doctorInfor.provinceId;

                selectedPrice = listPrice.find((item) => item.value === priceId);
                selectedPayment = listPayment.find((item) => item.value === paymentId);
                selectedProvince = listProvince.find((item) => item.value === provinceId);
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                actions: CRUD_ACTIONS.EDIT,
                nameClinic,
                addressClinic,
                note,
                selectedPrice,
                selectedPayment,
                selectedProvince,
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                actions: CRUD_ACTIONS.CREATE,
                nameClinic: '',
                addressClinic: '',
                note: '',
            });
        }
    };
    handleChangeText = (event, id) => {
        let stateCoppy = { ...this.state };
        stateCoppy[id] = event.target.value;
        this.setState({
            ...stateCoppy,
        });
    };
    handleChangeInforDoctorMore = (value, key) => {
        let coppyState = { ...this.state };
        coppyState[key] = value;
        this.setState({
            ...coppyState,
        });
    };
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let valueVI = '';
                let valueEN = '';
                if (type) {
                    if (type === INFOR_DOCTOR.NAME) {
                        valueVI = `${item.firstName} ${item.lastName}`;
                        valueEN = `${item.lastName} ${item.firstName}`;
                        object.value = item.id;
                    } else if (type === INFOR_DOCTOR.PRICE || type === INFOR_DOCTOR.PAYMANET || INFOR_DOCTOR.PROVINCE) {
                        valueVI = item.valueVI;
                        valueEN = item.valueEN;
                        object.value = item.keyMap;
                    }
                    object.label = this.props.language === LANGUAGES.VI ? valueVI : valueEN;
                    result.push(object);
                } else {
                    result = [];
                    console.log(`parameter "type" cannot be empty`);
                }
            });
        }
        return result;
    };
    render() {
        let { listDoctor, listPrice, listPayment, listProvince, actions, contentMarkdown, description } = this.state;
        let { selectedDoctor, selectedPrice, selectedPayment, selectedProvince } = this.state;
        let { note, nameClinic, addressClinic } = this.state;
        console.log(selectedPayment, selectedProvince);
        return (
            <div className={cx('manage-doctor-wrapper')}>
                <div className={cx('manage-doctor-title')}>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className={cx('more-info')}>
                    <div className="form-group row">
                        <div className={cx('content-left', 'col-3')}>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-doctor" />
                            </label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeDoctor}
                                options={listDoctor}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-price" />
                            </label>
                            <Select
                                value={selectedPrice}
                                onChange={(item) => this.handleChangeInforDoctorMore(item, 'selectedPrice')}
                                options={listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-payment" />
                            </label>
                            <Select
                                value={selectedPayment}
                                onChange={(item) => this.handleChangeInforDoctorMore(item, 'selectedPayment')}
                                options={listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-province" />
                            </label>
                            <Select
                                value={selectedProvince}
                                onChange={(item) => this.handleChangeInforDoctorMore(item, 'selectedProvince')}
                                options={listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.name-clinic" />
                        </label>
                        <input className="form-control" onChange={(event) => this.handleChangeText(event, 'nameClinic')} value={nameClinic}></input>
                    </div>
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.address-clinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleChangeText(event, 'addressClinic')}
                            value={addressClinic}
                        ></input>
                    </div>
                    <div className="col-6">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input className="form-control" onChange={(event) => this.handleChangeText(event, 'note')} value={note}></input>
                    </div>
                </div>
                <div className="mb-4">
                    <label>
                        <FormattedMessage id="admin.manage-doctor.intro" />
                    </label>
                    <textarea
                        className="form-control"
                        onChange={(event) => this.handleChangeText(event, 'description')}
                        value={description}
                    ></textarea>
                </div>
                <div className={cx('manage-doctor-editor')}>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={contentMarkdown}
                    />
                </div>
                <div className={cx('wrapper-btn')}>
                    <button
                        className={cx(actions === CRUD_ACTIONS.CREATE ? 'btn-create' : 'btn-edit')}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {actions === CRUD_ACTIONS.CREATE ? (
                            <FormattedMessage id="admin.manage-doctor.add" />
                        ) : (
                            <FormattedMessage id="admin.manage-doctor.save" />
                        )}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        arrPrice: state.admin.arrPrice,
        arrPayment: state.admin.arrPayment,
        arrProvince: state.admin.arrProvince,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
