<template>
  <section>
    <SearchHeader></SearchHeader>
    <mt-swipe style="height: 180px;">
      <mt-swipe-item>
        <img src="http://wap.yueshijue.com/warp/assets/image/sb.png">
      </mt-swipe-item>
    </mt-swipe>
    <div class="hot-wrap bg-white">
      <div class="hot-title">
        <em class="uppercase text-red">HOT</em>
        <span class="text-blue">最热门</span>
      </div>
      <div class="hot-city">
        <ul class="city-list clearfix">
          <li v-for="(item, i) in dstCityList" :key="i">
            <a href="javascript:;" @click="handleCityClick(item.dstCityCode)">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="recommend-wrap bg-white">
      <div class="recommend-title">
        <img src="http://wap.yueshijue.com/warp/assets/image/jingxuantuijian.png">
        <strong>精选推荐</strong>
      </div>
      <div class="recommend-wares">
        <WareList :wareData="wareList"></WareList>
      </div>
    </div>
  </section>
</template>

<script>
  import { findDstList, findWareListByKind } from '@/api'
  import SearchHeader from "@/components/warelist/header"
  import WareList from "@/components/index/wareList"
  export default {
    components:{
      SearchHeader,
      WareList,
    },
    data() {
      return {
        providerId: '',
        wareKind: '',
        dstCityCode: '',
        dstCityList: [],
        wareList: [],
      }
    },
    methods: {
      showToast(msg) {
        this.$toast({
          message: msg,
          duration: 1000,
        })
      },
      getDstCityList() {
        let data = {
          providerId: this.providerId,
        }
        findDstList(data).then(res => {
          if(res.data.status === 1) {
            let dstCities = res.data.data.dstCities;
            let wareKinds = res.data.data.wareKinds;
            wareKinds.forEach(kind => {
              if(kind.id == this.wareKind) {
                document.title = kind.kindName || '列表页';
              }
            })
            if(this.wareKind === '715060598102532') {
              this.dstCityList = dstCities.filter(dst => dst.mergerName)
            } else {
              this.dstCityList = dstCities.filter(dst => !dst.mergerName);
            }
          }
        })
      },
      handleCityClick(cityCode) {
        if(this.dstCityCode === cityCode) return;
        this.dstCityCode = cityCode;
        this.getWareList()
      },
      getWareList() {
        let data = {
          providerId: this.providerId,
          wareKind: this.wareKind,
          dstCityCode: this.dstCityCode,
        }
        findWareListByKind(data).then(res => {
          if(res.data.status === 1) {
            this.wareList = res.data.data.wares;
          } else {
            this.showToast(res.data.msg)
          }
        })
      },
    },
    created() {
      this.providerId = sessionStorage.getItem('providerId');
      this.wareKind = this.$route.query.kindId;
      this.getDstCityList()
      this.getWareList()
    },
  }
</script>

<style lang="scss" scoped>
  .hot-title {
    padding: 10px 15px;
    font-size: 16px;
    border-bottom: 1px solid #f0f0f0;
    em {
      font-weight: bold;
    }
  }
  .city-list {
    li {
      float: left;
      width: 25%;
      padding: 10px 0;
      text-align: center;
      a {
        display: block;
        color: #666;
        border-right: 1px solid #ccc;
      }
      &:nth-child(4n), &:last-child {
        a {
          border-right: 0;
        }
      }
    }
  }
  .recommend-wrap {
    margin-top: 15px;
    .recommend-title {
      padding: 10px 15px;
      border-bottom: 1px solid #f0f0f0;
      img {
        width: 16px;
        vertical-align: middle;
      }
      strong {
        margin-left: 5px;
        vertical-align: middle;
        font-size: 16px;
      }
    }
  }
</style>
