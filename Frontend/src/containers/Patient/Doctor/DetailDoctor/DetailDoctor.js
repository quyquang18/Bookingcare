import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { AiFillLike, AiFillCalendar } from 'react-icons/ai';
import styles from './DetailDoctor.module.scss';
import * as actions from '~/store/actions';
import { getDetailDoctorById } from '~/services/userService';
import { LANGUAGES } from '~/utils';
const cx = classNames.bind(styles);
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforDoctor: {},
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getDetailDoctorById(this.props.match.params.id);
            if (res && res.errCode === 0) {
                this.setState({
                    inforDoctor: res.data,
                });
            }
            // this.props.fetchDetailDoctorById(+this.props.match.params.id);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { inforDoctor } = this.state;
        console.log(inforDoctor);
        let language = this.props.language;
        let nameVi = '';
        let nameEn = '';
        if (inforDoctor && inforDoctor.positionData) {
            nameEn = `${inforDoctor.positionData.valueEn} ${inforDoctor.lastName} ${inforDoctor.firstName}`;
            nameVi = `${inforDoctor.positionData.valueVi} ${inforDoctor.firstName} ${inforDoctor.lastName}`;
        }
        return (
            <div className={cx('detail-doctor-container')}>
                <div className={cx('intro-doctor')}>
                    <div className={cx('wrapper')}>
                        <div className="d-flex">
                            <div
                                className={cx('image-doctor')}
                                style={{ backgroundImage: `url(${inforDoctor.image})` }}
                            ></div>
                            <div className={cx('description-doctor')}>
                                <h1 className={cx('name-doctor')}>{language === LANGUAGES.VI ? nameVi : nameEn}</h1>
                                <div className={cx('summary-doctor')}>
                                    {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.description && (
                                        <span>{inforDoctor.Markdown.description}</span>
                                    )}
                                </div>
                                <div className={cx('interaction-doctor')}>
                                    <button
                                        className="btn btn-primary d-flex"
                                        title="Thích Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng"
                                    >
                                        <AiFillLike />
                                        Thích 43
                                    </button>
                                    <button className="btn btn-primary ml-3">Chia sẻ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('schedule-doctor')}>
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
                <div className={cx('detail-infor-doctor')}>
                    <div className={cx('wrapper')}>
                        {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.contentHTML && (
                            <div dangerouslySetInnerHTML={{ __html: inforDoctor.Markdown.contentHTML }}></div>
                        )}
                    </div>
                </div>
                <div className={cx('feedback-doctor')}></div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
