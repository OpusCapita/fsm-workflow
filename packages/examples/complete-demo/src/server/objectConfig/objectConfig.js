import { resolve } from 'path';
import { readJSONFromFile } from '../utils';

const objectConfigurationPath = resolve(__dirname, './objectConfiguration.json');

class ObjectConfig {
  init = async function() {
    this.config = await readJSONFromFile(objectConfigurationPath)
  }
  getConfig() {
    return this.config
  }
}

export default new ObjectConfig();
