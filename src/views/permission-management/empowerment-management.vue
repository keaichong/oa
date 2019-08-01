<template>
  <div class="container">
    <AddMembers
      :addMembersDialog.sync="addMembersDialog"
      :allUserInSystem="allUserInSystem"
      :selectedUserList="selectedUserList"
      @powerManagement="powerManagement"
    />
    <div class="powerManagement">
      <el-tabs v-model="activeName" class='manage-w'>
        <el-tab-pane label="赋权管理" name="empowerManagement">
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <div class="roleTitle">
                  <div>
                    <h5>赋权用户</h5>
                  </div>
                </div>
                <div class="roleContent">
                  <el-button plain type="primary" size="small" @click="handleAddUser()">添加用户</el-button>
                  <div class="selAddUsers">
                    <div
                      v-for="item in selAddUsers"
                      :key="item.id"
                      class="selAddUsersItem"
                    >{{item.realName}}</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="roleTitle">
                  <div>
                    <h5>分类</h5>
                  </div>
                </div>
                <div class="roleContent setPermission">
                  <el-tabs v-model="activeTab" type="border-card" tab-position="left">
                    <el-tab-pane name="按角色赋权" label="按角色赋权">
                      <el-checkbox-group v-model="checkedRoles">
                        <el-checkbox v-for="item in resultList" :label="item.id" :key="item.idC">
                          <span :title="item.name">
                            <span slot="reference" class="checkboxRoles">{{item.name}}</span>
                          </span>
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-tab-pane>
                    <el-tab-pane name="按功能赋权" label="按功能赋权">
                      <el-tree :data="menuList" node-key="menuCode" show-checkbox ref="tree"></el-tree>
                    </el-tab-pane>
                  </el-tabs>
                  <div class="setting">
                    <el-button size="small">取消</el-button>
                    <el-button type="primary" size="small" @click="saveUser">确认</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AddMembers from "@/components/AddMembers/index.vue";
import {
  getUserListAll,
  getRoleListsType,
  getMenuListAll,
  saveUserMenus,
  saveUserRoles
} from "@/api/table.js";
import { constants } from "crypto";
export default {
  data() {
    return {
      activeName: "empowerManagement",
      selAddUsers: [],
      activeTab: "按功能赋权",
      checkedRoles: [],
      resultList: [],
      menuList: [],
      addMembersDialog: false,
      allUserInSystem: [],
      selectedUserList: []
    };
  },
  components: {
    AddMembers
  },
  mounted() {
    this.getRoleListAll();
    this.getMenuList();
  },
  methods: {
    // 赋权管理模块---为当前所选用户按功能或者角色赋权
    saveUser() {
      if (!this.seleUsers || this.seleUsers.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择用户!",
          duration: 2 * 1000
        });
      } else {
        if (this.activeTab === "按功能赋权") {
          if (this.$refs.tree.getCheckedKeys(true).length === 0) {
            this.$message({
              type: "warning",
              message: "请选择功能!",
              duration: 2 * 1000
            });
            return false;
          }
          // 按功能赋权 保存用户对应的菜单
          saveUserMenus(
            JSON.parse(JSON.stringify(this.seleUsers)),
            this.$refs.tree.getCheckedKeys(true),
            1
          ).then(response => {
            if (response.data.code === 2000) {
              this.selAddUsers = [];
              this.$message({
                type: "success",
                message: "保存成功!",
                duration: 2 * 1000
              });
            } else {
              this.$message({
                type: "error",
                message: "保存失败!",
                duration: 2 * 1000
              });
            }
          });
        } else if (this.activeTab === "按角色赋权") {
          if (JSON.parse(JSON.stringify(this.checkedRoles)).length === 0) {
            this.$message({
              type: "warning",
              message: "请选择角色!",
              duration: 2 * 1000
            });
            return false;
          }
          // 按角色赋权
          saveUserRoles(
            JSON.parse(JSON.stringify(this.seleUsers)),
            JSON.parse(JSON.stringify(this.checkedRoles)),
            1
          ).then(response => {
            if (response.data.code === 2000) {
              this.selAddUsers = [];
              this.$message({
                type: "success",
                message: "保存成功!",
                duration: 2 * 1000
              });
            } else {
              this.$message({
                type: "error",
                message: "保存失败!",
                duration: 2 * 1000
              });
            }
          });
        }
      }
    },
    /**
     * @description 赋权管理模块---添加用户处理事件
     */
    handleAddUser() {
      this.addMembersDialog = true;
      getUserListAll(1).then(response => {
        this.allUserInSystem = response.data.info.menuList;
      });
    },
    /**
     * @description 赋权管理模块---(子组件触发)添加用户
     */
    powerManagement(value) {
      this.selAddUsers = value.map(item => {
        return this.allUserInSystem.find(e => e.id === item);
      });
      this.seleUsers = value;
      this.$message({
        type: "success",
        message: "添加用户成功!",
        duration: 2 * 1000
      });
    },
    // 赋权管理模块---获取所有的角色
    getRoleListAll() {
      getRoleListsType(1).then(response => {
        this.resultList = response.data.info.map(item => {
          return {
            id: item.roleCode,
            name: item.roleName,
            idC: item.id
          };
        });
      });
    },
    // 赋权管理模块---获取所有的权限项
    getMenuList() {
      getMenuListAll(1).then(response => {
        this.menuList = response.data.info.menuList;
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

.powerManagement {

  // .el-tabs__nav .el-tabs__item {
  //   font-size: 16px;
  // }
  .selAddUsers {
    padding-top: 20px;
    color: #333;
    line-height: 25px;
    font-size: 13px;
    text-align: center;
  }
  .el-tabs {
    .el-tabs__content {
      position: relative;
      .el-checkbox-group {
        .el-checkbox__label {
          font-size: 13px;
        }
      }
      .el-tab-pane {
        .el-tree {
          max-height: 47vh;
          overflow-y: auto;
          .el-tree-node__label {
            font-size: 13px;
          }
        }
      }
    }
  }
  .roleTitle {
    border: 1px solid #e3e3e3;
    padding-left: 20px;
  }
  .bg-purple-light {
    .roleTitle {
      border-left: none;
    }
    .roleContent {
      border-left: none;
    }
  }
  .roleContent {
    overflow: hidden;
    border: 1px solid #e3e3e3;
    border-top: none;
    .el-button {
      display: block;
      margin: 10px auto;
    }
    .setting {
      position: absolute;
      bottom: 0;
      left: 50%;
      .el-button {
        display: inline-block;
        margin-top: 10px;
      }
    }
    ul {
      list-style: none;
      padding: 0px;
      li {
        padding: 10px 0;
        text-align: center;
        font-size: 13px;
        &:hover {
          background: #f5f7fa;
          cursor: pointer;
        }
      }
    }
  }
  .checkboxRoles {
    width: 65px;
    text-overflow: ellipsis;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    top: 5px;
  }
  .searchBox {
    span {
      margin: 0 20px;
      font-size: 13px;
    }
  }

  .setPermission {
    .el-tabs {
      height: 100%;
      border: none;
      box-shadow: none;
    }
  }
}

.container {
  .powerManagement {
    .setPermission {
      .el-tabs__header {
        width: 112px;
        .el-tabs__item {
            font-size: 14px;
        }
      }
    }

    .el-tabs__header {
      width: 64px;
      font-size: 14px;
    }
    .roleTitle {
      padding: 12px 0;
      background: #f5f5f5;
      border: 1px solid #e3e3e3;
      font-size: 14px;
      div {
        box-sizing: border-box;
        padding-left: 30px;
      }
    }
    .roleContent {
      height: calc(100vh - 200px);
      overflow: hidden;
      border: 1px solid #e3e3e3;
      border-top: none;
      .el-button {
        display: block;
        margin: 10px auto;
      }
      .setting {
        position: absolute;
        bottom: 0;
        left: 50%;
        .el-button {
          display: inline-block;
          margin-top: 10px;
        }
      }
      ul {
        list-style: none;
        padding: 0px;
        li {
          padding: 10px 0;
          text-align: center;
          font-size: 13px;
          cursor: pointer;
        }
      }
    }
  }
}
.blueBack {
  background: #409eff;
  color: #fff;
}
.roleTitle h5 {
  display: inline;
  display: inline;
  font-size: 14px;
  font-weight: 500;
}

</style>
