
function update_company_no() {


	ajax_templtate('giant_se/admin.do',
	function() {return   {cmd : 'LIST_COMAPANY_NO',params : {}	}	},
	function(data) {
		$('.select_comp').each(
			function (i) {
					$(this).remove();
			});

		//console.log(data);
			$.each(data.list_param, function( index, value ) {
				$('#company_no_select').append(String.format("<li class='select_comp'><a href='#' id='{0}' class='company_no_option' >{1}</a></li>",value.company_no,value.name));
			});

			$('.company_no_option').click(
					function() {

            var company_no = this.id;
            var name = $(this).text();

						$('#company_no').val(company_no);
            $('#name').val(name);
            console.log($(this).text());
            update_urlinfo(company_no);


					});



	});

}

function update_urlinfo(company_no) {
  ajax_templtate('giant_se/admin.do',
	function() {return   {cmd : 'GET_INTENT_URL',params : {company_no:company_no}	}	},
	function(data) {
    $('#store_ios').val("");;;
    $('#intent_ios').val("");;
      $('#intent').val("");;

    $.each(data.list_param, function( index, value ) {
      if(value.type == 'ios'){

      $('#store_ios').val(value.store);;;
      $('#intent_ios').val(value.intent);;


      }
      if(value.type == 'android'){
          $('#intent').val(value.intent);;

      }



    });



	});

}
		//function abc(a1,a2,a3,a4);
		$(function() {
			console.log('ready');




			//
			update_company_no();
			// update_factory_key_id();
			// update_factory_key_id();
			var input_url_info ={

    group_2: {
        button: {
            id: "input_url_android",
            lable: "안드로이드 INTENT URL 정보 입력"
        },
        inputs: [
            {
                id: "intent",
                lable: "INTENT URL"
            },
        ]
    },

		group_3: {
				button: {
						id: "input_url_ios",
						lable: "IOS INTENT URL 정보 입력"
				},
				inputs: [
						{
								id: "intent_ios",
								lable: "INTENT URL"
						},
						{
								id: "store_ios",
								lable: "STORE URL"
						},
				]
		},


};



  make_form('#url_form',input_url_info);

    //$('#url_form').hide();
		$('#generate').click(
				function() {
					console.log($('.factory_key_id_option'));
						$('#intent').val('Intent://ictk#Intent;scheme=nfc;package=ictk.nfc_test;end');;
					$('#store_ios').val('http://itunes.apple.com/kr/app/id393499958?mt=8');;;
					$('#intent_ios').val('daummaps://open');;






				});


  $('#reg_toggle').click(
      function() {
          $('#reg_form').toggle();

      });


			console.log($('.factory_key_id_option'));

			$('.factory_key_id_option').click(
					function() {
							console.log(this.id);

					});



				btn_templtate('#input_url_android', 'giant_se/admin.do',
				function() {
					var company_no =   $('#company_no').val();;
					var type =   'android';
					var store =    '';
					var intent =   $('#intent').val();;



					return   {cmd : 'UPDATE_INTENT_URL',params : {
						company_no:company_no,
						type:type,
						store:store,
						intent:intent,


					}	}	},
					function(data) {
						console.log(data);
					alert("결과:"+data.result+","+data.error);

					});

					btn_templtate('#input_url_ios', 'giant_se/admin.do',
					function() {
						var company_no =   $('#company_no').val();;
						var type =   'ios';
						var store =    $('#store_ios').val();;;
						var intent =   $('#intent_ios').val();;



						return   {cmd : 'UPDATE_INTENT_URL',params : {
							company_no:company_no,
							type:type,
							store:store,
							intent:intent,


						}	}	},
						function(data) {
							console.log(data);
						alert("결과:"+data.result+","+data.error);

						});

		});
