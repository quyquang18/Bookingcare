import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { AiFillCalendar } from 'react-icons/ai';
import styles from './DoctorSchedule.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES, CRUD_ACTIONS } from '~/utils';
import { getMarkdownDoctorById } from '~/services/doctorService';

const cx = classNames.bind(styles);

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return (
            <div className={cx('manage-doctor-wrapper')}>
                <div className={cx('wrapper')}>
                    <div className={cx('select-day')}>
                        <select>
                            <option>Hôm nay - 17/3</option>
                            <option>Thứ 7 - 18/3</option>
                            <option>Chủ nhật - 19/3 </option>
                            <option>Thứ 2 - 20/3 </option>
                        </select>
                    </div>
                    <div className={cx('select-time')}>
                        <div className={cx('select-title')}>
                            <AiFillCalendar />
                            Lịch khám
                        </div>
                        <div className="option-time"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
