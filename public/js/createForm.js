$(function () {
  var startDateRaw = new Date();
  let year = startDateRaw.getFullYear();
  let month = ('0' + (startDateRaw.getMonth() + 1)).slice(-2);
  let day = ('0' + startDateRaw.getDate()).slice(-2);
  var startDate = `${year}-${month}-${day}`;

  var endDateRaw = Number(new Date()) + 7 * 24 * 60 * 60 * 1000;
  endDateRaw = new Date(endDateRaw);
  year = endDateRaw.getFullYear();
  month = ('0' + (endDateRaw.getMonth() + 1)).slice(-2);
  day = ('0' + endDateRaw.getDate()).slice(-2);
  var endDate = `${year}-${month}-${day}`;

  $('#startDatePicker').val(startDate);
  $('#endDatePicker').val(endDate);
  $('#startDatePicker').datepicker({
    format: 'yyyy-mm-dd', //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
    autoclose: true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
    clearBtn: false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
    datesDisabled: ['2019-06-24', '2019-06-26'], //선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
    disableTouchKeyboard: false, //모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
    immediateUpdates: false, //사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false
    showWeekDays: true, // 위에 요일 보여주는 옵션 기본값 : true
    todayHighlight: true, //오늘 날짜에 하이라이팅 기능 기본값 :false
    toggleActive: true, //이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
    language: 'ko', //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
  }); //datepicker end
  $('#endDatePicker').datepicker({
    format: 'yyyy-mm-dd', //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
    autoclose: true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
    clearBtn: false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
    datesDisabled: ['2019-06-24', '2019-06-26'], //선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
    disableTouchKeyboard: false, //모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
    immediateUpdates: false, //사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false
    showWeekDays: true, // 위에 요일 보여주는 옵션 기본값 : true
    todayHighlight: true, //오늘 날짜에 하이라이팅 기능 기본값 :false
    toggleActive: true, //이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
    language: 'ko', //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
  }); //datepicker end
}); //ready end
