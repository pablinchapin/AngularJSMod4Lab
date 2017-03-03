angular.module('gitHubService', ['ngResource'])
.factory('gitHub', [
    '$resource', 
    function($resource){
        //return $resource('https://api.github.com/:action/angular/:id',
        return $resource('https://api.github.com/:action/:org/:id',
        {action:'@action', org:'@org', id:'@id'},
        {
            getAll:{
                method: 'GET',
                isArray: true,
                params: {action:'orgs', id:'repos'}
            },
            getDetail: {
                method: 'GET',
                isArray: true,
                params: {action:'repos'}
            }
        });
    }
]);
