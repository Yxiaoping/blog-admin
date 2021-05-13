// 引入express
const express = require('express')
// 定义express的实例
const app = express()

// 设置允许跨域，就可允许任意域名的访问，哪怕端口不一样
app.use(require('cors')())
// 识别传递过来的json数据
app.use(express.json())


// 定义数据模型
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog-admin', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})
const Article = mongoose.model('Article', new mongoose.Schema({
    title: {type: String},
    body: {type: String}
}))


// 写一个默认首页
// app.get 一般用于展示数据，列表页就用get请求方法
app.get('/', async (req,res) => {
    res.send('index')
})

// app.post 来定义一个录入数据的接口，因为要提交数据，所以要新增一个接口
// 新增一个接口
app.post('/api/articles', async (req,res) => {
    // req.body 是一个对象，包含title和body
    const article = await Article.create(req.body)
    // 将article发送回前端
    res.send(article)
})

// 显示文章列表的接口
app.get('/api/articles', async (req,res) => {
    // 查询数据
    const articles = await Article.find()
    res.send(articles)
})

// 删除文章的接口
app.delete('/api/articles/:id', async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})

// 获取文章详情的接口
app.get('/api/articles/:id', async (req,res) => {
    const article = await Article.findById(req.params.id)
    res.send(article)
})

// 修改文章详情的接口
app.put('/api/articles/:id', async (req,res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(article)
})


// 启用监听
app.listen(3001, () => {
    console.log('http://localhost:3001/');
})