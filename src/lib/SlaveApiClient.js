/*
 *    Copyright 2016 Rethink Robotics
 *
 *    Copyright 2016 Chris Smith
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

"use strict";

let xmlrpc = require('node-xmlrpc');

//-----------------------------------------------------------------------

class SlaveApiClient {

  constructor(host, port) {
    this._xmlrpcClient = xmlrpc.createClient({host: host, port: port});
  };

  requestTopic(callerId, topic, protocols) {
    let data = [callerId, topic, protocols];
    return new Promise((resolve, reject) => {
      this._xmlrpcClient.methodCall('requestTopic', data, (err, resp) => {
        if (err || resp[0] !== 1) {
          reject(err, resp);
        }
        else {
          resolve(resp);
        }
      });
    });
  };
};

//-----------------------------------------------------------------------

module.exports = SlaveApiClient;
