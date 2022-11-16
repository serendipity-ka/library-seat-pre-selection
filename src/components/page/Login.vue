<template>
    <div class="login-wrap">
        <!-- 网址:https://www.jianshu.com/p/5852102212bd -->
        <!-- 这是动态封面 -->
        <div class="login-video-container">
            <div :style="fixStyle" class="login-filter">
            <LoginForm></LoginForm>
            </div>
            <video :style="fixStyle" autoplay loop muted class="login-fillWidth"
            v:on:canplay="canplay">
            <source src="../../../static/video/coverr-waves.mp4" type="video/mp4"/>
        </video>
        <div class="login-poster login-hidden" v-if="!videoCannPlay">
            <img :style="fixStyle" src="../../../static/img/image.jpg" alt="视频封面"/>
        
        </div>
    </div>
        <!-- 到这里 -->
        <div class="ms-title">图书馆座位预选系统</div>
        <div class="ms-login">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="0px"
                class="demo-ruleForm"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="ruleForm.username"
                        placeholder="username"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="ruleForm.password"
                        @keyup.enter.native="submitForm('ruleForm')"
                    ></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')"
                        >登录</el-button
                    >
                </div>
                <p style="font-size: 12px; line-height: 30px; color: #999"></p>
            </el-form>
        </div>
    </div>
</template>

<script>
//引入动态视频

import { mapActions, mapGetters } from "vuex";
export default {
    //动态视频
    // name :"Login",
    // components:{
    //     LoginForm
    // },
    //上面到这里停下来
    data: function () {
        return {
            ruleForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
            },
            //动态视频
            videoCanPlay:false,
            fixStyle:''
        };
    },
    computed: {
        ...mapGetters(["adminUser"]),
    },
    methods: {
        login() {
            let userName = this.adminUser.userName;
            let pwd = this.adminUser.pwd;
            if (
                userName == this.ruleForm.username &&
                pwd == this.ruleForm.password
            ) {
                localStorage.setItem("ms_username", this.ruleForm.username);
                this.$router.push("/seat");
            } else {
                this.$message({
                    message: "账号密码错误!",
                    type: "error",
                });
            }
        },
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //动态视频
        canplay(){
            this.videoCanPlay = true
        }
    },
    mounted: function (){
        //主要监测窗口缩放视频也同步大小
        window.onresize = () => {
            const windowWidth = document.body.clientWidth
            const widthHeight = document.body.clientHeight
            const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }

        }
// 这里
        window.onresize();

    }
};
</script>

<style scoped>
/* 这里 */
.login-vedio-container{
    position: relative;
    height: 100vh;
    overflow: hidden;
}
.login-video-container .login-poster img,
.login-vedio-container video {
    z-index: 0;
    position: absolute;
}
.login-vedio-container .login-filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30pt;
    color: #fff;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 320px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    /* background: #fff; */
    background: rgb(255, 255, 255,0.3);
    opacity: 0.85;
    
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
}
</style>


