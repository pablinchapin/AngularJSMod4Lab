app.controller('labController', [
    '$scope', '$timeout', '$q', '$http', 'gitHub',
    function ($scope, $timeout, $q, $http, gitHub) {

        $scope.model = {
            number : 0,
            result : 'Ready'
        };

        //FUNCTIONS
        $scope.checkOddNumber = checkOddNumber;
        $scope.getRepos = getRepos;
        $scope.loadDetails = loadDetails;

        function checkOddNumber(input){
            $scope.model.result = 'Working ...';
            checkOddNumberHandler(input).then(function(result){
                $scope.model.result = "Success: "+result;
            },function(result){
                $scope.model.result = "Error: "+result;
            })
        }

        function checkOddNumberHandler(input){
            var defer = $q.defer();
            $timeout(function(){
                if(isNumberOdd(input)){
                    defer.resolve('Yes, an odd number');
                }else{
                    defer.reject('Not an odd number')
                }
            },2000);

            return defer.promise;
        }

        function isNumberOdd(input){
            return !isNaN(input) && input % 2 == 1;
        }

        function getRepos(){
            $scope.model.repos = gitHub.getAll({org:$scope.model.loadname});
        }

        function loadDetails(repoName){
            $scope.model.detail = null;
            $scope.model.detail = gitHub.getDetail({id:repoName});
        }


        /*
        OLD WAY
        function getRepos(){
            $http.get('https://api.github.com/orgs/angular/repos')
                .then(function(response){
                    $scope.model.repos = response.data;
                }, function(response){
                        $scope.model.repos = "Error: "+response.data.message;
                });
        }

        function loadDetails(repoName){
            $http.get('https://api.github.com/repos/angular/'+repoName)
                .then(function(response){
                    $scope.model.detail = response.data;
                    console.log(response.data);
                }, function(response){
                        $scope.model.detail = {error:true, message: 'Error: '+response.message};
                });
        }

        */

    }
]);