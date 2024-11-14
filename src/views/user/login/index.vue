<template>
  <div class="big_box">
    <div class="center_box">
      <div class="title">
        登录
      </div>
      <div class="username">
        <el-input
          v-model="loginParams.username"
          placeholder="请输入账号"
          :prefix-icon="User"
          clearable
        />
      </div>
      <div class="password">
        <el-input
          v-model="loginParams.password"
          show-password
          placeholder="请输入密码"
          :prefix-icon="Lock"
          clearable
        />
      </div>
      <div class="captcha_box">
        <div class="input">
          <el-input
            v-model="loginParams.captcha"
            placeholder="请输入验证码"
            :prefix-icon="Picture"
            clearable
          />
        </div>
        <img class="captcha" :src="captcha.imageBase64" @click="getCaptcha" />
      </div>
      <div class="button">
        <el-button
          class="submit"
          type="primary"
          @click="login"
        >登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import {Result} from "@/types/Result";
import { User, Lock, Picture } from "@element-plus/icons-vue";
import {useStore} from "vuex";

const store = useStore();

const captcha = ref<{ imageBase64: string; uuid: string }>("");
const loginParams = ref<{
  username: string;
  password: string;
  captcha: string;
}>({
})

onMounted(() => {
  getCaptcha();
});

const getCaptcha = async () => {
  const res: Result = await request.get("/user/auth/captcha/getCaptcha");
  if (res.code === "000000") {
    captcha.value = res.data;
  } else {
    ElMessage.error(res.message);
  }
};

const login = async () => {
  const { code, data, message }: Result = await request.post("/user/auth/user/login", {
    username: loginParams.value.username,
    password: loginParams.value.password,
    uuid: captcha.value.uuid,
    captcha: loginParams.value.captcha,
  });
  if (code === "000000") {
    ElMessage.success("登陆成功啦~");
    store.commit("setToken", data.token);
    store.commit("setUser", data);
  } else {
    ElMessage.error(message);
    getCaptcha();
  }
}

</script>

<style scoped lang="less">
.big_box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .center_box {
    padding: 20px;
    width: 400px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
    background: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    .captcha_box {
      display: flex;
      gap: 6px;

      .input {
        flex: 1;
      }

      .captcha {
        width: 90px;
        height: 30px;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .button {

      .submit {
        width: 100%;
      }
    }
  }
}
</style>