

$(document).ready(function () {
    $('input.typeahead').typeahead({
        autoSelect: true,
        minLength: 2,
        delay: 400,
        source: function (query, process) {
            $.ajax({
                url: '/Client/ClientsListForAutocomplete',
                data: { sstr: query },
                dataType: 'json'
            })
                .done(function (response) {
                    // get the response and create a new array of Strings
                    var names = $.map(response, function (item) {
                        return `${item.lastName}  ${item.firstName} - ${item.id}`;
                    });

                    return process(names);
                });

        },
        updater: function (item) {
         
            alert(item.match(/\d+/g).map(Number)  +"ת''ז");
            return item;
        }

    });
});
