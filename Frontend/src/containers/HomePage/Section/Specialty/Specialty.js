import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import styles from './Specialty.module.scss';
// import 'slick-carousel/slick/slick.css';
import SliderSlick from '~/components/SliderSlick';
import images from '~/assets/images';
import './CustumizeStyleSlickSlider.scss';
// import 'slick-carousel/slick/slick-theme.css';
const cx = classNames.bind(styles);
const listImgSlider = [
    {
        url: images.slider1.default,
        describe: 'Phòng khám da liễu Hà Nội',
        name: 'slider1',
        promotion: 'Ưu đãi',
        content: 'Trị mụn chuẩn y khoa giá ưu đãi tại Phòng khám Da liễu Hà Nội',
        subContent: [
            'Phòng khám Da liễu Hà Nội dành tặng ưu đãi giá tiết kiệm cho khách hàng đăng ký trị mụn tháng 02/2023',
        ],
    },
    {
        url: images.slider2.default,
        describe: 'Slider 2',
        name: 'slider2',
        promotion: 'Ưu đãi',
        content: 'Ưu đãi điều trị mụn chỉ 199k tại Phòng khám Chuyên khoa Da liễu Maia&Maia',
        subContent: [
            'Từ 01/02 đến 28/02/2023, Phòng khám dành tặng khách hàng khuyến mại điều trị mụn chỉ 199k cho buổi đầu tiên.',
        ],
    },
    {
        url: images.slider3.default,
        describe: 'Ưu đãi mắt',
        name: 'slider3',
        promotion: 'Ưu đãi',
        content: 'Ưu đãi 40% phí khám và phẫu thuật tật khúc xạ tại Bệnh viện Mắt DND',
        subContent: ['Từ 14/11/2022, khách hàng được hỗ trợ đến 40% chi phí khám và phẫu thuật khúc xạ'],
    },
    {
        url: images.slider4.default,
        describe: 'Ưu đãi gói khám Sản phụ khoa chỉ còn 489k tại Phòng khám An Thịnh',
        name: 'slider3',
        promotion: 'Ưu đãi',
        content: 'Ưu đãi gói khám Sản phụ khoa chỉ còn 489k tại Phòng khám An Thịnh',
        subContent: ['Giảm giá Gói khám phụ khoa Yêu thích từ 1.199.000đ xuống còn 489.000đ đến hết 27/02/2023'],
    },
    {
        url: images.slider5.default,
        describe: 'Siêu ưu đãi khám sức khỏe tháng 02/2023 tại Hệ thống Y tế Thu Cúc TCI',
        name: 'slider3',
        promotion: 'Ưu đãi',
        content: 'Siêu ưu đãi khám sức khỏe tháng 02/2023 tại Hệ thống Y tế Thu Cúc TCI',
        subContent: ['Hệ thống Y tế Thu Cúc TCI áp dụng hàng loạt các ưu đãi giảm giá gói khám và khám chuyên khoa'],
    },
    {
        url: images.slider6.default,
        describe: 'Xét nghiệm COVID',
        name: 'slider3',
        promotion: 'COVID',
        content: 'Xét nghiệm COVID',
        subContent: ['Tầm soát và xác định COVID-19', 'Phương pháp Test nhanh & PCR', 'Theo quy chuẩn Bộ Y tế'],
    },
    {
        url: images.slider7.default,
        describe: 'Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám',
        name: 'slider3',
        promotion: 'Mới ra mắt',
        content: 'Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám',
        subContent: [
            ' Mô hình "Nền tảng như một dịch vụ" bao gồm Website, ứng dụng di động và phần mềm quản trị, tích hợp 3 trong 1 nền tảng tiện ích dễ dùng',
        ],
    },
    {
        url: images.slider8.default,
        describe: 'Kit Test COVID bằng nước bọt',
        name: 'slider3',
        promotion: 'COVID',
        content: 'Kit Test COVID bằng nước bọt',
        subContent: [
            ' Kit Test nhanh bằng nước bọt',
            'Đơn giản, tiện lợi, chính xác',
            'Bộ Y tế Việt Nam cấp chứng nhận',
        ],
    },
    {
        url: images.slider9.default,
        describe: 'Gói Tầm soát Suy giãn tĩnh mạch',
        name: 'slider3',
        promotion: 'Ưu đãi',
        content: 'Gói Tầm soát Suy giãn tĩnh mạch',
        subContent: [
            ' Hỗ trợ điều trị dứt điểm 1 - 2 liệu trình ',
            'Tư vấn điều trị bằng những Phương pháp ít xâm lấn',
        ],
    },
    {
        url: images.slider10.default,
        describe: 'Tư vấn phẫu thuật bao quy đầu trọn gói',
        name: 'slider3',
        promotion: 'Ưu đãi',
        content: 'Tư vấn phẫu thuật bao quy đầu trọn gói',
        subContent: ['Thực hiện bởi bác sĩ Nam học', 'Thực hiện tại cơ sở y tế', 'Chi phí minh bạch'],
    },
    {
        url: images.slider11.default,
        describe: 'Tư vấn phẫu thuật bao quy đầu trọn gói',
        name: 'slider3',
        promotion: 'Ưu đãi',
        content: 'Tư vấn phẫu thuật bao quy đầu trọn gói',
        subContent: ['Thực hiện bởi bác sĩ Nam học', 'Thực hiện tại cơ sở y tế', 'Chi phí minh bạch'],
    },
];
class Specialty extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            swipe: true,
        };
        return (
            <div className={cx('section-specialty')}>
                <div className={cx('slider-wrapper')}>
                    <div className={cx('slider-specialty')}>
                        <SliderSlick sliderWidth="296" sliderHeight="326" listImgSlider={listImgSlider} />
                    </div>
                </div>
                <div className={cx('slider-wrapper')}>
                    <div className={cx('slider-specialty')}>
                        <div className={cx('slider-header')}>
                            <h2 className={cx('heeader-title')}>Bác sĩ từ xa qua Video</h2>
                        </div>
                        <Slider {...settings}>
                            {listImgSlider.map((item, index) => (
                                <a href="##" key={index} style={{ width: '278px' }}>
                                    <div
                                        className={cx('image-item')}
                                        style={{ backgroundImage: `url(${item.url})` }}
                                    ></div>
                                    <h3> {item.content}</h3>
                                </a>
                            ))}
                        </Slider>
                        {/* <div className={cx('slider-extension')}>
                            <div className={cx('extension-content')}>Xem thêm</div>
                        </div> */}
                    </div>
                </div>
                <div className={cx('slider-wrapper')}>
                    <div className={cx('slider-specialty')}>
                        <Slider {...settings}>
                            {listImgSlider.map((item, index) => (
                                <a href="##" key={index} style={{ width: '278px' }}>
                                    <div
                                        className={cx('image-item')}
                                        style={{ backgroundImage: `url(${item.url})` }}
                                    ></div>
                                    <h3> {item.content}</h3>
                                </a>
                            ))}
                        </Slider>
                    </div>
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

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
