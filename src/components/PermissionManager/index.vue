<template>
  <div class="permission-manager">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="管理范围" name="managingScope" v-if="isEditPermission">
        <el-radio-group v-model="managingScope">
          <el-radio 
            v-for="item in scopes" 
            :key="item.name" 
            :label="item.label" 
            :disable="isEditPermission">
              {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-tab-pane>
      <el-tab-pane label="功能权限" name="functionManager">
        <el-tree
          :data="functions"
          :props="defaultProps"
          :show-checkbox="isEditPermission"
          @check-change="handleCheckChange">
        </el-tree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    isEditPermission: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    isEditPermission: {
      handler: function(val) {
        if (val) {
          this.activeName = 'managingScope';
        } else {
          this.activeName = 'functionManager';
        }
      },
      immediate: true  
    }
  },
  data() {
    return {
      activeName: '',
      managingScope: 'compony',
      scopes: [
        {
          name: '全公司',
          label: 'compony'
        },
        {
          name: '所在部门及下级部门',
          label: 'department'
        },
        {
          name: '特定部门',
          label: 'specificDepartment'
        }
      ],
      functions: [
        {
          label: '平台管理',
          children: [
            {
              label: '权限管理'
            },
            {
              label: '菜单管理'
            },
            {
              label: '企业管理'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleClick() {
      
    },
    handleCheckChange() {

    }
  }
}
</script>
<style lang="scss">
  .permission-manager{
    width: 350px;
    margin: 10px auto;
    .el-tab-pane{
      height: 300px;
    }
    .el-radio{
      display: block;
      margin: 10px 0;
    }
  }
</style>
