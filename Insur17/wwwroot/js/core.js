var siteCore = {};


//if there is param.files will go here
//param.files = [{fileIdent:"file idendifier", fileElem:file input element}]
var sendApiReqFiles = function (apiType, method, params) {

    //request.action.sessionKey = siteConfig.getAuthVal();
    //, files
    var dfd = jQuery.Deferred();

    var files = params.files;

    params.files = null;
    delete params.files;
    




    var formData = new FormData();
    formData.append("apiType", apiType);
    formData.append("method", method);
    formData.append("params", JSON.stringify(params));

    if (files != null && files.push != null) {
        counter = 0;
        $.each(files, function () {
            var fileData = this;
            $.each($(fileData.fileElem)[0].files, function () {
                formData.append(fileData.fileIdent == null ? "file" + counter : fileData.fileIdent + counter, this);
                counter++;
            });
        });
    }

    var reqOptions = {
        type: 'POST',
        url: "/f_upload",
        data: formData
    };

    reqOptions.contentType = false; // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    reqOptions.processData = false; // NEEDED, DON'T OMIT THIS



    $.ajax(reqOptions).done(function (data) {
        if (data.hasError != 1)
            dfd.resolve(data);
        else
        {
            if (data.makeAuthentication == 1) {
                siteCore.loginRedirect();
            }
            else {
                dfd.reject({ hasError: 1, err_type: 1, err_code: 0 });
            }
        }
    }).fail(function (data) {
        dfd.reject({ hasError: 1, err_type: 0, err_code: 0 });
    });

    return dfd.promise();



};


var sendApiReq = function (apiType, method, params, ajaxOptions) {
    if (typeof (ajaxOptions) == 'undefined' || ajaxOptions == null)
        ajaxOptions = {};

    var dfd = jQuery.Deferred();


    var reqOptions = {
        type: 'GET',
        url: "/api",
        data: {
            apiType: apiType,
            method: method,
            params: params
            
        }
       

    };

    if (ajaxOptions.method != null)
        reqOptions.type = ajaxOptions.type;

    $.ajax(reqOptions).done(function (data) {
        if (data.hasError != 1)
            dfd.resolve(data);
        else
        { 
            if (data.makeAuthentication == 1)
            {
                siteCore.loginRedirect();
            }
            else
            {
                dfd.reject({ hasError: 1, err_type: 1, err_code: 0 });
            }
        }
    }).fail(function (data) {
        dfd.reject({ hasError: 1, err_type: 0, err_code: 0 });
      // dfd.reject(data);
    });

    return dfd.promise();



};

siteCore.sendApiReq = function (apiType, method, params, ajaxOptions) {

    if (params.files != null)
        if (params.files.length == 0) {
            delete params.files;
        }

    if (params.files != null)
        return sendApiReqFiles(apiType, method, params);
    else
        return sendApiReq(apiType, method, params, ajaxOptions);
}

siteCore.getData = function (params, options) {

    //request.action.sessionKey = siteConfig.getAuthVal();
    var dfd = jQuery.Deferred();




    var reqOptions = {
        type: 'GET',
        url: "/api",
        data: {
            apiType: params.apiType,
            method: params.method,
            params: params
            //{
            //    serial: params.serial,
            //    numerator: params.numerator
            //}
        }
    };



    $.ajax(reqOptions).done(function (data) {
        if (data.hasError != 1)
            dfd.resolve(data);
        else
            dfd.reject({ hasError: 1, err_type: 1, err_code: 0 });
    }).fail(function (data) {
        dfd.reject({ hasError: 1, err_type: 0, err_code: 0 });
    });

    return dfd.promise();



};

siteCore.fileDownLoad = function (apiType, method, params) {
    var data = {
        apiType: apiType,
        method: method,
        params:params
    };
    var newLocation = "/api?" + $.param(data);
    console.log(newLocation);
    try{
         window.location.href = newLocation;
    } catch (e){
        alert("לא נמצא קובץ");
    }
};

