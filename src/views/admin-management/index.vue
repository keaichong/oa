<template>
  <div class="admin-management">
    <el-table
      :data="tableData"
      style="width: 800px">
      <el-table-column
        label="成员"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-for="item in scope.row.member">{{ item }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="管理范围"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.controlLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="功能权限"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.permission }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit">编辑人员</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddMembers :dialogVisible="editDialogVisible" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog"></AddMembers>
  </div>
</template>

<script>
import AddMembers from '@/components/AddMembers/index.vue';
export default {
  data() {
    return {
      tableData: [{
        member: ['张三','李四', '王五'],
        controlLimit: '全公司',
        permission: '全部'
      }],
      editDialogVisible: false
    }
  },
  components: {
    AddMembers
  },
  methods: {
    /**
     * @description 编辑成员处理事件
     */
    handleEdit() {
      this.editDialogVisible = true;
    },
    /**
     * @description 删除成员处理事件
     */
    handleDelete() {
      
    },
    /**
     * @description 点击弹框取消按钮关闭时处理事件
     */
    cancelDialog(val) {
      this.editDialogVisible = val;
    },
    /**
     * @description 点击弹框确认按钮关闭时处理事件
     */
    confirmDialog(val) {
      this.editDialogVisible = val;
    }
  }
}
</script>

<style lang="scss">
  .admin-management {
    margin: 20px 20px;
  }
</style>

