<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="角色管理" name="roleManagement">
        <!-- 顶部容器 -->
        <div class="header">
          <el-button type="primary">新增</el-button>
          <el-input type="text" prefix-icon="el-icon-search" v-model="role" placeholder="请输入角色名称"></el-input>
        </div>
        <!-- 中间部分 -->
        <div class="middle">
          <el-table
            :data="tableData"
            style="width: 90%">
            <el-table-column
              label="序号"
              width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.order }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="角色名称"
              width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.roleName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="角色描述"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.roleDescription }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="角色状态"
              width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.roleStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="修改时间"
              width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.modificationTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" :plain="true" v-for="(item, index) in scope.row.operation" :type="item | statusFilter" :key="item" @click="handleClick(item, index)">{{ item | buttonName}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog :title="checkUser.title" :visible.sync="checkUserDialog" width="600px" :close-on-click-modal="false">
          <el-divider></el-divider>
          <el-table :data="checkUser.user" style="width: 100%">
            <el-table-column
              label="姓名"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="所属部门"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.department }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号"
              width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button size="small" :plain="true" v-for="(item, index) in scope.row.operation" :type="item | statusFilter" :key="item" @click="handleClick(item, index)">{{ item | buttonName}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="5"
            :total="checkUser.totalPage"
            hide-on-single-page>
          </el-pagination>
        </el-dialog>
        <el-dialog title="权限" :visible.sync="checkPermissionDialog"  width="400px" :close-on-click-modal="false">
          <el-divider></el-divider>
          <PermissionManager :isEditPermission="isEditPermission"/> 
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="权限设置" name="permissionManagement">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <div class="roleTitle">
                <h4>{{roleSource}}</h4>
              </div>
              <div class="roleContent">
                <ul>
                  <li>管理员</li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <div class="roleTitle">
                <h4>{{roleName}}</h4>
              </div>
              <div class="roleContent">
                <PermissionManager />
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="setting">
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button> 
        </div>
      </el-tab-pane>
      <el-tab-pane label="赋权管理" name="empowerManagement">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <div class="roleTitle">
                <h4>赋权用户</h4>
              </div>
              <div class="roleContent">
                <el-button plain type="primary" size="small">添加用户</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <div class="roleTitle">
                <h4>分类</h4>
              </div>
              <div class="roleContent setPermission">
                <el-tabs type="border-card" tab-position="left">
                  <el-tab-pane label="按角色赋权">按角色赋权</el-tab-pane>
                  <el-tab-pane label="按功能赋权">按功能赋权</el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="setting">
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button> 
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>  
</template>

<script>
  import PermissionManager from '@/components/PermissionManager/index.vue';
  import { deleteData } from '@/utils/delete-data';
  export default {
    filters: {
      statusFilter(status) {
				const statusMap = {
					'edit': 'primary',
          'delete': 'danger',
          'checkPermission': 'primary',
          'addUser': 'primary',
          'checkUser': 'primary'
				}
				return statusMap[status]
      },
      buttonName(item) {
        const names = {
          'edit': '编辑',
          'delete': '删除',
          'checkPermission': '查看权限',
          'addUser': '添加用户',
          'checkUser': '查看用户'
        }
        return names[item];
      }
    },
    data() {
      return {
        activeName: 'roleManagement',
        role: '',
        tableData: [{
          order: 1,
          roleName: '王小虎',
          roleDescription: '上海市普陀区金沙江路 1518 弄',
          roleStatus: '开启',
          modificationTime: '2019-6-14',
          operation: ['edit', 'delete', 'checkPermission', 'addUser', 'checkUser']
        }],
        checkUser: {
          title: '管理员-用户列表',
          user: [
            {
              name: '张三',
              department: '一部',
              phoneNum: 12345678912,
              operation: ['delete']
            }
          ],
          totalPage: 4
        },
        checkUserDialog: false,
        checkPermissionDialog: false,
        isEditPermission: false,
        roleSource: '平台角色名称',
        roleName: '管理员'
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          let curRoute = route.name; 
          if (curRoute === '') {
            
          }
        },
        immediate: true
      }
    },
    components: {
      PermissionManager
    },
    methods: {
      /**
       * @description 表格按钮组对应处理事件
       * @param item 按钮的名称
       * @param index 具体操作的表格行下标
       */
      handleClick(item, index) {
        if (item === 'checkUser') {
          this.checkUserDialog = true;
        } else if (item === 'checkPermission') {
          this.checkPermissionDialog = true;
          this.isEditPermission = false;
        } else if (item === 'delete') {
          deleteData('customClass').then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  .container{
    margin: 20px 0 0 20px;
    .el-input{
      width: 200px;
    }
    .el-table{
      margin-bottom: 10px;
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
      padding: 4px 10px;
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
  .customClass{
    width: 320px;
  }
  .roleTitle{
    border: 1px solid #e3e3e3;
    padding-left: 20px;
  }
  .roleContent{
    height: 450px;
    border: 1px solid #e3e3e3;
    .el-button{
      display: block;
      margin: 10px auto;
    }
    ul{ 
      list-style: none;
      padding: 0px;
      li{
        padding: 10px 0;
        text-align: center;
        font-size: 13px;
        &:hover{
          background: #F5F7FA;
          cursor: pointer;
        }
      }
    }
  }
  .setPermission{
    .el-tabs{
      height: 100%;
      border: none;
      box-shadow: none;
    }
  }
  .setting{
    .el-button:nth-child(1){
      margin-left: 550px;
      margin-top: 20px;
    }
  }
</style>
