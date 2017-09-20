# 1. Coding Style

1. 객체지향 프로그래밍 방식을 따른다.
2. 모든 코드는 객체 단위로 관리한다.
3. vue객체의 이름은 camelCase 방식으로 작성한다.
4. html의 id property는 camelCase 방식으로 작성한다.
5. html의 class proprty는 kebab-case 방식으로 작성한다. (각각 링크 넣어주기)

### Index.html

사용자가 웹에 접속하면 서버는 index.html을 보내줍니다. 브라우저는 index.html에 적혀있는 css, javascript를 읽어서 index.html을 계속해서 갱신합니다. 우리 애플리케이션은 single-page app으로서, 계속해서 index.html에 머물러있고 다른 페이지로 넘어가지 않습니다. javacsript를 통해서 index.html을 갱신하면서 서비스를 제공합니다.

[index.html](/hrzon/smithy-scheduler/blob/master/frontend/webRoot/resources/index.html)

우리 프로그램은 객체지향 프로그래밍 방식을 고수합니다. index.html을 보면 전통적인 html구조와 사뭇 다른 것을 볼 수 있습니다. 브라우저가 읽는 것은 결국 html, css, javascript입니다. 이 3개의 파일을 하나의 객체로 묶어서 관리합니다.

index.html은 vue객체들이 뛰어노는 운동장과 같습니다. 운동장에 새로운 객체를 추가하려면 다음과 같은 양식으로 원하는 부분에 코드를 추가하면 됩니다.

```html
<!-- vue object start-->
<!-- The loading process: css → html → javascript -->
<link rel="stylesheet" type="text/css" href="/resources/vueObjects/vueObjectName.css">
<div id='vueObjectName'></div>
<script src="/resources/vueObjects/vueObjectName.js" type="text/javascript"> </script>
<!-- vue object end-->
```
이렇게 객체를 등록하면 브라우저는 css → html → javascript의 순서로 코드를 읽습니다.

양식을 보면 'vueObjectName'이라는 문자열이 각 줄마다 등장합니다. 이 문자열을 새로 추가할 객체의 이름으로 바꾸기만 하면 객체의 등록이 완료됩니다. 예를 들어 'vueMainHeader'라는 객체를 등록하려면

```html
<!-- vue object start-->
<!-- The loading process: css → html → javascript -->
<link rel="stylesheet" type="text/css" href="/resources/vueObjects/vueMainHeader.css">
<div id='vueMainHeader'></div>
<script src="/resources/vueObjects/vueMainHeader.js" type="text/javascript"> </script>
<!-- vue object end-->
```
이렇게 작성하시면 됩니다.

### vue 객체 새로 만들기

vue객체들은 '[/resources/vueObjects](/hrzon/smithy-scheduler/tree/master/frontend/webRoot/resources/vueObjects)'에 모여있습니다. 새로운 객체를 추가하려면 'vueObjectName.css', 'vueObjectName.html', 'vueObjectName.html' 이렇게 3개의 파일을 vueObjects 디렉토리 아래에 생성하면 됩니다.

### 'vueObjectName.js'

html에 양식대로 3줄만 추가하면 객체가 추가되는 비밀이 여기에 숨어있습니다. 모든 vue객체의 js파일은 다음과 같은 양식을 따릅니다.

```javascript
// Declare a global variable.
var vueObjectName;

// ajax call to read html template and generate a vue object.
$.ajax({
  url:'/resources/vueObjects/vueObjectName.html',
  success:function(htmlString){
    // Insert html string to index.html
    $('#vueObjectName').html(htmlString);

    // Generate vue object.
    // Edit below code to modify the vue object.
    vueObjectName = new Vue({
      el: '#vueObjectName',
    });
  }
});
```

복잡해보이지만 별거 없습니다.

제일 윗줄에 보면 전역 변수를 하나 선언합니다. 이 변수에 vue객체가 담기고, 이 변수를 통해서 객체를 제어합니다.

그 아래는 ajax call입니다. ajax call이 하는 일은, 객체의 html을 읽어와서 index.html의 알맞은 자리에 html source code를 넣어주고 vue객체를 생성하는 것입니다.

ajax call이 성공하면 'success' 함수가 실행됩니다. index.html에서 id가 vueObjectName인 element를 찾아서 html source를 넣어줍니다.

```html
<!-- vue object start-->
<!-- The loading process: css → html → javascript -->
<link rel="stylesheet" type="text/css" href="/resources/vueObjects/vueObjectName.css">

<div id='vueObjectName'> <!-- 바로여기!! --> </div>  

<script src="/resources/vueObjects/vueObjectName.js" type="text/javascript"> </script>
<!-- vue object end-->
```

그리고 vue객체를 생성해서 'vueObjectName'변수에 넣어줍니다. 이후의 모든 조작은 'vueObjectName'을 통해 하면 됩니다.

index.html에서와 마찬가지로 'vueObjectName'을 원하는 이름으로 바꾸어서 사용하시면 됩니다.

(문자열 모두 바꾸는 vim커맨드 `:%s/vueObjectName/vueNameThatYouWant/g`)

### 'vueObjectName.html'

이 파일의 소스가 index.html로 들어갑니다. 평소 html을 작성하실 때와 똑같이 작성하시면 됩니다. 주의할 점은 id나 class같은 property의 값이 다른 객체와 겹치지 않게 prefix를 잘 붙여주시거나, 혹은 명백하게 unique한 값을 사용하셔야 합니다. 이 점만 주의하시면 됩니다.

객체지향 프로그래밍이라는 것은 프로그램의 복잡도를 객체 단위로 묶어서 관리하는 방식입니다. 객체간의 소통은 method를 통해서만 합니다. 코딩을 할 때 다른 객체의 data를 바로 접근하는 일이 없도록 합시다.

##### 사소한 주의점

이 파일에는 일반 문자열만 존재할 수는 없습니다. 왜냐하면 jquery의 .html()의 argument에 무조건 html tag가 들어와야 하기 때문입니다.

`Hello, world!`라는 문자열만 넣고싶다면

```html
<span>Hello, world!</span>
```

혹은

```html
<a>Hello, world!</a>
```

혹은

```html
<div>Hello, world!</div>
```

이렇게 html tag로 감싸야 합니다. 물론 html tag가 하나도 없는 html파일을 작성할 일은 없을 테니, 크게 신경 안 쓰셔도 됩니다.

### 'vueObjectName.css'

css 작성은 별다른 제약조건이 없습니다. 평소에 하던대로 작성하면 됩니다.

## Code example

##### 'vueMainHeader.html'

```html
<!-- id properties use camelCase, while class properties use kebab-case. -->
<div id="mainHeaderContainer" class="main-header-container">
  <div id="mainHeaderContents" class="main-header-contents">
    <div id="mainHeaderLogo" class="main-header-logo">
      <a href="/"><p style="font-size:2.5em; font-weight:100;">Logo</p></a>
    </div>
    <div id="mainHeaderMenu" class="main-header-menu">
      <div id="mainHeaderMenuButtons" class="main-header-menu-buttons ui large buttons">

        <button id="mainHeaderButtonLogin" class="ui hanyang basic transparent button"
          @click="popupTestingConsole">Testing Console</button>

        <button id="mainHeaderButtonLogin" class="ui hanyang basic transparent button"
          @click="popupLoginDimmer">로그인</button>
      </div>
    </div>
  </div>
  <hr id="mainHeaderShadow" class="main-header-shadow">
</div>
```

##### 'vueMainHeader.js'

```javascript
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
          // send message to vueLoginDimmer to show the login dimmer.
          vueLoginDimmer.show();
          // Do not change data of other objects directly.
          // Use methods to interact other objects.
        },
        popupTestingConsole : function() {
          // send message to vueTestingConsole to show the testing console.
          vueTestingConsole.show();
          // Do not change data of other objects directly.
          // Use methods to interact other objects.
        },
      },
    });
  }
});
```

##### 'vueMainHeader.css'

```css
/* The name of the object is vueMainHeader.
 * every class property should have the prefix 'main-header-' */

.main-header-container{
  width:100%;
  min-width:1200px;
  height:70px;
  background-color:#fff;
  position:fixed;
  z-index:100;
  top:0
}

.main-header-contents {
  height:90%; /* 10% for shadow */
  max-width:1200px;
  margin: 0 auto
}

.main-header-logo {
  float: left;
  width: 50%;
}

.main-header-menu {
  float: left;
  width: 50%;
}

.main-header-menu-buttons {
  padding: 10px 10px 10px 10px;
  float: right;
}

hr.main-header-shadow {
	height: 10px;
	border: 0;
	box-shadow: 0 10px 10px -10px #8c8b8b inset;
}
```
