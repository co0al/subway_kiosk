////////////////////////메뉴////////////////////////
$(document).ready(function(){
  $('nav ul li a').click(function(){
    $('nav ul li').removeClass('active');
    $(this).parent().addClass('active');
  })

  $('.pd_tab ul li a').click(function(){
    var div_id = $(this).parents('div.tab-pane').attr('id');
    var tab_id = $(this).parent().attr('data-tab');
    //alert(tab_id+"/"+div_id);
    if(tab_id==="all"){
      $('div#'+div_id+' .pd_list_wrapper ul li').css({
        'opacity':'1',
        'display':'block',
        'transform':'matrix(1,0,0,1,0,0)'
      });
    }else {
      $('div#'+div_id+' .pd_list_wrapper ul li').css({
        'opacity':'0',
        'display':'none',
        'transform':'matrix(0.8, 0, 0, 0.8, 0, 0)'
      });
      $('div#'+div_id+' li.'+tab_id).css({
        'opacity':'1',
        'display':'block',
        'transform':'matrix(1,0,0,1,0,0)'
      });
    }
    $('div#'+div_id+' .pd_tab ul li').removeClass('active');
    $(this).parent().addClass('active');

  })

  $('#myTab a[href="#profile"]').tab('show')

})


////////////////////////샌드위치 선택 메뉴 팝업 & 선택개수 제어////////////////////////

$(document).ready(function(){

  // 샌드위치선택
  $(".pd_list_wrapper li a.btn_view").click(function(){

    //옵션 선택 없는 메뉴 체크
    var nonop = $(this).parent().attr('class');
    //alert(nonop);

    $("div#check").removeClass('active');
    $("div#allselect").removeClass('active');
    //처음 세트 사이드 메뉴 숨김
    $('div.sides').css('display','none');

    var img = $(this).siblings('div.img').children('img').attr('src');
    var tit = $(this).siblings('strong.tit').text();
    var eng = $(this).siblings('span.eng').text();
    var cal = $(this).siblings('span.cal').text();
    var price = $(this).siblings('span.price').text();

    //최상위 탭 id값 확인하기
    var idname=$(this).parent().parent().parent().parent().parent().attr('id');
    //alert(idname);

    if ( nonop.indexOf('nonop') != -1 || idname.indexOf('SidesDrink') != -1) {
      var con = confirm(tit+'를 주문목록에 추가하시겠습니까?');
      if(con == true){

        var count = 0; //전역변수 초기값 0 지정
        function nonop_orderadd(e){

          //제품명
          var SelectMenu = tit;
          //가격
          var SelectMenuPrice = price;
          //수량
          var quantity = 1;

          count++;
          var addOrderHTML = '<tr>';//추가시킬소스(변수)준비
          addOrderHTML += '<td>' + count + '</td>';
          addOrderHTML += '<td id="menu">' + SelectMenu + '</td>';

          addOrderHTML += '<td>';
          addOrderHTML += '  <div class="center">';
          addOrderHTML += '    <div class="input-group">';
          addOrderHTML += '      <span class="input-group-btn">';
          addOrderHTML += '        <button id="qty-minus" type="button" class="btn btn-default btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">';
          addOrderHTML += '          <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>';
          addOrderHTML += '        </button>';
          addOrderHTML += '      </span>';
          addOrderHTML += '      <input id="CC-prodDetails-quantity" type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="100">';
          addOrderHTML += '      <span class="input-group-btn">';
          addOrderHTML += '        <button id="qty-plus" type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">';
          addOrderHTML += '          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>';
          addOrderHTML += '        </button>';
          addOrderHTML += '      </span>';
          addOrderHTML += '    </div>';
          addOrderHTML += '  </div>';
          addOrderHTML += '</td>';

          addOrderHTML += '<td id="price">' + SelectMenuPrice + '</td>';

          addOrderHTML += '<td id="del" rowspan="2">';
          addOrderHTML += '  <div class="input-group">';
          addOrderHTML += '    <button id="del-btn" type="button" class="btn btn-default" data-type="del" data-field="">';
          addOrderHTML += '        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
          addOrderHTML += '    </button>';
          addOrderHTML += '  </div>';
          addOrderHTML += '</td>';

          addOrderHTML += '</tr>';
          addOrderHTML += '<tr>';
          addOrderHTML += '<td>'+count+'-OP</td>';
          addOrderHTML += '<td colspan="3" id="option">옵션선택해당없음</td>';
          addOrderHTML += '</tr>';


          $("#tblorder > tbody").append(addOrderHTML);
        }

        nonop_orderadd();
      }

    }else{

      $('#optionmodal').modal('show');
      $('#optionmodal div.choicemenu img').attr('src',img);
      $('#optionmodal div.choicemenu strong.tit').text(tit);
      $('#optionmodal div.choicemenu span.eng').text(eng);
      $('#optionmodal div.choicemenu span.cal').text(cal);
      $('#optionmodal div.choicemenu span.price').text(price);

      if(idname==='ChoppedSalad'){
        $('#optionmodal div.bread ul').css('display','none');
        $('#optionmodal div.bread').css('position','relative');
        $('#optionmodal div.bread .cover').css('display','block');
      }

    }

  })

  // 옵션선택
  $('div#check a').click(function(){
    $(this).parent().toggleClass('active');
  });

  //빵선택
  $('div.bread ul li.bread div#check a').click(function(){
    $('div.bread ul li.bread div#check').removeClass('active');
    $(this).parent().addClass('active');
  })

  //사이즈선택
  $('div.bread-option ul li.size div#check a').click(function(){
    $('div.bread-option ul li.size div#check').removeClass('active');
    $(this).parent().addClass('active');
  })

  //치즈선택
  $('div.cheese ul li.cheese div#check a').click(function(){
    $('div.cheese ul li.cheese div#check').removeClass('active');
    $(this).parent().addClass('active');
  })

  // 야채전체선택
  $('div#allselect a').click(function(){
    $(this).parent().toggleClass('active');
    var classname=$('div#allselect').attr('class');

    if(classname==='active'){
      $('div.vegetable li div#check').addClass('active');
    }else{
      $('div.vegetable li div#check').removeClass('active');
    }
  })
  // 야채전체선택
  $('div.vegetable li div#check').click(function(){
    var count=$('div.vegetable li div.active').length;

    if(count<8){
      $('div#allselect').removeClass('active');
    }else{
      $('div#allselect').addClass('active');
    }
    //alert($('div.vegetable li div.active').length);

  })

  //소스선택
  $('div.sauce li div#check a').click(function(){
    $('div.sauce strong span').removeClass('on');
    var count=$('div.sauce li div.active').length;

    if(count===4){
      $(this).parent().removeClass('active');
      $('div.sauce strong span').addClass('on');
    }
    //alert($('div.vegetable li div.active').length);

  })

  // 세트선택
  $('div.set ul li.set div#check a').click(function(){
      $('div.set ul li.set div#check').removeClass('active');
      $(this).parent().addClass('active');

    var set = $(this).parent().siblings('strong.tit').text();
     if(set==='세트'){
       $('div.sides').slideDown();
     }else{
       $('div.sides').css('display','none');
     }
  })

  //사이드선택(칩or쿠키)
  $('div.sides ul li.sides div#check a').click(function(){
    $('div.sides ul li.sides div#check').removeClass('active');
    $(this).parent().addClass('active');
  })

  //사이드선택(음료)
  $('div.sides ul li.drink div#check a').click(function(){
    $('div.sides ul li.drink div#check').removeClass('active');
    $(this).parent().addClass('active');
  })

});





////////////////////////옵션선택값////////////////////////
$(document).ready(function(){

  $("#tblorder > tbody").on("click","button#del-btn",function(e){
    if (confirm("정말로 삭제하시겠습니까?")) {
      $(e.currentTarget).parent().parent().parent().next().remove();
      $(e.currentTarget).parent().parent().parent().remove();
    }
  });
//수량수정
  $("#tblorder > tbody").on("click","button#qty-plus",function(e){
     var Quantity = $(e.currentTarget).parent().parent().children('#CC-prodDetails-quantity').attr('value');
       //alert(Quantity+'/'+price);
    $(e.currentTarget).parent('button#qty-minus').attr('disabled','false')
    $(e.currentTarget).parent().parent().children('#CC-prodDetails-quantity').attr('value',Quantity*1+1);

  })

  $("#tblorder > tbody").on("click","button#qty-minus",function(e){
     var Quantity = $(e.currentTarget).parent().parent().children('#CC-prodDetails-quantity').attr('value');

     if(Quantity==1){
       $(e.currentTarget).parent().attr('disabled','disabled')
     }else{
       $(e.currentTarget).parent().parent().children('#CC-prodDetails-quantity').attr('value',Quantity*1-1);
     }

  })


  $("#option-btn").click(orderadd);

  var count = 0; //전역변수 초기값 0 지정
  function orderadd(e){

    //제품명
    var SelectMenu = $('#optionmodal div.choicemenu strong.tit').text();
    //가격
    var SelectMenuPrice = $('#optionmodal div.choicemenu span.price').text();
    //수량
    var quantity = 1;
    //선택옵션

    //데우기
    var HeatUP = $('#optionmodal li.heatup div.active').siblings('strong.tit').text();
    if( HeatUP ==='데워주세요'){
      HeatUP = 'H';
    }else {
      HeatUP = 'N';
    }

    //토핑선택배열담기
    var tps = $('#optionmodal li.topping div.active');
    var ARTopping = new Array();
    if(tps.length===0){
      Topping="추가없음";
    }else{
      for(i = 0; i<tps.length; i++){
        var child = "#optionmodal li.topping div.active:eq("+i+")"
        ARTopping[i]= $(child).siblings('strong.tit').text();
      }
      Topping=ARTopping;
    }

    //야채선택배열담기
    var vgs = $('#optionmodal li.vegetable div.active');
    var ARVegetable = new Array();
    if( vgs.length === 8 ){
      Vegetable = '야채전체';
    }else{
      var allvg = new Array("양상추","토마토","오이","피망","양파","피클","올리브","할라피뇨");
      for (i = 0; i < vgs.length; i++) {
        var child = "#optionmodal li.vegetable div.active:eq("+i+")"
        ARVegetable[i]= $(child).siblings('strong.tit').text();
        allvg.splice(allvg.indexOf(ARVegetable[i]),1);
        //alert(ARVegetable[i]);
      }
      //alert("ARVegetable"+ARVegetable);
      Vegetable = allvg+" 제외";
    }
    //var Vegetable = $('#optionmodal li.vegetable div.active').siblings('strong.tit').text();

    //소스
    var sas = $('#optionmodal li.sauce div.active');
    var ARSauce = new Array();
    if(sas.length===0){
      Sauce="소스없음";
    }else{
      for(i = 0; i<sas.length; i++){
        var child = "#optionmodal li.sauce div.active:eq("+i+")"
        ARSauce[i]= $(child).siblings('strong.tit').text();
      }
      Sauce=ARSauce;
    }

    //세트
    var sets = $('#optionmodal div.set li div.active');
    var ARSet = new Array();
    if(sets==='단품'){
      CSet='단품';
    }else{
      for(i = 0; i<sets.length; i++){
        var child = "#optionmodal div.set li div.active:eq("+i+")"
        ARSet[i]= $(child).siblings('strong.tit').text();
      }
      CSet=ARSet;
    }

    var OJSelectOption = new Object();
      OJSelectOption.Bread = $('#optionmodal li.bread div.active').siblings('strong.tit').text();
      OJSelectOption.Size = $('#optionmodal li.size div.active').siblings('strong.tit').text();
      OJSelectOption.HeatUp = $('#optionmodal li.heatup div.active').siblings('strong.tit').text();
      OJSelectOption.Cheese = $('#optionmodal li.cheese div.active').siblings('strong.tit').text();
      OJSelectOption.Topping = $('#optionmodal li.topping div.active').siblings('strong.tit').text();
      OJSelectOption.Vegetable = $('#optionmodal li.vegetable div.active').siblings('strong.tit').text();
      OJSelectOption.Sauce = $('#optionmodal li.sauce div.active').siblings('strong.tit').text();
      OJSelectOption.CSet = $('#optionmodal li.side div.active').siblings('strong.tit').text();

    var SelectOption = $('#optionmodal div.active').siblings('strong.tit').text();

    var ARSelectOption = [
      OJSelectOption.Bread,
      OJSelectOption.Size,
      HeatUP,
      OJSelectOption.Cheese,
      Topping,
      Vegetable,
      Sauce,
      CSet
    ];

    //document.getElementById("option").innerHTML = ARSelectOption.join("/");


    count++;
    var addOrderHTML = '<tr>';//추가시킬소스(변수)준비
    addOrderHTML += '<td>' + count + '</td>';
    addOrderHTML += '<td id="menu">' + SelectMenu + '</td>';

    addOrderHTML += '<td>';
    addOrderHTML += '  <div class="center">';
    addOrderHTML += '    <div class="input-group">';
    addOrderHTML += '      <span class="input-group-btn">';
    addOrderHTML += '        <button id="qty-minus" type="button" class="btn btn-default btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">';
    addOrderHTML += '          <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>';
    addOrderHTML += '        </button>';
    addOrderHTML += '      </span>';
    addOrderHTML += '      <input id="CC-prodDetails-quantity" type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="100">';
    addOrderHTML += '      <span class="input-group-btn">';
    addOrderHTML += '        <button id="qty-plus" type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">';
    addOrderHTML += '          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>';
    addOrderHTML += '        </button>';
    addOrderHTML += '      </span>';
    addOrderHTML += '    </div>';
    addOrderHTML += '  </div>';
    addOrderHTML += '</td>';

    addOrderHTML += '<td id="price">' + SelectMenuPrice + '</td>';

    addOrderHTML += '<td id="del" rowspan="2">';
    addOrderHTML += '  <div class="input-group">';
    addOrderHTML += '    <button id="del-btn" type="button" class="btn btn-default" data-type="del" data-field="">';
    addOrderHTML += '        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
    addOrderHTML += '    </button>';
    addOrderHTML += '  </div>';
    addOrderHTML += '</td>';

    addOrderHTML += '</tr>';
    addOrderHTML += '<tr>';
    addOrderHTML += '<td>'+count+'-OP</td>';
    addOrderHTML += '<td colspan="3" id="option">'+ ARSelectOption.join("/") +'</td>';
    addOrderHTML += '</tr>';


    $("#tblorder > tbody").append(addOrderHTML);

  }

})

////////////////////////결제하기버튼////////////////////////
$(document).ready(function(){
  $("#pay-btn").click(function(){

    $('#orderformmodal').modal('show');
    $('#orderformmodal .ordersheet-wrap table#tblorder tbody .input-group button').css({
      'display':'none'
    })
    $('#orderformmodal .ordersheet-wrap table#tblorder tbody .input-group input').css({
      'box-shadow':'none',
      'border':'0',
      'background':'none'
    })
    $('#orderformmodal .ordersheet-wrap table#tblorder tbody td#del').attr('rowspan','1')


  })
})
