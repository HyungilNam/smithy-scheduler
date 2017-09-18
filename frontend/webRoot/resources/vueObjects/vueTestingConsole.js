// Declare a global variable.
var vueTestingConsole;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueTestingConsole.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueTestingConsole').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueTestingConsole = new Vue({
      el: '#vueTestingConsole',
      data : {
        testingConsole : null,
      },
      methods : {
        show : function() {
          this.testingConsole
            .sidebar('toggle')
          ;
        },
      },
      mounted : function(){
        // setting sidebar.
        this.testingConsole = $(this.$el).find('.ui.labeled.sidebar');
        this.testingConsole.sidebar('setting', 'transition', 'overlay');
      },
    });
  }
});


function showTimeTableAndLectureBasket() {
  vueSearchBar.hideMainIntro();
  vueTimeTable.show();
  vueLectureBasket.show();
  convertMainCenterToMainLeft();
}

function hideTimeTableAndLectureBasket() {
  vueTimeTable.hide();
  vueLectureBasket.hide();
  convertMainLeftToMainCenter();
}

function convertMainCenterToMainLeft() {
  $('.main-center').addClass('main-left').removeClass('main-center');
}

function convertMainLeftToMainCenter() {
  $('.main-left').addClass('main-center').removeClass('main-left');
}
