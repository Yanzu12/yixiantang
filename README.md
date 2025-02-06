<br />
<div align="center">
    <img src="https://qcloudimg.tencent-cloud.cn/raw/f97dc74fbf9af5d7b2b3d8bc0a4e91d4.png" alt="Logo" width="400">

  <h1 align="center">云开发电商模板</h1>

  <p align="center">
  一键创建零售商城
    <br />
  </p>
</div>

# 新版说明（针对未安装云电商模板用户）

零售电商前后台通用模版包含：前端电商小程序，和电商管理后台，可以快速实现商品录入，上下架，订单发货等功能；

小程序端是基于云开发电商小程序二次开发，并通过微搭实现后台管理；
## 视频教程
[B站教程](https://space.bilibili.com/251281869)

<img src="img/WechatIMG3.jpg" alt="图片描述" width="300" height="auto">

## 线上案例
感谢@天空支持
![输入图片说明](img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241127174944.jpg)

[![pAWBeqe.jpg](https://s21.ax1x.com/2024/11/20/pAWBeqe.jpg)](https://imgse.com/i/pAWBeqe)

# 功能特性

1. 功能完整：完善了之前小程序没有用户体系，没有发货功能，

2. 快速搭建：通过小程序端的配合，结合本项目，可以在1小时之内搭建一个小型2C电商系统，降低开发周期

3. 开箱即用：项目集成了最基本的电商商品管理，发货等功能；可以做到开箱即用；

4. 扩展性好：用户可以基于基本功能，跟进业务通过云开发低代码工具进行二次开发；

5. 微信生态丰富：集成丰富的微信工具接口，便捷对接微信生态；



# 功能列表

## 小程序端

[![pAWBAxK.png](https://s21.ax1x.com/2024/11/20/pAWBAxK.png)](https://imgse.com/i/pAWBAxK)

## 后台

[![pAWBZrD.png](https://s21.ax1x.com/2024/11/20/pAWBZrD.png)](https://imgse.com/i/pAWBZrD)


# 快速上手

## 后台安装

### 1.模版安装

进入模版中心，选择对应模版；如果可视化开发出现应用，说明安装成功；

[![pAWBnVH.png](https://s21.ax1x.com/2024/11/20/pAWBnVH.png)](https://imgse.com/i/pAWBnVH)
### 2.配置管理员

进入云后台管理-头像，可以修改登录密码；

[![pAWd4Rf.png](https://s21.ax1x.com/2024/11/20/pAWd4Rf.png)](https://imgse.com/i/pAWd4Rf)
[![pAWdhJP.png](https://s21.ax1x.com/2024/11/20/pAWdhJP.png)](https://imgse.com/i/pAWdhJP)

[![pAWBuad.png](https://s21.ax1x.com/2024/11/20/pAWBuad.png)](https://imgse.com/i/pAWBuad)

### 3.后台发布

进入应用编辑，选择右上角的应用。发布成功后 即可通过账号密码登录后台管理订单商品；

[![pAWBQPI.png](https://s21.ax1x.com/2024/11/20/pAWBQPI.png)](https://imgse.com/i/pAWBQPI)

[![pAWd5z8.png](https://s21.ax1x.com/2024/11/20/pAWd5z8.png)](https://imgse.com/i/pAWd5z8)


## 小程序安装

### 1.下载小程序代码

打开网站https://gitee.com/rioshyb/tcb-shop-enhance，有开发能力的可以选择git（推荐），不擅长git可以直接下载压缩包并且解压；

[![pAWBlGt.png](https://s21.ax1x.com/2024/11/20/pAWBlGt.png)](https://imgse.com/i/pAWBlGt)

### 2.导入项目

打开微信开发工具，选择刚才解压目录里面的tcb-shop-enhance-master文件夹（例如：D:\tcb-shop-enhance-master\tcb-shop-enhance-master），注意目录里面一定是有app.js的文件，填入小程序ID，选择云开发-云开发电商模版，注意小程序必须认证过，否则无法创建环境；

[![pAWdRII.png](https://s21.ax1x.com/2024/11/20/pAWdRII.png)](https://imgse.com/i/pAWdRII)


[![pAWB1RP.png](https://s21.ax1x.com/2024/11/20/pAWB1RP.png)](https://imgse.com/i/pAWB1RP)

如果第一次使用会引导创建云开发环境，按照一步步操作即可；

> 注意：创建云开发环境的同时，会生成一个腾讯云账号，这个账号只能通过小程序登录。和之前通过手机或者微信注册的账号是不同的；

### 3.配置环境参数

#### 3.1 配置环境

在 `app.js` 中，填入云开发环境 id，保存文件

![](https://gitee.com/rioshyb/tcb-shop-enhance/raw/master/img/SPbab5NxHoviTdxYOfIcyhjgnDh.png)

#### 3.2 构建项目

选择npm-构建项目

![](https://gitee.com/rioshyb/tcb-shop-enhance/raw/master/img/image-7.png)

构建完成选择编译，如果正常小程序可以预览；

![](https://gitee.com/rioshyb/tcb-shop-enhance/raw/master/img/image-8.png)



#### 3.3 配置支付

前往小程序微信支付模版（https://tcb.cloud.tencent.com/dev，小程序登录），填入该模版所需参数。**若未填入，将无法使用支付功能，其他功能可正常体验**

[![pAWd2dA.png](https://s21.ax1x.com/2024/11/20/pAWd2dA.png)](https://imgse.com/i/pAWd2dA)

![](https://s3.bmp.ovh/imgs/2024/11/20/d9222c79d12fdfc2.png)




### 4.云函数安装

云函数需要手动安装，项目所需的云函数都在func文件夹里面，必须安装的云函数有3个：get_wxuser_id，update_user，shop_pay；

![](https://s3.bmp.ovh/imgs/2024/11/20/a1d45c92b4084616.png)

安装方法：

#### 4.1命令行安装（推荐）

1.安装node，cli工具，具体参见：https://docs.cloudbase.net/cli-v1/install。

2.命令行到func目录下，tcb登录后，执行如下代码：

```plain&#x20;text
tcb fn deploy 函数名称 -e 环境id
```

如果不是新建，运行的时候提示是否覆盖，选择y，如果出现以下报错直接忽略，这时已经发布成功；

![](https://s3.bmp.ovh/imgs/2024/11/20/46ec6a29d0e80a95.png)


#### 4.2打包压缩上传安装

* 将对应函数名字的文件夹zip压缩；

![](https://s3.bmp.ovh/imgs/2024/11/20/73c608f979b9b38d.png)

* 上传到云函数这里

![](https://s3.bmp.ovh/imgs/2024/11/20/5e73b2211ade1e50.png)

> 注意：打包上传的方法，经常失败，还是推荐cli；





### 5.小程序客服

项目集成了小程序客服功能，需要管理者在后台添加客服微信才能使用；



### 6.小程序发布

小程序发布时需要删除这两个文件夹，否则会导致体积太大；

![](https://s3.bmp.ovh/imgs/2024/11/20/0fc86f0fa28911f5.png)




## 后台使用

### 创建属性名和属性值；

这两个概念参考图片示意，是必须创建的和配置的，否则商品出不来；

通过后台属性名管理和属性值管理可以方便的创建维护；一个属性名对应多个属性值；注意不要轻易删除，否则导致商品无法显示；

[![pAWdgZd.jpg](https://s21.ax1x.com/2024/11/20/pAWdgZd.jpg)](https://imgse.com/i/pAWdgZd)

[![pAWd6qH.png](https://s21.ax1x.com/2024/11/20/pAWd6qH.png)](https://imgse.com/i/pAWd6qH)


### 2.设置商品分类

不设置商品分类无法在分类页显示；一二级分类关系如图；可以通过商品分类页面设置；

[![pAWdfit.png](https://s21.ax1x.com/2024/11/20/pAWdfit.png)](https://imgse.com/i/pAWdfit)
![](https://s3.bmp.ovh/imgs/2024/11/20/657848240876bfb8.png)


### 3.商品管理

通过商品管理可以创建商品，以及上下架等操作；

![](https://s3.bmp.ovh/imgs/2024/11/20/a4057f0ba19df538.png)

#### 商品编辑新建

新建商品的时候，注意整体传图片不要太大，特别是富文本；

优先级数字你越大，首页显示位置越靠前；

![](https://s3.bmp.ovh/imgs/2024/11/20/531d2aa10365e2c2.png)

> 注意商品没有删除操作，是因为避免历史订单出错，不想显示下架即可

#### sku编辑新建

按图中点击可以添加商品SKU

![](https://i.ibb.co/Yt4B6gH/image-21.png)

![](https://i.ibb.co/Fz1kWp3/image-22.png)



sku图片会自动带入商品图片，如需调整自行修改；属性值可以选多个，但是同一类别只能选一个，比如一个sku不能同时选薄和厚，可以选薄和1个；

![](https://i.ibb.co/gjCT63y/image-24.png)

### 4.订单管理

对于待发货或待收货订单可以选择快递公司和单号；

> 注意：
>
> 1.本系统不能自动下单，需要将收货方人，电话，地址复制到第三方系统如菜鸟，生成运单号，再回填点发货；
>
> 2.退货退款等操作可以通过线下完成，如需系统实现请联系作者；
>
> 3.如需要实现微信结算对接，有需求请单独联系作者；

![](https://i.ibb.co/gwyFNjV/image-25.png)



# 其他

## 1.其他功能

本项目包含最基本的电商功能，其他功能如售后退款退货，运费模版，对接微信收货结算，后台角色权限等功能，会考虑逐步迭代，如有需求可联系，提供有偿定制开发服务；








## 旧版说明（针对已安装云电商）

本项目对腾讯云的开发电商模板的小程序做了修改，除了提供首页、购物车、订单、个人中心、商品详情等页面外，还完善了地址选择，支持省市区，以及用户注册登录（通过openid）以及用户信息修改。

本项目的后端可前往<https://tcb.cloud.tencent.com/cloud-admin#/cloud-template/detail?tplId=tpl-1sm7qkwQcbBUpZ&appName=electronic-business>安装。

## 数据模型

### 1.增加user表：
**⚠️要选择mysql类型，不然无法关联**
![输入图片说明](img/1.png)
```
"gender": {
                "x-keyPath": "",
                "x-id": "394beb6f",
                "format": "",
                "numberCount": 0,
                "description": "",
                "isEnum": false,
                "type": "number",
                "x-index": 51,
                "title": "性别",
                "x-unique": false,
                "x-required": false,
                "default": 1,
                "name": "gender",
                "maximum": 2,
                "minimum": 1
            },
            "avatarUrl": {
                "x-required": true,
                "default": "https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg",
                "x-keyPath": "",
                "x-id": "d54e2c31",
                "format": "url",
                "description": "",
                "type": "string",
                "x-index": 49,
                "title": "头像地址",
                "x-unique": false,
                "maxLength": 500
            },
            "openId": {
                "x-required": true,
                "x-keyPath": "",
                "minLength": 1,
                "x-id": "e816b82a",
                "format": "",
                "description": "微信openId",
                "type": "string",
                "x-index": 2,
                "title": "openId",
                "x-unique": true,
                "maxLength": 256
            },
            "nickName": {
                "x-required": true,
                "x-keyPath": "",
                "minLength": 1,
                "x-id": "d1ffb6eb",
                "format": "",
                "description": "",
                "type": "string",
                "x-index": 47,
                "title": "昵称",
                "x-unique": false,
                "maxLength": 4000
            },
          
```
### 2.shop_order和shop_cart_item表增加purchaser关联用户；   
![输入图片说明](img/2.png)
![输入图片说明](img/4.png)
### 3.shop_delivery_info表增加location记录省市区，同时增加user关联用户；  
![输入图片说明](img/3.png)

### 4.shop_order_item表增加pay_price记录支付的价格，增加desc记录商品描述；
![输入图片说明](img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241109101701.png)

### 5.shop_comment表增加purchaser关联用户；   
![输入图片说明](img/WX20241104-162435@2x.png)   

### 6.shop_order表增加快递单号和快递公司信息录入；   
![输入图片说明](img/8da8dc43_9701049.png)

## 云函数
云函数需要新建两个新的函数**get_wxuser_id，update_user**，在func文件里面，需要上传一下。 
  
**shop_pay**也需要更新一下，不然支付会有bug；  
 
我是通过cli，教程在这里：https://docs.cloudbase.net/cli-v1/intro



## 安装依赖

1. 安装 npm 依赖

```shell
npm install
```

 如果安装失败，请检查是否有足够权限执行命令，或尝试用更高权限安装依赖：

 ```shell
 sudo npm install
 ```

2. 构建 npm
点击微信开发者工具菜单栏中的「工具」->「构建 npm」

## 打包小程序
打包的时候需要删除两个文件夹（/func和/img），否则会对导致项目体积太大；


## 运行小程序

在微信开发者工具中导入本项目即可运行，若想配合后端运行完整应用，请前往<https://tcb.cloud.tencent.com/cloud-admin#/cloud-template/detail?tplId=tpl-1sm7qkwQcbBUpZ&appName=electronic-business>安装。
调通是在这样
![输入图片说明](img/13757857-35af-4331-a20d-64bbd39a6b62.gif)



**本人从事互联网产品设计开发工作超过12年，曾在东方财富，百安居，齐家等公司担任产品技术等职务；**

**涉及的领域包括：**

* 小程序/app开发设计；

* 业务后台开发设计（工单系统，电商系统，crm系统，cms系统等）；

* 大数据产品设计开发（数据治理，数仓搭建等）；

* AI产品开发设计（agent/chat bot）；

* 产品设计咨询等；

**目前通过云开发实施了将近数十个项目。欢迎大家前来咨询。**
![输入图片说明](img/WPS%E5%9B%BE%E7%89%87%E6%8B%BC%E5%9B%BE.jpg)