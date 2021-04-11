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
    <el-header style="height:120px;">
      <div class="header">
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
    </div>
    </el-header>
  <!-- Header栏目end -->
  <!-- 轮播图分类start -->
   <el-container style="padding:15px 0">
      <el-aside width="200px">
        <el-row class="tac">
           <el-col :span="12">
              <el-menu
                :default-active="activeCategory"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                  <span slot="title">类别一</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <span slot="title">类别二</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <span slot="title">类别三</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <span slot="title">类别四</span>
                </el-menu-item>
              </el-menu>
           </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-main>
   </el-container>
  <!-- 轮播图分类end -->
  <!-- 最新商品推荐start -->

  <!-- 最新商品推荐end -->

  <!-- 脚本部分start -->
   <el-footer> 
     <div class="footer-end">
       <span>END</span>
     </div>
     <div class="footer-promise-box">
       <ul class="list-service clearfix">
         <li><a href="javascript:;">七天无理由退货</a></li>
         <li><a href="javascript:;">15天免费换货</a></li>
         <li><a href="javascript:;">满69包邮</a></li>
         <li><a href="javascript:;">100%品质保证</a></li>
       </ul>
     </div>
     <div class="footer-help">
        <span>关于我们</span>|
        <span>联系我们</span>|
        <span>友情链接</span>
       <p class="coty">商城版权所有 &copy; 2012-2021</p>
     </div>
   </el-footer>
  <!-- 脚本部分start -->
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
      activeCategory:"1",
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

    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
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
  a{
    text-decoration: none;
  }
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
@height:150px;
  .header{
    max-width: 1225px;
    margin: 0 auto;
    margin-bottom:15px;
    overflow: hidden;
      .header_logo{
        height: 60px;
        width:26%;
        float:left;
        margin:0 2%;
        .el-image{
          
        }
      }
      .header_left{
        display: inline-block;
        margin-top:10px;
        width:70%;
      }
      &::after{
        content:"";
        height: 0;
        width:100%;
        clear: both;
      }
  }
  /*container部分*/ 
  .el-col{
    width:200px;
    text-align: center;
    ul{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .el-carousel__item{
    h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }
    &:nth-child(2n) {
      background-color: #99a9bf;
    }
    &:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
  .el-main{
    padding-top:0px;
  }
  /*footer部分*/
  .el-footer{
    padding:0px;
  }
  .footer-end{
    height: 50px;
    line-height: 50px;
    // background: #2f2f2f;
    text-align: center;
    span{
      position: absolute;
      font-size:18px;
      color:#ccccd0;
      &::before,&::after{
        content:'';
        position:absolute;
        top:50%;
        width:60px;
        border-top:0.5px solid #e6e6e6;
      }
      &::before{
        left:-80px;
      }
      &::after{
        right:-80px;
      }
    }
  }
  .footer-promise-box{
    background: #2f2f2f;
    border-bottom:1px solid #3d3d3d;
    padding:10px 0;
    min-width:1225px;
    .list-service{
      list-style-type: none;
      line-height: 40px;
      li{
        float:left;
        height:40px;
        width:25%;
        text-align: center;
      }
      li a{
        color: #fff;
        font-size: 20px;
      }
    }
    .clearfix::before{
      content: " ";
      display: table;
      clear:both;
    }
    .clearfix::after{
      content: " ";
      display: table;
      clear:both;
    }
  }
  .footer-help{
    background:#2f2f2f ;
    padding-top:10px;
    color: #888888;
    text-align: center;
    span{
      padding:0 20px;
    }
    p{
      padding-top:10px;
    }
  }
  

}
</style>
