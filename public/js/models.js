// this FILE requires that angular has been loaded
// thus if we make it depend on app.js,
// it will only execute after app.js dependecies (i.e. angular)
// have fired
define(['app', 'ngResource'], function(myApp){
    var todos = angular.module('modelsModule',['ngResource']);
    
    // CRUD Operations
    todos.factory('api', ['localStorageService','$resource', function(localStorage, $resource){
        
        var Todo = $resource('/todo/:key', {
            key: '@key'},{
                'update': {method: 'PUT'}
            });

        Todo.query(function(){
            console.log('arguments from query', arguments);
        });

        var api = {
            fetchTodos: function(){
                return Todo.query(function(data, err){
                    console.log(arguments); 
                });
            },
            deleteTodo: function(todo){
                return localStorage.remove(todo.key);
            },
            createTodo: function(todo){
                var newResource = new Todo(todo);
                newResource.key = todo.time.getTime();
                newResource.$save();
            },
            updateTodo: function(todo){
                return localStorage.set(todo.key, todo);
            }
            
        };
        return api;
    }]); 

    // storage of todos, refactor into storage and business logic as seperate factories
    todos.factory('todoStore', ['api', 'todoFilter', function(api, todoFilter){
        var todoStore = {};
        todoStore.newTodo = function(attributes){
            attributes.time = new Date();
            attributes.completed = false;
            api.createTodo(attributes);
            return attributes;
        };
        todoStore.removeTodo = function(todo){
            var todoCollection = todoStore.todos;
            if (localApi.deleteTodo(todo)){
                todoCollection.splice(todoCollection.indexOf(todo), 1);
            } else {
                throw "Error deleting todo!";
            }
            return todo;
        };
        todoStore.update = function(todo){
            if (api.updateTodo(todo)){
                return todo;
            } else {
                throw "Error updating todo!";
            }
        };
        todoStore.filterTodos = function(){
            return todoFilter(todoStore.todos, completionState, priority, date);
        };
        
        // kick it off!
        todoStore.todos = api.fetchTodos();

        return todoStore;
    }]);
    // this filter will be responsible for filtering by
    // completion state, date, and priority
    todos.filter('todo', ['$filter', function($filter){
        return function(todoCollection, completionState, priority, date){
            var filteredArray = [];
            
            // first check completion state
            for(var i = 0; i < todoCollection.length; i++){
                if (todoCollection[i].complete === completionState){
                    filteredArray.push(todoCollection[i]);
                }
            }

            filteredArray = $filter('orderBy')(filteredArray, 'date', false);
            filteredArray = $filter('orderBy')(filteredArray, 'priority', false);
            return filteredArray;
        }; 
    }]);

    todos.directive('updateTodo', ['todoStore', function(todoStore){
        var ddo = {
            // totodally superfluous but I wanted to write a directive
            // i'll write a sweet one for displaying extra metadata
            restrict: 'A',
            link: function($scope, element, attrs){
                $scope.$watch('todo', function(newVal, oldVal){
                    $scope.updateView(newVal);
                }, true);
            }

        };
        return ddo;
    }]);

    todos.controller('todoListController', ['$scope','todoStore','$interval',function($scope, todoStore, $interval){
        // import business logic from services
        $scope.todos = todoStore.todos;
        $scope.filterTodos = todoStore.filterTodos;
        $scope.addTodo = todoStore.newTodo;
        $scope.removeTodo = todoStore.removeTodo;
        $scope.validate = todoStore.validate;
        $scope.updateView = todoStore.update;

        // set up defaults for controls
        $scope.newTask = '';
        $scope.newPriority = 3;

        $interval(function(){
        }, 1000);

        $scope.toggleComplete = function(todo){
            todo.completed = !todo.completed;
        };

        $scope.add = function(){
            todoStore.newTodo({
                task: $scope.newTask,
                priority: $scope.newPriority
            });
            $scope.newTask = '';
            $scope.newPriority = 3;
        };

        
    }]);
    

});
