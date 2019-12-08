function get_client_by_term(term){
    $.get('/Client/ClientsListForAutocomplete', { term: term }, function (data) {
        return data;
    });
}

$(document).ready(function () {

    $("#typehead").select2({
        placeholder: "My Select 2",
        multiple: false,
        minimumInputLength: 1,
        ajax: {
            url: "/Client/ClientsListForAutocomplete",
            dataType: 'json',
            quietMillis: 250,
            cache: true,
            data: 
                function (term,page) {
                    return {
                        term: term
                    };
               
        },
          
            results: function (data, page) {
                return { results: data };
            },
          
        },
        formatResult: function (element) {
            return element.lastName + " " + element.firstName;
        },
        formatSelection: function (element) {
            $("#client_serial").val(element.serial);
            return element.lastName + " " + element.firstName;
        },
        escapeMarkup: function (m) {
            return m;
        }
    });

    //var my_data;
    //var s_options = {
    //    minimumInputLength: 2,
    //    allowClear: false,
    //    formatSelection: function (item) {
    //        return '<div class="select2-tag-cust" title="' + item.text + '">' + item.text + '</div>';
    //    },
    //    query:
    //        function (query) {
    //        get_client_by_term(query.term).done(function (dataObj) {
    //            //  console.log(dataObj);
    //            my_data = dataObj;
    //            $.each(dataObj, function () {
    //                this.text = ([this.LastName, this.FirstName]).join(" ");
    //                this.id = this.Serial;
    //            });
    //            query.callback({
    //                results: dataObj
    //            });
    //        });

    //    }
    //};

    //$("#typehead").select2(s_options).on('change', function (e) {

    //    var vvv = my_data.filter(function (my_data) {
    //        return my_data.id === e.val;
    //    });
    //    $("#client_serial").val(e.val);
    ////    on_select_client(e.val);


    //});

    //$("#typehead2").select2(s_options).on('change', function (e) {

    //    var vvv = my_data.filter(function (my_data) {
    //        return my_data.id === e.val
    //    });
    //    $("#client_serial").val(e.val);
    //    //  on_select_client(e.val);


    //});


    //$('input.typeahead').typeahead({
    //    autoSelect: true,
    //    minLength: 2,
    //    delay: 400,
    //    source: function (query, process) {
    //        $.ajax({
    //            url: '/Client/ClientsListForAutocomplete',
    //            data: { sstr: query },
    //            dataType: 'json'
    //        })
    //            .done(function (response) {
    //                // get the response and create a new array of Strings
    //                var names = $.map(response, function (item) {
    //                    return `${item.lastName}  ${item.firstName}- ${item.id}`;
    //                });

    //                return process(names);
    //            });

    //    },
    //    updater: function (item) {
         
    //      //  alert(item.match(/\d+/g).map(Number) + "ת''ז");
    //        $("#search_client").val("dddddddddddddddddd");
    //        document.getElementById('search_client').value = 'text to be displayed'; 
    //        return item;
    //    }

    //});



});
