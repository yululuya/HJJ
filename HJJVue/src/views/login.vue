<template>
  <div id="login">
    <div class="loginCard">
      <p class="title">登&nbsp;&nbsp;&nbsp;&nbsp;录</p>
      <div class="loginBody">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="请输入用户名"
            >
              <i slot="prefix" class="el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            >
              <i slot="prefix" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="loginBtn" @click.native.prevent="handleLogin">
              <span>立 即 登 录</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }]
      }
    };
  },
  watch: {},
  created() {},
  methods: {
    handleLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$router.push("/index");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url(~@/assets/images/bg.png) no-repeat;
  background-size: 100% 100%;
  .loginCard {
    width: 512px;
    height: 455px;
    background-size: 100% 100%;
    p {
      width: 100%;
      height: 64px;
      line-height: 64px;
      font-size: 26px;
      text-align: center;
      color: #fff;
      margin: 0;
      background: url(~@/assets/images/loginHead.png) no-repeat;
      background-size: 100% 100%;
    }
    .loginBody {
      width: 100%;
      padding-top: 42px;
      padding-bottom: 42px;
      background: url(~@/assets/images/loginBody.png) no-repeat;
      background-size: 100% 100%;
      .el-form {
        width: 80%;
        margin: auto;
        .el-form-item {
          margin-bottom: 24px;
        }
        .el-input__prefix,
        .el-input__suffix {
          top: 4px;
        }
        .el-input__inner {
          height: 48px;
          line-height: 48px;
        }
        .loginBtn {
          width: 100%;
          padding: 16px 20px;
          font-size: 20px;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
