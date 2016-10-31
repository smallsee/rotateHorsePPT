#这是个自己封装的PPT组件

    示例
------
    



        //默认配置参数
            this.setting = {
              width:1000, //位置长度
              height:270,
              posterWidth:640,  //广告长度
              posterHeight:270,
              verticalAlign:'middle',  //对齐参数 有 middle top bottom
              scale:0.9, //下一章按照百分几缩放
              speed:500, //切换的秒数,
              autoPlay:false, //是否自动播放
              delay:'5000' //自动播放的间隔是多少
            };
            
            

---
```
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>旋转木马 幻灯片开发</title>
      <link type="text/css" rel="stylesheet" href="index.css">
      <script type="text/javascript" src="jquery.js"></script>
      <script type="text/javascript" src="index.js"></script>
    </head>
    <body style="padding:50px;">
    
    <div class="J_Poster poster-main" data-setting='{
                                                                                        "width":1000,
                                                                                        "height":270,
                                                                                        "posterWidth":640,
                                                                                        "posterHeight":270,
                                                                                        "scale":0.8,
                                                                                        "autoPlay":true,
                                                                                        "delay":5000,
                                                                                        "speed":500,
                                                                                        "verticalAlign":"middle"
    																					}'>
      <div class="poster-btn poster-prev-btn"></div>
      <ul class="poster-list">
        <li class="poster-item"><a href="#"><img src="1.jpg" width="100%" height="100%"></a></li>
        <li class="poster-item"><a href="#"><img src="2.jpg" width="100%" height="100%"></a></li>
        <li class="poster-item"><a href="#"><img src="3.jpg" width="100%" height="100%"></a></li>
        <li class="poster-item"><a href="#"><img src="4.jpg" width="100%" height="100%"></a></li>
        <li class="poster-item"><a href="#"><img src="5.jpg" width="100%" height="100%"></a></li>
        <li class="poster-item"><a href="#"><img src="2.jpg" width="100%" height="100%"></a></li>
        <li class="poster-item"><a href="#"><img src="3.jpg" width="100%" height="100%"></a></li>
        <li class="poster-item"><a href="#"><img src="4.jpg" width="100%" height="100%"></a></li>
        <li class="poster-item"><a href="#"><img src="5.jpg" width="100%" height="100%"></a></li>
      </ul>
      <div class="poster-btn poster-next-btn"></div>
    </div>
    
    <script>
    
      $(function(){
        //var index = new PPT($(".J_Poster").eq(0));
        PPT.init($(".J_Poster"));
      })
    
    </script>
    
    
    </body>
    </html>
```