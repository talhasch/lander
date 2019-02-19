import {combineReducers} from 'redux'
import user from './user';
import localFile from './local-file'


export default combineReducers({
  localFile,
  user
})