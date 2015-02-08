angular
    .module('wsInspector', [])
    .controller('headerController', ['$scope', function ($scope) {
        'use strict';

        $scope.connectionStatus = 'disconnected';

        $scope.$root.$on('p909:connection_open', function (evt, msg) {
            $scope.connectionStatus = msg;
        });

        $scope.$root.$on('p909:connection_close', function (evt, msg) {
            $scope.connectionStatus = msg;
        });

    }])
    .controller('applicationController', ['$scope', function ($scope) {
        'use strict';

        var
            webSocketObj,
            defaultPing = {
                'type': 'ping',
                'content': {}
            },
            defaultPong = {
                'type': 'pong',
                'content': {}
            };

        $scope.connectionSwitch = false;
        $scope.wsAddress = '';
        $scope.protocols = '';
        $scope.pongTimeout = 5000;
        $scope.pingFrame = JSON.stringify(defaultPing);
        $scope.pongFrame = JSON.stringify(defaultPong);
        $scope.messageBody = '';

        /**
         * Opens new websocket connection and bind events to UI, managing error's handling
         * @param url   String  the url to connect to (ws or wss)
         * @param protocols Array[String]   the protocols to ask the server for
         */
        function initNewWs(url, protocols) {
            // webSocketObj = WebSocketManager.createWebSocket(address, protocol)
            /*
            webSocketObj.on('message', function (e) {
                /*
                 check for protocol type
                 parse the message (pure text or array buffer, remote console emulation)
                 append content to log
                 *
            });
            webSocketObj.on('error', function (e) {
                /*
                 check error type
                 update connection status
                 append error to log ?
                 *
            });
            webSocketObj.on('pingPong', function (e) {
                /*
                 update ping/pong log
                 *
            });*/
        }

        $scope.onConnectionSwitch = function () {
            var msg,
                address = $scope.wsAddress,
                protocols = $scope.protocols.split(',');


            if ($scope.connectionSwitch) {
                protocols = $scope.protocols.split(',');
                address = $scope.wsAddress;
                initNewWs(address, protocols);
                msg = 'connection with ' + address + ' using [' + protocols.join(',') + ']';
                $scope.$emit('p909:connection_open', [msg]);
            } else {
                // webSocketObj.close()
                msg = 'connection with ' + address + ' closed';
                $scope.$emit('p909:connection_close', [msg]);
            }
        };

        $scope.setKeepAlive = function () {
            var
                currentPing = JSON.parse($scope.pingFrame),
                currentPong = JSON.parse($scope.pongFrame);

            console.log('keepalive changed: ', currentPing, currentPong);
            // webSocketObj.setPingFrame(currentPing)
            // webSocketObj.setPongFrame(currentPong)
        };

        $scope.sendMyMessage = function () {
            var
                myTxtMsg = $scope.messageBody;

            //webSocketObj.send(myTxtMsg);
            console.log('sending ' + myTxtMsg);

        };

    }]);
