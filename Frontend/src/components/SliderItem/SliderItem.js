import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './SliderItem.module.scss';
import { ForWard } from '../Icons';

const cx = classNames.bind(styles);

class SliderSlick extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        //
        const { width, marginRight, urlImage, promotion, content, subContent } = this.props;
        return (
            <div className={cx('item-wrapper')} style={{ width: width, marginRight: marginRight }}>
                <a href="#a">
                    <div className={cx('image-item')} style={{ backgroundImage: `url(${urlImage})` }}>
                        <label>{promotion}</label>
                    </div>
                    <div className={cx('item-content')}>
                        <h3>{content}</h3>
                        <div className={cx('sub-content')}>
                            <ul>
                                {subContent.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <button className={cx('button-detail')}>
                            XEM CHI TIẾT
                            <div className={cx('icon-forward')}>
                                <ForWard width="1.2rem" height="1.2rem" />
                            </div>
                        </button>
                    </div>
                </a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderSlick);
