<template>
  <BreadCrumb/>
  <el-empty v-if="isNull" :image-size="350" >
    <template #description>
      <el-space direction="vertical">
        <el-text class="title">404</el-text>
        <el-text >该纪念币不存在！</el-text>
      </el-space>
    </template>
    <el-button type="primary" plain auto-insert-space @click="router.back">返回</el-button>
  </el-empty>
  <div v-else>
    <el-card>
      <el-row  justify="space-between">
        <el-col :span="6">
          <!-- <el-image :src="coin.image" fit="contain"/> -->
          <CoinImg :hrefs="coin.image"/>
        </el-col>
        <el-col :span="18"> 
          <el-descriptions
            :title="coin.name"
            :column="3"
            direction="vertical"
            size="large"
            border
          >
            <template #extra v-if="isLogged">
              <el-button v-if="editing" type="primary" @click="submitForm(coinForm)">保存</el-button>
              <el-button v-if="editing" type="primary" plain @click="cancelEdit">取消</el-button>
              <el-button v-else type="primary" @click="editInfo">修改信息</el-button>
            </template>
            <!-- <el-form 
              :model="coin"
            >  -->
              <el-descriptions-item label="类型" min-width="33%" >
                <!-- <el-form-item name="type" prop="type"> -->
                  <el-select v-if="editing" v-model="coinForm.type" size="small">
                    <el-option
                      v-for="item in typeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <span v-else>{{ coin.type }}</span>
                  <!-- {{ coin.type}} -->
                <!-- </el-form-item> -->
              </el-descriptions-item>

              <el-descriptions-item label="面值" min-width="33%">
                <el-input v-if="editing" v-model="coinForm.value" type="number" size="small"/>
                <span v-else>{{ coin.value }}元</span>
              </el-descriptions-item>

              <el-descriptions-item label="材质" min-width="33%">
                <el-input v-if="editing" v-model="coinForm.material" size="small"/>
                <span v-else>{{ coin.material || '-' }}</span>
              </el-descriptions-item>

              <el-descriptions-item label="发行量" min-width="33%">
                <el-input v-if="editing" v-model="coinForm.amount" type="number" size="small"/>
                <span v-else>{{ coin.amount || '-' }}</span>
              </el-descriptions-item>

              <el-descriptions-item label="发行日期" min-width="33%">
                <el-date-picker v-if="editing" v-model="coinForm.date" type="date" size="small"/>
                <span v-else>{{ coin.date }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="题材" min-width="33%">
                <el-select v-if="editing" v-model="coinForm.theme" size="small">
                  <el-option
                    v-for="item in themeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <span v-else>{{ coin.theme }}</span>
              </el-descriptions-item>

            <!-- </el-form> -->
          </el-descriptions>
        </el-col>
      </el-row>
    </el-card>

    <div >
      <el-row :gutter="16" style="margin-top: -1%;" >
        <el-col :span="10">
          <el-card style="height: 100%;" header="价格走势（参考）" id="chartcard">
            <div id="priceChart" style="width: 100%; height: 100%;" />
          </el-card>
        </el-col>

        <el-col :span="14">
          <el-card style="height: 100%;" header="相关文章">
            <CommentsTable :query="false" :dataRequest="getMentioned" :coinID="id"/>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import * as echarts from 'echarts';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, onMounted, watch } from 'vue';
import BreadCrumb from '../../components/BreadCrumb/index.vue';
import CommentsTable from '../../components/CommentsTable/index.vue'
import CoinImg from './components/CoinImg.vue';
import { getCoinDetail, editCoinDetail, getMentioned, getPriceData } from './service';
import { typeOptions, typeMap, themeOptions, themeMap } from '../../plugins/optionTyping'; 
import { ElMessage } from "element-plus";
import { verify } from '../../plugins/verify';

export default {
  components: {BreadCrumb, CoinImg, CommentsTable},
  setup(){
    const isNull = ref(false)
    const coin = reactive({
      name: '',
      type: '',
      date: '',
      theme: '',
      material: '',
      value: '',
      image: '',
      amount: ''
    })
    const isLogged = ref(false)
    const getLogState = async ()=>{
      const res = await verify()
      if(res.code === 200){
        isLogged.value = true
      }
    }
    getLogState()

    const editing = ref(false)
    const coinForm = reactive({
      name: '',
      type: '',
      date: '',
      theme: '',
      material: '',
      value: '',
      image: '',
      amount: ''
    })
    const router = useRouter()
    const { id } = useRoute().params
    const dateData = ref([])
    const priceData = ref([])
    const chart = reactive({
      container: {},
      mychart: {},
      option: {}
    })

    const getData = async (coinID)=>{
      const res = await getCoinDetail(coinID)
      if(res.code === 200){
        const {data: {coin: data}} = res
        
        for(const key in coin){
          coin[key] = data[key]
          coinForm[key] = data[key]
        }
        coin.type = typeMap(coin.type)
        coin.theme = themeMap(coin.theme)
      }
      else {
        isNull.value = true
      }
    }

    const getPrice = async (coinID)=>{
      const res = await getPriceData(coinID)
      if(res.code === 200){
        const {data: {date, price}} = res
        dateData.value = date
        priceData.value = price
      }
    }

    const editInfo = ()=>{
      editing.value = true
    }
    const cancelEdit = () =>{
      editing.value = false
    }
    const submitForm = async form =>{
      const res = await editCoinDetail(id, form)
      if(res.code === 200){
        ElMessage({
          message: '编辑成功！',
          type: 'success'
        })
        editing.value = false
        getData(id)
      }
    }

    const prepareChart = (height)=>{
      chart.container = document.getElementById('priceChart')
      chart.container.style.height = height+'px'

      chart.mychart = echarts.init(chart.container)
      chart.option = {
        xAxis: {
          data: dateData,
          name: '日期'
        },
        yAxis: {
          type: 'value',
          name: '市场价'
        },
        series: [{
          data: priceData,
          type: 'line',
        }],
        tooltip: {
          show: true
        }
      }
    }

    const drawChart = ()=>{
      chart.mychart.setOption(chart.option, true)
      window.onresize = ()=>{
        chart.mychart.resize()
      }
    }

    onMounted(()=>{
      const card = document.getElementById('chartcard').getBoundingClientRect()
      prepareChart(card.height)
      getPrice(id)
      drawChart()
    })

    watch(()=> dateData, ()=>{
      drawChart()
    }, { deep: true})

    getData(id)
    return {isNull, id, coin, isLogged, editing, coinForm, typeOptions, themeOptions, router, editInfo, cancelEdit, submitForm, getMentioned}
  },
}
</script>

<style lang="scss" scoped>
.el-descriptions {
  margin-left: 15px;
}
.el-card{
  margin-top: 30px;
  padding: 10px;
}
.el-input{
  width: 70%;
}
.el-select{
  width: 70%;
}
.el-date-picker{
  width: 70%;
}

.title{
  font-size: 3em
}
</style>