function customCallAjax(critical, save_link, method, api_url, data, success_function, additional_properties, additional_status_codes) {

    var request = {
        method: method,
        dataType: "json",
        mimeType: "application/json",
        url: api_url,
        data: data,
        
        // What to do if request was proceeded successfully
        success: function(data) {
            success_function(data);
        },
        
        //What to do if there was a problem with the request
        statusCode: {
            //If malformed request
            422: function(xhr, ajaxOptions, thrownError) {

                if(critical) {
                    var response = xhr.responseJSON;

                    localStorage.setItem("error_message", JSON.stringify(response));
                    localStorage.setItem("error_code", 422);

                    document.location = "error.html";
                }
            },
            503: function(xhr, ajaxOptions, thrownError) {
                
                if(critical) {
                    var response = xhr.responseJSON;

                    localStorage.setItem("error_message", JSON.stringify(response));
                    localStorage.setItem("error_code", 503);

                    document.location = "error.html";
                }
            }
        }
    };


    request = Object.assign({}, request, additional_properties);
    request.statusCode = Object.assign({}, request.statusCode, additional_status_codes);

    if(critical) {
        localStorage.setItem("last_request", JSON.stringify(request));

        localStorage.setItem("save_link", save_link);
    }

    $.ajax(request);
}
function retryAjaxCall(request) {
    $.ajax(request);
}
function clearLocalStorageAjax() {
    localStorage.removeItem("error_message");
    localStorage.removeItem("last_request");
    localStorage.removeItem("error_code");
    localStorage.removeItem("save_link");
}