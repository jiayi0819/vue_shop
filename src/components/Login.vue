<template>
  <div class="login_container">
    <div class="login_box">
      <!-- AVATAR -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>

      <!-- FORM -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- USERNAME -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <!-- PASSWORD -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <!-- BUTTON -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">Login</el-button>
          <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        // validate username
        username: [
          {
            required: true,
            message: "Please fill your username",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            messsage: "",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill your password",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            messsage: "",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200)
          return this.$message.error("Login Failed ☹ ");
        this.$message.success("Login Successful 🤠");
        console.log(res);
        /////////////////////////////////////////////
        // TO DO STEPS
        /////////////////////////////////////////////
        // 1. Save token to client session storage
        //  1.1 Enable entrance to other API entrance
        //  1.2 Token only valid when page open, hence stored in session
        window.sessionStorage.setItem("token", res.data.token);
        // 2. Auto jump back to /home page
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px #444;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
