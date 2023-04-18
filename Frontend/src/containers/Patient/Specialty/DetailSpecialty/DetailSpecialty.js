import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import styles from './DetailSpecialty.module.scss';
import { getDetailSpecialtyById } from '~/services/specialtyService';
import { LANGUAGES } from '~/utils';
import HomeHeader from '~/containers/HomePage/HomeHeader';
import DoctorSchedule from '../../Doctor/DetailDoctor/DoctorSchedule';
import DoctorExtraInfor from '../../Doctor/DetailDoctor/DoctorExtraInfor';
import ProfileDoctor from '../../Doctor/ProfileDoctor';
import _ from 'lodash';
import HomeFooter from '~/containers/HomePage/HomeFooter';

const cx = classNames.bind(styles);

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforSpecialty: {},
            arrDoctorId: [],
            arrProvince: [],
            isShowFullDes: false,
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getDetailSpecialtyById(this.props.match.params.id, 'ALL');
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let doctorSpecialty = data.doctorSpecialty;
                    doctorSpecialty.map((item) => {
                        arrDoctorId.push(item.doctorId);
                        return true;
                    });
                }
                let listProvince = this.setListProvince(data);
                this.setState({
                    inforSpecialty: res.data,
                    arrDoctorId,
                    listProvince,
                });
            }
        }
    }
    setListProvince = (data) => {
        let language = this.props.language;
        let listProvince = [];
        if (data && !_.isEmpty(data)) {
            let doctorSpecialty = data.doctorSpecialty;
            doctorSpecialty.map((item) => {
                if (item.provinceTypeData) {
                    let object = {};
                    object.value = item.provinceId;
                    object.label = language === LANGUAGES.VI ? item.provinceTypeData.valueVi : item.provinceTypeData.valueEn;
                    listProvince.push(object);
                }
                return true;
            });
            listProvince.unshift({
                value: 'ALL',
                label: language === LANGUAGES.VI ? 'Toàn quốc' : 'Nationwide',
            });
        }
        return listProvince;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let listProvince = this.setListProvince(this.state.inforSpecialty);
            this.setState({
                listProvince,
            });
        }
    }
    handleChangeProvince = async (event) => {
        let location = event.target.value;
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getDetailSpecialtyById(this.props.match.params.id, location);
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let doctorSpecialty = data.doctorSpecialty;
                    doctorSpecialty.map((item) => {
                        arrDoctorId.push(item.doctorId);
                        return true;
                    });
                }
                this.setState({
                    arrDoctorId,
                });
            }
        }
    };
    handleShowHideFullDes = (isShow) => {
        this.setState({
            isShowFullDes: isShow,
        });
    };
    render() {
        let { inforSpecialty, arrDoctorId, listProvince, isShowFullDes } = this.state;
        let { language } = this.props;
        let imageBase64 = '';
        if (inforSpecialty.image) {
            imageBase64 = new Buffer(inforSpecialty.image, 'base64').toString('binary');
        }
        return (
            <>
                <div>
                    <div className={cx('detail-specialty-container')}>
                        <HomeHeader />
                        <div className={cx('specialty-first-part-background')} style={{ backgroundImage: `url(${imageBase64})` }}>
                            <div className={cx('specialty-first-part')}>
                                <div className="wrapper">
                                    <h2 className={cx('name-specialty')}>
                                        {inforSpecialty && inforSpecialty.nameVn && language === LANGUAGES.VI
                                            ? inforSpecialty.nameVn
                                            : inforSpecialty.nameEn}
                                    </h2>
                                    <div className={cx('description-specialty', isShowFullDes ? 'show' : 'hide')}>
                                        {inforSpecialty && inforSpecialty.descriptionHtmlVn && language === LANGUAGES.VI && (
                                            <div dangerouslySetInnerHTML={{ __html: inforSpecialty.descriptionHtmlVn }}></div>
                                        )}
                                        {inforSpecialty && inforSpecialty.descriptionHtmlEn && language === LANGUAGES.EN && (
                                            <div dangerouslySetInnerHTML={{ __html: inforSpecialty.descriptionHtmlEn }}></div>
                                        )}
                                    </div>
                                    {!isShowFullDes ? (
                                        <div className={cx('btn-show-hide')} onClick={() => this.handleShowHideFullDes(true)}>
                                            Đọc thêm
                                        </div>
                                    ) : (
                                        <div className={cx('btn-show-hide')} onClick={() => this.handleShowHideFullDes(false)}>
                                            Ẩn bớt
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx('wrapper')}>
                            <div className={cx('select-sp-province')}>
                                <select
                                    className={cx('selected')}
                                    onChange={(event) => {
                                        this.handleChangeProvince(event);
                                    }}
                                >
                                    {!_.isEmpty(listProvince) &&
                                        listProvince.map((item, index) => (
                                            <option key={index} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {arrDoctorId &&
                                arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => (
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
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
