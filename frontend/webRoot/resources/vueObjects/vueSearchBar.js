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
        majorNames : ['Server does not yet', 'send the', 'major name list data.'],
        culturalFilters : ['Filter1', 'Filter2', 'Filter3', 'Filter4', 'Filter5', 'Filter6', 'Filter7', 'Filter8', 'Filter9', 'Filter10'],

        majorDisplay : '',
        culturalDisplay : 'none',
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

        // Add event handler. It is for when search value is changed.
        $(this.$el).find("input[name='majorSearchInput']").change(function(event){
          console.log(event.target.value);
          // ajax call to get subjects data from DB.
        });

        $(this.$el).find("input[name='culturalSearchInput']").change(function(event){
          console.log(event.target.value);
          // ajax call to get cultural data from DB.
        });
      },
      methods : {
        showMajor : function() {
          this.majorDisplay = '';
          this.culturalDisplay = 'none';
        },
        showCultural : function() {
          this.majorDisplay = 'none';
          this.culturalDisplay = '';
        },
      },
    });
  }
});
