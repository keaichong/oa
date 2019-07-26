<template>
  <div class="container">
    <el-dialog
      :title="title"
      :visible.sync="currentShow"
      :close-on-click-modal="false"
      :before-close="cancel"
      width="420px">
      <el-divider></el-divider>
      <el-form :model="form" :rules="rules2" ref="form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input type="textarea" :rows="4" v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-switch v-model="form.value"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button 
          @click="cancel" 
          size="mini">
          取 消
        </el-button>
        <el-button 
          type="primary" 
          size="mini"
          @click="confirm('form')" >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      const reg = /^(\w|[\u4e00-\u9fa5]){1,20}$/;
      if (!reg.test(value)) {
        return callback(
          new Error("1-20个字符（包括数字、字母、下划线、汉字）")
        );
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      const reg = /^.{0,50}$/;
      if (!reg.test(value)) {
        return callback(new Error("0-50个字符"));
      } else {
        callback();
      }
    };
    return {
      currentShow: "",
      form: {
        type: "",
        id: '',
        name: "",
        desc: "",
        value: true
      },
      rules2: {
        name: [{ required: true, validator: validatePass, trigger: "blur" }],
        desc: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  watch: {
    show: {
      handler: function(val) {
        this.currentShow = val;
      },
      immediate: true
    }
  },
  methods: {
    cancel() {
      this.$emit("update:show", false);
      // 清空表单验证提示
      this.$refs.form.clearValidate();
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("update:show", false);
          this.$emit("confirm", this.form);
          this.$refs.form.clearValidate();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  .el-form-item__label {
    width: 100px;
  }
  .el-textarea {
    width: 70%;
  }
}
</style>
