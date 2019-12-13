var get_data_by_params = function ajax(options) {
    return new Promise(function (resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
};

function build_table(my_array) {
    //var result = Object.keys(my_array).map(function (key) {
    //    return [Number(key), my_array[key]];
    //});
    // Parse the JSON so we can access what we need.
  //  my_array.foreach(element => alert(element));
    var parsed = JSON.stringify(my_array);
   // var parsed = JSON.parse(my_array);

    // Get the amount of objects inside 'watson_tone' so we can loop through each one.
    //var my_count = parsed.count();	//var count = Object.keys(parsed.watson_tone).length;

    var count = my_array.length;
    // Make some strings to include in our output.
    var tableHeader = "<table class='table'><tr>" +
        "<th>תאריך</th>" +
        "<th>תקציר השיחה</th>" +
        "<th>מטרת השיחה</th>" +
        "<th>שם מטפל</th>" +
        "<th>סטטוס</th>" +
        "<th>מספר פוליסה</th>" +
    "</tr> ";
    var tableContent = "";

    // Loop through the JSON and output each row in to a string.
    for (i = 0; i < count; i++) {
        tableContent = tableContent + "<tr>" +
            "<td>" + my_array[i].datee + "</td>" +
            "<td>" + my_array[i].summaryOfConversation + "</td>" +
            "<td>" + my_array[i].goalOfTalkName + "</td>" +
            "<td>" + my_array[i].userName + "</td>" +
            "<td>" + my_array[i].typeFollowupConversationName + "</td>" +
            " <td>" + my_array[i].get_call_name + "</tr>";
     
    }

    var tableFooter = "</table>";

    // Get div and output the HTML. You can include these HTML strings straight in to your emailText variable.
    document.getElementById("coversationDiv").innerHTML = tableHeader + tableContent + tableFooter;
}

function create_table(my_array) {
   
    var result = Object.keys(my_array).map(function (key) {
        return [Number(key), my_array[key]];
    });
    var table = "";
    //my_array.forEach(obj =>

    //    Object.keys(obj).forEach(function (key) {

    //  //   alert(key, obj[key]);

    //    }));
   
}


function get_data_by_params2(params) {
    $.get(params.url, { client_serial: params.data }, function (data) {
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
                function (term, page) {
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

    // menu
    (function () {
        var client_serial1 = parseInt( $('#client_serial').val()  );
        var funcs = {
            stam: function () {


                var params = {
                 //   url: "Conversation/GetConversationListByClientSerial",
                    url: "Client/GetFullClientByClientSerial" ,
                    data: { client_serial: parseInt($('#client_serial').val()) }
                };
                get_data_by_params(params).then(function (data) {
                 //  alert(data);
                    build_table(data);

                });
             
           //     render_html(params);
                //   var data = get_api_data_by_params(params);
                //    open_colorbox("#templat_conversations_filtering", data);
           //     hide_div();
            //    $("#conversations_filtering_div").show();
            },

            conversation: function () {
                hide_div();
                $("#conversation_div").show();

            },
            policy: function () {
                if ($('#client_serial').val() !== "") {
                    if ($('#life_police_flg').val() !== "1") {
                        $('#life_police_flg').val("1");
                        var params = {
                            api: "life_police_api",
                            action: "get_life_polices_list_by_clientserial",
                            serial: $('#client_serial').val(),
                            table_template: "templat_life_police_list",
                            div_result: "life_police_div"
                        };
                        render_html(params);
                    }
                    hide_div();
                    $("#life_police_div").show();
                }
            },
            documents: function () {
                var my_serial =$('#client_serial').val();
                if (my_serial !== "") {
                    if ($('#documents_flg').val() !== "1") {
                        var params = {
                            api: "documents_api",
                            action: "get_documents_list_by_clientserial",
                            serial: my_serial
                        };
                        get_api_data_by_params(params).done(function (data) {
                            if (data !== null) {
                                $('#documents_flg').val("1");
                                var params = {
                                    data: data,
                                    table_template: "templat_documents_list",
                                    div_result: "documents_div"
                                };
                                render_html_with_data_and_hide_div(params); //  render html without sendin request to server
                            }

                        });

                    } else {
                        hide_div();
                        $("#documents_div").show();
                    }
                }
            },
            kupa: function () {
                if ($('#client_serial').val() !== "") {
                    if ($('#kupa_gemel_flg').val() !== "1") {
                        $('#kupa_gemel_flg').val("1");
                        var params = {
                            api: "kupa_gemel_api",
                            action: "get_kupa_gemel_list_by_clientserial",
                            serial: $('#client_serial').val(),
                            table_template: "templat_kupa_gemel_list",
                            div_result: "kupa_gemel_div"
                        };
                        render_html(params);
                    }

                    hide_div();
                    $("#kupa_gemel_div").show();
                }
            },
            my_meeting: function () {
                if ($('#client_serial').val() !== "") {
                    if ($('#meeting_flg').val() !== "1") {
                        $('#meeting_flg').val("1");
                        var params = {
                            api: "meeting_api",
                            action: "get_meeting_list_by_clientserial",
                            serial: $('#client_serial').val(),
                            table_template: "templat_meeting_list",
                            div_result: "meeting_div"
                        };
                        render_html(params);

                    }
                    hide_div();
                    $("#meeting_div").show();
                }
            },
            proposal_life: function () {
                if ($('#client_serial').val() !=="") {
                    if ($('#proposal_life_flg').val() !== "1") {
                        $('#proposal_life_flg').val("1");
                        var params = {
                            api: "proposal_life_api",
                            action: "get_proposal_life_with_followup_by_clientserial",
                            serial: $('#client_serial').val(),
                            table_template: "templat_proposal_life_list",
                            div_result: "proposal_life_div"
                        };

                        //build_conversation_hierarchy_grid(data.Conversation_list, data.FollowUpConversation_list);

                        //hide_div();
                        //$("#proposal_life_div").show();
                        get_api_data_by_params(params).done(function (data) {
                            build_proposal_life_hierarchy_grid(data.father, data.son);
                        });
                    }
                }
            },


            police_reort_menu: function () {
                if ($('#client_serial').val() !=="") {
                    if ($('#ricuz_police_flg').val() !== "1") {
                        police_report('police_report');

                    } else {

                        hide_div();
                        $("#ricuz_police_div").show();
                        all_police_report('police_report');
                    }

                }
            },
            yitrot_le_tkupa_menu: function () {
                if ($('#client_serial').val() !== "") {
                    if ($('#ricuz_police_flg').val() !== "1") {
                        police_report('yitrot_le_tekupa_list');

                    } else {

                        hide_div();
                        $("#ricuz_police_div").show();
                        all_police_report('yitrot_le_tekupa_list');
                    }

                }
            },

            kizui_be_mutzar_menu: function () {
                if ($('#client_serial').val() !== "") {
                    if ($('#ricuz_police_flg').val() !== "1") {
                        police_report('crosstab_pirtei_kisui_be_mutzar_new');

                    } else {

                        hide_div();
                        $("#ricuz_police_div").show();
                        all_police_report('crosstab_pirtei_kisui_be_mutzar_new');
                    }

                }
            },
            hishtalmut_menu: function () {
                if ($('#client_serial').val() !== "") {
                    if ($('#ricuz_police_flg').val() !== "1") {
                        police_report('hishtalmut');

                    } else {

                        hide_div();
                        $("#ricuz_police_div").show();
                        all_police_report('hishtalmut');
                    }

                }
            },
            kupa_menu: function () {
                if ($('#client_serial').val() !== "") {
                    if ($('#ricuz_police_flg').val() !== "1") {
                        police_report('kupa');

                    } else {

                        hide_div();
                        $("#ricuz_police_div").show();
                        all_police_report('kupa');
                    }

                }
            },
            search: function () {
                params = {
                    table_template: "template_searching",
                    div_result: "searching_div",
                    data: {}
                };
                render_html_with_data_and_hide_div(params);

                // hide_div();
                // $("#searching_div").show();
            }


            //    

        };



        $("#FormClient22 li a").each(function (i, el) {
            el.onclick = funcs[el.getAttribute('avi-menu')] || function () { };
        });
    })();




  


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
