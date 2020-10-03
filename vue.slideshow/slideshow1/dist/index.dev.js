"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// 轮播图局部组件
var BannerPagination = {
  template: '#paginationTemplate',
  props: ["len", "activeIndex"]
};
var BannerArrow = {
  template: '#arrowTemplate',
  methods: {
    handle: function handle(lx) {
      if (lx === 0) {
        this.$emit('left');
        return;
      }

      this.$emit('right');
    }
  }
};
var MyBanner = {
  template: '#bannerTemplate',
  components: {
    BannerPagination: BannerPagination,
    BannerArrow: BannerArrow
  },
  // 传递的属性设置规则
  props: {
    bannerData: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      "default": 3000
    },
    initialize: {
      type: Number,
      "default": 0
    },
    speed: {
      type: Number,
      "default": 300
    },
    pagination: {
      type: Boolean,
      "default": true
    },
    arrow: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    var bannerData = this.bannerData,
        initialize = this.initialize,
        speed = this.speed;
    var len = bannerData.length;
    initialize = initialize < 0 ? 0 : initialize > len ? len : initialize;
    return {
      // 把传递的数据第一张克隆一份放到末尾(不能直接修改属性值)
      bannerDataClone: [].concat(_toConsumableArray(bannerData), [bannerData[0]]),
      // 控制WRAPPER的样式
      wrapperSty: {
        width: (len + 1) * 800 + 'px',
        left: -initialize * 800 + 'px',
        transition: "left ".concat(speed, "ms linear 0ms")
      },
      // 记录当前轮播图展示哪一张
      activeIndex: initialize
    };
  },
  // 第一次加载完成后，我们需要让轮播图运动起来（自动轮播）
  mounted: function mounted() {
    var _this = this;

    this.autoTimer = setInterval(this.autoMove, this.interval); // 监听WRAPPER的TRANSITIO-END事件

    this.$refs.wrapper.addEventListener('transitionend', function () {
      // 回调函数：切换动画结束
      _this.$emit('changeend', _this);
    });
  },
  methods: {
    autoMove: function autoMove() {
      var _this2 = this;

      // 回调函数：动画开始之前
      this.$emit('changestart', this);
      this.activeIndex++;

      if (this.activeIndex > this.bannerDataClone.length - 1) {
        // 右边界
        this.wrapperSty.left = "0px";
        this.wrapperSty.transition = "left 0ms linear 0ms"; // 需要等待立即回到第一张后（DOM渲染完[已经生成最新的真实DOM，抛给浏览器处理]），让其运动到第二张

        this.$nextTick(function () {
          _this2.$refs.wrapper.offsetLeft;
          _this2.activeIndex = 1;
          _this2.wrapperSty.left = "".concat(-_this2.activeIndex * 800, "px");
          _this2.wrapperSty.transition = "left ".concat(_this2.speed, "ms linear 0ms");
        });
        return;
      }

      this.wrapperSty.left = "".concat(-this.activeIndex * 800, "px");
      this.wrapperSty.transition = "left ".concat(this.speed, "ms linear 0ms");
    },
    changeLeft: function changeLeft() {
      var _this3 = this;

      // 回调函数：动画开始之前
      this.$emit('changestart', this);
      this.activeIndex--;

      if (this.activeIndex < 0) {
        // 左边界
        this.wrapperSty.left = "".concat(-(this.bannerDataClone.length - 1) * 800, "px");
        this.wrapperSty.transition = "left 0ms linear 0ms";
        this.$nextTick(function () {
          _this3.$refs.wrapper.offsetLeft;
          _this3.activeIndex = _this3.bannerDataClone.length - 2;
          _this3.wrapperSty.left = "".concat(-_this3.activeIndex * 800, "px");
          _this3.wrapperSty.transition = "left ".concat(_this3.speed, "ms linear 0ms");
        });
        return;
      }

      this.wrapperSty.left = "".concat(-this.activeIndex * 800, "px");
      this.wrapperSty.transition = "left ".concat(this.speed, "ms linear 0ms");
    },
    mouseenter: function mouseenter() {
      clearInterval(this.autoTimer);
    },
    mouseleave: function mouseleave() {
      this.autoTimer = setInterval(this.autoMove, this.interval);
    }
  }
}; // 渲染页面

new Vue({
  el: "#app",
  components: {
    MyBanner: MyBanner
  },
  data: {
    bannerData1: [],
    bannerData2: []
  },
  // 一般在CREATED中发送数据请求
  created: function created() {
    var result;
    return regeneratorRuntime.async(function created$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryData('./data1.json'));

          case 2:
            result = _context.sent;
            this.bannerData1 = result;
            _context.next = 6;
            return regeneratorRuntime.awrap(queryData('./data2.json'));

          case 6:
            result = _context.sent;
            this.bannerData2 = result;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  methods: {
    A: function A() {
      console.log('开始切换了~~');
    },
    B: function B() {
      console.log('切换结束了~~');
    }
  }
}); // 发送数据请求的办法

function queryData(url) {
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);

    xhr.onreadystatechange = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        resolve(JSON.parse(xhr.responseText));
      }
    };

    xhr.send();
  });
}
/*
 * 轮播图组件支持的配置项
 *    banner-data:[{id:1,pic:'xxx',title:'xxx'},...]  需要渲染轮播图的数据（必传）
 *    interval:3000  切换频率
 *    initialize:0   初始展示哪一张
 *    speed:300      切换的速度
 *    pagination:true  是否显示分页器
 *    arrow:true     是否显示左右导航按钮
 * 
 *    @changestart  切换开始的回调函数【基于发布订阅完成的】
 *    @changeend    切换结束的回调函数
 */