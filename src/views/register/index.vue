<template>
  <div class="register">
    <div class="bgImage"></div>
    <div class="container">
      <h2>一分钟注册藜麦</h2>
      <div class="firstStep" v-if="showfirstStep">

        <!--标签头部-->
        <el-tabs v-model="registerType" @tab-click="handleTabClick">
          <el-tab-pane label="企业注册" name="businessRegistered"></el-tab-pane>
          <el-tab-pane label="个人注册" name="personalRegistered"></el-tab-pane>
        </el-tabs>

        <!--form表单-->
        <el-form :model="registerForm" :rules="rules" ref="firstForm">
          <el-form-item prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="registerForm.code" class="codeInput" placeholder="请输入邮箱验证码"></el-input>
            <el-button type="primary" size="small" v-bind:disabled="verify" @click="handleSendVerify">{{ btnTxt }}</el-button>
          </el-form-item>
          <el-checkbox v-model="registerForm.agreeProtocol">同意<span style="color: #1890ff">《系统隐私协议》</span></el-checkbox>
          <el-button type="primary" class="registerBtn" @click="handleRegister">下一步</el-button>
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
    const validateEmail = (rule, value, callback) => {
     this.handleValidateEmail(rule, value, callback);
    };

    return {
      registerType: 'businessRegistered',
      registerForm: {
        email: '',
        code: '',
        agreeProtocol: false
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      verify: true,
      code: '2106',
      second:10,
      time:0,
      btnTxt:'发送验证码',





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
     * @description 企业邮箱的验证: 1、不能为空 2、格式正确 3、验证码按钮激活
     */
    handleValidateEmail(rule, value, callback){
        const validate = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (value === '') { //1
          this.verify = true;
          callback(new Error('邮箱不能为空！'));
        } else if(!validate.test(value)) { //2
          this.verify = true;
          callback('输入邮箱格式不正确！');
        }else{ //3 调用后台接口
          if(this.registerType === 'personalRegistered'){
            this.verify = false;
          } else{//调用后台接口
            if(this.code === '2106'){
              callback('请先注册个人账号！');
            }else{
              this.verify = false;
            }
          }
        }
     /* this.$http.get("/role/resources", {
          params: {roleId: this.roleId}
        },
        {
          emulateJSON: true
        }).then((response) => {
        me.jurisdictionContent = response.body;
        me.jurisdictionContent.forEach(function (c) {
          if(c['checked']){
            me.selectedCheck.push(c.id);
          }
        })
        console.log(this.selectedCheck)
      })*/
      },
    /**
     * @description 转换页tab-plane事件: 1、转换清空数据  2、更改tab页
     */
    handleTabClick(tab, event){
      this.$refs.firstForm.resetFields(); //转换tab清空表单数据
      if(tab.name === 'businessRegistered'){
        this.registerType = 'businessRegistered';
      }else{
        this.registerType = 'personalRegistered';
      }
    },
    /**
     * @description 点击验证码事件: 个人 1、调用接口 2、文字修改为倒计时（60s）
     */
    timer(){
      if(this.time > 0){
        this.verify = true;
        this.btnTxt = `重新发送(${this.time}s)`;
        this.time--;
        setTimeout(this.timer, 1000);
      }else{
        this.verify = false;
        this.btnTxt = '发送验证码';
      }
    },
    stop(){
      this.time = 0;
      this.verify = false;
    },
    handleSendVerify(){
      this.time = this.second;
      this.timer();
      this.verify = false;
    },
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
      height: 300px;
      background: #409eff;
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
              width: 190px;
              +.el-button{
                width: 105px;
                padding: 12.9px 17px;
                vertical-align: top;
                font-size: 12px;
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
