import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    handleGetAllUsers,
    deleteUserService,
    editUserService,
} from '~/services/userService';
import { getAllDoctor, updateInforDoctor, getTopDoctorHomeService } from '~/services/doctorService';
import { toast } from 'react-toastify';
import { INFOR_DOCTOR } from '~/utils';
import { getAllSpecialty } from '~/services/specialtyService';
import { getAllClinic, getTopClinic } from '~/services/ClinicService';
import { getAllPromotion } from '~/services/promotionService';
import { changeStatusReactLoading } from '~/store/actions';
//Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let resGender = await getAllCodeService(INFOR_DOCTOR.GENDER);
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
            let resPosition = await getAllCodeService(INFOR_DOCTOR.POSITION);
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
            let resRole = await getAllCodeService(INFOR_DOCTOR.ROLE);
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
            dispatch(changeStatusReactLoading(true));
            let resCreate = await createNewUserService(data);
            dispatch(changeStatusReactLoading(false));
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
            dispatch(changeStatusReactLoading(true));
            let resDelete = await deleteUserService(userId);
            dispatch(changeStatusReactLoading(false));
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
            dispatch(changeStatusReactLoading(true));
            let resEdit = await editUserService(userId);
            dispatch(changeStatusReactLoading(false));
            if (resEdit && resEdit.errCode === 0) {
                dispatch(editUserSuccess(resEdit));
                toast.success('Edit user success!');
            } else {
                dispatch(editUserFailed(resEdit));
                toast.error('Edit user failed!');
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

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('12');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTOR_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTOR_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch(changeStatusReactLoading(true));
            let res = await updateInforDoctor(data);
            dispatch(changeStatusReactLoading(false));
            if (res && res.errCode === 0) {
                toast.success('Save Detail Infor Doctor Succeed!');
                dispatch({
                    type: actionTypes.UPDATE_INFOR_DOCTOR_SUCCESS,
                });
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTOR_FAILED: ', error);
            toast.error('Save Detail Infor Doctor Failed!');
            dispatch({
                type: actionTypes.UPDATE_INFOR_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchAllScheduleTimes = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService(INFOR_DOCTOR.TIME);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};
export const fetchRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCodeService(INFOR_DOCTOR.PRICE);
            let resPayMent = await getAllCodeService(INFOR_DOCTOR.PAYMANET);
            let resProvince = await getAllCodeService(INFOR_DOCTOR.PROVINCE);
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayMent &&
                resPayMent.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_INFOR_DOCTOR_SUCCESS,
                    dataPrice: resPrice.data,
                    dataPayment: resPayMent.data,
                    dataProvince: resProvince.data,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_INFOR_DOCTOR_FAILED,
            });
            console.log(error);
        }
    };
};
export const fetchAllSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty('simple');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_ALL_SPECIALTY_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
            });
        }
    };
};
export const fetchAllClinic = (mode) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic(mode);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_ALL_CLINIC_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_ALL_CLINIC_FAILED,
            });
        }
    };
};
export const fetchTopClinic = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopClinic(limit);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_CLINIC_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_TOP_CLINIC_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_TOP_CLINIC_FAILED,
            });
        }
    };
};
export const fetchAllKeyPromotion = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService(INFOR_DOCTOR.PROMOTION);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_PROMOTION_KEY_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_PROMOTION_KEY_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_PROMOTION_KEY_FAILED,
            });
        }
    };
};
export const fetchListPromotion = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPromotion();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PROMOTION_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_ALL_PROMOTION_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_ALL_PROMOTION_FAILED,
            });
        }
    };
};