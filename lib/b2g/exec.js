/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Execute a cordova command.  It is up to the native side whether this action
 * is synchronous or asynchronous.  The native side can return:
 *      Synchronous: PluginResult object as a JSON string
 *      Asynchrounous: Empty string ""
 * If async, the native side will cordova.callbackSuccess or cordova.callbackError,
 * depending upon the result of the action.
 *
 * @param {Function} success    The success callback
 * @param {Function} fail       The fail callback
 * @param {String} service      The name of the service to use
 * @param {String} action       Action to be run in cordova
 * @param {String[]} [args]     Zero or more arguments to pass to the method
 */

var plugins = {
    "Device": require('cordova/plugin/b2g/device'),
    "NetworkStatus": require('cordova/plugin/b2g/network'),
    "Accelerometer" : require('cordova/plugin/b2g/accelerometer')
    //"Notification" : require('cordova/plugin/b2g/notification')
};

module.exports = function(success, fail, service, action, args) {
    try {
        console.error("exec:call plugin:"+service+":"+action);
        plugins[service][action](success, fail, args);
    }
    catch(e) {
        console.error("missing exec: " + service + "." + action);
        console.error(args);
        console.error(e);
        console.error(e.stack);
    }
};

