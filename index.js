;(function($){

  var PPT = function(poster){

    var self = this;

    //保存单个旋转木马对象
    this.poster = poster ;
    this.posterItemMain = poster.find('ul.poster-list');  //ul
    this.nextBtn = poster.find('div.poster-next-btn');  //btn
    this.prevBtn = poster.find('div.poster-prev-btn');  //btn
    this.posterItems = poster.find('li.poster-item'); //所有li

    //如果是偶数章图片就加多一章
    if (this.posterItems.size()%2 == 0){
      this.posterItemMain.append(this.posterItems.eq(0).clone());
      this.posterItems = this.posterItemMain.children();
    }

    this.posterFirstItem = this.posterItems.first(); //第一个li
    this.posterLastItem = this.posterItems.last(); //第一个li
    this.rotateFlag = true; //动画是否点击



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

    //extend方法 有的就替换 没有就添加
    $.extend(this.setting,this.getSetting());

    //设置参数
    this.setSettingValue();
    this.setPosterPos();

    //左边按钮
    this.nextBtn.click(function(){
      if(self.rotateFlag){
        self.rotateFlag = false;
        self.carouseRotate("left");
      }

    });
    //右边按钮
    this.prevBtn.click(function(){
      if(self.rotateFlag){
        self.rotateFlag = false;
        self.carouseRotate("right");
      }
    });

    //是否自动播放
    if (this.setting.autoPlay){
      this.autoPlay();
      this.poster.hover(function(){
        window.clearInterval(self.timer);
      },function(){
        self.autoPlay();
      })
    }
  };

  PPT.prototype = {
    //自动播放
    autoPlay:function(){
      var self = this;
      this.timer = window.setInterval(function(){
        self.nextBtn.click();
      },this.setting.delay);
    },
    //按钮点击
    carouseRotate:function(dir){
      var _this_ = this;
      var zIndexArr = [];
      if (dir === 'left'){
        this.posterItems.each(function(){
          var self = $(this),
            prev = self.prev().get(0) ? self.prev() : _this_.posterLastItem,
            width = prev.width(),
            height = prev.height(),
            zIndex = prev.css('zIndex'),
            opacity = prev.css('opacity'),
            left = prev.css('left'),
            top = prev.css('top');

          zIndexArr.push(zIndex);
          self.animate({
            width:width,
            height:height,
            opacity:opacity,
            left:left,
            top:top
          },_this_.setting.speed,function(){
            _this_.rotateFlag = true;
          })
        });
        this.posterItems.each(function(i){
          $(this).css("zIndex",zIndexArr[i])
        })

      }else if(dir === 'right'){
        this.posterItems.each(function(){
          var self = $(this),
            next = self.next().get(0) ? self.next() : _this_.posterFirstItem,
            width = next.width(),
            height = next.height(),
            zIndex = next.css('zIndex'),
            opacity = next.css('opacity'),
            left = next.css('left'),
            top = next.css('top');
          zIndexArr.push(zIndex);
          self.animate({
            zIndex:zIndex,
            width:width,
            height:height,
            opacity:opacity,
            left:left,
            top:top
          },_this_.setting.speed,function(){
            _this_.rotateFlag = true;
          })
        });
        this.posterItems.each(function(i){
          $(this).css("zIndex",zIndexArr[i])
        })
      }

    },
    //设置剩余的帧的位置关系
    setPosterPos:function () {
      var self= this;
      var sliceItems = this.posterItems.slice(1),
          sliceSize = sliceItems.size()/2,
          rightSlice = sliceItems.slice(0,sliceSize),
          level = Math.floor(this.posterItems.size()/2),
          leftSlice =  sliceItems.slice(sliceSize);


      //设置右边帧的位置关系和宽高
      var rw = this.setting.posterWidth,
          rh = this.setting.posterHeight,
          gap = ((this.setting.width-this.setting.posterWidth)/2)/level;


      var firstLeft = (this.setting.width-this.setting.posterWidth)/2;
      var fixOffsetLeft = firstLeft + rw;
      //设置右边的位置关系
      rightSlice.each(function(i){
        level--;
        rw = rw * self.setting.scale;
        rh = rh * self.setting.scale;
        var j =i ;
        $(this).css({
          zIndex:level,
          width:rw,
          height:rh,
          opacity:1/(++j),
          left:fixOffsetLeft+(++i) * gap-rw,
          top:self.setVertucalAlign(rh)
        })
      });
      //设置左边的位置关系
      var lw = rightSlice.last().width(),
          lh = rightSlice.last().height(),
          oloop = Math.floor(this.posterItems.size()/2);

      leftSlice.each(function(i){
        $(this).css({
          zIndex:i,
          width:lw,
          height:lh,
          opacity:1/oloop,
          left:i*gap,
          top:self.setVertucalAlign(lh)
        });
        oloop--;
        lw = lw/self.setting.scale;
        lh = lh/self.setting.scale;
      });
    },
    //设置垂直排列对齐
    setVertucalAlign:function(height){
      var verticalType = this.setting.verticalAlign,
          top = 0;
      if (verticalType === 'middle'){
        top = (this.setting.height - height)/2;
      }else if(verticalType === 'top'){
        top = 0;
      } else if (verticalType === 'bottom'){
        top = this.setting.height - height;
      }else{
        top = (this.setting.height - height)/2;
      }

      return top;
    },
    //设置配置参数数值去控制基本的宽度高度
    setSettingValue:function(){
      this.poster.css({
        width:this.setting.width,
        height:this.setting.height
      });
      this.posterItemMain.css({
        width:this.setting.posterWidth,
        height:this.setting.posterHeight
      });
      //计算左右切换按钮的宽度
      var w = (this.setting.width - this.setting.posterWidth)/2;
      this.nextBtn.css({
        width:w,
        height:this.setting.height,
        zIndex:Math.ceil(this.posterItems.size()/2)
      });
      this.prevBtn.css({
        width:w,
        height:this.setting.height,
        zIndex:Math.ceil(this.posterItems.size()/2)
      });
      //第一个li
      this.posterFirstItem.css({
        width:this.setting.posterWidth,
        height:this.setting.posterHeight,
        left:w,
        zIndex:Math.ceil(this.posterItems.size()/2)
      })
    },
    //获取人工配置参数
    getSetting:function(){
      var setting = this.poster.attr("data-setting");
      if (setting && setting!=""){
        return  $.parseJSON(setting);
      }else{
        return {}
      }

    }
  };


  //处理传进来的集合
  PPT.init = function(posters){

    //将传进来的对象new出来
    var _this = this;
    posters.each(function(i,elem){
      new _this($(this))
    })
  };

  window['PPT'] = PPT;

})(jQuery);
