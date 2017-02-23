beyondTheWalls.controller('playerListCtrl', ['$scope','$rootScope','$cookies','services','factories','$state','$stateParams','$loading','$timeout','Lightbox','$uibModal',function ($scope,$rootScope,$cookies,services,factories,$state,$stateParams,$loading,$timeout,Lightbox,$uibModal) {
    
    /* Initialize list options */
    $scope.listOptions = {
        pageNo:1,
        limit:5,
        total:null,
        maxSize:5
    };

    $scope.search = '';

    /* function to generate table with pagination */
    $scope.listPlayerFunc = function () {
        if($scope.listOptions.pageNo == 1){
            $scope.listOptions.skip = 0*$scope.listOptions.limit;
        }
        else{
            $scope.listOptions.skip = ($scope.listOptions.pageNo-1)*$scope.listOptions.limit;
        }
        $loading.start();
        services.listPlayer($scope.listOptions.skip,$scope.listOptions.limit,$scope.search,function (response, status) {
            if (status == 1) {
                $scope.playerList = response.data.list;
                $scope.listOptions.total = response.data.totalCount;
                $scope.images = [];
                response.data.list.forEach(function (col) {
                    $scope.images.push({
                        url: col.profilePic ? col.profilePic.original : "img/no-image-available.jpg",
                        thumbUrl: col.profilePic ? col.profilePic.thumbnail : "img/no-image-available.jpg"
                    });
                });

                // call info table

                $scope.tableInfo();

                $loading.finish();
            }
            else {
                factories.error(response.message);
                factories.unAuthorize(response);
                $loading.finish();
            }
        });
    };

    /* Call Function to paginate */
    $scope.listPlayerFunc();

    /* function to call after page change */
    $scope.pageChanged = function () {
        $scope.listPlayerFunc();
    };

    /* function to show table info */
    $scope.tableInfo = function () {
        $scope.pg_options = {
            start:'',
            end:''
        };
        if($scope.listOptions.currentPage == 0){
            $scope.pg_options.start = 1;
            $scope.pg_options.end = $scope.listOptions.limit;
        }
        else {
            $scope.pg_options.start = $scope.listOptions.skip+1;
            $scope.pg_options.end = $scope.listOptions.skip+$scope.playerList.length;
        }
    };

    $scope.blockUnblockPlayer = function (id,sts,index) {
        var message = "Do you want to "+sts+" this player ?";
        factories.confirm(message,function () {
            services.blockUnblockPlayer(id,sts,function (response,status) {
                if(status == 1){
                    factories.successCallback(response.message,function () {
                        if(sts == 'Block'){
                            $scope.playerList[index].is_block = true;
                        }
                        else {
                            $scope.playerList[index].is_block = false;
                        }
                    });
                }
                else {
                    factories.error(response.message);
                    factories.unAuthorize(response);
                }
            });
        });
    };

    $scope.removePlayer = function (id,index) {
        factories.confirm("Do you want to remove this player ?",function () {
            services.removePlayer(id,function (response,status) {
                if(status == 1){
                    factories.successCallback(response.message,function () {
                        $scope.listPlayerFunc();
                    });
                }
                else {
                    factories.error(response.message);
                    factories.unAuthorize(response);
                }
            });
        });
    };

    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
    };

}]);