import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    positions: [],
    roles: [],
    arrUser: [],
    responCreateUser: {},
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            state.isLoadingGender = false;
            return {
                ...state,
            };
        //Position
        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoadingPosition = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            state.isLoadingPosition = false;
            return {
                ...state,
            };
        //Role
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoadingRole = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            state.isLoadingRole = false;
            return {
                ...state,
            };
        //All User
        case actionTypes.GET_ALL_USER_SUCCESS:
            state.arrUser = action.data;
            return {
                ...state,
            };
        case actionTypes.GET_ALL_USER_FAILED:
            state.arrUser = [];
            return {
                ...state,
            };
        //Create user
        case actionTypes.CREAT_USER_SUCCESS:
            state.responCreateUser = action.data;
            return {
                ...state,
            };
        case actionTypes.CREAT_USER_FAILED:
            state.responCreateUser = action.data;
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
