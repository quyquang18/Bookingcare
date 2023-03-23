import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { AiFillLike, AiFillCalendar } from 'react-icons/ai';
import styles from './DetailDoctor.module.scss';
import * as actions from '~/store/actions';
import { getDetailDoctorById } from '~/services/doctorService';
import { LANGUAGES } from '~/utils';
import DoctorSchedule from '../../DoctorSchedule';

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
                <div className={cx('wrapper')}>
                    <div className={cx('schedule-doctor')}>
                        <div className={cx('content-left')}>
                            <DoctorSchedule />
                        </div>
                        <div className={cx('content-right')}>
                            <DoctorSchedule />
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
