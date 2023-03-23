import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '~/utils';
import * as actions from '~/store/actions';
import styles from './ManageSchedule.module.scss';
import { DatePicker } from '~/components/Input';
import { saveBulkScheduleDoctor } from '~/services/doctorService';
const cx = classNames.bind(styles);
let getCurentDate = new Date();
getCurentDate.setHours(0, 0, 0, 0);
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            selectedDate: getCurentDate,
            rangeTime: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTimes();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctors !== prevProps.allDoctors) {
            let buildData = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctor: buildData,
            });
        }
        if (prevProps.language !== this.props.language) {
            let buildData = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctor: buildData,
            });
        }
        if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                data = data.map((item) => ({
                    ...item,
                    isSelected: false,
                }));
            }
            this.setState({
                rangeTime: data,
            });
        }
    }
    handleChangeDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let valueVI = `${item.firstName} ${item.lastName}`;
                let valueEN = `${item.lastName} ${item.firstName}`;
                object.label = this.props.language === LANGUAGES.VI ? valueVI : valueEN;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };
    handleChangeDatePicker = (date) => {
        this.setState({
            selectedDate: date[0],
        });
    };
    handleSelectedButonTime = (item) => {
        if (item && item.id) {
            let coppyState = { ...this.state };
            let newRangeTime = coppyState.rangeTime;
            for (let i = 0; i < newRangeTime.length; i++) {
                if (newRangeTime[i].id === item.id) {
                    coppyState.rangeTime[i].isSelected = !this.state.rangeTime[i].isSelected;
                    break;
                }
            }
            this.setState({
                ...coppyState,
            });
        }
    };
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, selectedDate } = this.state;
        let result = [];
        let formatedDate = new Date(selectedDate).getTime();
        console.log(formatedDate);
        if (!formatedDate) {
            toast.error('Invalid selected date');
        } else {
            if (selectedDoctor && _.isEmpty(selectedDoctor)) {
                toast.error('Invalid selected Doctor');
            } else {
                if (rangeTime && rangeTime.length > 0) {
                    let selectedTime = rangeTime.filter((item) => item.isSelected === true);
                    if (selectedTime && selectedTime.length <= 0) {
                        toast.error('Invalid selected Time');
                    } else {
                        selectedTime.map((item) => {
                            let object = {};
                            object.doctorId = selectedDoctor.value;
                            object.date = formatedDate;
                            object.timeType = item.keyMap;
                            result.push(object);
                            return result;
                        });

                        await saveBulkScheduleDoctor({
                            arrSchedule: result,
                            doctorId: selectedDoctor.value,
                            formatedDate,
                        });
                    }
                }
            }
        }
    };
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className={cx('manage-schedule-container')}>
                <div className="title pb-3">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className={cx('container', 'pt-2')}>
                    <div className={cx('row')}>
                        <div className={cx('col-6', 'form-group')}>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeDoctor}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className={cx('col-6')}>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                className={cx('form-control')}
                                onChange={this.handleChangeDatePicker}
                                minDate={getCurentDate}
                                defaulevalue={this.state.selectedDate}
                                value={this.state.selectedDate}
                            />
                        </div>
                        <div className={cx('col-12', 'pick-hour-container')}>
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={cx('btn', 'btn-schedule', item.isSelected ? 'active' : '')}
                                            key={index}
                                            onClick={() => this.handleSelectedButonTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                    <button className="btn btn-primary pt-2" onClick={() => this.handleSaveSchedule()}>
                        <FormattedMessage id="manage-schedule.save-infor" />
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
        allScheduleTimes: state.admin.allScheduleTimes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
