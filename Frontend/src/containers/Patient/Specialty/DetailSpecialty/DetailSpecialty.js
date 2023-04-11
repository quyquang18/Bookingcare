import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import styles from './DetailSpecialty.module.scss';
import { getDetailSpecialtyById } from '~/services/specialtyService';
import { LANGUAGES } from '~/utils';

const cx = classNames.bind(styles);

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforSpecialty: {},
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getDetailSpecialtyById(this.props.match.params.id);
            if (res && res.errCode === 0) {
                this.setState({
                    inforSpecialty: res.data,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    render() {
        let { inforSpecialty } = this.state;
        let { language } = this.props;
        console.log(inforSpecialty);
        return (
            <div>
                <div className={cx('detail-specialty-container')}>
                    <div className={cx('wrapper')}>
                        <h2>
                            {' '}
                            {inforSpecialty && inforSpecialty.nameVn && language === LANGUAGES.VI
                                ? inforSpecialty.nameVn
                                : inforSpecialty.nameEn}
                        </h2>
                        <div className={cx('description-specialty')}>
                            {inforSpecialty && inforSpecialty.descriptionHtmlVn && language === LANGUAGES.VI && (
                                <div dangerouslySetInnerHTML={{ __html: inforSpecialty.descriptionHtmlVn }}></div>
                            )}
                            {inforSpecialty && inforSpecialty.descriptionHtmlEn && language === LANGUAGES.EN && (
                                <div dangerouslySetInnerHTML={{ __html: inforSpecialty.descriptionHtmlEn }}></div>
                            )}
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
