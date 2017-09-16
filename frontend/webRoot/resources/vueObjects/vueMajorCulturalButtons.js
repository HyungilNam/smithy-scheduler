// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueMajorCulturalButtons.html',
  success:function(htmlCode){
    // Register global component
    Vue.component('vue-major-cultural-buttons', {
      template : htmlCode
    });

    // Generate vue object.
    // Edit below code to modify the vue object.
    
    // This variable is declared in '../global.js'
    vueMajorCulturalButtons = new Vue({
      el: '#vueMajorCulturalButtonsComponent',
      data: {
        majorIsSelected: true
      },
    });
  }
});
