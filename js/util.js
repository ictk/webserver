
	function test() {
		console.log('test');

	}
		var def_function=function(){};
		function btn_templtate(selecter, sublet_address, json_function,
				succes_function) {
			$(selecter).click(
					function() {

						console.log(selecter);

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
								succes_function(data);

							},
							error : function(request, status, error) {
								console.log('code: ' + request.status + "\n"
										+ 'message: ' + request.responseText
										+ "\n" + 'error: ' + error);
							}
						});

					});

		};
    function make_form(selector,input_info) {
      var input_unit_form = '<label for="{0}">{1}</label>     <input class="form-control  input-lg"		id="{0}" type="text">\n';
      var str_form = '<div class="form-group" id={0}>\n{1}   \n <button type="button" id="{2}" class="btn btn-lg btn-primary">{3}</button> </div><br/><br/>';
      //0:group_id 1:input_str 2:id 3:lable


        $.each(input_info, function( index, value ) {
          var input_str = "";
            $.each(value.inputs, function( index, value ) {
              input_str += String.format(input_unit_form,value.id,value.lable);
              //var input_unit_form = `<label for="${value.id}">${value.lable}</label>     <input class="form-control  input-lg"		id="${value.id}" type="text">\n`;
              //input_str += input_unit_form;
              console.log(input_str);
            });
            //console.log(input_str);
            var str_res = String.format(str_form,index,input_str,value.button.id,value.button.lable);

            // var str_form = `	<div class="form-group" id=${index}>
            //     ${input_str}
            //     <button type="button" id='${value.button.id}' class="btn btn-lg btn-primary">${value.button.lable}</button>
            //   </div><br/><br/>`;

      		  console.log(str_res);
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
