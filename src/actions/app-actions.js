import { APP_ACTIONS } from '../constants';

export function selectToolbar(key) {
  console.log(key);
    return {
        type: APP_ACTIONS.TOOL_BAR_SELECT,
        payload: key
    }
}
