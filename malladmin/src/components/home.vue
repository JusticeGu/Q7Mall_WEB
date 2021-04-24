<template>
    <el-container>
      <el-header>
       <div class="header">
          <div class="header_logo">
            <router-link to="/">
              <el-image :src="url"></el-image>         
            </router-link>
          </div>
          <div class="header-title"><span>商城后台管理系统</span></div> 
        </div>
      </el-header>
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside :width="isCollapse ? '64px':'200px'">
          <div class="toggle-button" @click="togleCollapse">|||</div>        
          <el-menu :default-active="activePath" unique-opened router :collapse-transition="false" :collapse="isCollapse" background-color="#333744" text-color="#fff" active-text-color="#409FFF">
            <!-- 一级菜单的模板区域 -->
            <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
             <template slot="title">
               <i :class="iconObj[item.id]"></i>
               <span>{{ item.authName }}</span>
             </template>
            <!-- 二级菜单 -->
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
              </el-menu-item>
           </el-submenu> 
          </el-menu>
        </el-aside>
        <!-- 内容主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
   
   </el-container>
</template>

<script>
export default {
  data() {
      return {
        url: "",
        isCollapse:false,
        activePath: '',
        iconObj:{
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao'
        },
        menulist:[
          {id:101,
           authName:"商品管理",
           path:"url",
           children:[
               {
                 id: 114,
                 authName: "商品列表",
                 path: "category",
                },
                {
                 id: 115,
                 authName: "品牌列表",
                 path: "brand",
                }
           ]},
          {
           id:102,
           authName:"人员管理",
           path:null,
           children: [  
             {
                 id: 121,
                 authName: "人员列表",
                 path: "persons",
                }]
          }],
      }
    },
  created(){
    this.activePath=window.sessionStorage.getItem('activePath')
  },
  methods: {
    togleCollapse() {
      this.isCollapse=!this.isCollapse;
    },
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.activePath=activePath;
    }
    
  },
  
}
</script>
<style lang="less" scoped>
  body{
    margin:0; 
    padding:0
  }
  .el-container{
    height:100vh;
    .el-header{
      padding:0;
    }
  .header{
     margin: 0 auto;
     margin-bottom:15px;
     overflow: hidden;
     background: #666;
     .header_logo{
        height: 60px;
        width:60px;
        float:left;
      }
     .header-title{
       float:left;
       height:60px;
       padding-left:20px;
       span{
         line-height:60px;
         color:white;
         font-size:20px;
       }
       
     }
  }
  .el-aside {
   background-color: #333744;
   .el-menu {
     border: none;
    }
  }
 .el-main {
   background-color: #eaedf1;
  }
 .iconfront{
    margin-right: 10px;
 }
 .toggle-button{
   background-color: #4A5064;
   font-size: 10px;
   line-height: 24px;
   color: #fff;
   text-align: center;
   letter-spacing: 0.2em;
   // 鼠标放上去变成小手
   cursor: pointer;
 }
  }
  
</style>

