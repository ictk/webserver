

		//function abc(a1,a2,a3,a4);
		$(function() {
			console.log('ready');
      test();



      var default_info = {
        group_0: {
            button: {
                id: "set_feature",
                lable: "칩 피쳐 설정 및 시작"
            },
            inputs: [
                {
                    id: "puf",
                    lable: "PUF"
                },
                {
                    id: "factory_key_rtl",
                    lable: "FACTORY KEY RTL"
                }
            ]
        },
        group_1: {
            button: {
                id: "get_sn",
                lable: "SN 값 가져오기(from chip)"
            },
            inputs: [
                {
                    id: "sn",
                    lable: "SN"
                },
                {
                    id: "ascii_sn",
                    lable: "ASCII SN"
                }
            ]
        },

      };

			var input_reg_info =
{


    group_2: {
        button: {
            id: "get_factory_key_id",
            lable: "FACTORY KEY ID 가져오기(from server)"
        },
        inputs: [
            {
                id: "factory_key_id",
                lable: "FACTORY  KEY ID"
            }
        ]
    },
    group_3: {
        button: {
            id: "get_reg_key",
            lable: "등록 키 가져오기(from chip)"
        },
        inputs: [
            {
                id: "nonce",
                lable: "NONCE"
            },
            {
                id: "cipher",
                lable: "CIPHER"
            },
            {
                id: "mac",
                lable: "MAC"
            }
        ]
    },
    group_4: {
        button: {
            id: "get_calc_mac",
            lable: "등록 결과 가져오기 (from server)"
        },
        inputs: [
            {
                id: "calc_mac",
                lable: "서버에서 계산된 맥값"
            },
            {
                id: "result",
                lable: "최종 결과"
            },
            {
                id: "error",
                lable: "오류값"
            }
        ]
    }
};
var input_auth_info =
{


group_5: {
  button: {
      id: "get_random_values",
      lable: "RANDOM VALUES 가져오기(from server)"
  },
  inputs: [
      {
          id: "random",
          lable: "RANDOM"
      },
      {
          id: "random_server",
          lable: "RANDOM SERVER"
      }
  ]
},
group_6: {
  button: {
      id: "get_authentication",
      lable: "인증 정보 가져오기(from chip)"
  },
  inputs: [

      {
          id: "cipher_auth",
          lable: "CIPHER"
      },
      {
          id: "mac_auth",
          lable: "MAC"
      }
  ]
},
group_7: {
  button: {
      id: "req_athentication",
      lable: "등록 결과 가져오기 (from server)"
  },
  inputs: [
      {
          id: "calc_mac_auth",
          lable: "서버에서 계산된 맥값"
      },
      {
          id: "result_auth",
          lable: "최종 결과"
      },
      {
          id: "error_auth",
          lable: "오류값"
      }
  ]
}
};


//	console.log(input_info);
  make_form('#default_form',default_info);
  make_form('#reg_form',input_reg_info);
  make_form('#auth_form',input_auth_info);

  make_inputclear(input_reg_info);
	make_inputclear(input_auth_info);
	// $.each(input_info, function( index, value ) {
	// 	console.log(index, value);
  //
	// });
  //
    $('#reg_form').hide();
    $('#auth_form').hide();
  $('#reg_toggle').click(
      function() {
          $('#reg_form').toggle();

      });

      $('#auth_toggle').click(
          function() {
              $('#auth_form').toggle();

          });

        $('#generate').click(
            function() {
              make_inputclear(default_info);
              var factory_key_rtl = '5C7CCC241E71157F08E1F33D71D1049F';
              var puf = '6B534B5A548A1E3EEF8F053B02AD7EF8';
              $('#puf').val(puf);
              $('#factory_key_rtl').val(factory_key_rtl);

            });

			btn_templtate('#set_feature', 'giant_se/simchip.do',
			function() {

        var factory_key_rtl =   $('#factory_key_rtl').val();;
        var puf = $('#puf').val();;




        return   {cmd : 'SET_FEATURE',params : {
          factory_key_rtl:factory_key_rtl,
          puf:puf

        }	}	},
			function(data) {
				console.log(data);
				console.log(data.params.puf);
				console.log(data.params.factory_key_rtl);

				alert("결과:"+data.result+","+data.error);

				make_inputclear(input_reg_info);
				make_inputclear(input_auth_info);
				// $('#puf').val(data.params.puf);
				// $('#factory_key_rtl').val(data.params.factory_key_rtl);



			});

			btn_templtate('#get_sn', 'giant_se/simchip.do',
				function() {return   {cmd : 'GET_SN',params : {}	}	},
				function(data) {
					console.log(data);
					console.log(data.params.sn);
					$('#sn').val(data.params.sn);
          $('#ascii_sn').val(data.params.ascii_sn);

					$('#reg_form').show();
					$(location).attr('href', '#reg_form')
				});


			btn_templtate('#get_factory_key_id', 'giant_se/reg.do',
				function() {return   {cmd : 'FACTORY_KEY_ID',params : {
					sn:$('#sn').val(),
					org_code:'ictk0001'
				}}},
				function(data) {
					console.log(data);
					console.log(data.params.factory_key_id);
					$('#factory_key_id').val(data.params.factory_key_id);
				}


			);

			btn_templtate('#get_reg_key', 'giant_se/simchip.do',
					function() {return   {cmd : 'GET_REG_KEY',params : {
						factory_key_id:$('#factory_key_id').val(),
					}}},
					function(data) {
						console.log(data);
						$('#nonce').val(data.params.nonce);
						$('#cipher').val(data.params.cipher);
            $('#mac').val(data.params.mac);
					}


				);

        btn_templtate('#get_calc_mac', 'giant_se/reg.do',
  					function() {return   {cmd : 'REGISTER',params : {
  						nonce:$('#nonce').val(),
              cipher:$('#cipher').val(),
              mac:$('#mac').val(),
  					}}},
  					function(data) {
  						console.log(data);
  						$('#calc_mac').val(data.params.calc_mac);
  						$('#result').val(data.result);
              $('#error').val(data.error);
							if(data.result != "OK") return;
							//alert("등록이 완료 되었습니다.");
							//$('#reg_form').hide();
							$('#auth_form').show();
							$(location).attr('href', '#auth_form')

  					}



  				);

          btn_templtate('#get_random_values', 'giant_se/auth.do',
            function() {return   {cmd : 'RANDOM_VALUES',params : {
              sn:$('#sn').val(),
            }}},
            function(data) {
              console.log(data);

              $('#random').val(data.params.random);
              $('#random_server').val(data.params.random_server);
            }


          );

					btn_templtate('#get_authentication', 'giant_se/simchip.do',
						function() {return   {cmd : 'AUTHENTICATION',params : {
							random:$('#random').val(),
							random_server:$('#random_server').val(),
						}}},
						function(data) {
							console.log(data);
							$('#cipher_auth').val(data.params.cipher);
							$('#mac_auth').val(data.params.mac);
						}


					);

					btn_templtate('#req_athentication', 'giant_se/auth.do',
						function() {return   {cmd : 'AUTHENTICATION',params : {
							cipher:$('#cipher_auth').val(),
							mac:$('#mac_auth').val(),
						}}},
						function(data) {
							console.log(data);
							console.log(data);
							$('#calc_mac_auth').val(data.params.calc_mac);
							$('#result_auth').val(data.result);
							$('#error_auth').val(data.error);

							if(data.result != "OK") return;
							//alert("인증이 완료 되었습니다.");
						}


					);





		});
