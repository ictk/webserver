
	function test() {
		console.log('test');

	}
		var def_function=function(){};
		function btn_templtate(selecter, sublet_address, json_function,
				succes_function) {
			$(selecter).click(
					function() {

						console.log(selecter);
						ajax_templtate(sublet_address, json_function,
								succes_function);

						// var jsoncontents = json_function();
						// console.log("snd:",jsoncontents);
						//
						//
						// $.ajax({
						// 	type : 'post',
						// 	dataType : 'json',
						// 	url : sublet_address,
						//
						// 	data : {json:JSON.stringify(jsoncontents)} ,
						//
						// 	success :
						// 		function(data) {
						// 		console.log("rcv:",data);
						// 		succes_function(data);
						//
						// 	},
						// 	error : function(request, status, error) {
						// 		console.log('code: ' + request.status + "\n"
						// 				+ 'message: ' + request.responseText
						// 				+ "\n" + 'error: ' + error);
						// 	}
						// });

					});

		};
		function ajax_templtate( sublet_address, json_function,		succes_function) {

				var jsoncontents = json_function();
				console.log("snd:",jsoncontents);


				$.ajax({
					type : 'post',
					dataType : 'json',
					url : sublet_address,

					data : {json:JSON.stringify(jsoncontents)} ,

					success :
						function(data) {
						console.log("rcv:",data);
						if(data.result != 'OK'){
							alert("실패:"+data.error);
							return;
						}

						succes_function(data);

					},
					error : function(request, status, error) {
						var str = 'code: ' + request.status + "\n"
								+ 'message: ' + request.responseText
								+ "\n" + 'error: ' + error;

						alert("실패:"+str);
						console.log('code: ' + request.status + "\n"
								+ 'message: ' + request.responseText
								+ "\n" + 'error: ' + error);
					}
				});



		};
    function make_form(selector,input_info) {
      var input_unit_form = '<label for="{0}">{1}</label>     <input class="form-control  input-lg"		id="{0}" type="text">\n';
			var select_unit_form ='<select class="selectpicker" id="{0}"></select>';
      var str_form = '<div class="form-group" id={0}>\n{1}   \n <button type="button" id="{2}" class="btn btn-lg btn-success">{3}</button> </div><br/><br/>';
      //0:group_id 1:input_str 2:id 3:lable


        $.each(input_info, function( index, value ) {
          var input_str = "";
            $.each(value.inputs, function( index, value ) {
							// if(value.type == 'select'){
							// 	input_str += String.format(select_unit_form,value.id,value.lable);
							// }
							// else {
							// 	input_str += String.format(input_unit_form,value.id,value.lable);
							// }

							input_str += String.format(input_unit_form,value.id,value.lable);

              //var input_unit_form = `<label for="${value.id}">${value.lable}</label>     <input class="form-control  input-lg"		id="${value.id}" type="text">\n`;
              //input_str += input_unit_form;
              //console.log(input_str);
            });
            //console.log(input_str);
            var str_res = String.format(str_form,index,input_str,value.button.id,value.button.lable);

            // var str_form = `	<div class="form-group" id=${index}>
            //     ${input_str}
            //     <button type="button" id='${value.button.id}' class="btn btn-lg btn-primary">${value.button.lable}</button>
            //   </div><br/><br/>`;

      		  //console.log(str_res);
            $(selector).append(str_res);

      	});




    }
    function make_inputclear(input_info) {
      $.each(input_info, function( index, value ) {
        var input_str = "";
          $.each(value.inputs, function( index, value ) {
            $("#"+value.id).val("");
          });

      });


    }


    String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
    // "gm" = RegEx options for Global search (more than one instance)
    // and for Multiline search
    var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
    theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
    }


function generateRandom(min, max) {
		var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
		return ranNum;
}
function generateHexRandom( count) {
	var refstr = '0123456789ABCDEF';
	var ret = '';
	for(idx = 0 ; idx < count ;idx++){

		var hi = generateRandom(0,15);
		var lo = generateRandom(0,15);

		ret += refstr[hi];
		ret += refstr[lo];
	}
	return ret;

}




function get_naviinfo() {
  var unknown = '-';

    // screen
    var screenSize = '';
    if (screen.width) {
        width = (screen.width) ? screen.width : '';
        height = (screen.height) ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    // Edge
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
        browser = 'Microsoft Edge';
        version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
    }

    // system
    var os = unknown;
    var clientStrings = [
        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Windows Vista', r:/Windows NT 6.0/},
        {s:'Windows Server 2003', r:/Windows NT 5.2/},
        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
        {s:'Windows 98', r:/(Windows 98|Win98)/},
        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s:'Windows CE', r:/Windows CE/},
        {s:'Windows 3.11', r:/Win16/},
        {s:'Android', r:/Android/},
        {s:'Open BSD', r:/OpenBSD/},
        {s:'Sun OS', r:/SunOS/},
        {s:'Linux', r:/(Linux|X11)/},
        {s:'iOS', r:/(iPhone|iPad|iPod)/},
        {s:'Mac OS X', r:/Mac OS X/},
        {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s:'QNX', r:/QNX/},
        {s:'UNIX', r:/UNIX/},
        {s:'BeOS', r:/BeOS/},
        {s:'OS/2', r:/OS\/2/},
        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }

    // flash (you'll need to include swfobject)
    /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
    var flashVersion = 'no check';
    if (typeof swfobject != 'undefined') {
        var fv = swfobject.getFlashPlayerVersion();
        if (fv.major > 0) {
            flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
        }
        else  {
            flashVersion = unknown;
        }
    }


jscd = {
    screen: screenSize,
    browser: browser,
    browserVersion: version,
    browserMajorVersion: majorVersion,
    mobile: mobile,
    os: os,
    osVersion: osVersion,
    cookies: cookieEnabled,
    flashVersion: flashVersion
};

return jscd;

}
