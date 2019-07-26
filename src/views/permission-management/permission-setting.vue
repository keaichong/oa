<template>
  <div class="container">
    <div class="permissionSetting">      
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色权限设置" name="permissionSetting">
          <el-row>
            <el-col :span='4'>
              <div class='grid-content bg-purple'>
                <div class='roleTitle'>
                  <div>自定义角色名称</div>
                </div>
                <div class="roleContent">
                  <ul class="allRolesContainer">
                    <li 
                      v-for="(item, index) in allRoles.roleName"
                      :key="index"
                      :class='{blueBack:index === number}'
                      @click="handleSettingPermission(index)">
                      {{item}}
                    </li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="roleTitle">
                  <div>{{currentEmpowermentRoleName}}</div>
                </div>
                <div class="roleContent">
                  <!-- <PermissionManager
                    :isCheckPermission="isCheckPermission"
                    :functions="functions"
                    @handleSaveRoleMenus="handleSaveRoleMenus"
                  /> -->
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
export default {
  props: {},
  filters: {},
  data() {
    return {
      activeName: 'permissionSetting',
      allRoles: {
        roleName: ['张三', '李四', '王五'],
        roleCode: []
      },
      currentEmpowermentRoleName: '默认角色',
      number: 0
    }
  },
  components: {},
  mounted() {
  },
  methods: {
    /**
     * @description 切换用户查询当前用户所拥有的权限
     * @param index 用户下标
     */
    handleSettingPermission(index) {
      this.number = index;
    }
  }
}
</script>
<style lang="scss">
  @import '@/styles/global.scss';
  .container {
    .permissionSetting {
      .el-tabs__header {
        width: 96px;
      }
      .roleTitle {
        padding: 12px 0;
        background: #F5F5F5;
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
    background: #409EFF;
    color: #fff;
  }
</style>
