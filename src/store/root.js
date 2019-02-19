import {combineReducers} from 'redux'
import activeUser from './activeUser';
import localFile from './local-file'


export default combineReducers({
  localFile,
  activeUser
})