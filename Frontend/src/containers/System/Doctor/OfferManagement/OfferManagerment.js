import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';

import styles from './OfferManagement.module.scss';
import * as actions from '~/store/actions';
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from '~/utils';
import { createNewPromotion } from '~/services/promotionService';
const cx = classNames.bind(styles);
class OffeManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listKeyPromotion: [],
            listPromotion: [],
            name: '',
            image: '',
            description: '',
            previewImageUrl: '',
            selectedType: '',
            currentPage: 0,
            modal: CRUD_ACTIONS.CREATE,
            idPromotion: '',
        };
    }
    async componentDidMount() {
        this.props.fetchAllKeyPromotion();
        this.props.fetchListPromotion();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let data = this.buildDataInputSelect(this.props.arrKeyPromotion);
            this.setState({
                listKeyPromotion: data,
            });
        }
        if (this.props.arrKeyPromotion !== prevProps.arrKeyPromotion) {
            let data = this.buildDataInputSelect(this.props.arrKeyPromotion);
            this.setState({
                listKeyPromotion: data,
            });
        }
        if (this.props.listPromotion !== prevProps.listPromotion) {
            // let data = this.buildDataInputSelect(this.props.listPromotion);
            this.setState({
                listPromotion: this.props.listPromotion,
            });
        }
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.keyMap;
                object.label = this.props.language === LANGUAGES.VI ? item.valueVI : item.valueEN;
                result.push(object);
            });
        }
        return result;
    };
    async handleChangeImage(event) {
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
    }
    handleChangeTypePromotion = (event) => {
        this.setState({
            selectedType: event,
        });
    };
    handleChangeInput = (event, key) => {
        let coppyState = { ...this.state };
        coppyState[key] = event.target.value;
        this.setState({
            ...coppyState,
        });
    };
    resetState = () => {
        let coppyState = { ...this.state };
        coppyState.modal = CRUD_ACTIONS.CREATE;
        coppyState.image = '';
        coppyState.previewImageUrl = '';
        coppyState.name = '';
        coppyState.idPromotion = '';
        coppyState.description = '';
        coppyState.selectedType = '';
        this.setState({
            ...coppyState,
        });
    };
    handleSavePromotion = async () => {
        let { selectedType, name, description, image, modal, idPromotion } = this.state;
        console.log(this.state);
        let res = await createNewPromotion({
            name,
            image,
            description,
            modal,
            typePromotion: selectedType.value,
            idPromotion,
        });
        if (res && res.errCode === 0) {
            toast.success('succeed');
            this.resetState();
            this.props.fetchListPromotion();
        } else {
            toast.error('failed');
        }
    };
    handleClickBtnEditPromotion = (item) => {
        let coppyState = { ...this.state };
        coppyState.modal = CRUD_ACTIONS.EDIT;
        coppyState.image = new Buffer(item.image, 'base64').toString('binary');
        coppyState.previewImageUrl = new Buffer(item.image, 'base64').toString('binary');
        coppyState.name = item.name;
        coppyState.idPromotion = item.id;
        coppyState.description = item.description;
        coppyState.selectedType = this.state.listKeyPromotion.find((item1) => item1.value === item.typePromotion);
        this.setState({
            ...coppyState,
        });
    };
    handlClickBtneDeletePromotion = (item) => {};
    renderTable = (numberElement) => {
        let { listPromotion, listKeyPromotion, currentPage } = this.state;
        let { language } = this.props;
        const endOffset = currentPage + numberElement;
        const handlePageClick = (event) => {
            const newOffset = (event.selected * numberElement) % listPromotion.length;
            this.setState({
                currentPage: newOffset,
            });
        };
        let listPromotionSlice = listPromotion.slice(currentPage, endOffset);
        console.log('render table');
        return (
            <div className={cx('users-table', 'mt-4')}>
                <table className={cx('table-user')}>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Tên khuyến mãi</th>
                            <th>Loại khuyến mãi</th>

                            <th>
                                <FormattedMessage id="manage-specialty.actions" />
                            </th>
                        </tr>
                        {listPromotionSlice.length > 0 &&
                            listPromotionSlice.map((item, index) => {
                                let labelKeyPromotion = listKeyPromotion.find((item1) => item1.value === item.typePromotion);
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{labelKeyPromotion && labelKeyPromotion.label && labelKeyPromotion.label}</td>

                                        <td>
                                            <button className={cx('btn-action')}>
                                                <HiPencilSquare
                                                    className={cx('icon-btn-edit')}
                                                    onClick={() => this.handleClickBtnEditPromotion(item)}
                                                />
                                                <MdDeleteForever
                                                    className={cx('icon-btn-delete')}
                                                    onClick={() => this.handlClickBtneDeletePromotion(item)}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={<FormattedMessage id="manage-specialty.previous" />}
                    nextLabel={<FormattedMessage id="manage-specialty.next" />}
                    breakLabel={'...'}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={numberElement}
                    pageCount={Math.ceil(listPromotion.length / numberElement)}
                    onPageChange={handlePageClick}
                    containerClassName={cx('pagination')}
                    activeClassName={cx('active')}
                />
            </div>
        );
    };
    render() {
        let { listKeyPromotion, name, description, previewImageUrl } = this.state;

        return (
            <div className={cx('manage-schedule-container')}>
                <div className="title pb-3">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className={cx('container', 'pt-2')}>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'form-group')}>
                            <label>
                                {/* <FormattedMessage id="manage-schedule.choose-doctor" /> */}
                                Tên Khuyến mãi
                            </label>
                            <input
                                type="text"
                                className="form-control min-height-38"
                                onChange={(event) => this.handleChangeInput(event, 'name')}
                                value={name}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('col-6')}>
                            <label>Loại khuyến mãi</label>
                            <Select
                                value={this.state.selectedType}
                                onChange={(event) => this.handleChangeTypePromotion(event)}
                                options={listKeyPromotion}
                            />
                        </div>
                        <div className="col-4">
                            <label>Ảnh khuyến mãi</label>
                            <div className="d-flex flex-column-reverse">
                                <input id="loadImage" type="file" hidden onChange={(e) => this.handleChangeImage(e)} />
                                <label className={cx('load-image')} htmlFor="loadImage">
                                    <span>
                                        <FormattedMessage id="manage-user.upload-photos" />
                                    </span>
                                    <FaUpload />
                                </label>
                                <div className={cx('preview-image')} style={{ backgroundImage: `url(${previewImageUrl})` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <label>Mô tả {'(để hiển thị các dòng vui lòng bắt đầu dòng bằng "-")'}</label>
                            <textarea
                                className="form-control"
                                onChange={(event) => this.handleChangeInput(event, 'description')}
                                rows="5"
                                value={description}
                            ></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">{this.renderTable(5)}</div>
                    </div>
                    <button className="btn btn-primary pt-2 mt-4" onClick={() => this.handleSavePromotion()}>
                        <FormattedMessage id="manage-schedule.save-infor" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        arrKeyPromotion: state.admin.arrKeyPromotion,
        listPromotion: state.admin.listPromotion,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllKeyPromotion: () => dispatch(actions.fetchAllKeyPromotion()),
        fetchListPromotion: () => dispatch(actions.fetchListPromotion()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffeManagement);
