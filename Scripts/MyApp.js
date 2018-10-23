
(function (angular) {
    'use strict';
    /// <reference path='../dal/mockdb.js' />



    var employees =
        [
            {
                'FirstName': 'mike',
                'LastName': 'full',
                'ID': '0000000000',
                'Age': 25,
                'Superior': 'Avi Dayan',
                'Email': 'mike@gmail.com',
                'Potision': 'developer',
                'Image': 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Wayfarers&hairColor=Auburn&facialHairType=MoustacheMagnum&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Gray01&eyeType=Squint&eyebrowType=UnibrowNatural&mouthType=Tongue&skinColor=Light',
                'Equipment': { 'screen': 2, 'mouse': 1, 'keyboard': 1, 'printer': 1 }
            },
            {
                'FirstName': 'michael',
                'LastName': 'fuller',
                'ID': '0000000001',
                'Age': 23,
                'Superior': 'Avi Dayan',
                'Email': 'michal@gmail.com',
                'Potision': 'qa',
                'Image': 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Prescription01&hairColor=Brown&facialHairType=Blank&facialHairColor=Red&clotheType=Overall&clotheColor=PastelYellow&eyeType=Squint&eyebrowType=RaisedExcited&mouthType=Grimace&skinColor=Brown',
                'Equipment': { 'screen': 2, 'mouse': 1, 'keyboard': 1, 'printer': 1 }
            },
            {
                'FirstName': 'sara',
                'LastName': 'fuller',
                'ID': '0000000002',
                'Age': 35,
                'Superior': 'Avi Dayan',
                'Email': 'sara@gmail.com',
                'Potision': 'developer',
                'Image': 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Sunglasses&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=BlazerSweater&eyeType=Squint&eyebrowType=UpDownNatural&mouthType=Eating&skinColor=Yellow',
                'Equipment': { 'screen': 2, 'mouse': 1, 'keyboard': 1, 'printer': 1 }
            },
            {
                'FirstName': 'rachel',
                'LastName': 'nox',
                'Age': 32,
                'Superior': 'Avi Dayan',
                'Email': 'rachel@gmail.com',
                'ID': '0000000003',
                'Potision': 'developer',
                'Image': 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Kurt&hairColor=PastelPink&facialHairType=BeardMedium&facialHairColor=Red&clotheType=ShirtCrewNeck&clotheColor=PastelYellow&eyeType=Hearts&eyebrowType=AngryNatural&mouthType=Disbelief&skinColor=Light',
                'Equipment': { 'screen': 2, 'mouse': 1, 'keyboard': 1, 'printer': 1 }
            },
            {
                'FirstName': 'Avi',
                'LastName': 'Dayan',
                'ID': '0000000004',
                'Age': 25,
                'Superior': 'Eli Gor',
                'Email': 'mike@gmail.com',
                'Potision': 'CTO',
                'Image': 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Prescription02&hairColor=PastelPink&facialHairType=MoustacheFancy&facialHairColor=BlondeGolden&clotheType=BlazerShirt&clotheColor=Gray02&eyeType=EyeRoll&eyebrowType=UpDownNatural&mouthType=Tongue&skinColor=Pale',
                'Equipment': { 'screen': 2, 'mouse': 1, 'keyboard': 1, 'printer': 1 }
            }
        ];


    var warehouse = {
        'screen': 50,
        'mouse': 27,
        'keyboard': 30,
        'printer': 39
    };


    var newEmployee = {
        FirstName: '', LastName: '', ID: '', Age: 0, Superior: '', Email: '', Position: '', Image: '',
        Equipment: { 'screen': 0, 'mouse': 0, 'keyboard': 0, 'printer': 0 }, disabled: false
    };


    var EmployeeCMS = angular.module('EmployeeCMS', ['ngRoute']);

    EmployeeCMS.value("employeesDB", employees);
    EmployeeCMS.value("warehouseDB", warehouse);
    EmployeeCMS.constant("newEmployeeDB", newEmployee);

    EmployeeCMS.config(function ($routeProvider, $locationProvider) {
        console.log($routeProvider[0]);
        $routeProvider
            .when('/home', {
                templateUrl: 'Templates/Home.html',
                controller: 'homeController'
            })
            .when('/employeeDetails/:ID', {
                templateUrl: 'Templates/EmployeeDetails.html',
                controller: 'employeeDetailsController'
            })
            .when('/employeeDetails', {
                templateUrl: 'Templates/EmployeeDetails.html',
                controller: 'employeeDetailsController'
            })
            .when('/search', {
                templateUrl: 'Templates/Search.html',
                controller: 'searchController'
            })
            .otherwise({ redirectTo: '/home' })
        // configure html5 to get links working 
        $locationProvider.html5Mode(true);
    });

    EmployeeCMS.controller('homeController', function ($scope) {

        $scope.pageName = 'דף הבית';
    });

    EmployeeCMS.controller('employeeDetailsController', ['newEmployeeDB', 'warehouseDB', 'employeesDB', '$scope', '$routeParams',
        function (newEmployeeDB, warehouseDB, employeesDB, scope, routeParams) {
           
        //setting the default UI as a new employee
        scope.currentEmployeeCopy = angular.copy(newEmployeeDB);
        scope.currentEmployee = angular.copy(newEmployeeDB);
        scope.pageName = 'פרטי עובד חדש';
        scope.warehouse = warehouseDB;
        scope.currentEmployee.disabled = false;

        //debugger;

        //if (typeof $routeParams.ID === "undefined") {//create new Employee
        //    $scope.currentEmployeeCopy = angular.copy(newEmployee);
        //    $scope.currentEmployee = angular.copy(newEmployee);
        //    $scope.pageName = 'פרטי עובד חדש';
        //    $scope.warehouse = warehouse;
        //    $scope.currentEmployee.disabled = false;

        //}
        //else {

        //pull specific employee
        if (employees.findIndex(emp => emp.ID === routeParams.ID) != -1) {
            scope.currentEmployee = angular.copy(employeesDB.find(emp => emp.ID === routeParams.ID));
            scope.currentEmployeeCopy = angular.copy(scope.currentEmployee);
            console.log(scope.currentEmployee);

            scope.pageName = 'פרטי עובד';
            scope.warehouse = angular.copy(warehouseDB);
            scope.currentEmployee.disabled = true;
        }

        //}
        //this method currently not in use
        //$scope.toggleEnabled = function () {
        //    if (!$scope.currentEmployee.disabled) {//user click 'cancel'              
        //        $scope.currentEmployee = angular.copy($scope.currentEmployeeCopy);
        //    }                
        //    $scope.currentEmployee.disabled = !$scope.currentEmployee.disabled;
        //}

        scope.cancelEditEmployeeClick = function () {
           
            if (!scope.currentEmployee.disabled) {//user click 'cancel' 
                //reload the BU copy to UI                        
                scope.currentEmployee = angular.copy(scope.currentEmployeeCopy);
                scope.currentEmployee.disabled = true;
                scope.warehouse = warehouseDB;
            }
            else//user click 'Edit'
                scope.currentEmployee.disabled = false;                
        }

        scope.saveEmployee = function () {

            warehouseDB = scope.warehouse;
            scope.currentEmployee.disabled = !scope.currentEmployee.disabled;
            if (!routeParams.ID)//ID is undefined? so it's new Employee
            {
                employeesDB.push(scope.currentEmployee);
            }
            else {
                //save the employee to the employees array
                var employeeIndx = employees.findIndex(emp => emp.ID === routeParams.ID)
                employeesDB[employeeIndx] = scope.currentEmployee;
            }
        }




        scope.setEquipment = function (key) {

            if (!scope.currentEmployee.disabled) {
                if (scope.warehouse[key] > 0) {
                    scope.currentEmployee.Equipment[key]++;
                    scope.warehouse[key]--;
                }
            }
        }

        //$scope.mockUpdate = function () {
        //    warehouse = $scope.warehouse;
        //    users[1] = $scope.user;
        //}

        scope.updateWarehouse = function (key) {

            if (!scope.currentEmployee.disabled) {
                if (scope.currentEmployee.Equipment[key] > 0) {
                    scope.currentEmployee.Equipment[key]--;
                    scope.warehouse[key]++;
                }
            }
        }



    }]);

    EmployeeCMS.controller('searchController', ['employeesDB', '$scope', function (employeesDB, scope) {
        scope.pageName = 'חפש עובד';
        scope.employees = employeesDB;

    }]);

})(window.angular);