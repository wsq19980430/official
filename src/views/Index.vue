<template>
  <div class="box">
    <div class="right" ref="letters"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd">
      <h3 class="ti2" v-for="(item, index) in letters" :key="index">
        {{item}}
      </h3>
    </div>
    <div class="index" ref='carList' @click="brandClick">
      <div class="tit" v-for="(item, index) in brandList" :key="index">
        <h3 class="ti1" :ref='index'>{{index}}</h3>
        <dl v-for="(v, i) in item" :key="i" class="tit-dl" :data-id="v.MasterID">
          <dt><img :data-src="v.CoverPhoto"></dt>
          <dd>{{v.Name}}</dd>
        </dl>
      </div>
    </div>
    <MakeList v-if="showMakeList" :makeList="makeList" :class="showMakeList?'active':''" :hideMakeList="hideMakeList"/>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import MakeList from '@/components/MakeList';
import {lazyLoad} from '@/utils/lazyLoad';
export default {
  name: 'Index',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      letters: state=>state.index.letters,
      brandList: state=>state.index.brandList,
      makeList: state=>state.index.makeList,
      showMakeList: state=>state.index.showMakeList
    })
  },
  components: {
    MakeList
  },
  methods: {
    ...mapActions({
      getBrandList: 'index/getBrandList',
      getMakeList: 'index/getMakeList'
    }),
    ...mapMutations({
      // 隐藏车系列表
      hideMakeList: 'index/hideMakeList'
    }),
    touchStart() {
      
    },
    touchMove(e) {
      // 计算字母下标
      let index = Math.floor((e.touches[0].pageY - this.offsetTop)/this.letterHeight);
      // 处理下临界值
      if (index < 0){
          index = 0;
      }else if (index > this.letters.length-1){
          index = this.letters.length-1;
      }
      // 计算当前划到哪个字母
      let letter = this.letters[index];
      // 计算要滚动的距离
      let offsetTop = this.$refs[letter][0].offsetTop;
      // 滚动元素到对应位置
      this.$refs.carList.scrollTop = offsetTop;
    },
    touchEnd() {
      
    },
    // 品牌点击
    brandClick(e){
      let target = null;
      if (e.target.tagName == 'IMG' || e.target.tagName == 'DD'){
        target = e.target.parentNode;
      }else if (e.target.tagName == 'DL'){
        target = e.target;
      }
      if (target){
        let id = target.dataset.id;
        console.log('id...', target, id);
        this.getMakeList(id);
      }
    }
  },
  updated(){
    // 获取字母列表距离顶部的高度
    this.offsetTop = this.$refs.letters.getBoundingClientRect().top;
    this.letterHeight = this.$refs.letters.children[0].getBoundingClientRect().height;
  },
  mounted(){
    this.getBrandList();
    lazyLoad('.index');
  }
}
</script>

<style>
  .box {
    width: 100%;
    height: 100%;
  }
  .index {
    height:100%;
    overflow-y: scroll;
  }
  .right {
    position: fixed;
    right: .15rem;
    top:20%;
  }
  .ti1 {
    font-size: .3rem;
    font-weight: normal;
    color: #aaa;
    background:#eee;
    padding-left:.2rem;
  }
  .ti2 {
    text-align: center;
    font-size: .25rem;
    font-weight: 100;
    color: #000;
    padding:.03rem;
  }
  .tit dl {
    display: flex;
    margin:0 .2rem 0 .2rem;
    border-bottom:.01rem solid #ccc;
    align-items: center;
    height:1rem;
  }
  .tit dl dd {
    font-size: .3rem;
    margin-left:.3rem;
  }
  .make-list.active {
    transform: translate3d(0, 0, 0)!important;
  }
  .make-list{
    position: fixed;
    z-index: 999;
    right: 0; 
    top: 0;
    height: 100%;
    background: #fff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    width: 75%;
    transform: translate3d(100%, 0, 0);
    transition: all .3s linear!important;
  }
  @keyframes makeAnim {
    0%{
        transform: translate3d(100%, 0, 0);
    }
    100%{
         transform: translate3d(0, 0, 0);
    }
}
</style>
