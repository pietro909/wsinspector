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

        $scope.connectionSwitch = false;
        $scope.wsAddress = '';
        $scope.protocols = '';

        $scope.onConnectionSwitch = function () {
            var msg,
                address = $scope.wsAddress,
                protocols = $scope.protocols.split(',');


            if ($scope.connectionSwitch) {
                protocols = $scope.protocols.split(',');
                address = $scope.wsAddress;
                // call WebSocket factory
                msg = 'connection with ' + address + ' using [' + protocols.join(',') + ']';
                $scope.$emit('p909:connection_open', [msg]);
            } else {
                // call WebSocket.close()
                msg = 'connection with ' + address + ' closed';
                $scope.$emit('p909:connection_close', [msg]);
            }
        };

    }]);
