<template>
    <div>
     <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
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
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
             <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top" enterable="false"> -->
               <el-button type="primary" size='mini' icon="el-icon-edit" @click="editBrand(scope.row.name)">修改</el-button>
             <!-- </el-tooltip> -->
             <!-- <el-tooltip class="item" effect="dark" content="删除" placement="top" enterable="false"> -->
               <el-button type="danger" size='mini' icon="el-icon-delete" @click="removeBrandId(scope.row.bid)">删除</el-button>
             <!-- </el-tooltip> -->
             <!-- <el-tooltip class="item" effect="dark" content="添加" placement="top" enterable="false"> -->
                <!-- <el-button type="info" size='mini' icon="el-icon-setting">添加</el-button> -->
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
    
      <el-form
        :model="addBrandForm"
        ref="addBrandForms"
        :rules="addBrandRules"
        label-width="100px">

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

     <!-- 品牌修改 -->
     <el-dialog title="提示" :visible.sync="editBrandVisible" width="40%"
     center @close="editBrandClosed">
      <el-form ref="editBrandref" :model="editBrandForm" :rules="addBrandRules" label-width="100px">
        <el-form-item label="品牌名称">
          <el-input v-model="editBrandForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="品牌等级" label-width="100px">
          <el-select v-model="editBrandForm.b_sort" placeholder="请选择活动区域">
             <el-option label="等级一" value= 0></el-option>
             <el-option label="等级二" value= 1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logo" label-width="100px">
          <el-input v-model="editBrandForm.logo" ></el-input>
        </el-form-item>
        <el-form-item label="是否名牌">
          <el-switch v-model="editBrandForm.varify"></el-switch>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editBrandVisible = false">取消</el-button>
          <el-button type="primary" @click="editBrandContent">确 定</el-button>
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
            //获取品牌列表的参数对象 
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
            },
            editBrandVisible:false,
            editBrandForm:{
              name:'',
              b_sort:0,
              logo:"",
              varify:false
            },


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
      {params: {start:this.queryInfo.start-1,num:this.queryInfo.num}});
      // this.queryInfo
      if(res.rspCode!=='200'){
        this.$message.error('获取品牌列表失败')
      }else{
        this.$message.success('获取品牌列表成功');
      }
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
        this.queryInfo.start=newPage;
        // console.log(newPage);
        this.getBrandData();
      },
      //添加品牌
      addDialogClosed(){
        // console.log(this.addBrandForm.varify)
        this.$refs.addBrandForms.resetFields()
      },
     async addBrandContent(){
      //  this.$refs.addBrandForms.validate(valid=>{
      //  if(!valid) return 
      //   })
       console.log(this.addBrandForm)
       console.log(this)

       const {data:res}= await this.$axios.post(this.$root.api.brandAdd,
       this.addBrandForm);
       console.log(res);
       if(res && res.rspCode!=='200'){
         this.$message.error(res.data)
        //  console.log(res.rspMsg)
       }else{
          this.$message.success(res.data);
       }
      
       this.brandDialogVisible=false;
       this.getBrandData();
      },
      removeBrandId(Id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
         const {data:res}= await this.$axios.delete(this.$root.api.brandDelete,
          {params:{bid:Id}});
          console.log(Id);
          console.log(res)
          if(res.rspCode==="200"){
            this.$message.success('删除成功!')
            this.getBrandData();
          }else{
            this.$message.error('删除失败!')
          }
        }).catch(() => {
          this.$message.info('已取消删除')
        });
      },
      // 修改品牌
     async editBrand(brandname){
        const {data:res}= await this.$axios.get(this.$root.api.brandListQuery,
          {params: {brandname:brandname}});
        if(res.rspCode!=='200'){
         this.$message.error('查询品牌失败')
         };
         console.log(res);
      this.editBrandForm=res.data[0];   
      this.editBrandVisible=true;
      
      },
      editBrandClosed(){
        this.$refs.editBrandref.resetFields();
      },
      async editBrandContent(){
        this.$refs.editBrandref.validate(async valid=>{
          if(!valid){
            return
          }else{
            const {data:res}=await this.$axios.put(this.$root.api.brandUpdate,
            this.editBrandForm);
            if(res.rspCode!=='200'){
              this.$message.error('品牌'+res.data)
            }else{
              this.$message.success('品牌修改成功')
            }
            this.editBrandVisible=false;
            this.getBrandData();
            this.$message.success('品牌'+res.data)
          }
        })
      },
      // editBrandContent(){

      // }
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
   .el-pagination{
     margin-top:20px;
   }
</style>