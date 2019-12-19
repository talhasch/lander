import {Model} from 'radiks-patch';

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

export class UserBucketUrl extends Model {
  static className = 'user_bucket_url';
  static schema = {
    username: {
      type: String,
      decrypted: true,
    },
    url: {
      type: String,
      decrypted: true,
    }
  }
}
