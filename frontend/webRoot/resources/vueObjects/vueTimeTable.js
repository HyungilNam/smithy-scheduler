// Declare a global variable.
var vueTimeTable;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueTimeTable.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueTimeTable').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueTimeTable = new Vue({
      el: '#vueTimeTable',
      data: {
        timeTableDisplay: 'none',
      },
      methods : {
        show : function() {
          this.timeTableDisplay = '';
        },
        hide : function() {
          this.timeTableDisplay = 'none';
        },
      },
    });
  }
});
