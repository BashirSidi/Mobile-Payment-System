const info = (...params) => {
    console.log(...params);
};

class customError extends Error {
    constructor (message, status) {
      super(message)
      this.name = this.constructor.name
      this.status = status || 400
    }
  }

module.exports = {
info,
customError
};