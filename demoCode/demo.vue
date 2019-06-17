<template>
  <div class="container">
    <!-- 顶部容器 -->
    <div class="header">

    </div>
    <!-- 中间部分 -->
    <div class="middle">

    </div>
    <!-- 底部容器 -->
    <div class="footer">

    </div>
  </div>  
</template>
<script>
export default {
  props: {},
  filters: {},
  data() {
    return {

    }
  },
  components: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss">
  .container{
    margin: 20px 0 0 20px;
    .el-input{
      width: 200px;
    }
    .el-table div.cell{
      text-align: center;
    }
    .el-table td{
      padding: 5px 0;
    }
    .el-divider{
      margin: 5px 0;
    }
    .el-dialog__body{
      padding: 4px 20px;
    }
    .el-pagination{
      margin: 10px;
    }
  }
  .header{
    margin: 20px 20px;
  }
  .middle{
    margin: 20px 20px;
  }
</style>
