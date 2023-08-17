/**
 * A module with custom block helpers
 */

import Handlebars from "handlebars";

export default {
  em: (options) => `<em>${options.fn()}</em>`,
};