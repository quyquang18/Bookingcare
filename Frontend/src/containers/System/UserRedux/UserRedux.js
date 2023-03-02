import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FaUpload } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';

import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils';
import { getAllCodeService } from '~/services/userService';
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
        };
    }
    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genderFromRedux !== prevProps.genderFromRedux) {
            this.setState({
                arrGender: this.props.genderFromRedux,
            });
        }
        if (this.props.positionFromRedux !== prevProps.positionFromRedux) {
            this.setState({
                arrPosition: this.props.positionFromRedux,
            });
        }
        if (this.props.roleFromRedux !== prevProps.roleFromRedux) {
            this.setState({
                arrRoleID: this.props.roleFromRedux,
            });
        }
    }
    handleChangeImage(file) {
        if (file) {
            let objectUrl = URL.createObjectURL(file[0]);
            this.setState({
                previewImageUrl: objectUrl,
            });
        }
    }
    render() {
        const { language } = this.props;
        const { arrGender, arrPosition, arrRoleID } = this.state;
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
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.firstname" />
                            </label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.lastname" />
                            </label>
                            <input type="password" className="form-control" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.phonenumber" />
                            </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-9">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className=" col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select className="form-control">
                                {arrGender.length > 0 &&
                                    arrGender.map((item, index) => (
                                        <option key={index}>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className=" col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select className="form-control">
                                {arrPosition.length > 0 &&
                                    arrPosition.map((item, index) => (
                                        <option key={index}>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className=" col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.role-id" />
                            </label>
                            <select className="form-control">
                                {arrRoleID.length > 0 &&
                                    arrRoleID.map((item, index) => (
                                        <option key={index}>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-3">
                            <label className="form-label">
                                <FormattedMessage id="manage-user.image" />
                            </label>
                            <div className="d-flex flex-column-reverse">
                                <input
                                    id="loadImage"
                                    type="file"
                                    hidden
                                    onChange={(e) => this.handleChangeImage(e.target.files)}
                                />
                                <label className={cx('load-image')} htmlFor="loadImage">
                                    <span>Tải ảnh</span>
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
                        <button type="submit" className="mt-4 btn btn-primary ">
                            <FormattedMessage id="manage-user.save" />
                        </button>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // setLanguage: (language) => dispatch(changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
