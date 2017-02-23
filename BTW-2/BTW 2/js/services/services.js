beyondTheWalls.service('services', ['$http','Api','$timeout','$cookies',function ($http,Api,$timeout,$cookies) {
    return{
        login : function($scope,callback) {
            $http
            ({
                url: Api.url + '/api/admin/login',
                method: "POST",
                data: {
                    "email": $scope.user.email,
                    "password": $scope.user.password
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        createGame : function ($scope,callback) {
            var challengeArr = [];
            $scope.challenges.forEach(function (col) {
                var tempObj = {
                    name:col.name,
                    details:col.details,
                    hint:col.hint,
                    points:parseInt(col.points),
                    challengeType:col.challengeType
                };
                if(col.hasOwnProperty('keywords')){
                    var tempKeywords = [];
                    col.keywords.forEach(function (c) {
                        tempKeywords.push(c.text);
                    });
                    tempObj.keywords = tempKeywords;
                }
                else if(col.hasOwnProperty('location')){
                    tempObj.location = col.location;
                    tempObj.latitute = col.geometry.geometry.location.lat();
                    tempObj.longitute = col.geometry.geometry.location.lng();
                    tempObj.distanceDiff = col.distanceDiff;
                }
                else if(col.hasOwnProperty('qrCode')){
                    tempObj.qrCode = col.qrCode;
                }
                else if(col.hasOwnProperty('textAnswer')){
                    var tempTextAns = [];
                    col.textAnswer.forEach(function (c) {
                        tempTextAns.push(c.text);
                    });
                    tempObj.textAnswer = tempTextAns;
                }
                challengeArr.push(tempObj);
            });
            var formData = new FormData();
            formData.append('accessToken',$cookies.get('token'));
            formData.append('name',$scope.game.name);
            formData.append('details',$scope.game.description);
            if($scope.game.isProtected){
                formData.append('is_protected',$scope.game.isProtected);
                formData.append('password',$scope.game.password);
            }
            else {
                formData.append('is_protected',$scope.game.isProtected);
            }
            formData.append('isOrderLock',$scope.game.isOrderLock);
            formData.append('gameImage',$scope.picFile);
            formData.append('maxPlayer',parseInt($scope.game.maxPlayer));
            formData.append('minPlayer',parseInt($scope.game.minPlayer));
            formData.append('startDate',$scope.datePicker.startDate);
            formData.append('endDate',$scope.datePicker.endDate);
            formData.append('challenges',JSON.stringify(challengeArr));
            $http
            ({
                url: Api.url + '/api/admin/createGame',
                method: "POST",
                headers: {
                    'Content-Type':undefined
                },
                data: formData
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        listGame : function (skip,limit,search,callback) {
            var data = {
                accessToken:$cookies.get('token'),
                limit:limit.toString(),
                skip:skip.toString()
            };
            if(search!=''){
                data.searchText=search;
            }
            $http
            ({
                url: Api.url + '/api/admin/gameListing',
                method: "POST",
                data: data
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        removeGame : function (id,callback) {
            $http
            ({
                url: Api.url + '/api/admin/removeGame',
                method: "POST",
                data: {
                    accessToken:$cookies.get('token'),
                    gameId:id
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        listPlayer : function (skip,limit,search,callback) {
            var data = {
                accessToken:$cookies.get('token'),
                limit:limit.toString(),
                skip:skip.toString()
            };
            if(search!=''){
                data.searchText = search;
            }
            $http
            ({
                url: Api.url + '/api/admin/playerListing',
                method: "POST",
                data: data
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        teamList : function (data,callback) {
            $http
            ({
                url: Api.url + '/api/admin/teamListing',
                method: "POST",
                data: {
                    accessToken:$cookies.get('token'),
                    gameId:data.gameId,
                    challengeId:data._id
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        listFeeds : function (callback) {
            $http
            ({
                url: Api.url + '/api/admin/feeds',
                method: "POST",
                data: {
                    accessToken:$cookies.get('token')
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        setFeaturedOrDelete : function (id,type,callback) {
            $http
            ({
                url: Api.url + '/api/admin/setFeaturedorDelete',
                method: "POST",
                data: {
                    accessToken:$cookies.get('token'),
                    feedId:id,
                    status:type
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        blockUnblockPlayer : function (id,status,callback) {
            $http
            ({
                url: Api.url + '/api/admin/blockOrUnblock',
                method: "POST",
                data: {
                    accessToken:$cookies.get('token'),
                    userId:id,
                    status:status
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        removePlayer : function (id,callback) {
            $http
            ({
                url: Api.url + '/api/admin/removePlayer',
                method: "POST",
                data: {
                    accessToken:$cookies.get('token'),
                    userId:id
                }
            }).success(function (response) {
                callback(response, 1);
            }).error(function (response) {
                callback(response, 0);
            });
        },
        datatable : function (id,options) {
            if ($.fn.DataTable.isDataTable('#'+id)) {
                angular.element('#'+id).DataTable().clear().destroy();
            }
            var dtInstance;
            $timeout(function(){
                if ( ! $.fn.dataTable ) return;
                dtInstance = $('#'+id).dataTable(options);
            },1100);
        }
    }
}]);

beyondTheWalls.factory('factories', ['SweetAlert','$state','$cookies',function (SweetAlert,$state,$cookies) {
    return{
        success : function(message) {
            SweetAlert.swal({
                title: message,
                type: "success"
            });
        },
        error : function (message) {
            SweetAlert.swal({
                title: message,
                type: "error"
            });
        },
        successCallback : function (message,callback) {
            SweetAlert.swal({
                title: message,
                type: "success"
            },function (isConfirm) {
                if(isConfirm){
                    callback();
                }
            });
        },
        errorCallback : function (message,callback) {
            SweetAlert.swal({
                title: message,
                type: "danger"
            },function () {
                callback();
            });
        },
        confirm : function (message,callback) {
            SweetAlert.swal({
                    title: message,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false},
                function(isConfirm){
                    if(isConfirm){
                        callback();
                    }
                });
        },
        logoutForm : function (message,callback) {
            SweetAlert.swal({
                    title: message,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false,
                    closeOnCancel: true
            },
                function(isConfirm){
                    if(isConfirm){
                        callback();
                    }
                });
        },
        unAuthorize: function(data) {
            if(data.statusCode == 401){
                $state.go('login');
                $cookies.remove('obj');
            }
        },
        hideSideMenu : function () {
            angular.element('.pace-done').addClass('mini-navbar');
            $cookies.put('sidemenu',true);
        }
    }
}]);

beyondTheWalls.service('$loading',['$timeout',function ($timeout) {
    return{
        start:function () {
            $timeout(function () {
                pleaseWait({
                    backgroundColor: '#fed14e',
                    loadingHtml: "<div class='sk-spinner sk-spinner-chasing-dots'><div class='sk-dot1'></div><div class='sk-dot2'></div></div>"
                });
                angular.element('.pg-loading-logo-header').remove();
                angular.element('.pg-loading-screen .pg-loading-html').css({
                    "margin-top":"0px"
                });
                angular.element('.sk-spinner-chasing-dots.sk-spinner').css({
                    "width": "50px",
                    "height": "50px"
                });
            });
        },
        finish:function (timeout) {
            if(!timeout){
                timeout = 0;
            }
            $timeout(function () {
                angular.element('body').removeClass('.pg-loading');
                angular.element('.pg-loading-screen').remove();
                angular.element('body.pg-loading').css({
                    "overflow": "visible"
                });
            },timeout);
        }
    }
}]);
