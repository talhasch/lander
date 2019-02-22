import {combineReducers} from 'redux';

import user from './user';
import dialogs from './dialogs';

export default combineReducers({
  user,
  dialogs
})