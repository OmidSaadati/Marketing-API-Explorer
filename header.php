<html xmlns:fb="http://ogp.me/ns/fb#">
  <head>
    <title>Marketing API Explorer| Home</title>
    <link type='text/css' rel='stylesheet' href='scripts/main.css'>
    <link type='text/css' rel='stylesheet' href='scripts/jquery-ui.css'>
    <script src='scripts/jquery.js'></script>
    <script src='scripts/jquery-ui.js'></script>
    <script src='scripts/custom.js'></script>
  </head>
  <body>
    <div id='fb-root'></div>
    <script>

      // load SDK
      (function(d){
        // check HTML5 persistence storage
        if(!window.localStorage){
         alert('Your browser doesn\'t suppport HTML5');
        }
        var js, id = 'facebook-jssdk';
        var ref = d.getElementsByTagName('script')[0];
        if(d.getElementById(id)) {return;}
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = '//connect.facebook.net/en_US/all.js';
        ref.parentNode.insertBefore(js, ref);
        //d.getElementsByTagName('head')[0].appendChild(js);
        }(document));


    </script>

    <div id='header'>
      <div class='top_banner'>
        <span class='banner_text'>Marketing API Explorer</span>
      </div>

      <div class="fb-like"  data-href="http://www.myfbse.com/omid/smp/" data-send="false" data-width="450" data-show-faces="false" data-font="lucida grande"></div>

      <div id='logout' style='float:left'>
        <button id='b_logout'>Sign out</button>
      </div>

      <div id='redownload' style='float:right'>
        <button id='b_redownload'>Download</button>
      </div>

      <div id='login' style='clear:both'>
        <button id='b_login'>Sign in</button/>
      </div>
    </div>
    <div class='content'>

