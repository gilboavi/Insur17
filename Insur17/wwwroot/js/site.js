// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//$(document).ready(function () {
//    $('input.typeahead').typeahead({
//        autoSelect: true,
//        minLength: 2,
//        delay: 400,
//        source: function (query, process) {
//            $.ajax({
//                url: '/Client/ClientsListForAutocomplete',
//                data: { sstr: query },
//                dataType: 'json'
//            })
//                .done(function (response) {
//                    // get the response and create a new array of Strings
//                    var names = $.map(response, function (item) {
//                        return item.name + '-' + item.id;
//                    });

//                    return process(names);
//                });

//        },
//        updater: function (item) {
//            alert(item.match(/\d+/g).map(Number));
//            return item;
//        }

//    });
//});

