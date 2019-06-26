<template>
  <div class="register">
    <div class="bgImage">背景图</div>
    <div class="container">
      <h2>一分钟注册藜麦</h2>
      <div class="firstStep" v-if="showfirstStep">
        <el-tabs v-model="registerType">
          <el-tab-pane label="企业注册" name="businessRegistered"></el-tab-pane>
          <el-tab-pane label="个人注册" name="personalRegistered"></el-tab-pane>
        </el-tabs>
        <el-form :model="SMSVerifiForm">
          <el-form-item>
            <el-input v-model="SMSVerifiForm.phoneNum" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item> 
            <el-input v-model="SMSVerifiForm.code" class="codeInput" placeholder="请输入短信验证码"></el-input>
            <el-button type="primary" size="small">{{btnTxt}}</el-button>
          </el-form-item>
          <el-checkbox v-model="SMSVerifiForm.agreeProtocol">同意<span style="color: #1890ff">《系统隐私协议》</span></el-checkbox>
          <el-button type="primary" class="registerBtn" @click="handleRegister">立即注册，免费使用</el-button>
        </el-form>
      </div>
      <div class="secondStep" v-if="showSecondStep">
        <el-steps :active="1" finish-status="success">
          <el-step title="已完成"></el-step>
          <el-step title="进行中"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
        <div class="business" v-if="registerByBus">
          <div class="busRegistered" v-if="busRegistered">
            <h4>你已注册过藜麦</h4>
            <div style="font-size: 12px">你已经加入了公司一，公司二，xxx团队</div>
            <h4>你可以继续创建新团队</h4>
            <el-input placeholder="请输入企业（团队）名称"></el-input>
            <el-button type="primary" class="registerBtn">立即注册，免费使用</el-button>
          </div>
          <div class="busUnregistered" v-if="busUnregistered">
            <el-form :model="businessForm">
              <el-form-item>
                <el-input v-model="businessForm.designation" placeholder="请输入企业（团队名称）"></el-input>
              </el-form-item>
              <el-form-item> 
                <el-input v-model="businessForm.name" placeholder="请填写真实姓名"></el-input>
              </el-form-item>
              <el-form-item> 
                <el-input v-model="businessForm.password" placeholder="请设置6-20位的登录密码"></el-input>
              </el-form-item>
              <el-button type="primary" class="registerBtn" @click="handleRegister">立即注册，免费使用</el-button>
            </el-form>
          </div>
          <div>
            <h4>注册成功请登录</h4>
          </div>
        </div>
        <div class="personal" v-if="registerByPersonal">
          <div class="personalRegistered" v-if="personalRegistered">
            <h4>你已注册过藜麦</h4>
            <el-button type="primary" class="registerBtn">立即登录</el-button>
          </div>
          <div class="busUnregistered" v-if="personalUnregistered">
            <el-form :model="personalForm">
              <el-form-item> 
                <el-input v-model="personalForm.name" placeholder="请填写真实姓名"></el-input>
              </el-form-item>
              <el-form-item> 
                <el-input v-model="personalForm.password" placeholder="请设置6-20位的登录密码"></el-input>
              </el-form-item>
              <el-button type="primary" class="registerBtn" @click="handleRegister">立即注册，免费使用</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerType: 'businessRegistered',
      SMSVerifiForm: {
        phoneNum: null,
        code: '',
        agreeProtocol: false
      },
      btnTxt: '发送验证码',
      showfirstStep: true,
      showSecondStep: false,
      registerByBus: false,
      registerByPersonal: true,
      busRegistered: false,
      busUnregistered: true,
      personalRegistered: false,
      personalUnregistered: true,
      businessForm: {
        designation: '',
        name: '',
        password: ''
      },
      personalForm: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    /**
     * @description 点击注册按钮处理事件
     */
    handleRegister() {
      this.showfirstStep = false;
      this.showSecondStep = true;
    }
  }
}
</script>
<style lang="scss">
  .register{
    .bgImage{
      height: 320px;
      background: yellow;
    }
    .el-checkbox{
      span{
        font-size: 12px;
      }
    }
    .container{
      width: 500px;
      margin: 20px auto;
      .firstStep{
        width: 300px;
        margin: 0 auto;
        .el-tabs{
          width: 155px;
          margin: 10px auto;
        }
        .el-form{
          margin: 0 auto;
          .el-form-item{
            .el-input.codeInput{
              width: 200px;
              +.el-button{
                padding: 12.9px 17px;
                vertical-align: top;
              }
            }
          }
        }
      }
      .secondStep{
        width: 300px;
        margin: 0 auto;
        .business,.personal{
          margin-top: 10px;
        }
        .el-step:nth-of-type(1){
          margin-left: 18px; 
        }
      }
      h2{
        text-align: center
      }
      .el-button.registerBtn{
        width: 300px;
        margin: 10px 0;
      }
    }
    
  }
  
</style>
