# nmock-server
一个Mock服务器

## 安装

```
npm i nmock-server --save
```

## 如何使用
  1. 在项目根目录建一个 `mock` 文件夹
  2. 在 `mock` 文件夹里新建 `*.json/*.js` 文件
  3. 路由说明：请求的url是根据 `mock` 文件夹下的层次结构来生成的（就是 json 文件相对于 `mock` 文件夹的路径，并去掉 `.js/.json` 扩展名），如下示项目结构示例将会生成以下路由：
  ```
    /a
    /b/c
    /b/d
    
    // 如果设置的基本路径， 将会在路由最前面加上基本路径，如 `mock-dev-server -b /api`，将会生成以下路由：
    
    /api/a
    /api/b/c
    /api/b/d
  ```

  4. 配置 Mock 数据的 json 文件说明：API与 [Mockjs官网api](http://mockjs.com)一致，使用 `Mock.mock()` 方法返回随机数据
  5. 运行命令 `nmock-server` ，即可在 http://localhost:3000/ 请求到api，支持所有的请求类型，如果要动态改变 `mock` 数据

  
