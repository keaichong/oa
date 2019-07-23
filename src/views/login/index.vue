<template>
  <div class="login-container">
    <div class="background-image">
      背景图待设置
    </div>
    <el-tabs type="border-card" stretch>
      <!-- 密码登录 -->
      <el-tab-pane label="密码登录">
        <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="passwordForm.username" placeholder="用户名/邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="passwordForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin('passwordForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="link-container">
          <el-link @click="handleRegister">注册</el-link>
          <el-link @click="handleForgetPassword">忘记密码</el-link>
        </div>  
      </el-tab-pane>
      <!-- 短信验证码登录 -->
      <el-tab-pane label="短信验证码登录">
        <el-form :model="SMSForm" :rules="SMSRules" ref="SMSForm" class="demo-ruleForm">
          <el-form-item prop="mobileNumber" class="verificationCode">
            <el-input v-model="SMSForm.mobileNumber" placeholder="手机号"></el-input>
            <el-button type="primary">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input v-model="SMSForm.verificationCode" placeholder="验证码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin('SMSForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="link-container">
          <el-link @click="handleRegister">注册</el-link>
          <el-link @click="handleForgetPassword">忘记密码</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      this.handelValidateUsername(rule, value, callback);
    }
    const validatePassword = (rule, value, callback) => {
      this.handelValidatePassword(rule, value, callback);
    }
    const validateMobileNumber = (rule, value, callback) => {
      this.handelValidateMobileNumber(rule, value, callback);
    }
    const validateVerificationCode = (rule, value, callback) => {
      this.handelValidateCode(rule, value, callback);
    }
    return {
      passwordForm: {
        username: '',
        password: ''
      },
      SMSForm: {
        mobileNumber: null,
        verificationCode: '',
      },
      passwordRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      SMSRules: {
        mobileNumber: [{ required: true, trigger: 'blur', validator: validateMobileNumber }],
        verificationCode: [{ required: true, trigger: 'blur', validator: validateVerificationCode }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @description 新用户注册处理事件
     */
    handleRegister() {
      this.$router.push('/register');
    },
    /**
     * @description 忘记密码处理事件
     */
    handleForgetPassword() {

    },
    /**
     * @description 密码登录方式中校验用户名是否合格
     * @param rule 校验规则
     * @param value 用户输入值
     * @param callback 响应提示语
     * @returns callback
     */
    handelValidateUsername(rule, value, callback) {
      return callback();
    },
    /**
     * @description 密码登录方式中校验密码是否合格
     * @param rule 校验规则
     * @param value 用户输入值
     * @param callback 响应提示语
     * @returns callback
     */
    handelValidatePassword(rule, value, callback) {
      return callback();
    },
    /**
     * @description 短信验证码登录方式中校验手机号是否合格
     * @param rule 校验规则
     * @param value 用户输入值
     * @param callback 响应提示语
     * @returns callback
     */
    handelValidateMobileNumber(rule, value, callback) {
      return callback();
    },
    /**
     * @description 短信验证码登录方式中校验验证码是否正确
     * @param rule 校验规则
     * @param value 用户输入值
     * @param callback 响应提示语
     * @returns callback
     */
    handelValidateCode(rule, value, callback) {
      return callback();
    },
    /**
     * @description 点击登录处理事件
     * @param formName 区分不同的表单
     */
    handleLogin(formName) {
      this.$router.push({ path: this.redirect || '/' });
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   this.$router.push({ path: this.redirect || '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* reset element-ui css */
.login-container {
  position: relative;
  .el-tabs {
    position: absolute;
    top: 200px;
    right: 200px;
    width: 300px;
    height: 300px;
  }
  .el-form-item.verificationCode {
    .el-input {
      width: 57%;
    }
    .el-button {
      width: 110px; 
    }
  }
  .el-form-item .el-button {
    width: 100%;
  }
}
.link-container {
  display: flex;
  justify-content: space-between;
}
</style>

