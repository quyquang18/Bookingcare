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
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            listDoctor: [],
            actions: CRUD_ACTIONS.CREATE,
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],
            selectedDoctor: null,
            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null,
            selectedSpecialty: null,
            selectedClinic: null,
            note: '',
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchRequiredDoctorInfor();
        this.props.fetchAllSpecialty();
        this.props.fetchAllClinic('simple');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let buildDataDoctor = this.buildDataInputSelect(this.props.allDoctors, INFOR_DOCTOR.NAME);
            let buildDataPrice = this.buildDataInputSelect(this.props.arrPrice, INFOR_DOCTOR.PRICE);
            let buildDataPayment = this.buildDataInputSelect(this.props.arrPayment, INFOR_DOCTOR.PAYMANET);
            let buildDataProvince = this.buildDataInputSelect(this.props.arrProvince, INFOR_DOCTOR.PROVINCE);
            let buildDataSpecialty = this.buildDataInputSelect(this.props.arrSpecialty, INFOR_DOCTOR.SPECIALTY);
            this.setState({
                listDoctor: buildDataDoctor,
                listPrice: buildDataPrice,
                listPayment: buildDataPayment,
                listProvince: buildDataProvince,
                listSpecialty: buildDataSpecialty,
                selectedDoctor: null,
                selectedPrice: null,
                selectedPayment: null,
                selectedProvince: null,
                selectedSpecialty: null,
                selectedClinic: null,
                contentMarkdown: '',
                contentHTML: '',
                description: '',
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
        if (this.props.arrSpecialty !== prevProps.arrSpecialty) {
            let buildData = this.buildDataInputSelect(this.props.arrSpecialty, INFOR_DOCTOR.SPECIALTY);
            this.setState({
                listSpecialty: buildData,
            });
        }
        if (this.props.arrClinic !== prevProps.arrClinic) {
            let buildData = this.buildDataInputSelect(this.props.arrClinic, INFOR_DOCTOR.CLINIC);
            this.setState({
                listClinic: buildData,
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
            // 'selectedClinic',
            'note',
            'description',
            'contentMarkdown',
            'contentHTML',
            'selectedSpecialty',
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
        const { selectedDoctor, selectedPrice, selectedPayment, selectedProvince, selectedSpecialty } = this.state;
        const { selectedClinic, note } = this.state;
        console.log(this.state);
        return;
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
                selectedClinic: selectedClinic.value,
                selectedSpecialty: selectedSpecialty.value,
                note: note,
            });
        }
    };
    handleChangeDoctor = async (selectedDoctor) => {
        let { listPayment, listPrice, listProvince, listClinic, listSpecialty } = this.state;
        this.setState({ selectedDoctor });
        let res = await getDetailDoctorById(selectedDoctor.value);
        if (res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentMarkdown) {
            let markdown = res.data.Markdown;
            let note = '',
                priceId = '',
                paymentId = '',
                provinceId = '',
                clinicId = '',
                specialtyId = '',
                selectedPrice = '',
                selectedPayment = '',
                selectedProvince = '',
                selectedClinic = '',
                selectedSpecialty = '';

            let doctorInfor = res.data.Doctor_infor;
            if (doctorInfor) {
                note = doctorInfor.note;

                priceId = doctorInfor.priceId;
                paymentId = doctorInfor.paymentId;
                provinceId = doctorInfor.provinceId;
                clinicId = doctorInfor.provinceId;
                specialtyId = doctorInfor.provinceId;

                selectedPrice = listPrice.find((item) => item.value === priceId);
                selectedPayment = listPayment.find((item) => item.value === paymentId);
                selectedProvince = listProvince.find((item) => item.value === provinceId);
                selectedClinic = listClinic.find((item) => item.value === clinicId);
                selectedSpecialty = listSpecialty.find((item) => item.value === specialtyId);
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                actions: CRUD_ACTIONS.EDIT,
                note,
                selectedPrice,
                selectedPayment,
                selectedProvince,
                selectedClinic,
                selectedSpecialty,
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                actions: CRUD_ACTIONS.CREATE,
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
                switch (type) {
                    case INFOR_DOCTOR.NAME: {
                        valueVI = `${item.firstName} ${item.lastName}`;
                        valueEN = `${item.lastName} ${item.firstName}`;
                        object.value = item.id;
                        break;
                    }
                    case INFOR_DOCTOR.PRICE || INFOR_DOCTOR.PAYMANET || INFOR_DOCTOR.PROVINCE: {
                        valueVI = item.valueVI;
                        valueEN = item.valueEN;
                        object.value = item.keyMap;
                        break;
                    }
                    case INFOR_DOCTOR.PAYMANET: {
                        valueVI = item.valueVI;
                        valueEN = item.valueEN;
                        object.value = item.keyMap;
                        break;
                    }
                    case INFOR_DOCTOR.PROVINCE: {
                        valueVI = item.valueVI;
                        valueEN = item.valueEN;
                        object.value = item.keyMap;
                        break;
                    }
                    case INFOR_DOCTOR.SPECIALTY: {
                        valueVI = item.nameVn;
                        valueEN = item.nameEn;
                        object.value = item.id;
                        break;
                    }
                    case INFOR_DOCTOR.CLINIC: {
                        valueVI = item.name;
                        valueEN = item.name;
                        object.value = item.id;
                        break;
                    }
                    default: {
                        return true;
                    }
                }
                object.label = this.props.language === LANGUAGES.VI ? valueVI : valueEN;
                result.push(object);
            });
        }
        return result;
    };
    render() {
        let { listDoctor, listPrice, listPayment, listProvince, actions, contentMarkdown, description, listSpecialty } =
            this.state;
        let { selectedDoctor, selectedPrice, selectedPayment, selectedProvince, selectedSpecialty } = this.state;
        let { note, listClinic, selectedClinic } = this.state;
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
                        <Select
                            value={selectedClinic}
                            onChange={(item) => this.handleChangeInforDoctorMore(item, 'selectedClinic')}
                            options={listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                        />
                    </div>
                    <div className="col-3">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.name-specialty" />
                        </label>
                        <Select
                            value={selectedSpecialty}
                            onChange={(item) => this.handleChangeInforDoctorMore(item, 'selectedSpecialty')}
                            options={listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                        />
                    </div>
                    <div className="col-6">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control min-height-38"
                            onChange={(event) => this.handleChangeText(event, 'note')}
                            value={note}
                        ></input>
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
        arrSpecialty: state.admin.arrSpecialty,
        arrClinic: state.admin.arrClinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
        fetchAllClinic: (mode) => dispatch(actions.fetchAllClinic(mode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
