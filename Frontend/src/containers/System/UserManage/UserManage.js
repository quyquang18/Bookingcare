import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';
import styles from './UserManage.module.scss';
import { handleGetAllUsers } from '~/services/userService';

const cx = classNames.bind(styles);

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        };
    }
    async componentDidMount() {
        let response = await handleGetAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.user,
            });
        }
    }

    render() {
        return (
            <div className={cx('users-container')}>
                <div className={cx('title', 'text-center')}>Manage users</div>
                <div className={cx('users-table', 'mt-4 mx-3')}>
                    <table className={cx('table-user')}>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {this.state.arrUsers.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className={cx('btn-action')}>
                                            <HiPencilSquare className={cx('icon-btn-1')} />
                                            <MdDeleteForever className={cx('icon-btn-2')} />
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
