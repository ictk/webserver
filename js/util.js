
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



        $.each(input_info, function( index, value ) {
          var input_str = "";
            $.each(value.inputs, function( index, value ) {
              var input_unit_form = `<label for="${value.id}">${value.lable}</label>     <input class="form-control  input-lg"		id="${value.id}" type="text">\n`;
              input_str += input_unit_form;
              console.log(input_unit_form);
            });
            //console.log(input_str);

            var str_form = `	<div class="form-group" id=${index}>
                ${input_str}
                <button type="button" id='${value.button.id}' class="btn btn-lg btn-primary">${value.button.lable}</button>
              </div><br/><br/>`;

      		  console.log(str_form);
            $(selector).append(str_form);

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
