import {Model} from 'radiks';

export class Alias extends Model {
  static className = 'alias';

  static schema = {
    username: {
      type: String,
      decrypted: true,
    },
    alias: {
      type: String,
      decrypted: true
    }
  }
}

export class UserPref extends Model {
  static className = 'user_pref';
  static schema = {
    username: {
      type: String,
      decrypted: true,
    },
    directory: {
      type: Boolean,
      decrypted: true,
    }
  }
}