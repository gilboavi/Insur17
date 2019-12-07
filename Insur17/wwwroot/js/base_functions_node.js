siteCore.loginRedirect = function () {
    sessionStorage.setItem('returnUrl', window.location.pathname + window.location.search);
    window.location.href = "/login";

   
};



// function filter_table(filter ,table_name ,td_number) {
//     // Declare variables 
//     var input, filter, table, tr, td, i;
   
//     filter = filter.toUpperCase();
//     table = document.getElementById(table_name);
//     tr = table.getElementsByTagName("tr");

//     // Loop through all table rows, and hide those who don't match the search query
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td")[td_number];
//         if (td) {
//             if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }


function hide_div(div_to_hide) {
    if (div_to_hide){
           
        var div_array = document.getElementsByClassName(div_to_hide);
        for (var i = 0; i < div_array.length; ++i) {
            div_array[i].style.display = 'none';
        }
    } else{
        
                
                var div_array = document.getElementsByClassName('show_hide_div');
                for (var i = 0; i < div_array.length; ++i) {
                    div_array[i].style.display = 'none';
                }
    }
}

function clear_div() {
    $('.flg_div').val(' ');
    $('.show_hide_div').html("");
}


function filter_table(filter, table_name) {
    // Declare variables 
    var input, _filter, table, tr, td, i ,j,cal;

    _filter = filter.toUpperCase();
    table = document.getElementById(table_name);
    tr = table.getElementsByTagName("tr");
  //  cal = $('th', $("#" + table_name).find('tbody')).length;
    cal =$("#" + table_name + " th").length;
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      for  (j = 0; j < cal; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(_filter) > -1) {
                    tr[i].style.display = "";
                   break;
                } else {
                    tr[i].style.display = "none";
                   
                }
            }
        }
    }
}

function filter_my_table(table_name){
    
        var filter = $("#"+table_name+"_comment").val();
         filter_table(filter, table_name, 1);
}

function hide_all_divs_by_class_name(class_name) {
    var div_array = document.getElementsByClassName(class_name);
    for (var i = 0; i < div_array.length; ++i) {
        div_array[i].style.display = 'none';
    }
}

function clear_val_div_by_class_name(class_name) {
    $('.' + class_name).val(' ');
 
}

function clear_html_div_by_class_name(class_name) {
    $('.' + class_name).html(' ');
}


function log_in() {
    var params_temp = $("#log_in1").serializeJSON();

    var params = {};
    params = $.parseJSON(params_temp);
    params.api = "authentication_api";
    params.action = "login";
  
    get_api_data_by_params(params).done(function (data) {
        if (data.isAuthenticated == true) {
            var returnUrl = sessionStorage.getItem('returnUrl');
            if (typeof (returnUrl) != "undefined" && returnUrl != null) {
                sessionStorage.removeItem('returnUrl');
                window.location.href = returnUrl;
            }
           
        }
        else {
           
            window.location.href = "/login";
        }
    }).fail(function (err) {
        
        alert("זיהו משתמש נכשל");
       
     });
  
}


// main function to get data from api
function get_api_data_by_params(params) {
    var dfd = jQuery.Deferred();

    siteCore.sendApiReq(params.api, params.action, params).done(function (data) {
        dfd.resolve(data);
    }).fail(function (err) {
       
        dfd.reject(err);
      
    });

    return dfd;
};

// rander data to html table,   from get_api_data_by_params function
function render_html_bak(params){
    get_api_data_by_params(params).done(function (data) {
        var my_table_template = $("#"+params.table_template).html();
        var comp = _.template(my_table_template);
               $("#"+params.div_result).html(comp({ data: data }));
          });
}

function render_html(params) {
    var dfd = jQuery.Deferred();
    get_api_data_by_params(params).done(function (data) {
        var my_table_template = $("#" + params.table_template).html();
        var comp = _.template(my_table_template);
        $("#" + params.div_result).html(comp({ data: data }));
        dfd.resolve(data);
        
    }).fail(function (err) {
        dfd.reject(err);
        alert("לא נמצאו נתונים");
    });
    return dfd;
}

function render_html_with_data_and_hide_div(params) {
   
        var my_table_template = $("#" + params.table_template).html();
        var comp = _.template(my_table_template);
        $("#" + params.div_result).html(comp({ data: params.data }));
        hide_div();
        $("#" + params.div_result).show();
  
}

function render_html_with_data(params) {

    var my_table_template = $("#" + params.table_template).html();
    var comp = _.template(my_table_template);
    $("#" + params.div_result).html(comp({ data: params.data }));
   
}

function render_html_without_data(params) {

    var data = {};
    var my_table_template = $("#" + params.table_template).html();
    var comp = _.template(my_table_template);
    $("#" + params.div_result).html(comp({ data: data }));
    hide_div();
    $("#" + params.div_result).show();
}

// open coler box 
function open_colorbox(page_template, data) {
    var table_template = $(page_template).html();
    var comp = _.template(table_template);

    $.colorbox({
        html: comp({
            data: data,
            
        }),
       
        width: '90%',
         height:'90%'
    }
    
        );
}

// save_from_coler_box
function save_from_coler_box(params) {
 

    siteCore.sendApiReq(params.api, params.action, params).then(function (data) {
        if (data.message) {
            alert(data.message);
        }
        else {
            alert(" הרשומה נשמרה");
        }
       
       
        $.colorbox.close();
       
      
    }).fail(function (err) {
       //onsole.log(err);
        alert(" השמירה לא הצליחה");
       
    });


   

}

function save_from_coler_box2(params) {
    
   
    var dfd = jQuery.Deferred();
  //  get_api_data_by_params(params).done(function (data) {
       siteCore.sendApiReq(params.api, params.action, params).done(function (data) {
            dfd.resolve(data);
            if (data.message) {
                alert(data.message);
            }
            else {
                alert("הרשומה נשמרה");
            }
           
         //   alert("4 הרשומה נשמרה");
            $.colorbox.close();
        }).fail(function (err) {
            alert(" השמירה לא הצליחה");
            dfd.reject(err);
          
        });
    
        return dfd;
   
   
      
   
}

function save_from_coler_box_without_close(params) {
     var dfd = jQuery.Deferred();
    
        siteCore.sendApiReq(params.api, params.action, params).done(function (data) {
            dfd.resolve(data);
            if (data.message) {
                alert(data.message);
            }
            else {
                alert("3 הרשומה נשמרה");
            }

        }).fail(function (err) {
            alert(" השמירה לא הצליחה");
            dfd.reject(err);
          
        });
    
        return dfd;
}


function hide_element_by_class_name(class_name) {
    var div_array = document.getElementsByClassName(class_name);
    for (var i = 0; i < div_array.length; ++i) {
        div_array[i].style.display = 'none';
    }
}


function hide_show_div(hide_div_name, show_div_name) {
    
        var hide_div = document.getElementById(hide_div_name);
        var show_div = document.getElementById(show_div_name);
        hide_div.style.display = "none";
        show_div.style.display = "block";
}



function set_datepicker_format(input_name, my_date) {
    $("#" + input_name).datepicker();
    $("#" + input_name).datepicker("option", "dateFormat", "dd/mm/yy");
    if (my_date != null)
        $("#" + input_name).datepicker("setDate", moment(my_date).toDate());
}

