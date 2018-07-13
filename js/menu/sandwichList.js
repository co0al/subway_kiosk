/**
 * 메뉴 > 샌드위치 에서 사용되는 스크립트

 var view = {
 	init : function(){
 		$("a.btn_view").on("click", function(){
 			var id = $(this).data("id");
 			view.view(id);
 			return false;
 		})
 	},
 	view : function(id) {
 		location.href="/sandwichView?param=" + id;
 	}
 }

 $(document).ready(function(){
 	view.init();
     $(window).load(function(){
 		pdVisual_sandwich()//메뉴소개 : 샌드위치 visual
 		pdTab_Sort()//메뉴소개 : 메뉴 정렬
 	})
 })



 */
