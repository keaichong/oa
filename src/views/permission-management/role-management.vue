<template>
  <div class="container">
    <!-- 默认角色表格 -->
    <div class="defaultRoleContainer">
      <el-tabs v-model="activeDefaultRoleName">
        <el-tab-pane label="默认角色" name="defaultRole">
          <el-table 
            :data='defaultRoleData' 
            style='width: 100%'>
            <el-table-column label='序号' type='index' width='80px'>
            </el-table-column>
            <el-table-column label='角色名称' prop="name" min-width='6%'>
            </el-table-column>
            <el-table-column label='角色描述'  min-width='20%'>
              <template slot-scope='scope'>
                <span class='roleDescription' :title='scope.row.description' slot='reference'>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label='操作' width='500px'>
              <template slot-scope='scope'>
                <el-button 
                  size="small" 
                  :plain="true" 
                  type="success"
                  @click="handleCheckPermission">
                  查看权限
                </el-button>
                <el-button 
                  size="small" 
                  :plain="true" 
                  type="success"
                  @click="handleCheckUsers">
                  查看用户
                </el-button>
                <el-button 
                  size="small" 
                  :plain="true" 
                  type="warning" 
                  v-if="scope.row.name==='主管理员'">
                  更换用户
                </el-button>
                <el-button 
                  size="small" 
                  :plain="true" 
                  type="primary" 
                  v-if="scope.row.name!=='主管理员'">
                  添加用户
                </el-button>
              </template>
            </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 自定义角色表格 -->
    <div class="customRoleContainer">
      <el-tabs v-model="activeCustomRoleName">
        <el-tab-pane label="自定义角色" name="customRole">
          <div class='header'>
            <el-button type='primary' @click="addNewRole">新增角色</el-button>
            <el-input
              type='text'
              prefix-icon="el-icon-search"
              v-model.trim='inputAddRoleName'
              placeholder='请输入角色名称'
              size='small'>
            </el-input>
          </div>
          <el-table 
            :data='customRoleData.data' 
            style='width: 100%'
            :height="customRoleTableHeight">
            <el-table-column label='序号' type='index' width='80px'>
            </el-table-column>
            <el-table-column label='角色名称' min-width='7%'>
              <template slot-scope='scope'>
                <span>{{ scope.row.roleName }}</span>
              </template>
            </el-table-column>
            <el-table-column label='角色描述' min-width='20%'>
              <template slot-scope='scope'>
                <span class='roleDescription' :title='scope.row.description' slot='reference'>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label='状态' min-width='7%'>
                <template slot-scope='scope'>
                  <span>{{ scope.row.status === 0 ? '启用' : '停用' }}</span>
                </template>
              </el-table-column>
              <el-table-column label='修改日期' min-width='15%'>
                <template slot-scope='scope'>
                  <span>{{ scope.row.updateTime }}</span>
                </template>
              </el-table-column>
            <el-table-column label='操作' width='500px'>
              <template slot-scope='scope'>
                <el-button
                  size='small'
                  :plain='true'
                  type='warning'
                  @click="handleEditRole">
                  编辑
                </el-button>
                <el-button
                  size='small'
                  :plain='true'
                  type='success'>
                  查看权限
                </el-button>
                <el-button
                  size='small'
                  :plain='true'
                  type='success'>
                  查看用户
                </el-button>
                <el-button
                  size='small'
                  :plain='true'
                  type='primary'>
                  添加用户
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="customRoleData.currentPage"
              :page-sizes="[20, 50, 100]"
              :page-size="customRoleData.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="customRoleData.totalNum"
              @size-change="handleRoleSizeChange"
              @prev-click="gotoPrevPage"
              @next-click="gotoNextPage">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 查看权限弹窗 -->
    <div>
      <el-dialog
        title="权限查看"
        :visible.sync="checkPermissionDialog"
        width="400px"
        :close-on-click-modal="false"
        @closed="checkPermissionDialog=false">
        <el-divider></el-divider>
        <PermissionManager/>
      </el-dialog>
    </div>
    <!-- 查看用户弹窗 -->
    <div class="checkUserDialog">
      <el-dialog
        title="用户列表"
        :visible.sync="checkUserDialog"
        width="600px"
        :close-on-click-modal="false"
        @close="closeCheckUserDialog">
        <el-divider></el-divider>
        <div class="searchBox">
          <span>姓名</span>
          <el-input
            size="small"
            v-model.trim="inputUserName">
          </el-input>
          <span>手机号码</span>
          <el-input
            size="small"
            v-model.trim="inputUserPhone">
          </el-input>
        </div>
        <el-table :data="checkUser.users" style="width: 100%">
          <el-table-column label='序号' type='index' width='80px'>
          </el-table-column>
          <el-table-column label="姓名" min-width="22%">
            <template slot-scope="scope">
              <span>{{ scope.row.realName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属部门" min-width="22%">
            <template slot-scope="scope">
              <span>{{ scope.row.department }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号"  min-width="22%">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="33.3%"> 
            <template slot-scope="scope">
              <el-button 
                size="mini" 
                :plain="true" 
                type="danger">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :page-size="5"
          :total="checkUser.totalNum"
          small
          @current-change="handleCurrentUserChange"
          @size-change="handleUserSizeChange"
          @prev-click="gotoUserPrevPage"
          @next-click="gotoUserNextPage">
        </el-pagination>
      </el-dialog>  
    </div>
    <!-- 新建、编辑角色弹窗 -->
    <div>
      <Rightsdialog 
        :title="rightsDialogTitle" 
        :show.sync="newAndEditRoleDialog" 
        @confirm="confirm" 
        ref="dialog">
      </Rightsdialog>
    </div>
  </div>  
</template>

<script>
  import PermissionManager from '@/components/PermissionManager/index.vue';
  import Rightsdialog from "@/components/Rightsdialog/index.vue";
  import { deleteData } from '@/utils/delete-data';
  export default {
    data() {
      return {
        activeDefaultRoleName: 'defaultRole',
        defaultRoleData: [
          {
            name: '主管理员',
            description: '该角色为默认角色，不可修改和删除，拥有后台管理全部权限'
          },
          {
            name: '子管理员',
            description: '该角色为默认角色，不可修改和删除，拥有后台管理全部权限'
          },
          {
            name: '部门主管',
            description: '该角色为默认角色，不可修改和删除，拥有后台管理全部权限'
          }
        ],
        activeCustomRoleName: 'customRole',
        customRoleData: {
          data: [{
            roleName: '张三',
            description: '哈哈哈哈',
            status: 0,
            updateTime: '2019-1-60'
          }],
          pageNum: 1,
          pageSize: 20,
          currentPage: 1,
          totalNum: 0
        },
        inputAddRoleName: '',
        customRoleTableHeight: '',
        inputUserName: '',
        inputUserPhone: '',
        checkUser: {
          title: '用户列表',
          users: [],
          belongsToRole: {},
          pageNum: 1,
          pageSize: 5,
          totalNum: 0
        },
        newAndEditRoleDialog: false,
        rightsDialogTitle: '',
        checkUserDialog: false,
        checkPermissionDialog: false,
        isEditPermission: false,
        roleSource: '平台角色名称',
        roleName: '管理员'
      };
    },
    watch: {
    },
    components: {
      PermissionManager,
      Rightsdialog
    },
    mounted() {
      const windowHeight = window.innerHeight;
      this.customRoleTableHeight = windowHeight - 501.6 + 'px';
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
      },
      /**
       * @description 默认角色以及自定义角色查看对应的权限
       */
      handleCheckPermission() {
        this.checkPermissionDialog = true;
      },
      /**
       * @description 默认角色以及自定义角色---查看对应的用户
       */
      handleCheckUsers() {
        this.checkUserDialog = true;
      },
      closeCheckUserDialog() {

      },
      /**
       * @description 自定义角色---编辑角色
       */
      handleEditRole() {
        this.newAndEditRoleDialog = true;
        this.rightsDialogTitle = '角色编辑';
      },
      // 自定义角色---新增角色
      addNewRole() {
        this.newAndEditRoleDialog = true;
        this.rightsDialogTitle = '角色新增';
      },
      confirm() {},
      handleCurrentChange() {},
      handleRoleSizeChange() {},
      gotoPrevPage() {},
      gotoNextPage() {},
      handleCurrentUserChange() {},
      handleUserSizeChange() {},
      gotoUserPrevPage() {},
      gotoUserNextPage() {}
    }
  }
</script>

<style lang="scss">
  @import '@/styles/global.scss';
  .container {
    .defaultRoleContainer {
      height: 265px;
      .el-tabs__header {
        width: 64px;
      }
    }
    .customRoleContainer {
      .el-tabs__header {
        width: 80px;
      }
    }
    .roleDescription {
      display: inline-block;
      max-width: 500px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .checkUserDialog{
      position: relative;
      .el-pagination {
        margin-top: 10px;
        .el-pagination__total{
          margin-left: 25%;
        }
        .el-pagination__jump {
          .el-input {
            width: 50px;
          }
        }
      }
      .el-table .has-gutter tr {
        background: white;
      }
      .searchBox {
        span {
          margin: 0 17px;
          font-size: 13px;
        }
        .el-input {
          width: 195px;
        }
      }
    }
  }
</style>
