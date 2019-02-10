module.exports = {
  toBoolean(value) {
    let strValue = String(value).toLowerCase();
    strValue =
      ((!isNaN(strValue) && strValue !== '0') &&
        strValue !== '' &&
        strValue !== 'null' &&
        strValue !== 'undefined')
        ? '1'
        : strValue;
    return strValue === 'true' || strValue === '1';
  },
  getParam(defaultValue, paramsKey, mandatory) {
    // Each arg will have the entire string value between
    // whitespace, dashes and all.

    let result = null;
    process.argv.forEach(function(arg) {
      // Check if the arg starts with the PARAM_KEY
      // and update the result if we find it
      if (arg.indexOf(paramsKey) === 0) {
        result = arg.substring(paramsKey.length + 1);
      }
    });

    if (result !== null) {
      return result;
    } else if (!mandatory) {
      return defaultValue;
    }
    else {
      const error = `Param : ${paramsKey} is mandatory.`;
      console.error(error);
      throw error;
    }
  },
};
