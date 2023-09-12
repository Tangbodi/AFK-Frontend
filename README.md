# AFK-Frontend
### Environment Variables
> Node >= 14.20.0 
## 项目结构
```
├── README.md
├── dist //打包输出目录
├── src
│   ├── assets       //公共静态资源
│   ├── components   //公共组件
│   ├── config       //静态变量/常量等
│   ├── store        //redux
│   ├── utils        //公共方法
│   ├── router       //路由
│   ├── types        //ts接口声明
│   ├── request      //网络请求
│   └── views        //页面文件夹
├── .eslintrc.cjs      //eslint 配置
├── .gitignore         //git 提交忽略文件
├── index.html         //index.html模板
├── tsconfig.json       //tsconfig
├── vite.config.ts     //vite 配置
├── package.json
```
### Development
Clone this repository and navigate inside the project folder and install the dependencies by running:
```
npm install
```
After installing the dependencies, build the project by executing:
```
npm run dev
```
### CI/CD Production
```
npm run build
```