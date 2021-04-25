<template>
    <div>
     <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
     </el-breadcrumb>
     <!-- 搜索区域 -->
     <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="8">
              <el-input placeholder="请输入内容" v-model="brandname"  clearable @clear="getCategoriesList">
                <el-button slot="append" icon="el-icon-search"  @click="searchtCategories"></el-button>
              </el-input>
          </el-col>
          <el-col :span="4">
              <el-button type="primary" @click="addCategories" >增加商品分类</el-button>
          </el-col>
        </el-row>
     </el-card>
     <!-- tree-table区域 -->
     <tree-table :data="categoryData" :columns="columns"
      :selection-type="false" :expand-type="false" index-text="#"
      :show-row-hover="false" show-index border>
       <template slot="isShow" slot-scope="scope">
         <el-switch v-model="scope.row.show_status" active-color="#13ce66" disabled>
         </el-switch>
       </template>
       <template slot="leavel" slot-scope="scope">
         <el-tag type="success" v-if="scope.row.leavel==0">一级分类</el-tag>
         <el-tag type="info" v-else-if="scope.row.leavel==1">二级分类</el-tag>
         <el-tag type="warning" v-else>三级分类</el-tag>
       </template>
       <template slot="ways" slot-scope="scope">
         <el-button type="primary" size='mini' icon="el-icon-edit" @click="editCategories(scope.row.name)">修改</el-button>
         <el-button type="danger" size='mini' icon="el-icon-delete" @click="deleteCategoriesId(scope.row.cid)">删除</el-button>
       </template>
     </tree-table>

    <!-- 修改分类 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editCategoriesVisible"
      width="30%"
      @close="editCategoriesClosed">
       <el-form ref="editCategoryRef" :model="editCategoryForm"  :rules="editCategoryRules" label-width="200px">
            <el-form-item label="商品分类名称" prop="name">
                <el-input v-model="editCategoryForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="排序优先级" prop="b_sort">
                <el-select v-model="editCategoryForm.b_sort" placeholder="请选择排序优先级"  >
                <el-option v-for="item in sortsOption" 
                :key="item.value"
                :value="item.value"
                :label="item.label">
                </el-option>
                <!-- <el-option label="一级排序" value= 0 ></el-option>
                <el-option label="二级优先级" value= 1 ></el-option>
                <el-option label="三级优先级" value= 2 ></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="类别单位" prop="unit_name">
               <el-input v-model="editCategoryForm.unit_name"></el-input>
            </el-form-item>
             <el-form-item label="父级类别">
                 <el-cascader
                    :options="parentCategory"
                    :props="cascaderProp"
                     v-model="selectCategoryKeys"
                    @change="cascaderCategoryChange" 
                    clearable
                    >
                </el-cascader>   
            </el-form-item>
            <el-form-item label="商品数量">
               <el-input v-model="editCategoryForm.product_count"></el-input>
            </el-form-item>
            <el-form-item label="是否显示状态">
                <el-switch v-model="editCategoryForm.show_status"></el-switch>
            </el-form-item>
            <el-form-item label="分类描述" prop="description">
                <el-input type="textarea" v-model="editCategoryForm.description"></el-input>
            </el-form-item>
            <el-form-item label="类别logo" prop="icon">
               <el-input v-model="editCategoryForm.icon"></el-input>
            </el-form-item>
        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click=" editCategoriesVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCategoriesCommit">确 定</el-button>
      </span>
    </el-dialog>
  <!-- 分页区域 -->
   <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2,5,10,15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->

    </div>
</template>
<script>
export default {
    data(){
       var checkName=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入分类名称'))
        }
        callback()
      };
      var checkB_sort=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入排序等级'))
        }
        callback()
       };
      var checkUnit_name=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入单位'))
        }
        callback()
       };
      var checkDescription=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入描述'))
        }
        callback()
       };
      var checkIcon=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入图标'))
        }
        callback()
       };
        return{
            brandname:'',
            categoryData:[],
            columns:[
              {
                label:'分类名称',
                prop:'name'
              },
              // {
              //   label:'数量',
              //   prop:'product_count'
              // },
              {
                label:'描述',
                prop:'description'
              },
              {
                label:'级别',
                type:'template',
                template:'leavel'
              },
              {
                label:'状态',
                type:'template',
                template:'isShow'
              },
              {
                label:'操作',
                type:'template',
                template:'ways'
              },
              ],
              editCategoriesVisible:false,
              editCategoryForm:{
                name:'',
                b_sort: 0,
                unit_name: '',
                pid:0,
                leavel:0,
                product_count:0,
                show_status:false,
                description:'',
                icon:''
              },
              editCategoryRules:{
                name:[{required:true,message:'请输入分类名称',trigger:'blur'},{ validator:checkName,trigger:'blur'}],
                b_sort:[{required:true,message:'请输入排序等级',trigger:'blur'},{ validator:checkB_sort,trigger:'blur'}],
                unit_name:[{required:true,message:'请填写单位',trigger:'blur'},{ validator:checkUnit_name,trigger:'blur'}],
                description:[{required:true,message:'请填写描述',trigger:'blur'},{ validator:checkDescription,trigger:'blur'}],
                icon:[{required:true,message:'请填写logo',trigger:'blur'},{ validator:checkIcon,trigger:'blur'}]
             },
             sortsOption:[
               {
                  value: 0,
                  label: '一级排序'
               },
               {
                  value: 1,
                  label: '二级排序'
               },
               {
                  value: 2,
                  label: '三级排序'
               },
               {
                  value: 3,
                  label: '四级排序'
               }
             ],
             parentCategory:[],
             selectCategoryKeys:[],
             cascaderProp:{
               expandTrigger: 'hover',
               value:'cid',
               label:'name',
               children:'children',
               checkStrictly: true,
             },

        }
    },
    created(){
        this.getCategoriesList()
    },
    methods: {
      async getCategoriesList(){
          const {data:res}=await this.$axios.get(this.$root.api.categoriesList);
          if(res.rspCode=='200'){
            this.$message.success('分类获取'+res.rspMsg)
          }else{
            this.$message.error('分类获取'+res.rspMsg)
          }
          // console.log(res.data);
          this.categoryData=res.data;
      },
      async searchtCategories(){
        const {data:res}=await this.$axios.get(this.$root.api.categoriesQuery,
        {params:{brandname:this.brandname}});
        
         if(res.rspCode!=='200'){
           this.$message.error(res.data)
         }
         var arr=[];
         arr.push(res.data);
         this.categoryData=arr;
      },
     async addCategories(){
       this.$router.push("/addCategory");
     },
     async getParentCategoryData(){
          const {data:res}=await this.$axios.get(this.$root.api.categoriesList);
          if(res.rspCode!=='200'){
              this.$message.error('获取父级分类失败')
          }
          this.parentCategory=res.data;
        //   console.log(res.data);
      },
      cascaderCategoryChange(){
            console.log(this.selectCategoryKeys);
            const length=this.selectCategoryKeys.length
            if(length>0){
                this.editCategoryForm.pid=this.selectCategoryKeys[
                    length-1
                ];
                this.editCategoryForm.level=length;
                
            }else{
                this.editCategoryForm.pid=0;
                this.editCategoryForm.level=0
            }
            console.log(this.editCategoryForm)
        },
      async editCategories(brandname){
        const {data:res}=await this.$axios.get(this.$root.api.categoriesQuery,
        {params:{brandname:brandname}});
        
        if(res.rspCode!=='200'){
           this.$message.error(res.data)
         }
        //  console.log(res)
         this.editCategoryForm=res.data;

         this.getParentCategoryData();

         this.editCategoriesVisible=true;
      },
      editCategoriesClosed(){
        this.$refs.editCategoryRef.resetFields();
      },
      editCategoriesCommit(){
        this.$refs.editCategoryRef.validate(async valid=>{
            // console.log(valid) 
            if(!valid){
              return
            }else{
             const {data:res}=await this.$axios.put(this.$root.api.categoriesUpdate,
             this.editCategoryForm);
             if(res&&res.rspCode!=='200'){
               this.$message.error('商品分类'+res.data);
             }else{
               this.editCategoriesVisible = false;
               this.getCategoriesList(); 
               this.$message.success(res.data);
              }    
            }
         })
      },
      async deleteCategoriesId(id){
        console.log(id)
        const confirm=await this.$confirm(
          '确定删除该商品分类吗',
          '删除商品分类',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err=>err);
        if(confirm=='cancel'){
          this.$message.info('已取消删除');
          return 0
          console.log('test')
        }
        const {data:res} = await this.$axios.delete(this.$root.api.categoriesDelete,
           {params:{id:id}});
        if(res.rspCode=="200"){
            this.$message.success('商品分类'+ res.data);
            this.getCategoriesList(); 
          }else{
            this.$message.success('商品分类'+ res.data);
          }

      }
       
  }
}
</script>

<style lang="less" scoped>
   body{
     min-width: 1336px;
   }
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
   .categoryButton{
     min-width:200px;
   }
</style>