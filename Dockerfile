# 这里我用的镜像是 node 的稳定版
FROM node:carbon

# 拷贝项目文件进行构建
RUN mkdir -p /app/node
WORKDIR /app/node
COPY ./package.json ./
RUN npm install --production

# 拷贝项目文件
COPY ./* ./

# 启动服务
CMD ["npm","run","dev"]

# 暴露 7001 端口到宿主机
EXPOSE 3000