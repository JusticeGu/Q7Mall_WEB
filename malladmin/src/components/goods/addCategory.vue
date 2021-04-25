<template>
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/category'}">商品分类</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品分类</el-breadcrumb-item>
     </el-breadcrumb>
     <!-- 分类卡片 -->
     <el-card class="box-card">
        <el-alert title="添加商品分类信息" type="info" show-icon center :closable="false" ></el-alert>
     <!-- 添加的分类表单 -->
        <el-form ref="addCategoryRef" :model="addCategoryForm"  :rules="addCategoryRules" label-width="200px">
            <el-form-item label="商品分类名称" prop="name">
                <el-input v-model="addCategoryForm.name"></el-input>
            </el-form-item>
            <el-form-item label="排序优先级" prop="b_sort">
                <el-select v-model="addCategoryForm.b_sort" placeholder="请选择排序优先级"  @change="selectSorts" >
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
               <el-input v-model="addCategoryForm.unit_name"></el-input>
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
                <!-- <el-select v-model="addCategoryForm.pid" placeholder="请选择排序优先级">
                <el-option label="最优先" value= 0 ></el-option>
                <el-option label="优先" value= 2 ></el-option>
                <el-option label="一般" value= 3 ></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="商品数量">
               <el-input v-model="addCategoryForm.product_count"></el-input>
            </el-form-item>
            <el-form-item label="是否显示状态">
                <el-switch v-model="addCategoryForm.show_status"></el-switch>
            </el-form-item>
            <el-form-item label="分类描述" prop="description">
                <el-input type="textarea" v-model="addCategoryForm.description"></el-input>
            </el-form-item>
            <el-form-item label="类别logo" prop="icon">
               <el-input v-model="addCategoryForm.icon"></el-input>
            </el-form-item>

            <el-form-item >
                <el-button type="primary" @click="addCategorySubmit">提交</el-button>
                <el-button @click="addCategoryCancel">重置表单</el-button>
            </el-form-item>
        </el-form>
     </el-card>
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
           addCategoryForm:{
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
           leavelNum:3,
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
           addCategoryRules:{
              name:[{required:true,message:'请输入分类名称',trigger:'blur'},{ validator:checkName,trigger:'blur'}],
              b_sort:[{required:true,message:'请输入排序等级',trigger:'blur'},{ validator:checkB_sort,trigger:'blur'}],
              unit_name:[{required:true,message:'请填写单位',trigger:'blur'},{ validator:checkUnit_name,trigger:'blur'}],
              description:[{required:true,message:'请填写描述',trigger:'blur'},{ validator:checkDescription,trigger:'blur'}],
              icon:[{required:true,message:'请填写logo',trigger:'blur'},{ validator:checkIcon,trigger:'blur'}]
           },
           parentCategory:[],
           cascaderProp:{
               expandTrigger: 'hover',
               value:'cid',
               label:'name',
               children:'children',
               checkStrictly: true,
           },
           selectCategoryKeys:[]
           
        }
    },
    created(){
        this.getParentCategoryData();
    },
    methods:{
        async getParentCategoryData(){
          const {data:res}=await this.$axios.get(this.$root.api.categoriesList);
          if(res.rspCode!=='200'){
              this.$message.error('获取父级分类失败')
          }
          this.parentCategory=res.data;
        //   console.log(res.data);
        },
        selectSorts(){
            console.log(this.addCategoryForm.b_sort)
        },
        cascaderCategoryChange(){
            console.log(this.selectCategoryKeys);
            const length=this.selectCategoryKeys.length
            if(length>0){
                this.addCategoryForm.pid=this.selectCategoryKeys[
                    length-1
                ];
                this.addCategoryForm.level=length;
                
            }else{
                this.addCategoryForm.pid=0;
                this.addCategoryForm.level=0
            }
            console.log(this.addCategoryForm)
        },
        async addCategorySubmit(){
            this.$refs.addCategoryRef.validate(async valid=>{
            //    console.log(valid) 
               if(!valid) {
                     return 
               }else{
                    // console.log('拦截')
                    const {data:res} = await this.$axios.post(this.$root.api.categoriesAdd,
                    this.addCategoryForm);
                    if( res && res.rspCode=='200'){
                        this.$message.success('商品分类'+res.data)
                    }else{
                        this.$message.error(res.data);
                    } 
                  console.log(res.data);
                  this.$router.push("/category");
               }

            })
            // console.log('拦截')
            // const {data:res} = await this.$axios.post(this.$root.api.categoriesAdd,
            // this.addCategoryForm);
            // if( res && res.rspCode=='200'){
            //     this.$message.success('商品分类'+res.data)
            // }else{
            //     this.$message.error(res.data);
            // }
        },
        addCategoryCancel(){
            this.$refs.addCategoryRef.resetFields()
        }
    }
}
</script>
<style lang="less" scoped>
   .el-card{
       margin-top:30px;
   }
   .el-alert{
       margin-bottom:15px;
   }
</style>