// Declare a global variable.
var vueSubjectTable;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueSubjectTable.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueSubjectTable').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueSubjectTable = new Vue({
      el: '#vueSubjectTable',
      data : {
        majorIsSelected : true,

        // this variable is a switch to make it possible or impossible to show tables.
        majorTableCanBeShown : false,
        culturalTableCanBeShown : false,

        // These are css peoperties binded to the tables.
        // Each are mutual exclusive. There is no case when both properties are ''. At least one is 'none'.
        majorSubjectTableDisplay : 'none',
        culturalSubjectTableDisplay : 'none',
      },
      methods: {
        makeItPossibleToShowMajorTable : function() {
          this.majorTableCanBeShown = true;
        },
        makeItPossibleToShowCulturalTable : function() {
          this.culturalTableCanBeShown = true;
        },
        makeItImpossibleToShowTables : function() {
          this.majorTableCanBeShown = false;
          this.culturalTableCanBeShown = false;
          this.hideEveryTable();
        },
        hideEveryTable : function(){
          this.majorSubjectTableDisplay = 'none';
          this.culturalSubjectTableDisplay = 'none';
        },
        showMajorSubjectTable : function() {
          if (this.majorTableCanBeShown == true) {
            this.majorSubjectTableDisplay = '';
            this.culturalSubjectTableDisplay = 'none';
          } else {
            console.log("vueSubjecTable.majorTableCanBeShown == false. Do not display the major subject table");
          }
        },
        showCulturalSubjectTable : function(){
          if (this.culturalTableCanBeShown == true) {
            this.majorSubjectTableDisplay = 'none';
            this.culturalSubjectTableDisplay = '';
          } else {
            console.log("vueSubjecTable.culturalTableCanBeShown == false. Do not display the cultural subject table");
          }
        },
      },
    });
  }
});
