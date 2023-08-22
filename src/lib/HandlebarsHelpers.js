/**
 * A module with custom block helpers
 */

import Handlebars from "handlebars";

export default {
  em: (options) => `<em>${options.fn()}</em>`,

  isEqual: (data, nr) => {
    if (data === nr) {
      return true
    }
    return false
  },

  isSmall: (a, b) => {
    if (a <= b) {
      return true
    }
    return false
  },
  
  isNotEqual: (data, nr) => {
    if (data === nr) {
      return false
    }
    return true
  },

  isEqual4: (a, b, c, d) => {
    if (a === b && c === d) {
      return true
    }
    return false
  },
};