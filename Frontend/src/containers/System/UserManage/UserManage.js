import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './UserManage.module.scss';
import { handleGetAllUsers, createNewUserService, deleteUSerService, editUserService } from '~/services/userService';
import ModalUser from '../ModalUser';
import { emitter } from '~/utils/emitter';
import ModalEditUser from '../ModalEditUser';
const cx = classNames.bind(styles);

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            dataUserEdit: '',
        };
    }
    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    handleAddNewUser = () => {
        this.setState({ isOpenModalUser: true });
    };
    toggleUserModal = () => {
        this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
    };
    toggleEditUserModal = () => {
        this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
    };
    getAllUserFromReact = async () => {
        let response = await handleGetAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.user,
            });
        }
    };
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUserFromReact();
                this.setState({ isOpenModalUser: false });
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
    };
    editUser = async (data) => {
        try {
            console.log(data);
            let response = await editUserService(data);
            if (response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUserFromReact();
                this.setState({ isOpenModalEditUser: false });
                // emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
    };
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUSerService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    handleEditUser = async (user) => {
        this.setState({ isOpenModalEditUser: true });
        this.setState({ dataUserEdit: user });
    };
    render() {
        console.log(this.state.arrUsers);
        return (
            <div className={cx('users-container')}>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleEditUserModal={this.toggleEditUserModal}
                        dataUserEdit={this.state.dataUserEdit}
                        editUser={this.editUser}
                    />
                )}
                <div className={cx('title', 'text-center')}>Manage users</div>
                <div className={cx('mx-1')}>
                    <button className={cx('btn-create-new-user')} onClick={() => this.handleAddNewUser()}>
                        <div>
                            <AiOutlinePlusCircle />
                        </div>
                        <span>Add new user</span>
                    </button>
                </div>
                <div className={cx('users-table', 'mt-4 mx-3')}>
                    <table className={cx('table-user')}>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phonenumber</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {this.state.arrUsers.map((item, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>
                                        {(+item.gender === 1 && 'Male') ||
                                            (+item.gender === 0 && 'FeMale') ||
                                            (+item.gender === 2 && 'Other')}
                                    </td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className={cx('btn-action')}>
                                            <HiPencilSquare
                                                className={cx('icon-btn-edit')}
                                                onClick={() => this.handleEditUser(item)}
                                            />
                                            <MdDeleteForever
                                                className={cx('icon-btn-delete')}
                                                onClick={() => this.handleDeleteUser(item)}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
