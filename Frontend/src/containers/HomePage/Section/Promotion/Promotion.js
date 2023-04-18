import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { BackWard, ForWard } from '~/components/Icons';
import styles from './Promotion.module.scss';
import SliderItem from './SliderItem';
import * as actions from '~/store/actions';
const cx = classNames.bind(styles);

class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPromotion: [],
            activeIndex: 1,
            locationImgleft: 0,
        };
    }
    sliderWidth = this.props.sliderWidth;
    sliderHeight = this.props.sliderHeight;
    nextSlide = () => {
        let coppyState = { ...this.state };
        coppyState.activeIndex = this.state.activeIndex + 1;
        coppyState.locationImgleft = this.state.locationImgleft - (this.sliderWidth + 50);
        if (this.state.activeIndex === this.state.listPromotion.length - 3) {
            coppyState.activeIndex = 1;
            coppyState.locationImgleft = 0;
        }
        this.setState({ ...coppyState });
    };
    componentDidMount = function () {
        this.props.fetchListPromotion();
        // this.interval = setInterval(() => {
        //     this.nextSlide();
        // }, 5000);
    };
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.listPromotion !== prevProps.listPromotion) {
            this.setState({
                listPromotion: this.props.listPromotion,
            });
        }
    }
    render() {
        const { activeIndex, locationImgleft, listPromotion } = this.state;
        const sliderWidth = this.sliderWidth;
        return (
            <div className="wrapper">
                <div className={cx('slider-wrapper')}>
                    <div
                        className={cx('slider')}
                        style={{
                            transform: `translate3d(${locationImgleft}px, 0px, 0px)`,
                            transition: 'all 0.25s ease 0s',
                            width: `${listPromotion.length * (sliderWidth + 50)}px`,
                        }}
                    >
                        {listPromotion &&
                            listPromotion.length > 0 &&
                            listPromotion.map((item, index) => {
                                return (
                                    <SliderItem key={index} width={sliderWidth + 'px'} marginRight="50px" promotionInfor={item} />
                                );
                            })}
                    </div>
                    <div className={cx('buttons-wrapper')}>
                        <span className={cx('btn-slider', 'next-button')} onClick={this.nextSlide}>
                            <ForWard />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        listPromotion: state.admin.listPromotion,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchListPromotion: () => dispatch(actions.fetchListPromotion()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);
