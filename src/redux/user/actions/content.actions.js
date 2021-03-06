export const FETCH_CONTENT_EXAM_REQUEST = 'FETCH_CONTENT_EXAM_REQUEST';
export const FETCH_CONTENT_EXAM_SUCCEEDED = 'FETCH_CONTENT_EXAM_SUCCEEDED';
export const FETCH_CONTENT_EXAM_FAILED = 'FETCH_CONTENT_EXAM_FAILED';
export const FETCH_CONTENT_EXAM_REFRESH = 'FETCH_CONTENT_EXAM_REFRESH';

export const fetchContentRequest = (data) => ({
    type: FETCH_CONTENT_EXAM_REQUEST,
    payload: data
})