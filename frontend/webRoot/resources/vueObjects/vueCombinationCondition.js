// Declare a global variable.
var vueCombinationCondition;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueCombinationCondition.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueCombinationCondition').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueCombinationCondition = new Vue({
      el: '#vueCombinationCondition',
      data :{
        conditionPage : null,
      },
      methods : {
        show : function() {
          this.conditionPage.dimmer('show');
        },
      },
      mounted : function() {
        this.conditionPage = $(this.$el).find('.combination-condition.page.dimmer');

        $(this.$el).find('.ui.dropdown').dropdown();
      },
    });
  }
});
