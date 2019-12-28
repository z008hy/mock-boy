## A Mock Server

## 快速使用

### 安装 与 查看帮助
```
npm i mock-boy -g

mock-boy -h
```
### 配置启动端口(不配置默认为8888)
```
mock-boy config set port 8888
```

### 配置基 API 配置目录 使用绝对地址
```
mock-boy config set api_path /Users/tom/project
```
配置后会在 API 目录下生成两个目录：

/Users/tom/project/apis
在这里配置 api 配置

/Users/tom/project/logs
在这里查看请求日志

## api 配置

以下为一个 返回值的 mock格式

/Users/tom/project/apis/json_example.js
```
module.exports = {
  url: '/json_example',
  method: 'post',
  data: {
    data: [
      {
        neType: '@name',
        version: '@id@id',
        hardwareVersion: '@id',
        softwareVersion: '@id',
        neMac: '@id',
        barCode: '@id',
      },
    ],
    error: { errorcode: '6', errorinfo: 'error info' },
    errors: [{ errorcode: '1' }, { errorinfo: 'errors info' }],
  }
};
```
data 中的数据可以使用 [mockjs](http://mockjs.com/) 的写法 

