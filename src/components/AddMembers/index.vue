<template>
  <div class="add-members">
    <el-dialog title="添加员工" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :before-close="cancel">
      <el-divider></el-divider>
      <div class="members">
        <el-transfer
          style="text-align: left"
          :data="data"
          v-model="value"
          filterable
          :titles="['全部用户', '已选用户']"
          :button-texts="['取消', '添加']"
          :left-default-checked="selectedList"
          @change="handleChange">
          </el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button 
          size="mini" 
          @click="cancel">取 消</el-button>
        <el-button 
          type="primary"
          size="mini" 
          @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    addMembersDialog: {
      type: Boolean,
      default: false
    },
    selectedUserList: {
      type: Array
    },
    allUserInSystem: {
      type: Array
    }
  },
  data() {
    return {
      dialogVisible: false,
      data: [],
      value: [],
      selectedList: [],
      // 记录左侧选中并移入右侧的用户id
      leftSelectedUsers: []
    }
  },
  watch: {
    addMembersDialog: {
      handler: function(val) {
        this.dialogVisible = val;
      }
    },
    allUserInSystem: {
      handler: function(val) {
        this.data = [];
        for (let i = 0; i < val.length; i++) {
          this.data.push({
            key: i,
            label: val[i]['realName'],
            id: val[i]['id']
          });
        }
        return this.data;
      }
    },
    selectedUserList: {
      handler: function(val) {
        this.selectedList = [];
        for (let i = 0; i < this.data.length; i++) {
          for (let j = 0; j < val.length; j++) {
            if (this.data[i].id === val[j].id) {
              this.selectedList.push(i);
            }
          }
        }
      },
      immediate: true
    },
  },
  mounted() {
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
      this.$emit("update:addMembersDialog", false);
    },
    // 确认将选中的用户添加到当前角色下
    confirm() {
      this.dialogVisible = false;
      this.$emit("update:addMembersDialog", false);
      this.$emit('powerManagement', this.leftSelectedUsers);
    },
    /**
     * @description 右侧列表元素变化时触发
     * @param value 当前值
     * @param direction 数据移动的方向('left' / 'right')
     */
    handleChange(value, direction) {
      this.leftSelectedUsers = [];
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < value.length; j++) {
          if (value[j] === this.data[i].key) {
            this.leftSelectedUsers.push(this.allUserInSystem[i].id);
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.add-members{
  .members{
    height: 300px;
    display: flex;
    .el-transfer{
      .el-transfer-panel{
        width: 193px;
      }
      .el-transfer-panel__header{
        .el-checkbox__label{
          font-size: 12px;
        }
      }
      .el-transfer__buttons{
        padding: 0 8px;
        button{
          i,span{
            font-size: 12px;
          }
        }
      }
      .el-checkbox__label{
        font-size: 12px;
      }
      .el-input--prefix{
        width: 180px;
        margin: 5px auto;
      }
      .el-checkbox-group{
        .el-checkbox{
          display: block;
        }
      }
    }
    
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
}
</style>