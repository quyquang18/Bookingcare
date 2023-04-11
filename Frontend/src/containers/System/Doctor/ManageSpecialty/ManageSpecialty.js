import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { FaUpload } from 'react-icons/fa';
import styles from './ManageSpecialty.module.scss';
import MarkdownIt from 'markdown-it';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import { CommonUtils } from '~/utils';
import { createNewSpecialty, editInforSpecialty, getDetailSpecialtyById } from '~/services/specialtyService';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameSpecialtyVn: '',
            nameSpecialtyEn: '',
            imageSpecialty: '',
            descriptionHtmlVn: '',
            descriptionHtmlEn: '',
            descriptionMarkdownVn: '',
            descriptionMarkdownEn: '',
            previewImageUrl: '',
            isCreate: true,
            listSpecialty: [],
            currentPage: 0,
            idSpecialty: null,
        };
    }
    async componentDidMount() {
        this.props.fetchAllSpecialty();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.arrSpecialty !== prevProps.arrSpecialty) {
            this.setState({
                listSpecialty: this.props.arrSpecialty,
            });
        }
    }
    handleOnchangeInput = (event, key) => {
        let coppyState = { ...this.state };
        coppyState[key] = event.target.value;
        this.setState({
            ...coppyState,
        });
    };
    handleEditorChangeVn = ({ html, text }) => {
        this.setState({
            descriptionMarkdownVn: text,
            descriptionHtmlVn: html,
        });
    };
    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            descriptionMarkdownEn: text,
            descriptionHtmlEn: html,
        });
    };
    async handleChangeImage(event) {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                imageSpecialty: base64,
            });
        }
    }
    resetState = () => {
        let coppyState = { ...this.state };
        coppyState.nameSpecialtyVn = '';
        coppyState.nameSpecialtyEn = '';
        coppyState.imageSpecialty = '';
        coppyState.previewImageUrl = '';
        coppyState.descriptionHtmlVn = '';
        coppyState.descriptionHtmlEn = '';
        coppyState.descriptionMarkdownVn = '';
        coppyState.descriptionMarkdownEn = '';
        coppyState.isCreate = true;
        this.setState({
            ...coppyState,
        });
    };
    handleClickTabCreate = () => {
        const element = document.getElementById('header');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        this.resetState();
    };
    handleClickTabEdit = () => {
        const element = document.getElementById('edit');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        this.setState({
            isCreate: false,
        });
    };

    handleClickBtnEditSpecialty = (item) => {
        const element = document.getElementById('header');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (item && item.id) {
            let coppyState = { ...this.state };
            coppyState.idSpecialty = item.id;
            coppyState.nameSpecialtyVn = item.nameVn;
            coppyState.nameSpecialtyEn = item.nameEn;
            coppyState.descriptionMarkdownVn = item.descriptionMarkdownVn;
            coppyState.descriptionMarkdownEn = item.descriptionMarkdownEn;
            coppyState.descriptionHtmlVn = item.descriptionHtmlVn;
            coppyState.descriptionHtmlEn = item.descriptionHtmlEn;
            coppyState.imageSpecialty = this.convertImageBase64(item.image);
            coppyState.previewImageUrl = this.convertImageBase64(item.image);
            coppyState.isCreate = false;
            this.setState({
                ...coppyState,
            });
        }
    };
    handlClickBtneDeleteSpecialty = (item) => {
        console.log(item);
    };
    handleSaveSpecialty = async () => {
        let {
            nameSpecialtyVn,
            nameSpecialtyEn,
            imageSpecialty,
            descriptionHtmlVn,
            descriptionHtmlEn,
            descriptionMarkdownVn,
            descriptionMarkdownEn,
            idSpecialty,
        } = this.state;
        let res = await editInforSpecialty({
            nameSpecialtyVn,
            nameSpecialtyEn,
            imageSpecialty,
            descriptionHtmlVn,
            descriptionHtmlEn,
            descriptionMarkdownVn,
            descriptionMarkdownEn,
            idSpecialty,
        });
        if (res && res.errCode === 0) {
            toast.success('Update specialty succeed');
            this.resetState();
        } else {
            toast.error('Update specialty error');
        }
    };
    handleCreateSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succedd');
            this.resetState();
        } else {
            toast.error('Add new specialty error');
        }
    };
    convertImageBase64 = (inputImage) => {
        let imageBase64 = '';
        if (inputImage) {
            imageBase64 = new Buffer(inputImage, 'base64').toString('binary');
        }
        return imageBase64;
    };
    renderTable = () => {
        let { isCreate, listSpecialty, currentPage } = this.state;
        const endOffset = currentPage + 10;
        const handlePageClick = (event) => {
            const newOffset = (event.selected * 10) % listSpecialty.length;
            console.log(newOffset);
            this.setState({
                currentPage: newOffset,
            });
        };
        let listSpecialtySlice = listSpecialty.slice(currentPage, endOffset);
        return (
            <div id="edit" className={cx('users-table', 'mt-4')}>
                <table className={cx('table-user')}>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>name</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                        {listSpecialtySlice.length > 0 &&
                            listSpecialtySlice.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.nameVn}</td>
                                        <td>
                                            {
                                                <div
                                                    className={cx('td-image')}
                                                    style={{
                                                        backgroundImage: `url(${this.convertImageBase64(item.image)})`,
                                                    }}
                                                ></div>
                                            }
                                        </td>
                                        <td>
                                            <button className={cx('btn-action')}>
                                                <HiPencilSquare
                                                    className={cx('icon-btn-edit')}
                                                    onClick={() => this.handleClickBtnEditSpecialty(item)}
                                                />
                                                <MdDeleteForever
                                                    className={cx('icon-btn-delete')}
                                                    onClick={() => this.handlClickBtneDeleteSpecialty(item)}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    pageCount={Math.ceil(listSpecialty.length / 10)}
                    onPageChange={handlePageClick}
                    containerClassName={cx('pagination')}
                    // previousClassName={cx('btn-previous')}
                    // nextClassName={cx('btn-next')}
                    activeClassName={cx('active')}
                />
            </div>
        );
    };
    render() {
        let { nameSpecialtyVn, nameSpecialtyEn, descriptionMarkdownVn, descriptionMarkdownEn } = this.state;
        let { isCreate, listSpecialty, currentPage } = this.state;
        let listSpecialtySlice = listSpecialty.slice(currentPage, 10);
        return (
            <div id="header" className={cx('manage-specialty-container')}>
                <h2 className="title">Quản lí chuyên khoa</h2>
                <div className="container ">
                    <div className={cx('nav-options')}>
                        <span className={cx(isCreate ? 'active' : '')} onClick={() => this.handleClickTabCreate()}>
                            Tạo mới
                        </span>
                        <span className={cx(isCreate ? '' : 'active')} onClick={() => this.handleClickTabEdit()}>
                            Chỉnh sửa
                        </span>
                    </div>
                    <div className="row mt-4 ">
                        <div className="col-4">
                            <label>
                                {/* <FormattedMessage id="patient.booking-modal.phone" /> */}
                                Tên chuyên khoa Tiếng Việt
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={nameSpecialtyVn}
                                onChange={(event) => this.handleOnchangeInput(event, 'nameSpecialtyVn')}
                            />
                        </div>
                        <div className="col-4">
                            <label>
                                {/* <FormattedMessage id="patient.booking-modal.phone" /> */}
                                Tên chuyên khoa Tiếng Anh
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={nameSpecialtyEn}
                                onChange={(event) => this.handleOnchangeInput(event, 'nameSpecialtyEn')}
                            />
                        </div>
                        <div className="col-4">
                            <label>Ảnh chuyên khoa</label>
                            <div className="d-flex flex-column-reverse">
                                <input id="loadImage" type="file" hidden onChange={(e) => this.handleChangeImage(e)} />
                                <label className={cx('load-image')} htmlFor="loadImage">
                                    <span>
                                        <FormattedMessage id="manage-user.upload-photos" />
                                    </span>
                                    <FaUpload />
                                </label>
                                <div
                                    className={cx('preview-image')}
                                    style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                    onClick={() => this.setState({ isOpen: true })}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'md-editor')}>
                            <label>Mô tả chuyên khoa Tiếng Việt</label>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChangeVn}
                                value={descriptionMarkdownVn}
                            />
                        </div>
                    </div>

                    <div className={cx('row')}>
                        <div className={cx('col-12', 'md-editor')}>
                            <label>Mô tả chuyên khoa Tiếng Anh</label>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChangeEn}
                                value={descriptionMarkdownEn}
                            />
                        </div>
                    </div>
                    {this.renderTable()}
                </div>
                <div className={cx('btn-wrapper')}>
                    {isCreate ? (
                        <button className={cx('btn-save')} onClick={() => this.handleCreateSpecialty()}>
                            Add New Specialty
                        </button>
                    ) : (
                        <button className={cx('btn-save')} onClick={() => this.handleSaveSpecialty()}>
                            Save
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        arrSpecialty: state.admin.arrSpecialty,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
