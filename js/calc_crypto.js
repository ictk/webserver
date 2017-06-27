
		//function abc(a1,a2,a3,a4);
		$(function() {
			console.log('ready');




			//
			//update_company_no();
			//update_factory_key_id();
			// update_factory_key_id();
			// update_factory_key_id();


			var crypto_info = {
        group_0: {
            button: {
                id: "input_calc_crypto",
                lable: "암호계산"
            },
            inputs: [
                {
									id: "key_value",
									lable: "KEY"
                },
                {
                    id: "iv_value",
                    lable: "IV"
                },
                {
                  id: "input_value",
                  lable: "INPUT"
                },

            ]
        },

      };




//	console.log(input_info);
	make_form('#crypto_form',crypto_info);




			btn_templtate('#input_calc_crypto', 'giant_se/admin.do',
			function() {
        var factory_key_id =   $('#factory_key_id_input').val();;
        var factory_key_rtl = $('#factory_key_rtl').val();;

        return   {cmd : 'INSERT_FACTORY_KEY',params : {
					factory_key_id:factory_key_id,
          factory_key_rtl:factory_key_rtl,
        }	}	},
				function(data) {
					console.log(data);
					alert("결과:"+data.result+","+data.error);
					update_factory_key_id();


				});

			btn_templtate('#input_company_info', 'giant_se/admin.do',
			function() {
				var name =  $('#name').val();;
        var company_no =   $('#company_no').val();;
        var factory_key_id = $('#factory_key_id').val();;
				var description = $('#description').val();;
				var url = $('#url').val();;
				var url_img = $('#url_img').val();;


        return   {cmd : 'UPDATE_COMAPANY',params : {
					name:name,
					company_no:company_no,
          factory_key_id:factory_key_id,
					option:'insert',
					description:description,
					url:url,
					url_img:url_img,

        }	}	},
				function(data) {
					console.log(data);

				alert("결과:"+data.result+","+data.error);
				//update_company_no();

				});


		});
