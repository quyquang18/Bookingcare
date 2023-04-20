import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    render() {
        return (
            <div className={cx('page-not-found-container')}>
                <div className={cx('image-not-found')} style={{ backgroundImage: `url(${images.imageNotFound.default})` }}></div>
                <div className={cx('page-not-found-content')}>
                    <h1>Sorry!</h1>
                    <p>
                        Either you aren't cool enough to visit this page or it doesn't exist <em>. . . like your social life.</em>
                    </p>
                    <span className={cx('btn-go-home')}>
                        <Link to={'/home'}>Go to Home Page!</Link>
                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
