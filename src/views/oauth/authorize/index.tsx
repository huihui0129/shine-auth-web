import {defineComponent, onMounted, reactive, ref} from "vue";
import './index.less';
import {useRoute, useRouter} from "vue-router";
import {ElButton} from "element-plus";
import {getUserInfo} from "@/service/security/LoginController";
import {getAuthCode} from "@/service/security/AuthorizationController";

/**
 * 登陆页面
 */
const Authorize = defineComponent(() => {

    const route = useRoute();

    const router = useRouter();

    const user = ref<any>({
        username: "",
        headImage: "",
    });

    const response_type = ref<string>("");
    const client_id = ref<string>("");
    const redirect_uri = ref<string>("");
    const scope = ref<string>("");
    const state = ref<string>("");

    // http://localhost/oauth/authorize?response_type=code&client_id=auth&scope=all&state=test&redirect_uri=www.baidu.com
    const initParams = () => {
        const params = route.query;
        response_type.value = params.response_type as string;
        client_id.value = params.client_id as string;
        redirect_uri.value = params.redirect_uri as string;
        scope.value = params.scope as string;
        state.value = params.state as string;
    }

    onMounted(() => {
        console.log("进入");
        // 尝试获取用户信息
        getUser();
        // 获取参数
        initParams();
    });

    const getUser = async () => {
        const res: any = await getUserInfo();
        if (res.code === "000000") {
            user.value = res.data;
        }
    }

    const confirmAuth = () => {
        getAuthCode({
            response_type: response_type.value,
            client_id: client_id.value,
            redirect_uri: redirect_uri.value,
            scope: scope.value,
            state: state.value,
        }).then((res: any) => {
            redirectUri(res.data);
        });
    }

    const redirectUri = (data: any) => {
        window.open(`${data.redirectUri.startsWith("http") ? data.redirectUri : "https://" + data.redirectUri}?code=${data.code}`);
    }

    return() => (
        <div class="big-box">
            <div class="show-box">
                <div class="header">
                    <div class="header-box">
                        <img src={user.value.headImage} class="header-img"/>
                    </div>
                </div>
                <div class="nick-name">
                    {user.value.nickName}
                </div>
                <div class="auth-desc">
                    确认授权系统：用户 使用您的信息吗？
                </div>
                <ElButton type="primary" onClick={confirmAuth}>
                    确认授权
                </ElButton>
            </div>
        </div>
    )

})

export default Authorize;