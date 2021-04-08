<template>
  <div id="app" name="app">
    <el-container>
      <!-- 顶部导航栏start-->
      <div class="topNav">
        <div class="nav">
          <ul>
            <li v-if="true">
              <el-button type="text" @click="login">登录</el-button>
              <span class="sep">|</span>
              <el-button type="text" @click="register=true">注册</el-button>
            </li>
            <li v-else>
              欢迎
              <el-popover placement="top" width="160" v-model="visible">
                <p class="exit_login_content">确定退出登录吗</p>
                <div class="exit_login_button">
                  <el-button type="text" size="mini" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="logout">确定</el-button>
                </div>
                <el-button type="text" slot="reference">登陆者*</el-button>
              </el-popover>
            </li>
            <li>
              <router-link to="/order">我的订单</router-link>
            </li>
            <li>
              <router-link to="/collect">我的收藏</router-link>
            </li>
            <li class="shopCart">
             <router-link to="/shoppingCart">我的购物车</router-link>
             <i class="el-icon-shopping-cart-2"></i>
            </li>
          </ul>
        </div>
      </div>
   <!-- 顶部导航栏END -->

   <!-- Header栏目start -->
    <el-header>
      <div class="header_logo">
        <router-link to="/">
            <el-image :src="src"></el-image>         
        </router-link>
      </div>
      <div class="header_left">
          <div class="header_search">
            <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
          </div>
          <div class="header_menu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">1</el-menu-item>
              <el-menu-item index="2">2</el-menu-item>
              <el-menu-item index="3">3</el-menu-item>
              <el-menu-item index="4">4</el-menu-item>
              <el-menu-item index="5">5</el-menu-item>
            </el-menu>
          </div>
      </div>
     
    </el-header>
  <!-- Header栏目end -->

    <el-aside>

    </el-aside>
      <el-main> zhuti </el-main>
      <el-footer> jiaobu </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      activeIndex:1,
      register:false,
      src:"",
    };
  },
  methods:{
    handleSelect(){

    },
    login(){

    },
    logout(){

    },
    searchClick(){

    }    
  }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
@link-color:#b0b0b0;
#app {
  /*导航栏部分*/
  .topNav {
    width: 100%;
    height: 50px;
    background: #3d3d3d;
    margin-bottom: 20px;
    .nav {
      width: 100%;
      margin: 0 auto;
      .sep{
        color:#b0b0b0;
        font-size: 12px;
        margin:0 5px;
      }
      ul {
        float: right;
        li {
        float: left;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        margin-left: 20px;
        text-align: center;
        color: #b0b0b0;
        border: red 1px;
        .exit_login_content{
          text-align: center; 
          color:@link-color;
        }
        .exit_login_button{
          text-align: right; 
          margin: 10px 0 0
        }
        .el-button{
          color:@link-color;
        }
        .el-button:hover{
          color: #fff;
        }
        a{
          color:@link-color;
          text-decoration: none;
        }
        a:hover{
          color: #fff;
        }
        }
        .shopCart{
          width:120px;
          margin-right:10px;
          background:#424242;
        }
        .shopCart:hover{
          background:white;
        }
       .shopCart:hover a{
          color: #ff6700;
        }
      }
    }
  }
  /*Header部分*/
  .header_logo{

  }
  .header_left{

    .header_search{

      .input-with-select{
        width:130px;
        background-color: #fff;
      }
    }
  }

}
</style>
