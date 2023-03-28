import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { AiFillCalendar } from 'react-icons/ai';
import { BsHandIndexThumb } from 'react-icons/bs';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';

import styles from './DoctorSchedule.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils';
import { getScheduleByDate } from '~/services/doctorService';
const cx = classNames.bind(styles);

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isDateOfThisWeek: true,
        };
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays,
        });
        // let res = await getScheduleByDate(this.props.doctorId, new Date());
        // console.log(res);
    }
    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let DDMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${DDMM}`;
                    object.lable = today;
                } else {
                    object.lable = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }
            }
            if (language === LANGUAGES.EN) {
                if (i === 0) {
                    let DDMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${DDMM}`;
                    object.lable = today;
                } else {
                    object.lable = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        return allDays;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays,
            });
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.getArrDays(this.props.language);
            if (allDays && allDays.length > 0) {
                let res = await getScheduleByDate(this.props.doctorId, allDays[0].value);
                if (res && res.errCode === 0) {
                    this.setState({
                        allAvailableTime: res.data.length > 0 ? res.data : [],
                    });
                }
            }
        }
    }
    handleChangeday = async (e) => {
        let valueDate = +e.target.value;
        let isDateOfThisWeek = this.checkCurrentSlectedDate(valueDate);
        this.setState({
            isDateOfThisWeek,
        });
        if (valueDate) {
            if (this.props.doctorId) {
                let doctorId = this.props.doctorId;
                let res = await getScheduleByDate(doctorId, valueDate);
                if (res && res.errCode === 0) {
                    this.setState({
                        allAvailableTime: res.data.length > 0 ? res.data : [],
                    });
                }
            }
        }
    };
    checkCurrentSlectedDate = (inputDate) => {
        let isDateOfThisWeek = 0;
        let weekStart = moment().clone().startOf('week').valueOf();
        let weekEnd = moment().clone().endOf('week').valueOf();
        console.log(weekStart, '-----', inputDate, '----', weekEnd);
        if (weekStart <= inputDate && inputDate <= weekEnd) {
            isDateOfThisWeek = true;
        } else {
            isDateOfThisWeek = false;
        }

        return isDateOfThisWeek;
    };
    render() {
        let { allDays, allAvailableTime, isDateOfThisWeek } = this.state;
        let { language } = this.props;
        return (
            <div className={cx('manage-doctor-wrapper')}>
                <div className={cx('wrapper')}>
                    <div className={cx('select-day')}>
                        <select onChange={(e) => this.handleChangeday(e)}>
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.lable}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={cx('all-available-time')}>
                        <span className={cx('text-calendar')}>
                            <AiFillCalendar className={cx('icon-calendar')} />
                            <p>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </p>
                        </span>
                        <div className={cx('time-content')}>
                            {allAvailableTime && allAvailableTime.length > 0 ? (
                                allAvailableTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;

                                    return (
                                        <button className={cx('option-time', language, isDateOfThisWeek ? 'in-week' : '')} key={index}>
                                            {timeDisplay}
                                        </button>
                                    );
                                })
                            ) : (
                                <span className={cx('text-notify-no-schedule')}>
                                    <p>
                                        <FormattedMessage id="patient.detail-doctor.message-no-schedule" />
                                    </p>
                                </span>
                            )}
                        </div>
                        <div className={cx('book-free')}>
                            <span>
                                <FormattedMessage id="patient.detail-doctor.choose" />
                                <BsHandIndexThumb className={cx('icon-choose')} />
                                <FormattedMessage id="patient.detail-doctor.book-free" />
                                <sup>đ</sup>
                                {')'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
