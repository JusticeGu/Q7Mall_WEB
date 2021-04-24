<template>
    <div>
     <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
     </el-breadcrumb>
     <!-- 搜索区域 -->
     <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="8">
              <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </el-col>
          <el-col :span="4">
              <el-button type="primary">增加商品</el-button>
          </el-col>
        </el-row>
     </el-card>
     <!-- 商品列表区域 -->
    <el-table :data="tableData" stripe>
    <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          
        </el-table-column>
  </el-table>
  <!-- 分页区域 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2,5,10,15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    </div>
</template>
<script>
export default {
    data(){
        return{
            input:'',
            tableData:[],
            //获取新闻列表的参数对象 
            queryInfo:{
              query:'',
              //当前页数
              pagenum:1,
              //当前展示的数据个数
              pagesize:2
            },
            total:0,
            value:''
        }
    },
    created(){
        this.getGoodsList()
        console.log(1);
    },
    methods: {
      handleSizeChange(newSize){
        this.queryInfo.pagesize=newSize;
      },
      handleCurrentChange(newPage){

      },
      async getGoodsList(){
          console.log(3)
          const {data:res}=await this.$axios.get(this.$root.api.goodsList);
          console.log(res);
          console.log(2)
      }
    },
}
</script>
<style lang="less" scoped>
   .el-breadcrumb{
       margin-bottom: 20px;
       font-size: 12px;
   }
   .el-card{
       box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
   }
   .el-table{
       margin-top:15px;
   }
</style>