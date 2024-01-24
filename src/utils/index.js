const axios = require('axios');
const fst = require('fs')
const os = require('os')

const { API_URL } = require('../network/constants');

const utils = {
  exportWalletToJsonFile: (fileName, options) => {
    try {
      const homeDir = os.homedir();
      const fileContents = JSON.stringify(options, null, 2)
      fs.writeFileSync(
        `${homeDir}/${fileName}.json`,
        fileContents
      );
      console.info('Saved to :', `${homeDir}/${fileName}.json`);
    } catch (error) {
      console.error(error);
    }
  },
};

export default utils
