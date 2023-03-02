import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { BackWard, ForWard } from '~/components/Icons';
import styles from './SliderSlick.module.scss';
import SliderItem from '../SliderItem';

const cx = classNames.bind(styles);

class SliderSlick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1,
            locationImgleft: 0,
        };
    }
    sliderWidth = this.props.sliderWidth;
    sliderHeight = this.props.sliderHeight;
    listImgSlider = this.props.listImgSlider || [];
    nextSlide = () => {
        let coppyState = { ...this.state };
        coppyState.activeIndex = this.state.activeIndex + 1;
        coppyState.locationImgleft = this.state.locationImgleft - this.sliderWidth;
        if (this.state.activeIndex === this.listImgSlider.length - 3) {
            coppyState.activeIndex = 1;
            coppyState.locationImgleft = 0;
        }
        this.setState({ ...coppyState });
    };
    componentDidMount = function () {
        var interval = setInterval(this.nextSlide, 3000);
        // this.setState({ interval: interval });
    };
    render() {
        const { activeIndex, locationImgleft } = this.state;
        const listImgSlider = this.listImgSlider;
        const sliderWidth = this.sliderWidth;
        return (
            <div className={cx('slider-wrapper')}>
                <div
                    className={cx('slider')}
                    style={{
                        transform: `translate3d(${locationImgleft}px, 0px, 0px)`,
                        transition: 'all 0.25s ease 0s',
                        width: `${listImgSlider.length * sliderWidth}px`,
                    }}
                >
                    {this.listImgSlider.map((item, index) => {
                        return (
                            <SliderItem
                                key={index}
                                width="247.5px"
                                marginRight="50px"
                                urlImage={item.url}
                                promotion={item.promotion}
                                content={item.content}
                                subContent={item.subContent}
                            />
                        );
                    })}
                </div>
                <div className={cx('buttons-wrapper')}>
                    <span className={cx('btn-slider', 'next-button')} onClick={this.nextSlide}>
                        <ForWard />
                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SliderSlick);
