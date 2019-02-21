# 读取版本号
source .version

# docker login
docker login -u web -p Web123456 harbor.listenrobot.com

#  开始构建静态文件
#npm run build

# 上传文件至 oss，需要下载ossUtil 客户端，并做响应的配置
#./ossutilmac64 --config-file .ossutilconfig cp -fr dist/ oss://listen-dev-zhujiali/crm/$VERSION

# 构建房产版镜像
docker build --build-arg PLATFORM=TYPE_REAL_ESTATE -t web:crm_web_fangchan harbor.listenrobot.com/web/crm_web:fangchan_$VERSION .

#docker push harbor.listenrobot.com/web/crm_web:fangchan_$VERSION


# 构建通用版镜像
#docker build --build-arg PLATFORM=TYPE_COMMON -t web:crm_web_common harbor.listenrobot.com/web/crm_web:common_$VERSION .

#docker push harbor.listenrobot.com/web/crm_web:common_$VERSION
