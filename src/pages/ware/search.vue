<template>
    <div class="search">
        <slef-header :title="'搜索'"></slef-header>
        <!-- 搜索框 -->
        <div class="searchB">
            <div class="searchbar">
                <div class="searchbar-inner">
                    <i class="mintui mintui-search"></i>
                    <input type="search" placeholder="搜索目的地" class="mint-searchbar-core" v-model="searchName">
                </div>
                <button class="flex1" @click="search">搜索</button>
            </div>
        </div>
        
        <!-- 筛选 -->
        <div class="ware-list-filter" >
            <!-- navbar -->  
            <mt-navbar class="page-part" v-model="selected">  
                <div @click.capture="filter" style="width: 100%;">
                    <mt-tab-item id="产品类型">产品类型
                    </mt-tab-item>  
                    <mt-tab-item id="更多筛选">更多筛选
                    </mt-tab-item>  
                    <mt-tab-item id="综合排序">综合排序
                    </mt-tab-item> 
                </div> 
            </mt-navbar>  
            <div v-show="isFilter">  
                <mt-cell class="page-part" :title="selected"></mt-cell>  
            </div>  
            <!-- tabcontainer -->  
            <mt-tab-container v-model="selected" v-show="isFilter">  
                <mt-tab-container-item id="产品类型"> 
                    <div class="pro-type">
                        <ul>
                            <li  @click="type(' '),isactive = true,dstIndex= -1" :class="isactive ? 'active' : ''">
                                <a href="#">不限</a>
                            </li>
                            <li v-for="(item,i) in wareKind" :key="item.id" :class="{ active: dstIndex == i }" @click="type(item.id),dstIndex = i, isactive=false">
                                <a href="#">{{item.kindName}}</a>
                            </li>
                        </ul>
                        <mt-button type="primary" size="large" @click="confirm">确认</mt-button>
                    </div>
                </mt-tab-container-item>  

                <mt-tab-container-item id="更多筛选">  
                     <div class="pro-type">
                        <mt-cell title="服务时间"></mt-cell>
                        <ul>
                            <li @click="type(' ')" class="active">
                                <a href="#">不限</a>
                            </li>
                            <li>
                                <a href="#" @click="open('picker3')">{{this.startDay || '出行开始时间'}}</a>
                                <br>
                                <mt-datetime-picker
                                ref="picker3"
                                type="date"
                                v-model="value1"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate"
                                :endDate="endDate"
                                @confirm="handleChange">
                                </mt-datetime-picker>
                            </li>
                            <li>
                                <a href="#" @click="open('picker2')">{{this.endDay || '出行结束时间'}}</a>
                                <br>
                                <mt-datetime-picker
                                ref="picker2"
                                type="date"
                                v-model="value2"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日"
                                :startDate="startDate"
                                :endDate="endDate"
                                @confirm="handleChange1">
                                </mt-datetime-picker>
                            </li>
                        </ul>
                        <mt-cell title="服务天数"></mt-cell>
                        <ul>
                            <li @click="isactive = true,dateIndex= -1" :class="isactive ? 'active' : ''">
                                <a href="#">不限</a>
                            </li>
                            <li v-for="(item,i) in 11" :key="i" :class="{ active: dateIndex == i }" @click="dateIndex = i, isactive = false">
                                <a href="#">第{{i+1}}天</a>
                            </li>
                        </ul>
                        <mt-cell title="目的地城市"></mt-cell>
                        <ul>
                            <li  @click="isactive1 = true,dstIndex= -1, dstCityCode=' '" :class="isactive1 ? 'active' : ''">
                                <a href="#">不限</a>
                            </li>
                            <li v-for="(item,i) in dstCities" :key="i" :class="{ active: dstIndex == i }" @click="dstIndex = i, isactive1 = false, dstCityCode=item.dstCityCode">
                                <a href="#">{{item.shortName}}</a>
                            </li>
                        </ul>
                        <mt-button type="primary" size="large" @click="confirm1">确认</mt-button>
                    </div>
                </mt-tab-container-item>  

                <mt-tab-container-item id="综合排序">  
                    <div @click="getFindWareListByKind(' ',query={priceSort:1}), isFilter = false">
                        <mt-cell title="价格由高到低" isLink></mt-cell>
                    </div>
                    <div @click="getFindWareListByKind(' ',query={priceSort:0}), isFilter = false">
                        <mt-cell title="价格由低到高" isLink ></mt-cell>
                    </div>
                    <div @click="getFindWareListByKind(' ',query={isToday: 1}), isFilter = false">
                        <mt-cell title="今日新品" isLink></mt-cell>
                    </div>
                </mt-tab-container-item>  
            </mt-tab-container>  
        </div>
        <!-- 目的地 -->
        <WareList :wareData="wareList" v-show="!isFilter" style="background-color: #fff;"></WareList>
    </div>
</template>

<script>
import slefHeader from '../myCenter/selfHeader'
import { findDstList, findWareListByKind, searchWareList } from '@/api'
import SearchHeader from "../components/warelist/header"
import WareList from "../components/index/wareList"
import { Toast } from 'mint-ui'
export default {
    components: {
        WareList,
        slefHeader,
    },
    data() {  
        return {  
            selected: '',
            isFilter: false,
            wareList: [],
            wareKind: [],
            dstCities: [],
            wareKindId: '',
            value: null,
            value1: null,
            value2: null,
            //show: true,
            startDate: new Date('2018'),
            endDate: new Date('2020'),
            query: {},
            dateIndex: -1,
            dstIndex: -1,
            isactive: true,
            isactive1: true,
            dstCityCode: '',
            startDay: '',
            endDay:'',
            tripDays:'',
            searchName: '',
        };  
    },
    created() {
        this.getDateList();
        this.getFindWareListByKind(' ')
    },
    methods: {
        search() {
            this.wareList = []
            let data = {
                providerId: sessionStorage.getItem('storeId'),
                searchCondition: this.searchName
            }
            searchWareList(data).then(res => {
                if(res.data.status == 1){
                    this.wareList = res.data.data.wareTripInfos
                }
            })
        },
        open(picker) {
            this.$refs[picker].open();
        },
        handleChange(value) {
            var year = new Date(value).getFullYear();
            var month = new Date(value).getMonth()+1;
            if( month < 10 ) {
                month = '0' + month
            }
            console.log(year)
            console.log(month)
            this.startDay =  year + '-' + month
        },
        handleChange1(value) {
            var year = new Date(value).getFullYear();
            var month = new Date(value).getMonth()+1;
            if( month < 10 ) {
                month = '0' + month
            }
            console.log(year)
            console.log(month)
            this.endDay = year + '-' + month
        },
        change() {
        },
        filter() {
                this.isFilter = !this.isFilter
        },
        confirm() {
            this.isFilter = false
            this.getFindWareListByKind(this.wareKindId)
        },
        confirm1() {
            console.log(this.dateIndex.toString())
            console.log(this.dstCityCode.toString())
            console.log(this.startDay)
            console.log(this.endDay)
            var query = { salesSort: 1 }
            if(this.dateIndex == -1) {
                this.tripDays = ''
            }else {
                this.tripDays = this.dateIndex + 1
            }
            this.getFindWareListByKind('',query,this.startDay,this.endDay,"" + this.tripDays +"",""+ this.dstCityCode+ "" )
            this.isFilter = false
        },
        getDateList() {
            let data = {
                providerId: sessionStorage.getItem('storeId')
            }
            findDstList(data).then(res => {
                if(res.data.status ===1 ){
                    this.wareKind = res.data.data.wareKinds
                    this.dstCities = res.data.data.dstCities
                }
            })
        },
        getFindWareListByKind(id, query,startDay,endDay,tripDays,dstCityCode) {
            this.wareList = []
            let data = {
                providerId: sessionStorage.getItem('storeId'),
                startDate: startDay || '',
                endDate: endDay || '',
                srcCityCode: '',
                tripDays: tripDays || '',
                dstCityCode: dstCityCode || '',
                page: {
                    currentPage: 1,
                    pageSize: 20
                },
                wareKind: id || '',
                query: query || { salesSort: 1 }
            }
            findWareListByKind(data).then( res => {
                if(res.data.status ===1) {
                    this.wareList = res.data.data.wares
                }
            })
        },
        type(id) {
            this.wareKindId = id
        }
    },
    watch: {
        selected(val, oldVal) {
            if(val !== oldVal) {
                this.isFilter = true
            }
        }
    }
}
</script>

<style scoped lang="scss">
.search {
    .searchB {
       padding: 5px 15px;
        .searchbar {
            display: flex;
            align-items: center;
            .searchbar-inner {
                display: flex;
                flex: 1;
                height: 28px;
                width: 80%;
                padding: 4px 6px;
                background: #fff;
                border-radius: 15px;
                .mintui-search {
                    margin: 2px 5px 0 0;
                }
            }
            button {
                width: 50px;
                height: 28px;
                border-radius: 8px;
                margin-left: 15px;
                background-color: #00a1e5;
                color: #fff;
            } 
        }
    }
    .pro-type {
        background-color: #fff;
        ul {
            margin: 0 15px 15px;
        }
        li {
            font-size: 12px;
            display: inline-block;
            margin: 7px 3px;
            border: 1px solid #808080;
            padding: 3px 8px;
            border-radius: 5px;
            // &:hover {
            //     border: 1px solid #00AAEF;
            //     background-color: #00AAEF;
            // }
            a {
                color: #808080;
            }
        }
        .active {
            border: 1px solid #00AAEF;
            background-color: #00AAEF;
            a {
                color: #fff;  
            }
        }
    }
}
</style>
