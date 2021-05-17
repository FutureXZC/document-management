# 文档管理系统

![前端 Vue](https://img.shields.io/badge/前端-Vue-green)
![前端 Vue](https://img.shields.io/badge/前端-ElementUI-blue)
![后端 Vue](https://img.shields.io/badge/后端-Express-9cf)
![数据库 SQLite3](https://img.shields.io/badge/数据库-SQLite3-9cd)

## 开发与部署指导

若要对本系统继续开发，请遵照如下方式对系统进行调试：

```
// 前端热启动：
cd frontend
npm install
npm run dev

// 后端热启动：
cd backend
npm install
npm run dev
```

若系统开发完成，请遵照如下方式打包并发布：

```
// 前端运行如下命令打包，将生成的dist文件夹
cd frontend
npm run build


// 将dist下的内容复制到backend/public下，然后在后端启动服务：
cd backend
npm run start
```

更多详情，请参考官方文档:

- [Vue.js](https://cn.vuejs.org/)
- [ElementUI](https://element.eleme.cn/#/zh-CN)
- [Express](https://www.expressjs.com.cn/)
- [SQLite3](https://www.sqlite.org/index.html)

## 提交格式

- \[+\]: 添加新功能
- \[!\]: 修复 bug
- \[\*\]: 常规调整与更改
