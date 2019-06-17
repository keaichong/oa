<template>
  <div class="add-members">
    <el-dialog title="添加员工" :visible.sync="editDialogVisible" width="650px" :close-on-click-modal="false" :before-close="cancel">
      <div class="members">
        <div class="selectMembers-container">
          <h5>请选择员工</h5>
          <div class="selectMembers">
            <el-input type="text" prefix-icon="el-icon-search" placeholder="搜索" size="medium"></el-input>
          </div>
        </div>
        <div class="selectedMembers-container">
          <h5>已经选择员工</h5>
          <div class="selectedMembers"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editDialogVisible: false
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialogVisible: {
      handler: function(val) {
        this.editDialogVisible = val;  
      }
    }
  },
  methods: {
    cancel() {
      this.editDialogVisible = false;
      this.$emit('cancelDialog', this.editDialogVisible)
    },
    confirm() {
      this.editDialogVisible = false;
      this.$emit('confirmDialog', this.editDialogVisible)
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
  .members{
    display: flex;
  }
  .members>div{
    flex: 1;
    height: 350px;
  }
  .selectMembers{
    height: 90%;
    border: 1px solid #e5e5e5;
  }
  .selectedMembers{
    height: 90%;
    border: 1px solid #e5e5e5;
    border-left: none;
  }
</style>