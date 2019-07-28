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