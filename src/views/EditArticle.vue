<template>
    <el-form @submit.native.prevent='saveArticle' ref="form" :model="article" label-width="80px">
  <el-form-item label="文章标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
  <el-form-item label="文章内容">
    <el-input type="textarea" v-model="article.body"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" native-type="submit">保存</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

</template>

<script>
  export default {
    data() {
      return {
        article: {
        }
      }
    },
    methods: {
      saveArticle() {
        this.$http.put(`/articles/${this.$route.params.id}`, this.article).then(res => {
          console.log(res.data);
          // 消息提示
          this.$message({
          message: '文章更新成功',
          type: 'success'
        });
        // 创建成功后返回文章列表页
        // history.back()
        this.$router.push('/articles/index')
        })
      },
      fetch(){
        // 此时要取到路由里面的id，因为是路由跳转过来的
        this.$http.get(`/articles/${this.$route.params.id}`).then(res => {
          this.article = res.data
        })
      }
    },
    created() {
      this.fetch()
    }
  }
</script>