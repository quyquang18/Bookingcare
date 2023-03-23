import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

import styles from './ManageDoctor.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES, CRUD_ACTIONS } from '~/utils';
import { getMarkdownDoctorById } from '~/services/doctorService';

const cx = classNames.bind(styles);
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            listDoctor: [],
            actions: CRUD_ACTIONS.CREATE,
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
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
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };
    handleSaveContentMarkdown = () => {
        const { contentMarkdown, contentHTML, description, selectedDoctor, actions } = this.state;
        this.props.saveDetailDoctor({
            contentMarkdown,
            contentHTML,
            description,
            doctorId: selectedDoctor.value,
            options: actions,
        });
    };
    handleChangeDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getMarkdownDoctorById(selectedDoctor.value);
        if (res.data && res.data.contentMarkdown && res.data.contentHTML && res.data.description) {
            this.setState({
                contentMarkdown: res.data.contentMarkdown,
                contentHTML: res.data.contentHTML,
                description: res.data.description,
                actions: CRUD_ACTIONS.EDIT,
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                actions: CRUD_ACTIONS.CREATE,
            });
        }
    };
    handleChangeTextDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
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
    render() {
        return (
            <div className={cx('manage-doctor-wrapper')}>
                <div className={cx('manage-doctor-title')}> More doctor information</div>
                <div className={cx('more-info')}>
                    <div className={cx('content-left')}>
                        <label> Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeDoctor}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <div className={cx('content-right')}>
                        <label> Thông tin giới thiệu</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(event) => this.handleChangeTextDesc(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className={cx('manage-doctor-editor')}>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div className={cx('wrapper-btn')}>
                    <button
                        className={cx(this.state.actions === CRUD_ACTIONS.CREATE ? 'btn-create' : 'btn-edit')}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {this.state.actions === CRUD_ACTIONS.CREATE ? 'Create New Infor Doctor' : 'Edit Infor Doctor'}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
