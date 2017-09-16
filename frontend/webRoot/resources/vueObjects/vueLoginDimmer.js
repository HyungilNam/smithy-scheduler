// Declare a global variable.
var vueLoginDimmer;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueLoginDimmer.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueLoginDimmer').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueLoginDimmer = new Vue({
      el: '#vueLoginDimmer',
      methods : {
        show : function() {
          $(this.$el).dimmer('show');
        },
      },
    });
  }
});
