import { APP_ACTIONS } from '../constants';

export default function (state, action) {
  console.log("reducer");
    switch (action.type) {
        case APP_ACTIONS.TOOL_BAR_SELECT:
            return state.set('toolBarSelected', action.payload);
        default:
            return state;
    }
}
