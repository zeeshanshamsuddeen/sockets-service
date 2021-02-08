const constants = require('./shared/constants');

const config = {
  token: {
    [constants.FEDEX_APP_SERVICE_ID]: {
      secret: 'e7zx0ZgWPMHoKVnXDBN8Cz9Yho2suMHzrtcsgWmuQRtAkiKAKD6Vlx4Y4tes6JbTuwm7nK7MFlPLCqHEMuZKfswJSrqZghRHQ187UcXtB83VoTDaKlRrb5LIgmrFxqJw6dFgjTJB78zVyILBcM2Prq6aiy1XQLxrxFeSkJBLlPmpWszG4UboSqBYO4LQGNp8G1aR4U2gFT6bgOtsO0fUl4P2CMXEZiwlHmwzlXag1fW6Tpcoi7W73g7LbJjKN0p5',
      issuer: 'FedEx API 5lerOPijyojRSKbAvtNz0Qc3vN2gXGs0ukyQ2XjUJ1FHj8y6jhEkEIpN8k4gxqhb',
      audience: 'FedEx Web User PYvjLTpwiS8LwyysGqXezIwqZ20JsxKMDVFOk6SlNAB16Abex6pNkOy7O8KUbRNx',
    },
  },

  socketChannels: {
    [constants.FEDEX_APP_SERVICE_ID]: 'FedEx Channel',
  },
};

module.exports = config;
