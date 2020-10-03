"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var BannerButton = {
  template: "<div>\n            <a href=\"javascript:;\" class=\"arrow changeLeft\"  @click=\"change('left')\"></a>\n            <a href=\"javascript:;\" class=\"arrow changeRight\" @click=\"change('right')\"></a>\n        </div>",
  methods: {
    change: function change(dir) {
      this.$emit('handle', dir);
    }
  }
};
var BannerPagination = {
  template: "<ul class=\"pagination\" ref=\"pagination\" >\n            <li v-for='(item,i) in arr' :class=\"{active:activeHandle(i)}\" \n            @click=change(i)></li>      \n        </ul>",
  props: ['total', 'index'],
  data: function data() {
    return {
      arr: new Array(this.total).fill(null)
    };
  },
  methods: {
    activeHandle: function activeHandle(i) {
      //i当前循环这项的索引;this.index当前slide的索引
      var temp = this.index === this.total ? 0 : this.index;
      return i === temp;
    },
    change: function change(i) {
      this.$emit('pagination', i);
    }
  }
};
var BannerPlugin = {
  template: "<div class=\"container\"  @mouseenter=stopTimer(true)  @mouseleave=stopTimer(false) >\n            <div class=\"wrapper\" :style=sty ref=\"wrapper\">\n                <div class=\"slider\" v-for=\"(item, index) in bannerData\" :key=\"index\" >\n                    <img :src=item.pic  alt=\"\">\n                </div>\n            </div>    \n\n            <banner-pagination v-if=pagination :total=bannerData.length-1  :index=activeIndex  @pagination=autoFocus ></banner-pagination>\n\n            <banner-button v-if='button' @handle=handleButton></banner-button>\n        </div>",
  props: {
    data: {
      type: Array
    },
    initialSlide: {
      //在第几张图片开始
      type: Number,
      "default": 0
    },
    interval: {
      //一个周期的时间
      type: Number,
      "default": 3000
    },
    speed: {
      //单张图片过渡时间
      type: Number,
      "default": 300
    },
    pagination: {
      type: Boolean,
      "default": true
    },
    button: {
      type: Boolean,
      "default": true
    },
    //初始化函数
    init: {
      type: Function,
      "default": Function.prototype
    },
    //切换完成后的钩子函数
    transitionend: {}
  },
  data: function data() {
    var bannerData = [].concat(_toConsumableArray(this.data), [this.data[0]]),
        activeIndex = this.initialSlide;
    return {
      bannerData: bannerData,
      activeIndex: activeIndex,
      sty: {
        width: bannerData.length * 1000 + 'px',
        left: -activeIndex * 1000 + 'px',
        transition: "left ".concat(this.speed, "ms linear")
      }
    };
  },
  methods: {
    autoMove: function autoMove() {
      var _this = this;

      this.activeIndex++;

      if (this.activeIndex >= this.bannerData.length) {
        this.sty.transition = "left 0ms linear";
        this.sty.left = '0px';
        this.$nextTick(function () {
          _this.$refs.wrapper.offsetLeft;
          _this.activeIndex = 1;
          _this.sty.transition = "left ".concat(_this.speed, "ms linear");
          _this.sty.left = -_this.activeIndex * 1000 + 'px';
        });
        return;
      }

      this.sty.transition = "left ".concat(this.speed, "ms linear");
      this.sty.left = -this.activeIndex * 1000 + 'px';
    },
    stopTimer: function stopTimer(lx) {
      if (lx) {
        clearInterval(this.autoTimer);
        this.autoTimer = null;
        return;
      }

      this.autoTimer = setInterval(this.autoMove, this.interval);
    },
    handleButton: function handleButton(dir) {
      var _this2 = this;

      if (dir === 'right') {
        this.autoMove();
        return;
      }

      if (this.activeIndex <= 0) {
        this.sty.transition = "left 0ms linear";
        this.sty.left = -(this.bannerData.length - 1) * 1000 + 'px';
        this.$nextTick(function () {
          _this2.$refs.wrapper.offsetLeft;
          _this2.activeIndex = _this2.bannerData.length - 1;
          _this2.sty.transition = "left ".concat(_this2.speed, "ms linear");
          _this2.sty.left = -_this2.activeIndex * 1000 + 'px';
        });
        return;
      }

      this.activeIndex--;
      this.sty.transition = "left ".concat(this.speed, "ms linear");
      this.sty.left = -this.activeIndex * 1000 + 'px';
    },
    autoFocus: function autoFocus(i) {
      this.activeIndex = i;
      this.sty.transition = "left ".concat(this.speed, "ms linear");
      this.sty.left = -this.activeIndex * 1000 + 'px';
    }
  },
  mounted: function mounted() {
    this.autoTimer = setInterval(this.autoMove, this.interval);
    this.init(this);
  },
  updated: function updated() {
    this.transitionend(this);
  },
  components: {
    BannerButton: BannerButton,
    BannerPagination: BannerPagination
  }
};