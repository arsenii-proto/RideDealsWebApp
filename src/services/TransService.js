import _ from "underscore";

import login_ro from "../trans/login_ro";

var trans = {
  languages: {},
  put: (lang, data) => (
    !trans.languages[lang] && (trans.languages[lang] = {}),
    (trans.languages[lang] = _.extend(trans.languages[lang], {}, data))
  ),
  lang: lang => trans.languages[lang]
};

trans.put("ro", login_ro);

export default {
  install: function(Vue) {
    if (Vue.$OS) {
      var lang = "ro";
      var confLang = Vue.$OS.config.get({ name: "language" });

      if (confLang.language) {
        lang = confLang.language;
      }

      Object.defineProperty(Vue, "$TRANS", { get: () => trans.lang(lang) });
      Object.defineProperty(Vue.prototype, "$TRANS", {
        get: () => trans.lang(lang)
      });
    }
  }
};
