import { SHOW_MODAL } from '../actions/types';

const initialState = {
    show: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                show: action.payload
            }
        default:
            return state;
    }
}