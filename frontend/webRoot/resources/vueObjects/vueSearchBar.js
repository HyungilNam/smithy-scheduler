// Declare a global variable.
var vueSearchBar;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueSearchBar.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueSearchBar').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueSearchBar = new Vue({
      el: '#vueSearchBar',
      data : {
        majorNames : ['Server does not yet', 'send the', 'major name list data.']
      },
      mounted : function() {
        // both major and cultural search bar is applied.
        $(this.$el).find('.ui.dropdown').dropdown();

        // ajax call to get major list and change majorNames array.
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/getMajorNameList");

        var vueObject = this;
        xhr.onreadystatechange = function() {
          if(xhr.readyState === 4 && xhr.status === 200) {
            vueObject.majorNames = JSON.parse(xhr.response);
          }
        };
        xhr.send();

      },
    });
  }
});
