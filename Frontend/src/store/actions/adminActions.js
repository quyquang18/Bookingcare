import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    handleGetAllUsers,
    deleteUserService,
    editUserService,
} from '~/services/userService';
import { toast } from 'react-toastify';
//Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let resGender = await getAllCodeService('gender');
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            if (resGender && resGender.errCode === 0) {
                dispatch(fetchGenderSuccess(resGender.data));
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log(error);
        }
    };
};
export const fetchGenderSuccess = (dataPosition) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: dataPosition,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

//Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let resPosition = await getAllCodeService('Position');
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            if (resPosition && resPosition.errCode === 0) {
                dispatch(fetchPositionSuccess(resPosition.data));
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log(error);
        }
    };
};
export const fetchPositionSuccess = (dataPosition) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: dataPosition,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});
//Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let resRole = await getAllCodeService('Role');
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            if (resRole && resRole.errCode === 0) {
                dispatch(fetchRoleSuccess(resRole.data));
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log(error);
        }
    };
};
export const fetchRoleSuccess = (dataRole) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: dataRole,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});
//Create user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let resCreate = await createNewUserService(data);
            if (resCreate && resCreate.errCode === 0) {
                dispatch(createUserSuccess(resCreate));
            } else {
                dispatch(createUserFailed(resCreate));
            }
        } catch (error) {
            dispatch(createUserFailed());
            console.log(error);
        }
    };
};
export const createUserSuccess = (res) => ({
    type: actionTypes.CREAT_USER_SUCCESS,
    data: res,
});
export const createUserFailed = (res) => ({
    type: actionTypes.CREAT_USER_FAILED,
    data: res,
});
//Delete user
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let resDelete = await deleteUserService(userId);
            // console.log(resDelete);
            if (resDelete && resDelete.errCode === 0) {
                dispatch(deleteUserSuccess(resDelete));
            } else {
                dispatch(deleteUserFailed(resDelete));
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log(error);
        }
    };
};
export const deleteUserSuccess = (res) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    data: res,
});
export const deleteUserFailed = (res) => ({
    type: actionTypes.DELETE_USER_FAILED,
    data: res,
});

//edit user

export const eidtUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let resEdit = await editUserService(userId);
            // console.log(resEdit);
            if (resEdit && resEdit.errCode === 0) {
                dispatch(editUserSuccess(resEdit));
                toast.success('Edit user success!', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else {
                dispatch(editUserFailed(resEdit));
                toast.error('Edit user failed!', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }
        } catch (error) {
            dispatch(editUserFailed());
            console.log(error);
        }
    };
};
export const editUserSuccess = (res) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = (res) => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fechAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.user.reverse()));
            }
        } catch (error) {
            dispatch(getAllUserFailed());
            console.log(error);
        }
    };
};
export const getAllUserSuccess = (users) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: users,
});
export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED,
});