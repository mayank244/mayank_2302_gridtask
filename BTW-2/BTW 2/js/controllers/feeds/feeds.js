beyondTheWalls.controller('feedsListCtrl', ['$scope','$rootScope','$cookies','services','factories','$state','$stateParams','$loading','$timeout','Lightbox','$uibModal',function ($scope,$rootScope,$cookies,services,factories,$state,$stateParams,$loading,$timeout,Lightbox,$uibModal) {

    services.listFeeds(function (response, status) {
        $loading.start();
        if (status == 1) {
            $scope.feedList = response.data;
            $scope.images = [];
            response.data.forEach(function (col) {
                $scope.images.push({
                    url: col.image ? col.image.original : "img/no-image-available.jpg",
                    thumbUrl: col.image ? col.image.thumbnail : "img/no-image-available.jpg"
                });
            });
            services.datatable('feedsTable',{});
            $loading.finish();
        }
        else {
            factories.error(response.message);
            factories.unAuthorize(response);
            $loading.finish();
        }
    });

    $scope.setFeatured = function (id,type) {
        factories.confirm("Do you want to mark this feed featured ?",function () {
            services.setFeaturedOrDelete(id,type,function (response,status) {
                $loading.start();
                if(status == 1){
                    $loading.finish();
                    factories.successCallback(response.message,function () {
                        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                    });
                }
                else {
                    factories.error(response.message);
                    factories.unAuthorize(response);
                    $loading.finish();
                }
            });
        });
    };

    $scope.removePlayer = function (id,type) {
        factories.confirm("Do you want to remove this feed ?",function () {
            services.setFeaturedOrDelete(id, type, function (response, status) {
                $loading.start();
                if (status == 1) {
                    $loading.finish();
                    factories.successCallback(response.message, function () {
                        $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false, notify: true});
                    });
                }
                else {
                    factories.error(response.message);
                    factories.unAuthorize(response);
                    $loading.finish();
                }
            });
        });
    };
    
    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
    };

    $scope.showFeed = function (data) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'feeds-template.html',
            controller: 'showFeedCtrl',
            size: '',
            resolve: {
                items: function () {
                    return {
                        details:data
                    };
                }
            }
        });
    };
    
}]);

beyondTheWalls.controller('showFeedCtrl', function ($uibModalInstance,$scope,items) {
    $scope.video = items.details;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});