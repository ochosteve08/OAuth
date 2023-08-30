import { logEvents } from "./logger.js";

export const logResponseCookies = (req, res, next) => {
  let oldCookie = res.cookie;

  res.cookie = function (name, value, options) {
    logEvents(
      `Response cookie set: ${name}=${JSON.stringify(
        value
      )}; Options: ${JSON.stringify(options)}`,
      "responseCookies.log"
    );
    oldCookie.apply(res, arguments);
  };

  const oldClearCookie = res.clearCookie;

  res.clearCookie = function (name, options) {
    logEvents(
      `Clear Cookie: ${name}; Options: ${JSON.stringify(options)}`,
      "responseCookies.log"
    );
    oldClearCookie.apply(res, arguments);
  };
  next();
};
