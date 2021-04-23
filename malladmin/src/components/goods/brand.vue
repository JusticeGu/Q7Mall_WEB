<template>
    <div>
     <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
        <el-breadcrumb-item>品牌列表</el-breadcrumb-item>
     </el-breadcrumb>
     <!-- 搜索区域 -->
     <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="8">
              <el-input placeholder="请输入内容" v-model="brandname" class="input-with-select" clearable @clear="getBrandData">
                <el-button slot="append" icon="el-icon-search" @click="searchBrandData"></el-button>
              </el-input>
          </el-col>
          <el-col :span="4">
              <el-button type="primary" @click="brandDialogVisible=true">增加品牌</el-button>
          </el-col>
        </el-row>
     </el-card>
     <!-- 品牌列表区域 -->
    <el-table :data="tableBrandData" stripe>
    <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="品牌名称"></el-table-column>
        <el-table-column prop="product_count" label="数量"></el-table-column>
        <el-table-column label="是否名牌">
           <template slot-scope="scope">
             <el-switch v-model="scope.row.varify" disabled>
             </el-switch>
           </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
             <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top" enterable="false"> -->
               <el-button type="primary" size='mini' icon="el-icon-edit">修改</el-button>
             <!-- </el-tooltip> -->
             <!-- <el-tooltip class="item" effect="dark" content="删除" placement="top" enterable="false"> -->
               <el-button type="danger" size='mini' icon="el-icon-delete">删除</el-button>
             <!-- </el-tooltip> -->
             <!-- <el-tooltip class="item" effect="dark" content="添加" placement="top" enterable="false"> -->
                <el-button type="info" size='mini' icon="el-icon-setting">添加</el-button>
             <!-- </el-tooltip> -->
          
          </template>
        </el-table-column>
  </el-table>
  <!-- 分页区域 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.start"
      :page-sizes="[2,5,10,15]"
      :page-size="queryInfo.num"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加品牌的对话框 -->
    <el-dialog  title="添加商品品牌" :visible.sync="brandDialogVisible" width="30%"
      center @close="addDialogClosed">

      <el-form :model="addBrandForm" :rules="addBrandRules" ref="addBrandForms" label-width="100px">
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="addBrandForm.name" @blur="blurTest"></el-input>
        </el-form-item>
        <el-form-item label="品牌等级">
          <el-select v-model="addBrandForm.b_sort" placeholder="请选择活动区域">
            <el-option label="等级一" value=0></el-option>
            <el-option label="等级二" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logo" >
          <el-input v-model="addBrandForm.logo" @blur="blurTest2"></el-input>
        </el-form-item>
        <el-form-item label="是否名牌">
          <el-switch v-model="addBrandForm.varify"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="brandDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBrandContent">确 定</el-button>
      </span>
    </el-dialog>

    </div>
</template>
<script>
export default {
    data(){
      var checkName=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入品牌名称'))
        }
        callback()
      };
      var checkLogo=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入logo'))
        }
        callback()
      } 
        return{
            input:'',
            tableBrandData:[],
            //获取新闻列表的参数对象 
            brandname:'',
            queryInfo:{
              //当前页数
              start:0,
              //当前展示的数据个数
              num:2
            },
            total:0,
            value:'',
            brandDialogVisible:false,
            addBrandForm:{
              b_sort:0,
              logo:"",
              name:"",
              varify:false
            },
            addBrandRules:{
              name:[{required:true,message:'请输入品牌名称',trigger:'blur'},{ validator:checkName,trigger:'blur'}],
              logo:[{required:true,message:'请上传品牌logo',trigger:'blur'},{ validator:checkLogo,trigger:'blur'}],
            }
        }
    },
    created(){
      this.getBrandData();
    }, 
    methods: {
      blurTest(){
        console.log(this.addBrandForm.name)
      },
      blurTest2(){
        console.log(this.addBrandForm.logo)
      },
     async  getBrandData(){
      //  console.log(this.queryInfo);
      const {data:res}=await this.$axios.get(this.$root.api.brandList,
      {params: this.queryInfo});
      if(res.rspCode!=='200'){
        this.$message.error('获取品牌列表失败')
      }
      this.$message.success('获取品牌列表成功');
      // console.log(res);
      this.tableBrandData=res.data.content;
      this.total=res.data.totalElements;
      },

      async  searchBrandData(){
        console.log('searchBrandData');
       const {data:res}= await this.$axios.get(this.$root.api.brandListQuery,
       {params: {brandname:this.brandname}});
       console.log(res);
       if(res.rspCode!=='200'){
         this.$message.error('查询品牌失败')
       };
       this.tableBrandData=res.data;
       
      },
      handleSizeChange(newSize){
        this.queryInfo.num=newSize;
        // console.log(newSize);
        this.getBrandData();
      },
      handleCurrentChange(newPage){
        this.queryInfo.start=newPage-1;
        // console.log(newPage);
        this.getBrandData();
      },
      addDialogClosed(){
        // console.log(this.addBrandForm.varify)
        this.$refs.addBrandForms.resetFields()
      },
     async  addBrandContent(){
      //  this.$refs.addBrandForms.validate(valid=>{
      //  if(!valid) return 
      //   })
       console.log(this.addBrandForm)
       console.log(this)

       const {data:res}= await this.$axios.post(this.$root.api.brandAdd,
       {data:this.addBrandForm});
       console.log(res);
       if(res.rspCode!=='200'){
         this.$message.error(res.rspMsg)
         console.log(res.rspMsg)
       }
       this.$message.success('添加品牌成功');
       this.brandDialogVisible=false;
       this.getBrandData();
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