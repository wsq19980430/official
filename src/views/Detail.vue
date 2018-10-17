<template>
  <div class="detail" style="width: 100%;
  height: 100%; background: #f4f4f4;">
    <div class="box">
      <div class="car" style="background:#fff; margin-bottom: .1rem;">
        <img :src="list.CoverPhoto" alt="">
        <div class="price">
          <div>
            <span>{{list.market_attribute.dealer_price}}</span>
            <span>指导价{{list.market_attribute.official_refer_price}}</span>
          </div>
          <div>{{list.BottomEntranceTitle}}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>询问低价</span>
      <span>本地经销商为你报价</span>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  computed: {
    ...mapState({
      list: state=>state.detail.list
    })
  },
    // 排序规则
    // 排量的升序=>发动机功率升序=>吸气方式（自然吸气>涡轮增压）=>年份降序
    methods: {
      ...mapActions({
          getCarInfo: 'detail/getCarInfo'
      })
    },
    mounted(){
        this.getCarInfo(this.$route.query.serialID);
    }
}
</script>
<style lang="scss" scoped>
  .detail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .box {
      flex: 1;
      overflow: auto;
    }
    .footer {
      width: 100%;
      height:1rem;
      background:#00afff;
      color: #fff;
      display: flex;
      flex-direction: column;
      text-align: center;
      span {
        font-size: .32rem;
        line-height: 1.5;
      }
      span:nth-child(2){
        font-size: .25rem;
      }
    }
  }
  .car img {
    width: 100%;
    height: 3.35rem;
    display: block;
  }
  .price {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding:.35rem 0 .35rem 0;
    div:nth-child(1){
      width: 44%;
      span {
        display: block;
      }
      span:nth-child(1){
        font-size: .35rem;
        color: red;
      }
      span:nth-child(2){
        font-size: .26rem;
        color: #ccc;
      }
    }
    div:nth-child(2){
      width: 50%;
      height: .7rem;
      font-size:.32rem;
      background: #00afff;
      color:#fff;
      line-height: .7rem;
      text-align: center;
      border-radius: .1rem;
    }
  }
</style>
