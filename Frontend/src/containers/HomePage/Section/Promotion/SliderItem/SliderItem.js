import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './SliderItem.module.scss';
// import { ForWard } from '../Icons';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils';

const cx = classNames.bind(styles);

class SliderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount = function () {};
    async componentDidUpdate(prevProps, prevState, snapshot) {}
    renderDescription = () => {
        let promotionInfor = this.props.promotionInfor;
        let description = [];
        if (promotionInfor.description) {
            let lines = promotionInfor.description.split('-');

            if (lines.length > 1) {
                let wrappedLines = lines.map((line) => {
                    if (line) {
                        return `<li>${line.trim()}</li>`;
                    }
                });
                description = wrappedLines.join('');
            } else {
                description = `<p>${promotionInfor.description.trim()}</p>`;
            }
        }
        return <ul dangerouslySetInnerHTML={{ __html: description }} />;
    };
    render() {
        let promotionInfor = this.props.promotionInfor;
        let language = this.props.language;
        let imgBase64 = '';
        if (promotionInfor && promotionInfor.image) {
            imgBase64 = new Buffer(promotionInfor.image, 'base64').toString('binary');
        }
        const { width, marginRight } = this.props;
        return (
            <div className={cx('item-wrapper')} style={{ width: width, marginRight: marginRight }}>
                <div className={cx('image-item')} style={{ backgroundImage: `url(${imgBase64})` }}>
                    {promotionInfor.promotionData && <label>{promotionInfor.promotionData.valueVi}</label>}
                </div>
                <div className={cx('item-content')}>
                    <h3 className={cx('item-name')}>{promotionInfor.name && promotionInfor.name}</h3>
                    <div className={cx('item-description')}>{this.renderDescription()}</div>
                    <button className={cx('button-detail')}>XEM CHI TIẾT</button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SliderItem);
