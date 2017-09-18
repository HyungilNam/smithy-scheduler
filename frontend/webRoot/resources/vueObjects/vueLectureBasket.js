// Declare a global variable.
var vueLectureBasket;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueLectureBasket.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueLectureBasket').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueLectureBasket = new Vue({
      el: '#vueLectureBasket',
      data : {
        lectureBasketDisplay : 'none',
      },
      methods : {
        show : function() {
          this.lectureBasketDisplay = '';
        },
        hide : function() {
          this.lectureBasketDisplay = 'none';
        },
        showConditionPage : function() {
          vueCombinationCondition.show();
        }
      },
      mounted : function() {
        $(this.$el).find('.combination-start.button').popup({
          popup : $('.combination-complete.popup'),
          on    : 'click',
          position : 'top center',
        });
      },
    });
  }
});
