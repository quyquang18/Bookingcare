import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './TableUserManager.module.scss';
import * as actions from '~/store/actions';
const cx = classNames.bind(styles);

class TableUserManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            dataUserEdit: '',
        };
    }
    componentDidMount() {
        this.props.getAllUser();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allUserFromRedux !== prevProps.allUserFromRedux) {
            const arrUsers = this.props.allUserFromRedux;
            this.setState({
                arrUsers: arrUsers,
            });
        }
    }

    handleEditUser(user) {
        this.props.handleEditUser(user);
    }
    async handleDeleteUser(item) {
        await this.props.deleteUser(item.id);
        this.props.getAllUser();
        toast.success('Delete User Success');
    }

    render() {
        return (
            <div className={cx('users-container')}>
                <div className={cx('title', 'text-center')}>Manage users</div>

                <div className={cx('users-table', 'mt-4 mx-3')}>
                    <table className={cx('table-user')}>
                        <tbody>
                            <tr>
                                <th>
                                    <FormattedMessage id="manage-user.email" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.firstname" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.lastname" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.phonenumber" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.address" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.actions" />
                                </th>
                            </tr>
                            {this.state.arrUsers.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phonenumber}</td>
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
    return {
        allUserFromRedux: state.admin.arrUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUser: () => dispatch(actions.fechAllUser()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManager);
