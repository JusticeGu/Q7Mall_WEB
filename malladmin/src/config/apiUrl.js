let ipUrl = 'http://127.0.0.1:8031/api/' 

let servicePath={
    goodsList:ipUrl + 'item/list',  // 商品列表接口
    brandList:ipUrl+'brand/list',//品牌列表接口
    brandListQuery:ipUrl+'brand/findbrandname',//查询品牌接口
    brandAdd:ipUrl+'brand/brandop'//品牌添加
}

export default servicePath;