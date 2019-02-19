import {combineReducers} from 'redux'
import activeUser from './active-user';
import localFile from './local-file'


export default combineReducers({
  localFile,
  activeUser
})