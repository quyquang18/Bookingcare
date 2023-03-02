import actionTypes from './actionTypes';
import { getAllCodeService } from '~/services/userService';

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
