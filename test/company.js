
function update_factory_key_id() {


	ajax_templtate('giant_se/admin.do',
	function() {return   {cmd : 'LIST_FACTORY_KEY_ID',params : {}	}	},
	function(data) {
		$('.select_fct').each(
			function (i) {
					$(this).remove();
			});

		//console.log(data);
			$.each(data.list_param, function( index, value ) {
				$('#factory_key_id_select').append(String.format("<li class='select_fct'><a href='#' id='{0}' class='factory_key_id_option' >{0}</a></li>",value.factory_key_id));
			});

			$('.factory_key_id_option').click(
					function() {

						$('#factory_key_id').val(this.id);
							console.log(this.id);

					});



	});

}

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
						update_company_info(company_no);


					});



	});

}


function update_company_info(company_no) {
  ajax_templtate('giant_se/admin.do',
	function() {return   {cmd : 'GET_COMPANY_INFO',params : {company_no:company_no}	}	},
	function(data) {

		$('#factory_key_id').val(data.params.factory_key_id);
		$('#name').val(data.params.name);
		$('#description').val(data.params.description);
		$('#url').val(data.params.url);
		$('#url_img').val(data.params.url_img);





	});

}
		//function abc(a1,a2,a3,a4);
		$(function() {
			console.log('ready');




			//
			update_company_no();
			update_factory_key_id();
			// update_factory_key_id();
			// update_factory_key_id();


			var factorykey_info = {
        group_0: {
            button: {
                id: "input_factory_key",
                lable: "팩토리키 입력"
            },
            inputs: [
                {
									id: "factory_key_id_input",
									lable: "FACTORY KEY ID"
                },
                {
                    id: "factory_key_rtl",
                    lable: "FACTORY KEY RTL"
                },

            ]
        },

      };
      var default_info = {
        group_0: {
            button: {
                id: "input_company_info",
                lable: "회사정보 입력"
            },
            inputs: [
                {
                    id: "company_no",
                    lable: "회사 번호"
                },
                {
                    id: "factory_key_id",
                    lable: "FACTORY KEY ID",
										type:'select'
                },
								{
										id: "name",
										lable: "회사 이름"
								},
								{
										id: "description",
										lable: "회사 설명"
								},
								{
										id: "url",
										lable: "홈페이지 주소"
								},
								{
										id: "url_img",
										lable: "이미지"
								},
            ]
        }

      };




//	console.log(input_info);
	make_form('#factorykey_form',factorykey_info);
  make_form('#default_form',default_info);

    //$('#url_form').hide();
		$('#generate').click(
				function() {
					console.log($('.factory_key_id_option'));
					//make_inputclear(default_info);
					var factory_key_id = generateHexRandom(2);
					var factory_key_rtl = '5C7CCC241E71157F08E1F33D71D1049F';
					$('#factory_key_id_input').val(factory_key_id);
					$('#factory_key_rtl').val(factory_key_rtl);
					$('#company_no').val('ictk0001');

					$('#name').val("ICTK");
					$('#description').val("ICTK는 인증 PUF칩 제조 회사이다.");
					$('#url').val("http://www.ictk.com");
					$('#url_img').val("img/ictk_logo.png");
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




			btn_templtate('#input_factory_key', 'giant_se/admin.do',
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
				update_company_no();

				});


		});
