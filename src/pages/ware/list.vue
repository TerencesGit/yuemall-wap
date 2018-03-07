<template>
  <section>
    <SearchHeader></SearchHeader>
    <mt-swipe :style="{height: bannerHeight}">
      <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item">
      </mt-swipe-item>
    </mt-swipe>
    <div class="hot-wrap bg-white">
      <div class="hot-title">
        <em class="uppercase">HOT</em>
        <span>最热门</span>
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
  import SearchHeader from "../components/warelist/header"
  import WareList from "../components/index/wareList"
  export default {
    components:{
      SearchHeader,
      WareList,
    },
    data() {
      return {
        storeId: '',
        wareKind: '',
        dstCityCode: '',
        dstCityList: [],
        wareList: [],
        bannerHeight: '180px',
        bannerList: [
          'http://ums.yueshijue.com/UmsUpload/resource/201803/F51206197BB24A75AC382A0ED393D7EE_1520414112793.jpg',
          'http://ums.yueshijue.com/UmsUpload/resource/201803/C724A039E6324DFC929D8FCEDD6A574F_1520413574591.jpg',
        ]
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
          providerId: this.storeId,
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
          providerId: this.storeId,
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
    mounted() {
      this.bannerHeight = (document.body.clientWidth / 2.18) + 'px';
			window.onresize = () => {
				this.bannerHeight = (document.body.clientWidth / 2.18) + 'px';
			}
    },
    created() {
      this.storeId = sessionStorage.getItem('storeId');
      this.wareKind = this.$route.query.kindId;
      this.getDstCityList()
      this.getWareList()
    },
  }
</script>

<style lang="scss" scoped>
  .hot-title {
    padding: 10px 15px;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;
    em {
      color: #f00;
      font-weight: bold;
    }
    span {
      color: #00AAEF;
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
