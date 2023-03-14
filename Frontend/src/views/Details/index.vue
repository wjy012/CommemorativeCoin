<template>
  <BreadCrumb/>
  <el-card>
    <el-row  justify="space-between">
      <el-col :span="6">
        <el-image :src="coin.image" fit="contain"/>
      </el-col>
      <el-col :span="18"> 
        <el-descriptions
          :title="coin.name"
          :column="3"
          direction="vertical"
          size="large"
          border
        >
          <template #extra>
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
</template>

<script>
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import BreadCrumb from '../../components/BreadCrumb/index.vue';
import { getCoinDetail, editCoinDetail } from './service';
import { typeOptions, typeMap, themeOptions, themeMap } from '../../plugins/optionTyping'; 
import { ElMessage } from "element-plus";

export default {
  components: {BreadCrumb},
  setup(){
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

    const { id } = useRoute().params
    const getData = async (coinID)=>{
      const res = await getCoinDetail(coinID)
      if(res.code === 200){
        const {data} = res
        console.log(data);
        for(const key in coin){
          coin[key] = data[key]
          coinForm[key] = data[key]
        }
        coin.type = typeMap(coin.type)
        coin.theme = themeMap(coin.theme)
      }
    }
    const editInfo = ()=>{
      // coinForm = reactive(coin)
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
    
    // console.log('000000', route.params)
    getData(id)
    
    return {coin, editing, coinForm, typeOptions, themeOptions, editInfo, cancelEdit, submitForm}
  }
}
</script>

<style lang="scss" scoped>
.el-descriptions {
  // margin-top: 20px;
  // display: inline;
  // width: 100%;
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
</style>