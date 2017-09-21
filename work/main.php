<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- 위 3개의 메타 태그는 *반드시* head 태그의 처음에 와야합니다; 어떤 다른 콘텐츠들은 반드시 이 태그들 *다음에* 와야 합니다 -->
  <title>샘플폼</title>

  <!-- 부트스트랩 -->

  <!-- 합쳐지고 최소화된 최신 CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

  <!-- 부가적인 테마 -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">


</head>


<body ng-app="myApp" ng-controller="userCtrl" ng-init='bodyInit()'>


  <style type="text/css">
    table.blueTable {
      border: 1px solid #1C6EA4;
      background-color: #EEEEEE;
      width: 90%;
      text-align: left;
      border-collapse: collapse;
    }

    table.blueTable td,
    table.blueTable th {
      border: 1px solid #AAAAAA;
      padding: 3px 2px;
    }

    table.blueTable tbody td {
      font-size: 13px;
    }

    /*table.blueTable tr:nth-child(even) {
      background: #D0E4F5;
    }*/

    table.blueTable thead {
      background: #1C6EA4;
      background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
      background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
      background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
      border-bottom: 2px solid #444444;
    }

    table.blueTable thead th {
      background: #1C6EA4;
      font-size: 15px;
      font-weight: bold;
      color: #FFFFFF;
      border-left: 2px solid #D0E4F5;
      text-align: center;
    }

    /*table.blueTable thead th:first-child {
      border-left: none;
    }*/

    table.blueTable tfoot {
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      background: #D0E4F5;
      background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
      background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
      background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
      border-top: 2px solid #444444;
    }

    table.blueTable tfoot td {
      font-size: 14px;
    }

    table.blueTable tfoot .links {
      text-align: right;
    }

    table.blueTable tfoot .links a {
      display: inline-block;
      background: #1C6EA4;
      color: #FFFFFF;
      padding: 2px 8px;
      border-radius: 5px;
    }


    table.blueTable td.edit{
        white-space: pre-line;
    }
    table.blueTable td.project_title{
        background: #94CAF7;
        color: #FFFFFF;
        font-size: 15px;
        text-align: left;

    }


  </style>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <!--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script> -->
  <!-- 합쳐지고 최소화된 최신 자바스크립트 -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>



  <script src="js/work.js"></script>

  <script type="text/javascript">
    angular.module('myApp', []).controller('userCtrl', ['$scope', '$window', '$http', mainController]);
  </script>




  <div id='navi'></div>




  <!-- <button class="w3-btn w3-green w3-ripple"  ng-click="test()" >&#10004; TEST</button> -->

  <form class="w3-container" id="div_input" name="div_input">
    <h3>{{contents_title}}</h2>
      <!-- <div class="w3-container w3-orange">
        <h3>{{contents_title}}</h2>
      </div> -->

      <!-- <h3 ng-show="edit">Insert New CONTENTS:</h3>
    <h3 ng-hide="edit">Update CONTENTS:</h3> -->


    </head>

    <div class="">


      <table class="blueTable" style="height: 173px;" width="200">
        <thead>
          <tr>
            <!-- <th width="15%" rowspan="2">프로젝트</th> -->
            <th colspan="2">금주 진행</th>
            <th colspan="2">차주 진행</th>
            <th width="15%" rowspan="2">삭제</th>
          </tr>
          <tr>
            <th width="30%">내용</th>
            <th>일정</th>
            <th width="30%">내용</th>
            <th>일정</th>

          </tr>
        </thead>
        <tbody>


          <tr ng-repeat=" (idx,content) in list_contents" ng-include="getTemplate(content)" >     </tr>

          <td colspan="6">

            <button class="w3-btn w3-green w3-ripple" ng-disabled="!check_save" ng-click="save(uid)">&#10004; 프로젝트 추가</button>

          </td>


          <tr>
            <td class="project_title" colspan="6" height="100%">
              제안사항
            </td>
          </tr>
          <tr>
            <td colspan="6" height="100%">
              <TEXTAREA class="w3-input w3-border" ng-model="issue" ROWS=1 COLS=10 placeholder="이슈" tabindex='2'></TEXTAREA>
            </td>
          </tr>
          <tr>
            <td class="project_title" colspan="6">
              요청사항
            </td>

          </tr>

          <tr>


            <td colspan="6">
              <TEXTAREA class="w3-input w3-border" ng-model="issue" ROWS=1 COLS=10 placeholder="이슈" tabindex='2'></TEXTAREA>
            </td>

          </tr>
          <tr>


            <td class="project_title" colspan="6" height="100%">
              상세 업무 진행 내용
            </td>
          </tr>
          <tr>


            <td colspan="6">
              <TEXTAREA class="w3-input w3-border" ng-model="issue" ROWS=10 COLS=10 placeholder="이슈" tabindex='2'></TEXTAREA>
            </td>

          </tr>
        </tbody>
      </table>
      <script type="text/ng-template" id="project">
        <td  colspan="4" class="project_title">
          *프로젝트 - {{content.project}}
        </td>
        <td   class="project_title">
          <button class="w3-btn w3-green w3-ripple" ng-click="addContent()">하위 항목 추가</button>
        </td>

      </script>

      <script type="text/ng-template" id="display">
        <td rowspan="{{content.row_span}}" ng-show="content.project!=''">
          {{content.project}}
        </td>
        <td class='edit'>{{content.this_week.subtitle}}<br> {{content.this_week.detail}}</td>
        <td class='edit'>{{content.this_week.due}}</td>
        <td class='edit'>{{content.next_week.subtitle}}<br> {{content.next_week.detail}}</td>
        <td class='edit'>{{content.next_week.due}}</td>
        <td>
          <button class="w3-btn w3-green w3-ripple" ng-click="editContent(content)">Edit</button>
        </td>
      </script>
      <script type="text/ng-template" id="edit">
        <td rowspan="{{content.row_span}}" ng-show="selected.project!=''">
          <TEXTAREA class="w3-input w3-border" ng-model="selected.project" ROWS={{contents_rows*(content.row_span)+10 }} COLS=10 placeholder="이슈" tabindex='2'></TEXTAREA>
        </td>
        <td width="30%">
          <input type="text" width="100%" ng-model="selected.this_week.subtitle">
          <TEXTAREA class="w3-input w3-border" ng-model="selected.this_week.detail" ROWS={{contents_rows}} COLS=60 placeholder="이슈" tabindex='2'></TEXTAREA>
        </td>
        <td width="10%">
          <TEXTAREA class="w3-input w3-border" ng-model="selected.this_week.due" ROWS={{contents_rows}} COLS=10 placeholder="이슈" tabindex='2'></TEXTAREA>
        </td>
        <td width="30%">
          <input type="text" width="100%" ng-model="selected.next_week.subtitle">
          <TEXTAREA class="w3-input w3-border" ng-model="selected.next_week.detail" ROWS={{contents_rows}} COLS=60 placeholder="이슈" tabindex='2'></TEXTAREA>
        </td>
        <td width="10%">
           <TEXTAREA class="w3-input w3-border" ng-model="selected.next_week.due" ROWS={{contents_rows}} COLS=10 placeholder="이슈" tabindex='2'></TEXTAREA>
        </td>
        <td>
          <button class="w3-btn w3-green w3-ripple" ng-click="saveContent(idx)">Save</button>
          <button class="w3-btn w3-green w3-ripple" ng-click="reset()">Cancel</button>
        </td>
      </script>


    </div>


    <div class="alert alert-success" ng-hide="msg == ''">
      <strong>Warning!</strong> {{msg}}
    </div>

    <div class="alert alert-danger" ng-hide="warning == ''">
      <strong>Warning!</strong> {{warning}}
    </div>

    <br>
    <!-- <button class="w3-btn w3-green w3-ripple" ng-click="modifyChip()" ng-disabled="error || incomplete">&#10004; Save Changes</button> -->
    <button class="w3-btn w3-green w3-ripple" ng-disabled="!check_save" ng-click="save(uid)">&#10004; SAVE</button>
    <button class="w3-btn w3-green w3-ripple" ng-disabled="uid==''" ng-click="delete(uid)">&#10004; 삭제</button>
    <br>



  </form>


</body>

</html>
