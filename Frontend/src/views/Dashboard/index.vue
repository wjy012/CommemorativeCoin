<template>
    <el-carousel :interval="4000" type="card" height="250px">
      <el-carousel-item v-for="item in newCoins" :key="item" @click="router.push('/coins/detail/'+item.id)">
        <div class="carousel-item">
          <el-image :src="item.image.split(';').pop()" fit="contain" style="height: 230px;"/>
          <div style="display: inline-block;">
            <el-text class="mx-1" size="large" bold>{{ item.name }}</el-text>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-row :gutter="10" >
        <el-col :span="12">
          <!-- <el-card shadow="hover" style="margin-bottom: 1%;">
            <el-row>
              <el-col :span="12" class="statistic-col">
                <el-statistic title="收录纪念币/钞" :value="coinsCount" />
              </el-col>
              <el-col :span="12" class="statistic-col">
                <el-statistic title="收录鉴赏文章" :value="newsCount" />
              </el-col>
            </el-row>
          </el-card> -->
          <el-card shadow="hover">
            <div class="tableheader">
              <span>最新文章</span>
              <el-button link type="primary" @click="router.push('/comments')">查看更多 >></el-button>
            </div>
            <el-table 
              :show-header="false"
              :data="newsData"
            >
              <el-table-column prop="title" :min-width="80">
                <template v-slot:default="scope">
                  <el-link :href="scope.row.link" target="_blank">
                    {{ scope.row.title }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column prop="date" :min-width="20" align="right"/>
            </el-table>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card shadow="hover" style="height: 100%;" id="popchartcard" header="最多访问">
            <div id="popcoins" style="width: 100%; height: 100%;" />
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted, watch } from 'vue';
import { getIndex, getPopCoins } from './service'
export default {
  setup(){
    const router = useRouter()
    const newsData = ref([])
    const newCoins = ref([])
    const newsCount = ref()
    const coinsCount = ref()
    const coinName = ref([])
    const visits = ref([])
    const coinid = ref([])


    const chart = reactive({
      container: {},
      mychart: {},
      option: {}
    })

    const getIndexData = async() =>{
      const res = await getIndex()
      if(res.code === 200){
        newsData.value = res.data.news
        newCoins.value = res.data.newCoins
        coinsCount.value = res.data.coinsCount
        newsCount.value = res.data.newsCount
      }
      
    }
    getIndexData()

    const getPopCoinsData = async ()=>{
      const res = await getPopCoins()
      if(res.code ===200){
        const {data} = res
        coinName.value = data.coinName
        coinid.value = data.coinid
        visits.value = data.visits
      }
    }

    const prepareChart = (height)=>{
      chart.container = document.getElementById('popcoins')
      chart.container.style.height = height+'px'

      chart.mychart = echarts.init(chart.container)
      chart.option = {
        xAxis: {
          data: coinName,
          axisLabel: { interval: 0, rotate: -30 }
        },
        yAxis: {
          type: 'value',
          name: '访问次数'
        },
        series: [{
          data: visits,
          type: 'bar',
          coinIds: coinid
        }],
        tooltip: {
          show: true
        }
      }
      chart.mychart.on('click', (param)=>{
        const cid = chart.option.series[param.seriesIndex].coinIds[param.dataIndex]
        router.push('/coins/detail/'+cid)
      })
    }
    const drawChart = ()=>{
      chart.mychart.setOption(chart.option, true)
      window.onresize = ()=>{
        chart.mychart.resize()
      }
    }

    onMounted(()=>{
      const card = document.getElementById('popchartcard').getBoundingClientRect()
      prepareChart(card.height*1.2)
      getPopCoinsData()
      drawChart()
    })
    watch(()=> [coinid, visits], ()=>{
      drawChart()
    }, { deep: true})
    
    return {router, newsData, newCoins, coinsCount, newsCount}
  }
}
</script>

<style lang="scss" scoped>
.el-carousel{
  margin-top: -1.5%;
}
.carousel-item{
  display: flex;
  align-items: flex-end;
  height: 250px;
}
.el-image{
  display: inline-block;
}

.statistic-col {
  text-align: center;
}

.container{
  display: flex;
  align-items: stretch;
}

.bottomcard{
  margin: 2% 1% 0 0;
}
.tableheader{
  display: flex;
  justify-content: space-between;
}
.el-table__cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>