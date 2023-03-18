import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FaUpload } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TableUserManager from './TableUserManager';
import * as actions from '~/store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '~/utils';
import styles from './UserRedux.module.scss';
import 'react-image-lightbox/style.css';
const cx = classNames.bind(styles);

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImageUrl: '',
            arrGender: [],
            arrPosition: [],
            arrRoleID: [],
            isOpen: false,
            avatar: '',
            //user infor
            idUser: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',

            action: CRUD_ACTIONS.CREATE,
        };
    }
    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genderFromRedux !== prevProps.genderFromRedux) {
            const arrGender = this.props.genderFromRedux;
            this.setState({
                arrGender: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
            });
        }
        if (this.props.positionFromRedux !== prevProps.positionFromRedux) {
            const arrPosition = this.props.positionFromRedux;
            this.setState({
                arrPosition: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
            });
        }
        if (this.props.roleFromRedux !== prevProps.roleFromRedux) {
            const arrRole = this.props.roleFromRedux;
            this.setState({
                arrRoleID: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
            });
        }
    }
    async handleChangeImage(event) {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                avatar: base64,
            });
        }
    }
    checkValidateInput() {
        const checkArr = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let isValid = true;
        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                isValid = false;
                console.log(i);
                alert(`This input is required: ${checkArr[i]}`);
                break;
            }
        }
        return isValid;
    }
    handleChangeInput(event, id) {
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState,
        });
    }

    async handleSaveUser() {
        let isValid = this.checkValidateInput();
        let {
            idUser,
            email,
            firstName,
            lastName,
            address,
            gender,
            password,
            phoneNumber,
            role,
            position,
            avatar,
            action,
        } = this.state;
        if (isValid) {
            if (action === CRUD_ACTIONS.CREATE) {
                await this.props.createNewUser({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    password: password,
                    phonenumber: phoneNumber,
                    gender: gender,
                    role: role,
                    position: position,
                    avatar: avatar,
                });
                if (this.props.responCreateUser.errCode === 0) {
                    const arrGender = this.props.genderFromRedux;
                    const arrPosition = this.props.positionFromRedux;
                    const arrRole = this.props.roleFromRedux;

                    let coppyState = { ...this.state };
                    coppyState.email = '';
                    coppyState.password = '';
                    coppyState.firstName = '';
                    coppyState.lastName = '';
                    coppyState.phoneNumber = '';
                    coppyState.address = '';
                    coppyState.gender = arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '';
                    coppyState.position = arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '';
                    coppyState.role = arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '';
                    this.setState({
                        ...coppyState,
                    });
                    this.props.getAllUser();
                    toast.success('Creater new user success!', {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
                if (this.props.responCreateUser.errCode !== 0) {
                    toast.error(this.props.responCreateUser.message, {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
            }
            if (action === CRUD_ACTIONS.EDIT) {
                await this.props.eidtUser({
                    id: idUser,
                    firstName: firstName,
                    lastName: lastName,
                    phonenumber: phoneNumber,
                    address: address,
                    gender: gender,
                    role: role,
                    position: position,
                    avatar: avatar,
                });
                this.props.getAllUser();
            }
        }
    }

    editUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            idUser: user.id,
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender ||'M',
            position: user.positionId ||'P1',
            role: user.roleId ||'R1',
            previewImageUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
        });
    };
    render() {
        const { language } = this.props;
        const { arrGender, arrPosition, arrRoleID } = this.state;
        const { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;
        
        return (
            <div className={cx('users-redux-container')}>
                <div className={cx('title', 'text-center')}>User Redux</div>
                <div className={cx('container')}>
                    <div>
                        <FormattedMessage id="manage-user.add" />
                    </div>
                    <div className="row mt-4">
                        <div className="group col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.email" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'email');
                                }}
                            />
                        </div>
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                value={password}
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'password');
                                }}
                            />
                        </div>
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.firstname" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'firstName');
                                }}
                            />
                        </div>
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.lastname" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'lastName');
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.phonenumber" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'phoneNumber');
                                }}
                            />
                        </div>
                        <div className="col-9">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'address');
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className=" col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select
                                className="form-control"
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'gender');
                                }}
                                value={gender || 'M'}
                            >
                                {arrGender.length > 0 &&
                                    arrGender.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className=" col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select
                                className="form-control"
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'position');
                                }}
                                value={position || 'P1'}
                            >
                                {arrPosition.length > 0 &&
                                    arrPosition.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className=" col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.role-id" />
                            </label>
                            <select
                                className="form-control"
                                onChange={(event) => {
                                    this.handleChangeInput(event, 'role');
                                }}
                                value={role || 'R1'}
                            >
                                {arrRoleID.length > 0 &&
                                    arrRoleID.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.avatar" />
                            </label>
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

                    <div className="col-12 text-center mt-4">
                        <button
                            type="submit"
                            className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary '}
                            onClick={() => this.handleSaveUser()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? (
                                <FormattedMessage id="manage-user.edit" />
                            ) : (
                                <FormattedMessage id="manage-user.save" />
                            )}
                        </button>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
                <TableUserManager handleEditUser={this.editUserFromParent} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderFromRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionFromRedux: state.admin.positions,
        isLoadingPosition: state.admin.isLoadingPosition,
        roleFromRedux: state.admin.roles,
        responCreateUser: state.admin.responCreateUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        eidtUser: (data) => dispatch(actions.eidtUser(data)),
        getAllUser: () => dispatch(actions.fechAllUser()),
        // setLanguage: (language) => dispatch(changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
