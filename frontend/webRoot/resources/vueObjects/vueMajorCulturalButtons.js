// Declare a global variable.
var vueMajorCulturalButtons;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueMajorCulturalButtons.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueMajorCulturalButtons').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueMajorCulturalButtons = new Vue({
      el: '#vueMajorCulturalButtons',
      data: {
        majorIsSelected: true
      },

      methods : {
        selectMajor : function() {
          this.majorIsSelected = true;
          vueSearchBar.showMajor();
          vueSubjectTable.hideEveryTable();
          vueSubjectTable.showMajorSubjectTable();
        },
        selectCultural : function() {
          this.majorIsSelected = false;
          vueSearchBar.showCultural();
          vueSubjectTable.hideEveryTable();
          vueSubjectTable.showCulturalSubjectTable();
        },
      }
    });
  }
});
