# 邀请函小程序端
本项目基于
> [marriage-miniapp-server](https://github.com/Jiezhi/marriage-miniapp-server)和前端项目为[OnceLove](https://github.com/Jiezhi/marriage-miniapp)。

修改后的后端项目为[invitation-miniapp-server](https://github.com/hrmzone/invitation-miniapp-server)和前端项目为[invitation-miniapp](https://github.com/hrmzone/invitation-miniapp)。

> 感谢原作者[Jiezhi](https://github.com/Jiezhi/)的指导。

> 小程序云开发对于比较简单的小程序非常友好，无需自己架设后台，只需在使用小程序的云函数、存储及数据库，可以完成所有功能。所以将之前的小程序修改了下，使用小程序官方云开发功能，去掉麻烦的后台部署。

> 开源项目中有非常多很好的工具，但是由于开源项目无法开箱即用，而且缺少相应的配置说明，导致开源项目无法推广。可能是我能力问题，走了一点弯路，总算配置成功，并且和前端小程序配套可以使用，下面将这个小玩意的配置方法贴出来，供需要的用户借鉴。

> 我是一个职业培训机构[荆州青年教育](https://jzyouth.com)的老师，有学历提升(成教、网教、自考等)、职业资格方面的需求，可联系我(QQ:78049500)    ---插个小广告

# 更新记录2020-12-22
## 上传云数据库表结构（databases目录下）
1. 数据库一共7个表，其中main_info，是小程序的基本信息表，如联系方式、地址等。
2. 其中comment（留言）、attendance（出席报名）表在dev分支中不用了，如果使用master分支，则需要两个表。
3. wx_user表在dev分支中取代以上两个表，为报名（bm页面）存储数据。
4. location表为地址的经纬度数据，可通过腾讯地图查询目的地经纬度。
5. bless表为点赞表。

## 图片文件引用
1. 图片文件，请上传至小程序的云存储中，复制地址后，放在photo表即可；
2. 图片也可以放外链，设置好图片外链权限即可。
---
原来项目中的地图页面换成了[腾讯地图插件](https://mp.weixin.qq.com/wxopen/pluginbasicprofile?action=intro&appid=wx5bc2ac602a747594&token=&lang=zh_CN)，所以相应的，你要去你的小程序配置页面添加这个插件。
---

## 有哪些功能？

* 相册展示
* 邀请函展示
* 地图导航
* 好友祝福
* 留言评论
* 宾客报名

# 页面说明
1. bless:祝福页面
2. chat:留言页面
3. index:主页
4. map:地图导航页面
5. navigation:地图页面
5. photos:相册页面
5. poster:画报页面

# 配置
> 小程序账号申请完毕之后，下载《微信开发者工具》，下载本项目源代码，使用《微信开发者工具》的云开发功能，导入本项目。
1. 《微信开发者工具》导入本项目；
2. 在《微信开发者工具》中开通云开发功能，创建云环境，将ID填入app.js文件的env处；
2. 导入数据库，在云开发后台的数据库中建立相应的同名数据库（collection），将db下的几张表，导入同名数据库中
1. 修改数据库内容：数据库仅需修改main_info这个表，将其中的内容改成自己的，如项目名称、电话、地址、导航经纬度等；
  
# 页面对应数据库表
1. 主页：对应main_info 表，main_info是最重要的表，存有小程序用到的电环、名称、导航地址等；
1. bless页面:对应bless表，即发送点赞的表；
3. chat页面:对应comment表，留言评论数据表；chat页面还对应一个表：attendence，用于存储报名人员信息。
2. map页面：使用main_info表中的经纬度进行导航。
4. navigation：不需要单独的数据表，在app.js中配置即可，这个页面只显示地图，无法导航。小程序未使用这个页面。
5. photos页面:对应photo表，存放相册的图片url；

# 其他配置说明
1.小程序中有几处硬编码，大家预览过程冲发现了请自己修改。

> 由于手残，不小心强制提交了一次，将原作者commit删掉了，抱歉。


