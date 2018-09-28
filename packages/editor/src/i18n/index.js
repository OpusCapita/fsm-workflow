import * as en from './en';
import * as de from './de';

// in case another language is added list it here
const bundles = { en, de };

export default Object.keys(bundles).reduce((acc, lang) => ({
  ...acc,
  [lang]: {
    fsmWorkflowEditor: {
      ui: bundles[lang]
    }
  }
}), {});
