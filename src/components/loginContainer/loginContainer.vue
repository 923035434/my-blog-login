<template>
  <div class="loginContainer">
    <div class="filter">
      <img class="bgImg" :src="bgImg" alt="">
    </div>
    <div class="login-form-wrapper">
      <div class="login-form">
        <div class="account-wrapper">
          <md-input-container  md-clearable>
            <label class="lab">账号</label>
            <md-input  v-model="account"></md-input>
          </md-input-container>
        </div>
        <div class="password-wrapper">
          <md-input-container md-has-password>
            <label class="lab">密码</label>
            <md-input v-model="password" type="password"></md-input>
          </md-input-container>
          <div class="remember-me-wrapper">
            <md-switch md-theme="green" v-model="checked" id="my-test5" name="my-test5" class="md-primary">记住我</md-switch>
          </div>
        </div>
        <div class="login-btn-wrapper">
          <md-button @click="login" class="login-btn md-raised md-primary">Login</md-button>
        </div>
      </div>
    </div>
    <md-snackbar :md-position="'bottom right'" ref="snackbar" :md-duration="3000">
      <span>{{snackbarMessage}}</span>
      <md-button class="md-accent" md-theme="light-blue" @click="$refs.snackbar.close()">我知道了</md-button>
    </md-snackbar>
  </div>
</template>

<script type="text/ecmascript-6">
  import {login} from '../../api/login'
  import {saveStore, getStore} from '../../common/js/store'
  export default {
    data () {
      return {
        account: '',
        password: '',
        checked: false,
        bgImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505204495929&di=989e72a2e4a9abac1eab743cf623fd0a&imgtype=0&src=http%3A%2F%2Fwww.bhmpics.com%2Fwallpapers%2Flake_near_mountain-1920x1080.jpg',
        snackbarMessage: ''
      }
    },
    methods: {
      login () {
        if (this.account === '' || this.password === '') {
          console.log('请输入完整的数据')
        }
        login({
          account: this.account.trim(),
          password: this.password.trim(),
          ifChecked: this.checked
        }).then((res) => {
          let data = JSON.parse(res)
          console.log(data)
          if (data.code !== 0) {
            if (data.message) {
              this.openSnackbar(data.message)
            } else {
              this.openSnackbar('notMessage')
            }
            return
          }
          window.location.href = window.location.origin + data.redirectUrl
        })
      },
      openSnackbar (message) {
        if (message) {
          this.snackbarMessage = message
        }
        this.$refs.snackbar.open()
      }
    },
    watch: {
      checked (newChecked) {
        saveStore('login', 'remember_me_checked', newChecked)
      }
    },
    created () {
      this.checked = getStore('login', 'remember_me_checked', false)
      if (window.userInfo) {
        this.account = window.userInfo.account
        this.password = window.userInfo.password
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    position :fixed
    top :0px
    left :0px
    right :0px
    bottom :0px
    color :#ffff
    overflow :hidden
    .filter
      position :fixed
      z-index :1
      top :0px
      left :0px
      right :0px
      bottom :0px
      overflow :hidden
      .bgImg
        width: 100%
        height:100%
    .login-form-wrapper
      position :absolute
      top :0px
      left :0px
      right :0px
      bottom :0px
      z-index :50
      background-color: rgba(0,0,0,0.3)
      .login-form
        position :absolute
        width: 26%
        height: 35%
        padding:60px 60px 0 60px
        left :37%
        top :25%
        .md-input-container
          &::after
            background-color :#fff
          .lab
            color :#fff
          input
            color :#fff
            text-shadow:none
            -webkit-text-fill-color:#fff
        .password-wrapper
          position :relative
          .remember-me-wrapper
            position : absolute
            right :-5px
            bottom :-60px
        .login-btn-wrapper
          position :absolute
          bottom :4%
          padding: 0 60px
          left :0px
          width :100%
          box-sizing :border-box
          .login-btn
            width:100%
            height:40px
            margin :0
            box-sizing :border-box
</style>
