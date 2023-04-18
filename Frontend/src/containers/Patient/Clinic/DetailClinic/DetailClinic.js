import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import HomeHeader from '~/containers/HomePage/HomeHeader';
import DoctorSchedule from '../../Doctor/DetailDoctor/DoctorSchedule';
import styles from './DetailClinic.module.scss';
import { getDetailClinicById } from '~/services/ClinicService';
import _ from 'lodash';
import ProfileDoctor from '../../Doctor/ProfileDoctor';
import DoctorExtraInfor from '../../Doctor/DetailDoctor/DoctorExtraInfor';
import HomeFooter from '~/containers/HomePage/HomeFooter';

const cx = classNames.bind(styles);
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforClinic: {},
            arrDoctorId: [],
            clickOnTab: '',
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getDetailClinicById(this.props.match.params.id);
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let listDoctor = data.listDoctor;
                    listDoctor.map((item) => {
                        arrDoctorId.push(item.doctorId);
                        return true;
                    });
                }
                this.setState({
                    inforClinic: res.data,
                    arrDoctorId,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    convertImageBase64 = (inputImage) => {
        let imageBase64 = '';
        if (inputImage) {
            imageBase64 = new Buffer(inputImage, 'base64').toString('binary');
        }
        return imageBase64;
    };
    getItemsNavigation = () => {
        let inforClinic = this.state.inforClinic;
        let arrKey = ['listDoctor', 'desIntroHtml', 'desStrengthsHtml', 'desEquipmentHtml', 'desAddressHtml', 'desProcedureHtml'];

        let coppyInfor = {};
        let navItems = [];
        if (inforClinic) {
            arrKey.map((item) => {
                coppyInfor[item] = inforClinic[item];
            });
        }
        const nonEmptyContents = arrKey.filter((content) => coppyInfor[content] && coppyInfor[content].length > 0);
        if (nonEmptyContents.length > 0) {
            navItems = nonEmptyContents.map((key, index) => {
                return (
                    <li
                        className={cx(key === this.state.clickOnTab ? 'active' : '')}
                        key={index}
                        onClick={() => this.handleClickTabNav(key)}
                    >
                        <FormattedMessage id={`patient.detail-clinic.${key}`} />
                    </li>
                );
            });
        } else {
            navItems = null;
        }
        return navItems;
    };
    handleClickTabNav = (idInput) => {
        if (idInput) {
            const element = document.getElementById(idInput);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            this.setState({
                clickOnTab: idInput,
            });
        }
    };
    render() {
        let { arrDoctorId, inforClinic } = this.state;
        console.log(this.state.inforClinic);
        let coverImageBase64 = this.convertImageBase64(inforClinic.coverImage);
        let avatarBase64 = this.convertImageBase64(inforClinic.avatar);
        return (
            <>
                {inforClinic && !_.isEmpty(inforClinic) ? (
                    <div className={cx('detail-cilinic-container')}>
                        <div className={cx('detail-clinic-header', 'shared-css')}>
                            <div className={cx('image-background', 'shared-css')}>
                                <img alt="clinic backgorund" src={coverImageBase64} />
                            </div>
                            <div style={{ width: '100%', aspectRatio: '7.5 / 1' }}></div>
                            <div className={cx('title-clinic', 'shared-css', 'wrapper')}>
                                <div className={cx('image-avatar', 'shared-css')}>
                                    <img alt="clinic avatar" src={avatarBase64} />
                                </div>
                                <div className={cx('name-address-clinic', 'shared-css')}>
                                    <h2 className={cx('name-clinic')}>{inforClinic.name}</h2>
                                    <span className={cx('address-clinic')}>{inforClinic.address}</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('clinic-nav')}>
                            <div className={cx('nav-wrapper', 'shared-css')}>
                                <div className={cx('box-shadow-left')}></div>
                                <ul>{this.getItemsNavigation()}</ul>
                                <div className={cx('box-shadow-right')}></div>
                            </div>
                            <div className={cx('box-shadow-bottom')}></div>
                        </div>
                        <div className={cx('detail-clinic-content')}>
                            <div className={cx('des-endow')}>
                                {inforClinic && inforClinic.desEndowHtml && (
                                    <div dangerouslySetInnerHTML={{ __html: inforClinic.desEndowHtml }}></div>
                                )}
                            </div>
                            {arrDoctorId && arrDoctorId.length > 0 && (
                                <div className={cx('doctor-infor')} id="listDoctor">
                                    <div className={cx('title-content')}>
                                        <h3 className={cx('title-small')}>Bác sĩ</h3>
                                        <span className={cx('btn-detail')}>Xem thêm</span>
                                    </div>
                                    {arrDoctorId.map((item, index) => (
                                        <div className={cx('each-doctor')} key={index}>
                                            <div className={cx('content-left')}>
                                                <div className={cx('profile-doctor')}>
                                                    <ProfileDoctor
                                                        doctorId={item}
                                                        isShowDescriptionDoctor={true}
                                                        isShowPrice={false}
                                                        isShowBtnDetail={true}
                                                        getPrice={this.priceBookingFromChild}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('content-right')}>
                                                <div className={cx('doctor-schedule')}>
                                                    <DoctorSchedule doctorId={item} />
                                                </div>
                                                <div className={cx('doctor-extrainfor')}>
                                                    <DoctorExtraInfor doctorId={item} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {inforClinic && inforClinic.desIntroHtml && (
                                <div className={cx('des-intro')} id="desIntroHtml">
                                    <h3 className={cx('title-des')}>
                                        <FormattedMessage id={`patient.detail-clinic.desIntroHtml`} />
                                    </h3>
                                    <div dangerouslySetInnerHTML={{ __html: inforClinic.desIntroHtml }}></div>
                                </div>
                            )}
                            {inforClinic && inforClinic.desStrengthsHtml && (
                                <div className={cx('des-strengths')} id="desStrengthsHtml">
                                    <h3 className={cx('title-des')}>
                                        <FormattedMessage id={`patient.detail-clinic.desStrengthsHtml`} />
                                    </h3>
                                    <div dangerouslySetInnerHTML={{ __html: inforClinic.desStrengthsHtml }}></div>
                                </div>
                            )}
                            {inforClinic && inforClinic.desEquipmentHtml && (
                                <div className={cx('des-equipment')} id="desEquipmentHtml">
                                    <h3 className={cx('title-des')}>
                                        <FormattedMessage id={`patient.detail-clinic.desEquipmentHtml`} />
                                    </h3>
                                    <div dangerouslySetInnerHTML={{ __html: inforClinic.desEquipmentHtml }}></div>
                                </div>
                            )}
                            {inforClinic && inforClinic.desAddressHtml && (
                                <div className={cx('des-address')} id="desAddressHtml">
                                    <h3 className={cx('title-des')}>
                                        <FormattedMessage id={`patient.detail-clinic.desAddressHtml`} />
                                    </h3>
                                    <div dangerouslySetInnerHTML={{ __html: inforClinic.desAddressHtml }}></div>
                                </div>
                            )}
                            {inforClinic && inforClinic.desProcedureHtml && (
                                <div className={cx('des-procedure')} id="desProcedureHtml">
                                    <h3 className={cx('title-des')}>
                                        <FormattedMessage id={`patient.detail-clinic.desProcedureHtml`} />
                                    </h3>
                                    <div dangerouslySetInnerHTML={{ __html: inforClinic.desProcedureHtml }}></div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={cx('mess-no-detail')}>
                        <p>No details available for this clinic</p>
                    </div>
                )}
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
