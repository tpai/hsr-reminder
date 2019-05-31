const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { createFormattedStrings } = require('./utils');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const handler = async (event) => {
  try {
    const {
      ENDPOINT         = '',
      WEBHOOK          = '',
      FROM             = 2,
      TO               = 7,
      DATE             = new Date().toISOString().slice(0, 10),
      TIMETABLE        = '12:00',
      TICKETCOUNT      = 1,
      CARRIAGECATEGORY = 0,
      ONLYSHOWDISCOUNT = 0,
      COLLEGESTUDENTS  = 0,
      DEVICEID         = '',
      DEVICEIDHASH     = '',
      DEVICECATEGORY   = '',
      APPVERSION       = '',
      PARAMETERVERSION = '',
    } = process.env;

    const params = new URLSearchParams();
    params.append('from',             FROM);
    params.append('to',               TO);
    params.append('date',             DATE);
    params.append('timetable',        TIMETABLE);
    params.append('ticketcount',      TICKETCOUNT);
    params.append('carriagecategory', CARRIAGECATEGORY);
    params.append('onlyshowdiscount', ONLYSHOWDISCOUNT);
    params.append('collegestudents',  COLLEGESTUDENTS);
    params.append('deviceid',         DEVICEID);
    params.append('deviceidhash',     DEVICEIDHASH);
    params.append('devicecategory',   DEVICECATEGORY);
    params.append('appversion',       APPVERSION);
    params.append('parameterversion', PARAMETERVERSION);

    // query trains
    const json = await fetch(ENDPOINT, {
      method: 'POST',
      body: params,
    })
      .then(res => res.json());
    const {
      resultValue: {
        trains,
        dataStatus,
        dataStatusMessage,
      },
    } = json;
    if (dataStatus === '000' && trains.length !== 0) {
      const params = createFormattedStrings(trains.slice(0, 3));
      // post webhook
      const output = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      }).then(res => res.text());

      console.log(output);
    } else {
      throw new Error(dataStatusMessage);
    }
  } catch (err) {
    console.log(err);
  }
};

if (process.env.NODE_ENV === 'development') {
  handler({ test: 'value' });
}

exports.handler = handler;
