const BannerButton = {
    template:`<div>
            <a href="javascript:;" class="arrow changeLeft"  @click="change('left')"></a>
            <a href="javascript:;" class="arrow changeRight" @click="change('right')"></a>
        </div>`,
    methods: {
        change(dir){
            this.$emit('handle',dir)
        }
    }
}

const BannerPagination = {
    template:`<ul class="pagination" ref="pagination" >
            <li v-for='(item,i) in arr' :class="{active:activeHandle(i)}" 
            @click=change(i)></li>      
        </ul>`,
    props:['total','index'],
    data() {
        return {
            arr:new Array(this.total).fill(null)
        }
    },
    methods: {
        activeHandle(i){
            //i当前循环这项的索引;this.index当前slide的索引
            let temp = this.index === this.total ? 0 : this.index;
            return i === temp;
        },
        change(i){
            this.$emit('pagination',i)
        }
    },
}
 
const BannerPlugin = {
    template:`<div class="container"  @mouseenter=stopTimer(true)  @mouseleave=stopTimer(false) >
            <div class="wrapper" :style=sty ref="wrapper">
                <div class="slider" v-for="(item, index) in bannerData" :key="index" >
                    <img :src=item.pic  alt="">
                </div>
            </div>    

            <banner-pagination v-if=pagination :total=bannerData.length-1  :index=activeIndex  @pagination=autoFocus ></banner-pagination>

            <banner-button v-if='button' @handle=handleButton></banner-button>
        </div>`,
    props:{
        data:{
            type:Array,
        },
        initialSlide:{//在第几张图片开始
            type:Number,
            default:0,
        },
        interval:{//一个周期的时间
            type:Number,
            default:3000,
        },
        speed:{//单张图片过渡时间
            type:Number,
            default:300,
        },
        pagination:{
            type:Boolean,
            default:true,
        },
        button:{
            type:Boolean,
            default:true,
        },
        //初始化函数
        init:{
            type:Function,
            default:Function.prototype
        },
        //切换完成后的钩子函数
        transitionend:{

        }
    },
    data() {
        let bannerData = [...this.data,this.data[0]],
            activeIndex = this.initialSlide;
        return {
            bannerData,
            activeIndex,
            sty:{
                width: bannerData.length * 1000 + 'px',
                left: -activeIndex * 1000 + 'px',
                transition:`left ${this.speed}ms linear`
            }
        }
    },
    
    methods: {
        autoMove(){
            this.activeIndex++;
            if(this.activeIndex>=this.bannerData.length){
                this.sty.transition = `left 0ms linear`;
                this.sty.left = '0px';
                this.$nextTick(()=>{
                    this.$refs.wrapper.offsetLeft; 
                    this.activeIndex = 1;
                    this.sty.transition = `left ${this.speed}ms linear`;
                    this.sty.left = -this.activeIndex * 1000 + 'px'
                })
                return 
            }
            this.sty.transition = `left ${this.speed}ms linear`;
            this.sty.left = -this.activeIndex * 1000 + 'px';
            
        },
        stopTimer(lx){
            if (lx) {
                clearInterval(this.autoTimer);
                this.autoTimer = null;
                return
            }
            this.autoTimer = setInterval(this.autoMove,this.interval)    
        },
        handleButton(dir){
            if (dir === 'right') {
                this.autoMove();
                return;
            }
            
            if(this.activeIndex<=0){
                this.sty.transition = `left 0ms linear`;
                this.sty.left = -(this.bannerData.length - 1) * 1000 + 'px';
                this.$nextTick(()=>{
                    this.$refs.wrapper.offsetLeft; 
                    this.activeIndex = this.bannerData.length - 1;
                    this.sty.transition = `left ${this.speed}ms linear`;
                    this.sty.left = -this.activeIndex * 1000 + 'px'
                })
                return 
            }
            this.activeIndex--;
            this.sty.transition = `left ${this.speed}ms linear`;
            this.sty.left = -this.activeIndex * 1000 + 'px';
        },

        autoFocus(i){
            this.activeIndex = i;
            this.sty.transition = `left ${this.speed}ms linear`;
            this.sty.left = -this.activeIndex * 1000 + 'px';
        }
    },
    mounted() {
        this.autoTimer = setInterval(this.autoMove,this.interval);
        this.init(this)
    },
    updated() {
        this.transitionend(this)
    },
    components:{
        BannerButton,
        BannerPagination
    },
}
