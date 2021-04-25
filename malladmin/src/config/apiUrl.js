let ipUrl = 'http://127.0.0.1:8031/api/' 

let servicePath={
    brandList:ipUrl+'brand/list',//品牌列表接口
    brandListQuery:ipUrl+'brand/findbrandname',//查询品牌接口
    brandAdd:ipUrl+'brand/brandop',//品牌添加
    brandDelete:ipUrl+'brand/branddel',//品牌删除
    brandUpdate:ipUrl+'brand/brandop',//品牌修改

    categoriesList:ipUrl+'categories/list',//商品分类列表
    categoriesQuery:ipUrl+'categories/findcatename',//商品分类查询
    categoriesAdd:ipUrl+'categories/cateop',//分类添加
    categoriesUpdate:ipUrl+'categories/brandop',//分类修改
    categoriesDelete:ipUrl+'categories/catedel'//分类删除
    
    

}

export default servicePath;