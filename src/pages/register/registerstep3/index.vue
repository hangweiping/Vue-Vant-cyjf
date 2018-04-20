<template>
  <div class="register">
    <div class="step">
      <span class="cir active"></span>
      <span class="line"></span>
      <span class="cir active"></span>
      <span class="line"></span>
      <span class="cir active"></span>
    </div>
    <div class="content3">
      <div class="ipt">
        <input type="password" v-model="password" placeholder="请输入登录密码" maxlength="12">
      </div>
      <div class="mid flt">
        6-12位数字、字母组合
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "store2";
const setStorage = (data) => {
    storage.set("sid", data.sid);
    storage.set("userId", data.userId);
    storage.set("userType", data.userType);
    storage.set("userKey", data.userKey);
};
export default {
  name: "register",
  components: {},
  props: [],
  data() {
    return {
      active: 0,
      mobile: "",
      smsCode: "",
      password: ""
    };
  },
  created() {
    this.mobile = this.$route.query.mobile;
    this.smsCode = this.$route.query.smsCode;
  },
  mounted() {},
  methods: {
    register() {
      let isPasswordRuler = this.$util.isPasswordRuler(this.password);
      let password = this.$util.encryptByDES(this.password);
      let registerData = ({
        type: "GENERAL",//个人
        mobile: this.mobile,
        password: password,
        clientType: "MOBILEWEB",
        smsCode: this.smsCode
      });
      let loginData = ({
        loginName: this.mobile,
        type:'GENERAL',//个人
        password: password,
        clientType: "MOBILEWEB",
      })
      console.log(registerData);
      console.log(password);
      
      if (this.password == "") {
        this.$toast("请输入密码");
      } else if (!isPasswordRuler) {
        this.$toast("密码应为6-12位数字、字母组合");
      } else {
        this.axios
          .post("regist/submit", registerData)
          .then(res => {
            console.log(res);
            if (res.success) {
              //注册成功后直接掉登录接口
              this.login(loginData).then(res => {
                if (res.success) {
                  setStorage(res.data)//将sid等信息存起来
                  this.$toast('注册成功!')
                  this.$router.push('/home')
                }else {
                  this.$toast('登陆失败')
                }
              })
            } else {
              this.$toast(res.message);
            }
          })
          .catch(err => {});
      }
    },
    login(data) {
      return new Promise(resolve => {
        this.axios.post("login", data).then(res => {
          resolve(res);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  .code {
    width: 30%;
    height: 51px;
    line-height: 51px;
    text-align: center;
    font-size: 16px;
    text-decoration: none;
    outline-style: none;
    color: #ff9800;
    border: 1px solid #ff9800;
    border-radius: 5px;
  }
  .btn {
    width: 100%;
    height: 46px;
    margin-top: 15px;
    button {
      width: 100%;
      color: #fff;
      background-color: #ff9800;
      font-size: 18px;
      line-height: 46px;
      border-style: none;
      border-radius: 5px;
    }
  }
  .step {
    height: 57px;
    background-color: #fff;
    padding: 20px 60px;
    box-sizing: border-box;
    .cir {
      float: left;
      width: 15px;
      height: 15px;
      border: 1px solid #6980f5;
      background-color: #fff;
      border-radius: 50%;
    }
    .cir.active {
      background-color: #6980f5;
    }
    .line {
      float: left;
      width: 100px;
      height: 1px;
      background-color: #6980f5;
      margin: 8px 0;
    }
  }
  .content3 {
    padding: 0 23px 23px 23px;
    background-color: #fff;
    .ipt {
      width: 100%;
      height: 50px;
      input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        text-indent: 4px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .content3 .mid {
    height: 45px;
    color: #999999;
    font-size: 14px;
    line-height: 45px;
  }
}
</style>