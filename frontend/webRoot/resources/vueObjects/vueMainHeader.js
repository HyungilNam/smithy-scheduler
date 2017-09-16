// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueMainHeader.html',
  success:function(htmlCode){
    // Register global component
    Vue.component('vue-main-header', {
      template : htmlCode
    });

    // Generate vue object.
    // Edit below code to modify the vue object.
    
    // This variable is declared in '../global.js'
    vueMainHeader = new Vue({
      el: '#vueMainHeaderComponent',
    });
  }
});
