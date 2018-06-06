import { SHOW_MODAL } from './types';

export const showModal = (show) => dispatch => {
    dispatch({
        type: SHOW_MODAL,
        payload: show
    });

}

