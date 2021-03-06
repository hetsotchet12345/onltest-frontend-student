import * as actions from '../actions/exam.actions';

const initialState = {
    loading: false,
    error: false,
    code: 0,
    data: [],
    pageInfo: {
        currentPage: 0,
        itemsPerPage: 25,
        totalElements: 0,
        totalPages: 0
    }
}

export default function examReducer(state = initialState, { type, payload }) {
    switch (type) {
        case actions.FETCH_EXAM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.FETCH_EXAM_SUCCEEDED:
            return {
                ...state,
                loading: false,
                code: payload.code,
                data: payload.data,
                pageInfo: payload.pageInfo
            }
        case actions.FETCH_EXAM_FAILED:
            return {
                ...state,
                loading: false,
                error: payload.error
            }
        case actions.FETCH_EXAM_REFRESH:
            return {
                ...state,
                loading: false,
            }

        default:
            return state;
    }
}
