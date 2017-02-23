/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
beyondTheWalls.constant("Api", {
    "url": ""
});

beyondTheWalls.constant('APP_REQUIRES', {
     // jQuery based and standalone scripts
     scripts: {
          'login-controller': ['js/controllers/login/login.js'],
          'dashboardCtrl-controller': ['js/controllers/dashboard/dashboard.js'],
          'createGameCtrl-controller': ['js/controllers/game/create.js'],
          'gameListCtrl-controller': ['js/controllers/game/list.js'],
          'playerListCtrl-controller': ['js/controllers/player/list.js'],
          'teamListCtrl-controller': ['js/controllers/teamList/teamList.js'],
          'feedsListCtrl-controller': ['js/controllers/feeds/feeds.js']
     },
     // Angular based script
     modules: [
          {
               name: 'ngFileUpload',
               files: ['js/plugins/ng-file-upload/ng-file-upload.min.js']
          },
          {
               name: 'bootstrapLightbox',
               files: ['js/plugins/angular-bootstrap-lightbox/angular-bootstrap-lightbox.min.css',
                      'js/plugins/angular-bootstrap-lightbox/angular-bootstrap-lightbox.min.js']
          },
          {
               name: 'ui.select',
               files: ['js/plugins/angular-ui-select/dist/select.css',
                         'js/plugins/angular-ui-select/dist/select.js']
          },
          {
               name:'ngAutocomplete',
               files: ['js/plugins/ngAutocomplete/ngAutocomplete.js']
          },
          {
               name:'ngTagsInput',
               files: ['js/plugins/ng-tags-input/ng-tags-input.css','js/plugins/ng-tags-input/ng-tags-input.js']
          },
          {
               name:'daterangepicker',
               files: ['js/plugins/angular-daterange-picker/daterangepicker.js',
               'js/plugins/angular-daterange-picker/angular-daterangepicker.js','js/plugins/angular-daterange-picker/daterangepicker.css']
          }
     ]
});