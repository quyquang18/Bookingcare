import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ModalUser.module.scss';
import { emitter } from '~/utils/emitter';
const cx = classNames.bind(styles);
class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
        };
        this.listenToEmitter();
    }
    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '',
            });
        });
    };
    componentDidMount() {
        console.log('didmou modal');
    }

    toggle = () => {
        this.props.toggleUserModal();
    };
    handleOnChangeInput = (event, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState,
        });
    };
    checkInputEmpty = () => {
        let isValid = true;
        const arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleAddNewUser = () => {
        let isValid = this.checkInputEmpty();
        if (isValid) {
            this.props.createNewUser(this.state);
        }
    };
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="xl">
                <ModalHeader toggle={() => this.toggle()} className="px-2">
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className={cx('modal-wrapper')}>
                        <form>
                            <div className={cx('form-group')}>
                                <label className={cx('lable-input')}>Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('lable-input')}>Password:</label>
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('lable-input')}>First Name:</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('lable-input')}>Last Name:</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                />
                            </div>

                            <div
                                className={cx('form-group', 'max-width')}
                                onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                            >
                                <label className={cx('lable-input')}>Gender</label>
                                <div className={cx('input-gender')}>
                                    <div className={cx('input-wrapper')}>
                                        <input type="radio" name="gender" value="1" />
                                        <label>
                                            <span className={cx('dot one')}></span>
                                            <span className={cx('gender')}>Male</span>
                                        </label>
                                    </div>
                                    <div className={cx('input-wrapper')}>
                                        <input type="radio" name="gender" value="0" />
                                        <label>
                                            <span className={cx('dot two')}></span>
                                            <span className={cx('gender')}>Female</span>
                                        </label>
                                    </div>
                                    <div className={cx('input-wrapper')}>
                                        <input type="radio" name="gender" value="2" />
                                        <label>
                                            <span className={cx('dot three')}></span>
                                            <span className={cx('gender')}>Prefer not to say</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <label className={cx('lable-input')}>Phonenumber:</label>
                                <input
                                    type="text"
                                    id="phonenumber"
                                    name="phonenumber"
                                    value={this.state.phonenumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phonenumber')}
                                />
                            </div>
                            <div className={cx('form-group', 'max-width')}>
                                <label className={cx('lable-input')}>Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3" color="primary" onClick={() => this.handleAddNewUser()}>
                        Save Changes
                    </Button>
                    <Button className="px-3" color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
