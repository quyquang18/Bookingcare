import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import { FaUpload } from 'react-icons/fa';
import Select from 'react-select';
import { CommonUtils } from '~/utils';
import styles from './ManageClinic.module.scss';
import { createNewClinic, getDetailClinicById } from '~/services/ClinicService';
import { toast } from 'react-toastify';
import * as actions from '~/store/actions';
const cx = classNames.bind(styles);
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickingOn: 'desEndowMarkdow',
            name: '',
            address: '',
            desEndowHtml: '',
            desEndowMarkdow: '',
            desIntroHtml: '',
            desIntroMarkdown: '',
            desStrengthsHtml: '',
            desStrengthsMarkdown: '',
            desEquipmentHtml: '',
            desEquipmentMarkdown: '',
            desAddressHtml: '',
            desAddressMarkdown: '',
            desProcedureHtml: '',
            desProcedureMarkdown: '',
            image: '',
            previewImageUrl: '',
            isCreate: true,
            listClinic: [],
        };
    }
    async componentDidMount() {
        this.props.fetchAllClinic('simple');
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.arrClinic !== prevProps.arrClinic) {
            let dataclinic = this.buildDataInputSelect(this.props.arrClinic);
            this.setState({
                listClinic: dataclinic,
            });
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };
    handleClickTabNav = (key) => {
        this.setState({
            clickingOn: key,
        });
    };
    handleEditorChange = (params) => {
        let coppyState = { ...this.state };
        coppyState[params.key] = params.html;
        switch (params.key) {
            case 'desEndowMarkdow': {
                coppyState.desEndowHtml = params.html;
                coppyState.desEndowMarkdow = params.text;
                break;
            }
            case 'desIntroMarkdown': {
                coppyState.desIntroHtml = params.html;
                coppyState.desIntroMarkdown = params.text;
                break;
            }
            case 'desStrengthsMarkdown': {
                coppyState.desStrengthsHtml = params.html;
                coppyState.desStrengthsMarkdown = params.text;
                break;
            }
            case 'desAddressMarkdown': {
                coppyState.desAddressHtml = params.html;
                coppyState.desAddressMarkdown = params.text;
                break;
            }
            case 'desEquipmentMarkdown': {
                coppyState.desEquipmentHtml = params.html;
                coppyState.desEquipmentMarkdown = params.text;
                break;
            }
            case 'desProcedureMarkdown': {
                coppyState.desProcedureHtml = params.html;
                coppyState.desProcedureMarkdown = params.text;
                break;
            }
            default: {
                return;
            }
        }
        this.setState({
            ...coppyState,
        });
    };
    functionIntermediateEditer = (key) => {
        return ({ html, text }) => {
            const params = {
                html,
                text,
                key,
            };
            this.handleEditorChange(params);
        };
    };
    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                image: base64,
            });
        }
    };
    handleChangeInput = (event, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState,
        });
    };
    resetState = () => {
        this.setState({
            clickingOn: 'desEndowMarkdow',
            name: '',
            address: '',
            desEndowHtml: '',
            desEndowMarkdow: '',
            desIntroHtml: '',
            desIntroMarkdown: '',
            desStrengthsHtml: '',
            desStrengthsMarkdown: '',
            desEquipmentHtml: '',
            desEquipmentMarkdown: '',
            desAddressHtml: '',
            desAddressMarkdown: '',
            desProcedureHtml: '',
            desProcedureMarkdown: '',
            image: '',
            previewImageUrl: '',
        });
    };
    handleClickCkeckerCreate = () => {
        this.setState({ isCreate: true });
        this.resetState();
    };
    handleClickCkeckerEidt = () => {
        this.setState({ isCreate: false });
        this.props.fetchAllClinic('simple');
        this.resetState();
    };

    handleChangeClinic = async (item) => {
        let res = await getDetailClinicById(item.value);
        if (res && res.errCode === 0) {
            let data = res.data;
            this.setState({
                name: data.name,
                address: data.address,
                desEndowHtml: data.desEndowHtml,
                desEndowMarkdow: data.desEndowMarkdow,
                desIntroHtml: data.desIntroHtml,
                desIntroMarkdown: data.desIntroMarkdown,
                desStrengthsHtml: data.desStrengthsHtml,
                desStrengthsMarkdown: data.desStrengthsMarkdown,
                desEquipmentHtml: data.desEquipmentHtml,
                desEquipmentMarkdown: data.desEquipmentMarkdown,
                desAddressHtml: data.desAddressHtml,
                desAddressMarkdown: data.desAddressMarkdown,
                desProcedureHtml: data.desProcedureHtml,
                desProcedureMarkdown: data.desProcedureMarkdown,
                image: data.image,
                previewImageUrl: new Buffer(data.image, 'base64').toString('binary'),
            });
        }
    };

    handleCreateClinic = async () => {
        let {
            name,
            address,
            desEndowHtml,
            desEndowMarkdow,
            desIntroHtml,
            desIntroMarkdown,
            desStrengthsHtml,
            desStrengthsMarkdown,
            desEquipmentHtml,
            desEquipmentMarkdown,
            desAddressHtml,
            desAddressMarkdown,
            desProcedureHtml,
            desProcedureMarkdown,
            image,
        } = this.state;
        let res = await createNewClinic({
            name,
            address,
            desEndowHtml,
            desEndowMarkdow,
            desIntroHtml,
            desIntroMarkdown,
            desStrengthsHtml,
            desStrengthsMarkdown,
            desEquipmentHtml,
            desEquipmentMarkdown,
            desAddressHtml,
            desAddressMarkdown,
            desProcedureHtml,
            desProcedureMarkdown,
            image,
        });
        if (res && res.errCode === 0) {
            toast.success(res.message);
            this.resetState();
        } else {
            toast.error(res.message);
        }
    };

    handleSaveClinic = () => {};
    render() {
        let { clickingOn, isCreate, listClinic } = this.state;
        return (
            <div className={cx('manage-schedule-container')}>
                <div className="wrapper">
                    <div className="title pb-3">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12">
                                    <label>Tên phòng khám </label>
                                    <div className="row mt-2">
                                        <div className={cx('wrapper-input-check', 'col-5')}>
                                            <input
                                                type="radio"
                                                name="optradio"
                                                defaultChecked
                                                onClick={() => this.handleClickCkeckerCreate()}
                                            />
                                            <label>Tạo mới</label>
                                        </div>
                                        <div className={cx('wrapper-input-check', 'col-5')}>
                                            <input type="radio" name="optradio" onClick={() => this.handleClickCkeckerEidt()} />
                                            <label>Chỉnh sửa</label>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12">
                                            {isCreate ? (
                                                <input
                                                    type="text"
                                                    className="form-control min-height-38"
                                                    onChange={(event) => this.handleChangeInput(event, 'name')}
                                                    value={this.state.name}
                                                />
                                            ) : (
                                                <Select
                                                    // value={this.state.selectedDoctor}
                                                    onChange={(item) => this.handleChangeClinic(item)}
                                                    options={listClinic}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <label>Địa chỉ phòng khám</label>
                                    <input
                                        type="text"
                                        className="form-control min-height-38"
                                        onChange={(event) => this.handleChangeInput(event, 'address')}
                                        value={this.state.address}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-6 mt-4">
                            <div className="col-12">
                                <label>Ảnh phòng khám</label>
                                <div className={cx('load-image-container')}>
                                    <input id="loadImage" type="file" hidden onChange={(e) => this.handleChangeImage(e)} />
                                    <label className={cx('load-image-lable')} htmlFor="loadImage">
                                        <span>
                                            <FormattedMessage id="manage-user.upload-photos" />
                                        </span>
                                        <FaUpload />
                                    </label>
                                    <div
                                        className={cx('preview-image')}
                                        style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                        // onClick={() => this.setState({ isOpen: true })}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('nav-options')}>
                        <span
                            className={cx(clickingOn === 'desEndowMarkdow' ? 'active' : '')}
                            onClick={() => this.handleClickTabNav('desEndowMarkdow')}
                        >
                            Ưu đãi
                        </span>
                        <span
                            className={cx(clickingOn === 'desIntroMarkdown' ? 'active' : '')}
                            onClick={() => this.handleClickTabNav('desIntroMarkdown')}
                        >
                            Giới thiệu
                        </span>
                        <span
                            className={cx(clickingOn === 'desStrengthsMarkdown' ? 'active' : '')}
                            onClick={() => this.handleClickTabNav('desStrengthsMarkdown')}
                        >
                            Thế mạnh chuyên môn
                        </span>
                        <span
                            className={cx(clickingOn === 'desAddressMarkdown' ? 'active' : '')}
                            onClick={() => this.handleClickTabNav('desAddressMarkdown')}
                        >
                            Vị trí
                        </span>
                        <span
                            className={cx(clickingOn === 'desEquipmentMarkdown' ? 'active' : '')}
                            onClick={() => this.handleClickTabNav('desEquipmentMarkdown')}
                        >
                            Quy trình đi khám
                        </span>
                        <span
                            className={cx(clickingOn === 'desProcedureMarkdown' ? 'active' : '')}
                            onClick={() => this.handleClickTabNav('desProcedureMarkdown')}
                        >
                            Giá khám bệnh
                        </span>
                    </div>
                    <div className="row mt-4">
                        <div className={cx('col-12', 'md-editor')}>
                            <MdEditor
                                style={{ height: '400px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.functionIntermediateEditer(this.state.clickingOn)}
                                value={this.state[clickingOn]}
                            />
                        </div>
                    </div>
                    <div className={cx('btn-wrapper')}>
                        {isCreate ? (
                            <button className={cx('btn-save')} onClick={() => this.handleCreateClinic()}>
                                Add New Clinic
                            </button>
                        ) : (
                            <button className={cx('btn-save')} onClick={() => this.handleSaveClinic()}>
                                Save
                            </button>
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
        arrClinic: state.admin.arrClinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllClinic: (mode) => dispatch(actions.fetchAllClinic(mode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
