import * as en from './en';
import * as de from './de';
import * as fi from './fi';
import * as no from './no';
import * as ru from './ru';
import * as sv from './sv';
import * as da from './da';

const bundles = { en, de, fi, no, ru, sv, da };

export default Object.keys(bundles).reduce((acc, lang) => ({
  ...acc,
  [lang]: {
    fsmWorkflowEditor: {
      ui: bundles[lang]
    }
  }
}), {});
