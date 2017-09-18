// Declare a global variable.
var vueMainHeader;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueMainHeader.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueMainHeader').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueMainHeader = new Vue({
      el: '#vueMainHeader',
      methods : {
        popupLoginDimmer : function() {
          vueLoginDimmer.show();
        },
        popupTestingConsole : function() {
          vueTestingConsole.show();
        },
      },
    });
  }
});
