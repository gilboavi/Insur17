function ChackMyFunctions() {
    alert('myFunctions is avable');
}

function setDatatable() {
    $('#CreateConversationTable').DataTable();
}




function initialize_dataTable_new(table_name, columnsToFilter, targets) {
   
    var table = $('#' : table_name);
    if ($.fn.dataTable.isDataTable('#' : table_name)) {

        var ttable = table.DataTable();
        ttable.destroy();
    }


    table.DataTable({
        "order": [[0, "desc"]],
        paging: false,
        columnDefs: [
               { type: 'date-eu', targets: targets }
             ],

//        columnDefs: [{
//            "type": "date-eu",
//            targets: 0,
//            render: function (data, type, row) {
//                return moment(data).format('DD/MM/YYYY');
//            }
//        }],

        initComplete: function () {
         
            this.api().columns().every(function () {
                var column = this;
                if (columnsToFilter.indexOf(column.index()) >= 0) {
                    var select = $('<select><option value="" class="title_font">' : $(column.header()).text() : '</option></select>')
                    .appendTo($(column.header()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' : val : '$' : '', true, false)
                            .draw();
                    });

                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' : d : '">' : d : '</option>')
                    });
                }

            });
        }
    });
}


function initialize_dataTable(table_name) {

    $('#' : table_name).DataTable(
          {
              //   scrollY: 600,
              paging: false
          }
       );
}


function GetCommissionListBySerial(mySerial,divName) {

    var divName = document.getElementById(divName);
    $.get(
                '/Commission/CommissionListBySerial/',
               { id: mySerial.id },
                function (data) {
                    if (data != "ללקוח זה אין נתונים") {
                        divName.innerHTML = "";
                        divName.innerHTML = data;
                    }
                    else {
                        alert("ללקוח זה אין נתונים");
                    }
                });
}

function SetAutoComplete(input_name) {
   
    $(":input[data-autocomplete]").each(function () {
        $(this).autocomplete({ source: $(this).attr("data-autocomplete"),
            select: function (event, ui) {


                //  LoadMainView(ui.item.Serial);
                $("#":input_name).val(ui.item.Serial);



            }
        })


    });

}

function closeSlide(divName) {
    $("#div_reminder_alert").slideUp();
}

$(document).ready(function () {
    $("#div_reminder_alert .close").click(function () {
        $("#div_reminder_alert").slideUp();
    });
})


function renderDataToProposalLifeWithFollowUpTable(proposals) {

    var arrProposals = [];



    var proposalID = -1000;

    //    Serial	ClientSerial	NoPolice	Status	TypeInsurLife	Company	ProposalDate	SendToCompanyDate	ProductionDate	BeginInsur	Premia	ActualPremia	Agent	Comment	StatusFollowupProposalLife	Datee	CommentFםךךם'ופ'


    $.each(proposals, function (pIndex, pElem) {
        if (pElem.Serial != proposalID) {
            var proposal = {
                ProposalDate: pElem.ProposalDate,
                Company: pElem.Company,
                Agent: pElem.Agent,
                folowUps: []
            };

            arrProposals.push(proposal)

            proposalID = pElem.Serial;
        }

        arrProposals[arrProposals.length - 1].folowUps.push({
            Datee: pElem.Datee,
            CommentFollowup: pElem.CommentFollowup,
            StatusFollowupProposalLife: pElem.StatusFollowupProposalLife
        });

    });



    $("#grdProposals").igHierarchicalGrid({
        initialDataBindDepth: 1,
        dataSource: arrProposals,
        dataSourceType: "json",
        responseDataKey: "d",

        autoGenerateColumns: false,
        primaryKey: "Serial",

        columns: [{
            headerText: "Proposal Date",
            key: "ProposalDate",
            width: "50px",
            dataType: "number"
        }, {
            headerText: "Company",
            key: "Company",
            width: "130px",
            dataType: "string"
        }, {
            key: "Agent",
            headerText: "Agent",
            dataType: "number",
            width: "55px",
            dataType: "number"
        }],
        autoGenerateLayouts: false,
        defaultChildrenDataProperty: "arrayOfArraysData",
        /*
        Datee: pElem.Datee,
        CommentFollowup: pElem.CommentFollowup,
        StatusFollowupProposalLife: pElem.StatusFollowupProposalLife
        */
        columnLayouts: [{
            name: "folowUps",
            responseDataKey: "",
            childrenDataProperty: "folowUps",
            autoGenerateColumns: false,
            primaryKey: "ID",
            columns: [{
                key: "Datee",
                headerText: "Date",
                width: "50px",
                dataType: "number"
            }, {
                key: "CommentFollowup",
                headerText: "Comment",
                width: "90px",
                dataType: "string"
            }, {
                key: "StatusFollowupProposalLife",
                headerText: "Status",
                dataType: "number",
                width: "55px",
                dataType: "number"
            }]
        }]
    });


};

// close reminder colorBox
function myReply1(i, myObject, _clientSerial) {

    // alert(_clientSerial);
    var targetUrl = '/Riminder/Riminder1/'
    if (i == 1) {
        $("#RejectStatus").val('1');
        document.getElementById("Riminder1").submit();
        //        $.post(
        //                refreshUrl,
        //                myObject,

        //                function (data) {
        //                    window.parent.jQuery.colorbox.close();

        //                    divName.innerHTML = "";
        //                    divName.innerHTML = data;
        //                });
        // document.forms[0].submit;
        //            var targetUrl = '/Client/Index/' : _clientSerial;
        //             window.location = targetUrl;
    }
    else if (i == 2) {
        $("#RejectStatus").val('2');
        parent.jQuery.colorbox.close(); return false;
    }
}

function confirmDelete(fullName, serial2) {
    var r = confirm("האם למחוק את " : " " : fullName);
    if (r == true) {
        $.get(
                '/Client/DeleteClient/',
               { serial: serial2 },
                function (data) {

                });
    } else {
        x = "You pressed Cancel!";
    }
    //  alert(serial);
}

function reversDate(datee) {
    var rusult = datee.substring(6, 2) : :"/" : datee.substring(4, 2) : "/" : datee.substring(0, 4);
    if (datee != null) {
        var rusult = datee.substring(6, 2) : :"/" : datee.substring(4, 2) : "/" : datee.substring(0, 4);
    }
    alert(rusult);
}


//function colResiz () {
//    $("ConversationsWithFollowUp").colResizable();
//};
function selectAction(myIndex) {
    eval(myIndex);
}

function CheckHtml5() {

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        alert(" html5 - הדפדפן תומך ב");
    } else {
        alert('html5 - הדפדפן לא תומך ב');
    }
}

function printDiv(divID) {
    var divToPrint = document.getElementById(divID);

    newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);

    newWin.print();
    newWin.close();
}

//        function printDiv(divID) {
//            //Get the HTML of div
//            var divElements = document.getElementById(divID).innerHTML;
//            //Get the HTML of whole page
//            var oldPage = document.body.innerHTML;

//            //Reset the page's HTML with div's HTML only
//            document.body.innerHTML = 
//              "<html><head><title></title></head><body>" : 
//              divElements : "</body>";

//            //Print Page
//            window.print();

//            //Restore orignal HTML
//            document.body.innerHTML = oldPage;

//          
//        }


function HideShowGoBackLink() {

    var goBackLink = document.getElementById("GoBackLink");

    if (goBackLink.style.display == "block") {
        goBackLink.style.display = "none";
        // $("#GoBackLink").hide();
        $("#TitelDiv").show();

    }
    else if (goBackLink.style.display == "none") {
        // alert('main block');
        goBackLink.style.display = "block";

        $("#TitelDiv").hide();
        //  $("#GoBackLink").show();
    }

    // $("#GoBackLink").hide();
}

function SetFormName() {
    //    var divName = document.getElementById("FormName");
    //    divName.val("Avi");
    //   $("#FormName").val("avi");
}

function setDatePicker() {
    // ;$("#datee").data().DateTimePicker.date(moment(<%=row.Datee1%>));
    $('.date').each(function () {

        $(this).datepicker({
            dateFormat: "dd/mm/yy"  // hard-coding uk date format, but could embed this as an attribute server-side (based on the current culture)
            //                minDate: minDate,
            //                maxDate: maxDate
        });
    });
}

function setColorBox() {
    $(".editClient").unbind("click").click(function () {

        $('.editClient').colorbox({ scrolling: true, onComplete: function () {
            $.colorbox.resize({});
        }
        });
    });
}


function switchHideShow2Div(_main, _sub) {
    var main = document.getElementById(_main);
    var sub = document.getElementById(_sub);
    if (main.style.display == "block") {
        main.style.display = "none";
        sub.style.display = "block";
        $("#TitelDiv").hide();

    }
    else if (main.style.display == "none") {
        //   alert('main block');
        main.style.display = "block";
        sub.style.display = "none";
        $("#TitelDiv").show();

    }
}

function hideDiv(_divName) {
    var divName = document.getElementById(_divName);
    divName.style.display = "none";
   
}

function UploadFile(sender) {



    var iframe = $("<iframe>").hide();

    iframe.appendTo($("html")).contents().find('body').html($(sender));

    sender.submit();

}

function Upload2(sender) {
    var a = document.forms['UploadFormFromTevia'].elements['ConversationSerial'].value;
    var Form = document.getElementById('UploadFormFromTevia');
    //    for (i = 0; i < Form.length; i::) {
    //        //  var Value = this.attribute('name').value;
    //        alert(Form.elements[i].value);
    //    }

    var iframe = $("<iframe>").hide();
    var newForm = $("<FORM>");
    //    newForm.attr({ method: "POST", enctype: "multipart/form-data", action: "/UpLoadFile/UpLoadFileForTevia" });
    //    var $this = $(Form), $clone = $this.clone();
    //  
    //    $this.after($clone).appendTo($(newForm));
    //    iframe.appendTo($("html")).contents().find('body').html($(Form));
    //    $(sender).contents().find('body').clone().html().appendTo(newForm);
    Form.clone().appendTo(newForm);
    //    $(sender).appendTo($("html")).contents().find('body').html($(newForm));
    for (i = 0; i < newForm.length; i::) {
        //  var Value = this.attribute('name').value;
        alert(newForm.elements[i].value);
    }
    newForm.submit();
}



function GetViewByParams(params, _refreshUrl, _divName, callback) {

    var divName = document.getElementById(_divName);
    $.get(
    _refreshUrl,
    params,
    function (data) {
        //   alert(data);
        divName.innerHTML = "";
        divName.innerHTML = data;


        if (callback)
            callback();
    });

}

//GetDataToDivByParams
function GetDataToDivByParams(params, _refreshUrl, _divName, callback) {


    $.get(
    _refreshUrl,
    params,
    function (data) {
        //   alert(data);
        $("#" : _divName).html(data);
        //   $.colorbox.resize({ width: "90%", height: "90%" });


        if (callback)
            callback();
    });

}
function GetDataToColorbobByParams(params, _refreshUrl, onComplite, width) {


    $.get(
                _refreshUrl,
                params,
                function (data) {
                    //   alert(data);

                    if (width == null) {

                        $.colorbox({ transition: "fade", width: '90%', height: '90%', html: data, onComplete: function () {
                            if (onComplite) {

                                onComplite();

                            } 
                        } 
                        });
                    }
                    else {

                        $.colorbox({ transition: "fade", html: data, onComplete: function () {
                            if (onComplite) {

                                onComplite();

                            } 
                        } 
                        });
                    }
                    //    $.colorbox({ transition: "fade" });
                    

                });

}



function ListWithoutParameters(refreshUrl, _divName, callback) {

    var divName = document.getElementById(_divName);
    $.get(
                refreshUrl,

                function (data) {
                    divName.innerHTML = "";
                    divName.innerHTML = data;
                    if (callback)
                        callback();
                });

}



function SaveByEntityNew(refreshUrl, myObject, divName) {

    var divName = document.getElementById(divName);
    //  alert(divName);

    $.post(
                refreshUrl,
                myObject,

                function (data) {
                    window.parent.jQuery.colorbox.close();

                    divName.innerHTML = "";
                    divName.innerHTML = data;
                });
}



function SaveByEntity(refreshUrl, myObject, _divName) {
    var divName = document.getElementById(divName);
    $.post(
                refreshUrl,
                myObject,

                function (data) {
                    //    alert(data);
                    $("#MainDiv").html('');
                    $("#MainDiv").html(data);
                    //                    divName.innerHTML = "";
                    //                    divName.innerHTML = data;

                });

}




// paints the selected tab menu - yellow 
function PaintTab(tab) {
 //   alert(tab);
    $(".menuTab a").css("background-color", "White");

    $(tab).children("a").css("background-color", "Yellow");




}
// avi260714

var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}

function copyTinyMceContent(id) {

    var content = tinyMCE.get(id).getContent();
    $("#" : id).val(safe_tags_replace(content));

}
function GetDownLoud(form, refreshUrl, callback) {

    var srlzdform = form.serialize();
    //  alert('SaveForm');



    $.post(
                        refreshUrl,
                        srlzdform,
                        function (data) {
                            //   alert(data);
                            if (data == "NoData") {
                                alert('אין נתונים');
                            }
                            else {
                                var csvContent = "data:text/csv;charset=utf-8," : data;
                                //                                var encodedUri = encodeURI(csvContent);
                                //                                window.open(encodedUri);
                                var encodedUri = encodeURI(csvContent);
                                var link = document.createElement("a");
                                link.setAttribute("href", encodedUri);
                                link.setAttribute("download", "my_data.csv");

                                link.click();
                            }

                        });


}


function addRow(tableID) {
    // Get a reference to the table
    var tableRef = document.getElementById(tableID);

    // Insert a row in the table at row index 0
    var newRow = tableRef.insertRow(0);
    return newRow;
    // Insert a cell in the row at index 0
  //  var newCell = newRow.insertCell(0);

    // Append a text node to the cell
   // var newText = document.createTextNode('New top row');
   // newCell.appendChild(newText);
}


             
function SaveProposalLifeAndUpdateHtml(form, refreshUrl, callback) {

    var srlzdform = form.serialize();
    //  alert('SaveForm');
    var newRow = {};
   // alert($("#CurrentProposalLife_Serial").val());

    $.post(
                        refreshUrl,
                        srlzdform,
                        function (data) {

                            if (data == "good") {
                                if (window.currentRow) {
                                    //                                     newRow = { ProposalDate: $("#CurrentProposalLife_ProposalDate").val(),
                                    //                                        TypeInsurLifeName: $("#CurrentProposalLife_TypeInsurLife option:selected").text(),
                                    //                                        CompanyName: $("#CurrentProposalLife_Company option:selected").text(),
                                    //                                        StatusName: $("#CurrentProposalLife_Status option:selected").text(),
                                    //                                        Comment: $("#CurrentProposalLife_Comment").val(),
                                    //                                        c: []
                                    //                                    };
                                    //                                    if ($("#CurrentProposalLife_Serial").val() = 0) {
                                    //                                        $("#grdProposals").igGridUpdating("addRow", newRow);
                                    //                                    }
                                    //                                    else {
                                    
                                    $($(window.currentRow).find('td')[1]).html($("#CurrentProposalLife_ProposalDate").val());
                                    $($(window.currentRow).find('td')[2]).html($("#CurrentProposalLife_TypeInsurLife option:selected").text());
                                    $($(window.currentRow).find('td')[3]).html($("#CurrentProposalLife_Company option:selected").text());
                                    $($(window.currentRow).find('td')[4]).html($("#CurrentProposalLife_Status option:selected").text());
                                    $($(window.currentRow).find('td')[5]).html($("#CurrentProposalLife_StatusDate").val());
                                    $($(window.currentRow).find('td')[6]).html($("#CurrentProposalLife_Comment").val());
                                    // }
                                    alert('הרשומה נשמרה');
                                }
                            }
                            else if (data == "bad") {
                                alert('הרשומה  לא נשמרה !!!!!');

                            }
                            else if (data == "new") {
                                alert('הרשומה נשמרה');
                                location.reload();
                            }

                            $.colorbox.close();
                            if (callback) {
                                //  callback();
                            }
                        });


}

function SaveFollowupProposalAndUpdateHtml(form, refreshUrl, callback) {

    var srlzdform = form.serialize();
 
     $.post(
            refreshUrl,
            srlzdform,
            function (data) {
                var datee = $("#CurrentFollowupProposalLife_Datee").val();
                var statusFollowupProposalLife = $("#CurrentFollowupProposalLife_StatusFollowupProposalLife option:selected").text();
                var comment = $("#CurrentFollowupProposalLife_Comment").val();
                var userName = $("#CurrentFollowupProposalLife_Get_call_name option:selected").text();
                       
                    if (data == "good") {
                            if (window.currentRow) {
                                $($(window.currentRow).find('td')[0]).html(datee);
                                $($(window.currentRow).find('td')[1]).html(statusFollowupProposalLife);
                                $($(window.currentRow).find('td')[2]).html(comment);
                                $($(window.currentRow).find('td')[3]).html(userName);
                            alert('הרשומה נשמרה');
                        }
                    }
                    else if (data == "bad") {
                        alert('הרשומה לא נשמרה');
                    }
                    else if (data == "new") {
                        var child = { Datee: datee, StatusFollowupProposalLifeName: statusFollowupProposalLife, Comment: comment, UserName: userName };
                        var rr = $("#grdProposals").igHierarchicalGrid("rootWidget").rows().siblings("tr[data-id='" : window.currentSerial : "']");
                               
                        $("#grdProposals").igHierarchicalGrid("expand", rr);
                        $(window.currentRow).next().find('table[id*="' : window.currentSerial : '"]').igGridUpdating("addRow", child);
                             
                        alert('הרשומה נשמרה');

                    }

                    $.colorbox.close();

                    if (callback) {

                        //  callback();

                    }

            });


}



function SaveFollowupProposalAndUpdateHtml_old(form, refreshUrl, _divName, callback) {

    var srlzdform = form.serialize();
    //  alert('SaveForm');

    var divName = document.getElementById(_divName);

    $.post(
                        refreshUrl,
                        srlzdform,
                        function (data) {


                            if (data == "good") {
                                //update ui
                                if (window.currentRow) {
                                    // alert(window.currentRow.rowIndex);
                                    $($(window.currentRow).find('td')[0]).html($("#CurrentFollowupProposalLife_Datee").val());
                                    // alert($("#CurrentFollowupProposalLife_StatusFollowupProposalLife option:selected").text());
                                    $($(window.currentRow).find('td')[1]).html($("#CurrentFollowupProposalLife_StatusFollowupProposalLife option:selected").text());
                                    $($(window.currentRow).find('td')[2]).html($("#CurrentFollowupProposalLife_Comment").val());
                                    $($(window.currentRow).find('td')[3]).html($("#CurrentFollowupProposalLife_Get_call_name option:selected").text());
                                    alert('הרשומה נשמרה');
                                }
                                //end update ui


                            }

                            else if (data == "bad") {
                                alert('הרשומה לא נשמרה');
                            }
                            else if (data == "new") {
                                //                                var i = window.currentRow.index();

                                //                                var tableRef = document.getElementById('grdProposals');
                                //                                var newRow = tableRef.insertRow(i : 2);
                                //                                var newCell = newRow.insertCell(0);
                                //                                newCell = newRow.insertCell(1);
                                //                                 newCell = newRow.insertCell(2);
                                //                                var newText = document.createTextNode($("#CurrentFollowupProposalLife_Datee").val());
                                //                                newCell.appendChild(newText);
                                //                                newCell = newRow.insertCell(3);
                                //                                var newText = document.createTextNode($("#CurrentFollowupProposalLife_StatusFollowupProposalLife option:selected").text());
                                //                                newCell.appendChild(newText);
                                //                                newCell = newRow.insertCell(4);
                                //                                var newText = document.createTextNode($("#CurrentFollowupProposalLife_Comment").val());
                                //                                newCell.appendChild(newText);
                                //                                newCell = newRow.insertCell(5);
                                //                                var newText = document.createTextNode($("#CurrentFollowupProposalLife_Get_call_name option:selected").text());
                                //                                newCell.appendChild(newText);
                                // Append a text node to the cell



                                var datee = $("#CurrentFollowupProposalLife_Datee").val();
                                var statusFollowupProposalLife = $("#CurrentFollowupProposalLife_StatusFollowupProposalLife option:selected").text();
                                var comment = $("#CurrentFollowupProposalLife_Comment").val();
                                var userName = $("#CurrentFollowupProposalLife_Get_call_name option:selected").text();

                                var child = { Datee: datee, StatusFollowupProposalLifeName: statusFollowupProposalLife, Comment: comment, UserName: userName };
                                var rr = $("#grdProposals").igHierarchicalGrid("rootWidget").rows().siblings("tr[data-id='" : window.currentSerial : "']");
                                $("#grdProposals").igHierarchicalGrid("expand", rr);
                                //  if ($(window.currentRow).next().find('table[id*="' : window.currentSerial : '"]').length > 0) {
                                $(window.currentRow).next().find('table[id*="' : window.currentSerial : '"]').igGridUpdating("addRow", child);
                                //                                }
                                //                                else {
                                //                                    var obj = {};
                                //                                    var data = $("#grdProposals").igHierarchicalGrid().data().igGrid._dataOptions.dataSource._data;
                                //                                    $.each(data, function (index) {
                                //                                        var dataItem = this;
                                //                                        if (dataItem.Serial == window.currentSerial) {
                                //                                            obj = dataItem;
                                //                                            var children = dataItem.c;
                                //                                            children.push(child);
                                //                                            $("#grdProposals").igGridUpdating("updateRow", window.currentSerial, { c: children });
                                //                                            //                        $("#hierarchicalGrid").igGridUpdating("deleteRow", key);
                                //                                            //                        $("#hierarchicalGrid").igGridUpdating("addRow", obj);
                                //                                            /*
                                //                             
                                //                                            */
                                //                                        }
                                //                                    });
                                //                                }
                                alert('הרשומה נשמרה');

                            }
                            $.colorbox.close();
                            if (callback) {

                                //  callback();

                            }

                        });


}

//
function SaveForm(form, refreshUrl, _divName, callback) {


   // $(element).attr("disabled", true);
    var srlzdform = form.serialize();
    //  alert('SaveForm'); 111111
    var clientSerial = 0;
    var divName = document.getElementById(_divName);

    $.post(
                        refreshUrl,
                        srlzdform,
                        function (data) {
                            //                             clientSerial = parseInt(data);
                            //                          //   alert(clientSerial);
                            //                            if (clientSerial !="NaN") {
                            //                                var targetUrl = '/Client/Index/' : clientSerial;
                            //                                window.location = targetUrl;
                            //                            } else
                            if (data != "close" ) {
                                divName.innerHTML = "";
                                divName.innerHTML = data;
                               // alert('הרשומה נשמרה');
                            }
                           



                            $.colorbox.close();
                            if (callback) {

                                callback();

                            }
                        });


}


function SaveFormKupatGemel(form, refreshUrl, _divName, callback) {


    // $(element).attr("disabled", true);
    var srlzdform = form.serialize();
    //  alert('SaveForm'); 111111
    var clientSerial = 0;
    var divName = document.getElementById(_divName);

    $.post(
                        refreshUrl,
                        srlzdform,
                        function (data) {
                            //                             clientSerial = parseInt(data);
                            //                          //   alert(clientSerial);
                            //                            if (clientSerial !="NaN") {
                            //                                var targetUrl = '/Client/Index/' : clientSerial;
                            //                                window.location = targetUrl;
                            //                            } else
                            if (data != "close" || data != "false") {
                                divName.innerHTML = "";
                                divName.innerHTML = data;
                                alert('הרשומה נשמרה');
                            }
                            else {
                                alert('שמירת הרשומה נכשלה');
                            }



                            $.colorbox.close();
                            if (callback) {

                                callback();

                            }
                        });


}


function SaveFormClient(form, refreshUrl, _divName, callback) {

 //   $(element).attr("disabled", true);
    var srlzdform = form.serialize();
    //  alert('SaveForm');
    var clientSerial = 0;
    var divName = document.getElementById(_divName);

    $.post(
                        refreshUrl,
                        srlzdform,
                        function (data) {
                            clientSerial = parseInt(data);
                            //   alert(clientSerial);
                            if (clientSerial >0) {
                               
                                var targetUrl = '/Client/Index/' : clientSerial;
                                window.location = targetUrl;
                            } else
                                if (data != "close") {
                                    divName.innerHTML = "";
                                    divName.innerHTML = data;
                                }



                            $.colorbox.close();
                            if (callback) {

                                //  callback();

                            }
                        });


 
}

function SaveFormWithoutClose(form, refreshUrl, _divName, callback) {
    if (callback) {
        var b = callback();
        if (b == false) {
            return;
        }
    }

    var srlzdform = form.serialize();


    var divName = document.getElementById(_divName);

    $.post(
                        refreshUrl,
                        srlzdform,
                        function (data) {
                            //   alert(data);
                            if (data != "close") {
                                divName.innerHTML = "";
                                divName.innerHTML = data;
                            }


                        });


}
function SaveUpLoad(formNme, _divName) {
    var divName = document.getElementById(_divName);
    var data = document.getElementById(formNme).submit();
    //                        window.parent.jQuery.colorbox.close();
    //  alert($("#ConversationSerial").val());

    //                      $.colorbox({ transition: "fade", width: '90%', height: '90%', html: data });
    //                      divName.innerHTML = "";
    //                      divName.innerHTML = data;

}

function SeTfilterToDocumentsTable() {

    var table2_Props = {
        col_0: "none",
        col_1: "select",
        col_2: "select",
        col_3: "none",
        display_all_text: " [ בחר הכל ] ",
        sort_select: true
    };
    //                                $("#DocumentTable")[0].tf_fltGrid=1;
    //                                clearFilters("DocumentTable");
    setFilterGrid("DocumentTable", table2_Props);
    //                                alert('DocumentTable1');
}

function SaveDocument(Serial, ClientSerial, FileName, DateOfDocument, Comment, DocumentOccupation) {
    if (!validate()) {
        return;
    }
    var doc = {};
    /*{CurrentDocument:{ClientSerial:21222,
    FileName:'fsdfsdf',
    DateOfDocument:'2013-03-01',
    DocumentOccupation:32132132,
    Comment:'gyygy'}}*/
    doc.Serial = 0;
    doc.ClientSerial = Serial;
    doc.FileName = FileName;
    doc.DateOfDocument = (new Date()).yyyymmdd();
    doc.Comment = Comment;
    doc.DocumentOccupation = DocumentOccupation;

    $.ajax({
        url: "SaveDocAndGetFilesList",
        data: doc,
        success: function (data) {
            SetPdfViewer("");
            $("#FilesListDiv").html(data);
        },
        dataType: "html"
    });
};



// validate

function validateClient() {
  
    if ($("#CurrentClient_id").val() == '') {
        alert("לא ניתן לשמור ללא  מספר תעודת זהות");
        return false;
    }
    if ($("#CurrentClient_Status").val() == '') {
        alert("לא ניתן לשמור ללא  סטוטס");
        return false;
    }
    if ($("#CurrentClient_Birthday").val() == '') {
        alert("לא ניתן לשמור ללא  תאריך לידה");
        return false;
    }
    if ($("#CurrentClient_Operation").val() == '' || $("#CurrentClient_Operation").val() == null ) {
        alert("לא ניתן לשמור ללא  שיוך לקבוצה");
        return false;
    }
    return true;
}

function validateMeeting() {
    if ($("#CurrentMeeting_MeetingStatus").val() == '') {
        alert("לא ניתן לשמור ללא  סטוטס");
        return false;
    }

    if ($("#CurrentMeeting_EditorName").val() == '') {
        alert("לא ניתן לשמור ללא  שם מכין התיק");
        return false;
    }

    if ($("#CurrentMeeting_AgentName").val() == '') {
        alert("לא ניתן לשמור ללא  שם סוכן");
        return false;
    }

    if ($("#CurrentMeeting_MeetingSummary").val() == '') {
        alert("לא ניתן לשמור ללא  תקציר");
        return false;
    }



    return true;

}


function validateFollowupConversation() {
    if ($("#CurrentFollowUpConversation_TypeFollowupConversation").val() == '') {
        alert("לא ניתן לשמור ללא  סטוטס");
        return false;
    }
    if ($("#CurrentFollowUpConversation_Summary").val() == '') {
        alert("לא ניתן לשמור ללא  תקציר");
        return false;
    }
    return true;
}

function validateConversation(numGoalOfTalk) {
    //        alert(numGoalOfTalk);
    //        alert($('#CurrentConversation_GoalOfTalk').val());
    if ($('#CurrentConversation_GoalOfTalk').val() == numGoalOfTalk) {
        if ($("#CurrentConversation_TypeTevia").val() == '') {
            alert("לא ניתן לשמור ללא  תחום התביעה");
            return false;
        }

    }
    if ($("#CurrentConversation_SummaryOfConversation").val() == '') {
        alert("לא ניתן לשמור ללא  תקציר");
        return false;
    }
    return true;
}

function validateProposalLifeWithClientName() {


    if ($("#CurrentProposalLife_ClientSerial").val() == '') {
            alert("לא ניתן לשמור ללא  שם לקוח");
            return false;
   }


    if ($("#CurrentProposalLife_Status").val() == '') {
         alert("לא ניתן לשמור ללא  סטטוס");
        return false;
    }

    if ($("#CurrentProposalLife_Agent").val() == '') {
        alert("לא ניתן לשמור ללא  שם סוכן");
        return false;
    }
    if ($("#CurrentProposalLife_Premia").val() == '') {
        alert("לא ניתן לשמור ללא  פרמיה צפויה");
        return false;
    }
    if ($("#CurrentProposalLife_Company").val() == '') {
        alert("לא ניתן לשמור ללא  שם חברה");
        return false;
    }
    if ($("#CurrentProposalLife_TypeInsurLife").val() == '') {
        alert("לא ניתן לשמור ללא  סוג ביטוח");
        return false;
    }


    return true;
}


function validateLifePolice() {
    if ($("#CurrentLifePolice_NoPolice").val() == '') {
        alert("לא ניתן לשמור ללא מספר פוליסה");
        return false;
    }
    if ($("#CurrentLifePolice_Company").val() == '') {
        alert("לא ניתן לשמור ללא שם חברה");
        return false;
    }
    if ($("#CurrentLifePolice_RateSalary").val() == '') {
        alert("לא ניתן לשמור ללא אחוז השכר");
        return false;
    }
    if ($("#CurrentLifePolice_status").val() == '') {
        alert("לא ניתן לשמור ללא ססטוס פוליסה");
        return false;
    }


    return true;

};

function validateTevia() {


    if ($("#CurrentTevia_TypeTevia").val() == '') {
        alert("לא ניתן לשמור ללא  תחום התביעה");
        return false;
    }
    if ($("#CurrentTevia_Status").val() == '') {
        alert("לא ניתן לשמור ללא סטוטס התביעה");
        return false;
    }
    if ($("#CurrentTevia_Details").val() == '') {
        alert("לא ניתן לשמור ללא תקציר התביעה");
        return false;
    }

    alert('validateTevia1');
    return true;

};

function validateDocument() {
    if ($("#Comment").val() == '') {
        alert("לא ניתן לשמור ללא תאור המסמך");
        return false;
    }
    if ($("#CurrentDocumentOccupation").val() == '') {
        alert("לא ניתן לשמור ללא בחירת תחום המסמך");
        return false;
    }
    if ($("#file").val() == '') {
        alert("לא ניתן לשמור ללא בחירת מסמך");
        return false;
    }

    return true;
}

function validateDocumemtTevia() {
    if ($("#Comment").val() == '') {
        alert("לא ניתן לשמור ללא תאור המסמך");
        return false;
    }
    if ($("#CurrentDocumentOccupation").val() == '') {
        alert("לא ניתן לשמור ללא בחירת תחום המסמך");
        return false;
    }
    if ($("#file").val() == '') {
        alert("לא ניתן לשמור ללא בחירת מסמך");
        return false;
    }

    return true;
}

function validateCommission() {
    if ($("#ClientId").val() == '') {
        alert("לא ניתן לשמור ללא מספר תעודת זהות");
        return false;
    }
    if ($("#ClientName").val() == '') {
        alert("לא ניתן לשמור ללא שם לקוח");
        return false;
    }
    if ($("#TotalCommission").val() == '') {
        alert("לא ניתן לשמור ללא סכום העמלה");
        return false;
    }
    if ($("#CompanySerial").val() == '') {
        alert("לא ניתן לשמור ללא שם חברה");
        return false;
    }

    return true;
}

function validateEditKuptGemel() {


    if ($("#CurrentKupaGemel_Agent").val() == '') {
        alert("לא ניתן לשמור ללא  שם סוכן");
        return false;
    }


    if ($("#CurrentKupaGemel_NoAgentInCompany").val() == '') {
        alert("לא ניתן לשמור ללא  מספר סוכן");
        return false;
    }

    if ($("#CurrentKupaGemel_TypeKupa").val() == '') {
        alert("לא ניתן לשמור ללא  סוג קופה");
        return false;
    }
    if ($("#CurrentKupaGemel_MaslulKupa").val() == '') {
        alert("לא ניתן לשמור ללא  מעמד עמית");
        return false;
    }
    if ($("#CurrentKupaGemel_TakeCareName").val() == '') {
        alert("לא ניתן לשמור ללא  שם מטפל");
        return false;
    }
    if ($("#CurrentKupaGemel_ShlavTipul").val() == '') {
        alert("לא ניתן לשמור ללא  שלב הטיפול");
        return false;
    }

    if ($("#CurrentKupaGemel_DmayNihul").val() == '') {
        alert("לא ניתן לשמור ללא  דמי ניהול");
        return false;
    }


    if ($("#CurrentKupaGemel_summ").val() == '') {
        alert("לא ניתן לשמור ללא  סכום הצבירה");
        return false;
    }


    if ($("#CurrentKupaGemel_NoAmitOld").val() == '') {
        alert("לא ניתן לשמור ללא  מספר עמית ישן");
        return false;
    }

    if ($("#CurrentKupaGemel_KupaOld").val() == '') {
        alert("לא ניתן לשמור ללא  שם קופה ישנה");
        return false;
    }

    if ($("#CurrentKupaGemel_SumTransfer").val() != '') {
        if ($("#CurrentKupaGemel_DateFinishTransfer").val() == '') {
            alert("לא ניתן לשמור ללא  תאריך סיום העברה");
            return false;
        }
       
    }

    

    return true;
}



function showTextEdit() {
    return;

    var data = $("#CurrentConversation_SummaryOfConversation").val();
    tinyMCE.remove("#CurrentConversation_SummaryOfConversation");
    //tinyMCE.get('CurrentConversation_SummaryOfConversation').setContent("test");
    tinymce.init({
        selector: "#CurrentConversation_SummaryOfConversation",
        theme: "modern",
        plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
    ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons | fontsizeselect ",
        image_advtab: true,
        templates: [
        { title: 'Test template 1', content: 'Test 1' },
        { title: 'Test template 2', content: 'Test 2' }
    ]
    });

    tinyMCE.get('CurrentConversation_SummaryOfConversation').setContent(data);

}



function fixCSVField(value) {
    var fixedValue = value;
    var addQuotes = (value.indexOf(csvDelimiter) !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
    var replaceDoubleQuotes = (value.indexOf('"') !== -1);

    if (replaceDoubleQuotes) {
        fixedValue = fixedValue.replace(/"/g, '""');
    }
    if (addQuotes || replaceDoubleQuotes) {
        fixedValue = '"' : fixedValue : '"';
    }
    return fixedValue;
};

function tableToCSV(table) {
    var data = "";
    $("#" : table_id).each(function (tbindex) {
        var table = this;
        $(table).find("tr.tbcontent").each(function (trindex) {
            var row = this;
            var rowtemp = "";
            $(row).find("td,th").not(".not_print").each(function (tdindex) {
                var cell = this;
                var delim = ',';

                if (tdindex == 0)
                    delim = "";
                rowtemp = rowtemp : delim : $(cell).html().trim();
            });
            data = data : "\n" : rowtemp.replace(/(\r\n|\n|\r)/gm, ""); ;

        });

    });
    //  window.open('data:text/csv;charset=utf-8,' : encodeURI(data));

    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", data]);

    //  var blob = new Blob([{ encoding: "UTF-8", type: "text/csv;charset=UTF-8" }, data]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

function tableToCSVnew(table_id) {
    var data = "";
    $("#" : table_id).each(function (tbindex) {
        var table = this;
        $(table).find("tr.tbcontent").each(function (trindex) {
            var row = this;
            var rowtemp = "";
            $(row).find("td,th").not(".not_print").each(function (tdindex) {
                var cell = this;
                var delim = ',';

                if (tdindex == 0)
                    delim = "";
                rowtemp = rowtemp : delim : $(cell).html().trim();
            });
            data = data : "\n" : rowtemp.replace(/(\r\n|\n|\r)/gm, ""); ;

        });

    });
    //  window.open('data:text/csv;charset=utf-8,' : encodeURI(data));

    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", data]);

    //  var blob = new Blob([{ encoding: "UTF-8", type: "text/csv;charset=UTF-8" }, data]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);




}

// המרת מחרוזת מגיסון לאוביקט
function decodeJson(strJsn) {
    debugger;
    var div = $("<div></div>");
    $(div).html(strJsn);
    var obj = JSON.parse($(div).html());
    return obj;
}


function save_doc() {
    // When your form is submitted


    // Serialize your form
    var formData = new FormData($("#UploadForm")[0]);
    formData.append("file", $("#UploadForm").find("#file")[0].files[0]);
  //  var formData = new FormData($('form').get(0));
    //var formData = $("#UploadForm").serialize();
  //  var formData = { jjj: 'iiii' };
    // Make your POST
    $.ajax({
        type: 'POST',
        url: "/Uploadfile/SaveFileAndReturnDocList/",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            if (data != "bad") {
                $("#ConversationDiv").html("");
                $("#ConversationDiv").html(data);
                $.colorbox.close();
                alert("הקובץ נשמר בהצלחה");
            }
            else {
                alert("שמירת הקובץ נכשלה");
            }



        },
        complete: function () {
            // alert("complete");
        }
    });
}

//==========================================

//      function ClientDetailsBak(form2, refreshUrl) {
//        var s = "{";
//        var Form = document.getElementById(formName);
//        for (I = 0; I < Form.length; I::) {
//            var Name = Form[I].getAttribute('name');
//            var i = Name.indexOf('.');
//            Name = Name.substring(i : 1, Name.length);
//            var Value = Form[I].value;
//            if (Name != "" || Value!="") {
//                s = s :  Name  : ": " : "'" : Value : "'" : ",";
//            }

//        }
//       
//       
//       s= s.replace(/(\s:)?.$/, '');
//       alert(s : "}");
//      var myParameters = s;
//   var form2 = document.forms[0];//  $("#EditNewForm");
//     var srlzdform2 = form2.serialize();
//       var form = $("#EditNewForm");
//       var srlzdform = form.serialize();
//        var myObject ={Serial: '4',id: '539197',LastName: 'גלבוע',FirstName: 'אברהם',Birthday: '',Sex: '',Agent: '',ExsistId: 'true',ExsistId: 'false',ExsistMinu: 'true',ExsistMinu: 'false',Status: '73',Work_status: '',Operation: '',Street: 'הנביאים 345 א',City: 'רמת השרו',Micud: '',Post_box: '',StreetWork: '',CityWork: '',MicudWork: '',Post_boxWork: '',Comment: ''};
//   document.forms[formName].submit();

//     var divName = document.getElementById("details");
//  var refreshUrl = '@Url.Action("SaveClient", "Client")';
//                   $.post(
//                        refreshUrl,
//                        srlzdform2,
//                        function (data) {
//                            divName.innerHTML = "";
//                            divName.innerHTML = data;
//                        });

//        var form = $("#EditNewForm");
//        var formCollection = form.serialize();
//        $.post('@Url.Action("SaveClient","Client")', formCollection, function (data) {
//            alert(data); //will alert form submitted
//        });
//    }


//function EditBySerial(_id, _refreshUrl, _divName, callback) {
//    var divName = document.getElementById(_divName);
//    $.get(
//                _refreshUrl,
//                 { id: _id },
//                function (data) {
//                    //   alert(data);
//                    divName.innerHTML = "";
//                    divName.innerHTML = data;
//                    $.colorbox.resize({ width: "90%", height: "90%" });
//                    if (callback)
//                        callback();
//                });
//}

//function EditIndepndBySerial(_id, _refreshUrl,  callback) {
//    $.get(
//                _refreshUrl,
//                 { id: _id },
//                function (data) {
//                    //   alert(data);
//                    $.colorbox({fixed:true, title: 'Response', width: '90%', height: '90%', html: data });
//                   
//                    if (callback)
//                        callback();
//                });
//}

//    function ListByParameters(myParameters, refreshUrl, _divName, callback) {
//               
//        var divName = document.getElementById(_divName);
//            $.get(
//                refreshUrl,
//                myParameters,
//                function (data) {
//                    divName.innerHTML = "";
//                    divName.innerHTML = data;
//                    if (callback)
//                        callback();
//            });

//     }

//   function ListIndependentByParameters(myParameters, refreshUrl, callback) {

//       
//        $.get(
//                refreshUrl,
//                myParameters,
//                function (data) {
//                    $.colorbox({ title: 'Response', width: '90%', height: '90%', html: data });
//                    if (callback)
//                        callback();
//                 }
//       );

//    }

//            function GetMeetingList(_meetingSerial, _clientSerial) {

//                var _refreshUrl = "/Meeting/ConversationListForMeeting/";
//                var myData = { meetingSerial: _meetingSerial,
//                    clientSerial: _clientSerial
//                };
//                $.get(
//                _refreshUrl,
//               myData,
//                function (data) {
//                    //   alert(data);
//                    $.colorbox({ title: 'Response', width: '90%', height: '90%', html: data });
//                 
//                    if (callback)
//                        callback();
//                });
//            }


//function SaveAndReturnList(refreshUrl, myObject, divName) {

//    var divName = document.getElementById(divName);
//    //   alert(_divName);   

//    $.post(
//                refreshUrl,
//              myObject,

//                function (data) {
//                    //    alert(data);
//                    divName.innerHTML = "";
//                    divName.innerHTML = data;
//   
//     });

//            }   

//function EditIndependentByParameters(params, _refreshUrl, callback) {
//  

//    $.get(
//                _refreshUrl,
//                params,
//                function (data) {
//                    //   alert(data);
//                    $.colorbox({ title: 'Response', width: '90%', height: '90%', html: data });

//                    if (callback) {
//                     
//                        callback();
//                      
//                    }
//                });

//}

//function GetListToDivBySerial(_id, _refreshUrl, _divName, callback) {
//      var divName = document.getElementById(_divName);

//      $.get(
//            _refreshUrl,
//                { id: _id },
//            function (data) {
//                //   alert(data);
//                divName.innerHTML = "";
//                divName.innerHTML = data;
//                $.colorbox.resize({ width: "90%", height: "90%" });
//                if (callback)
//                    callback();
//       });
//}

// function GetBySerial(_id, _refreshUrl, _divName, callback) {
//       $.get(
//                _refreshUrl,
//                    {id: _id },
//                function (data) {
//                //   alert(data);
//                    $.colorbox({ title: 'Response', width: '90%', height: '90%', html: data });
//                   if (callback)
//                        callback();
//        });
//    }     