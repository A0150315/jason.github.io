/// <reference path="./index.d.ts" />

import * as angular from 'angular';

var myApp = angular.module("init", ["exampleApp.Services", "exampleApp.Directives"]);

myApp.constant("startTime", new Date().toLocaleString());
myApp.config(function (startTime: String) {
    console.log("Main module config: " + startTime);
});
myApp.run(function (startTime: String) {
    console.log("Main module run: " + startTime);
})

angular.module("exampleApp.Directives", [])
    .directive("highlight", function ($filter) {
        var dayFilter = $filter("dayName");
        return function (scope: any, element, attrs) {
            if (dayFilter(scope.day) == attrs["highlight"]) {
                element.css("color", "red");
            }
        }
    })

var now = new Date();
myApp.value("nowValue", now);
angular.module("exampleApp.Services", [])
    .service("days", function (this: Day, nowValue: Date) {
        this.today = nowValue.getDay();
        this.tomorrow = this.today + 1;
    })
    .config(function () {
        console.log("Services module config: (no time)");
    })
    .run(function (startTime: string) {
        console.log("Services module run: " + startTime);
    })