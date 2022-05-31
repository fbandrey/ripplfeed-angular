Object.assign(String.prototype, {

  crop(chars = 40, delimiter = '...') {
    if (this.length > chars) {
      const textSize = chars - delimiter.length;
      return this.substr(0, textSize) + delimiter;
    }
    return this.valueOf();
  },

  middleCrop(chars = 40, delimiter = '...') {
    if (this.length > chars) {
      const middle = (chars - delimiter.length) / 2;
      return this.substr(0, middle) + delimiter + this.substr(this.length - middle, this.length);
    }
    return this.valueOf();
  },

});
