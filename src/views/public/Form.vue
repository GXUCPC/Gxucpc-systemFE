<script>
import store from "@/assets/js/store";
import {reactive} from "vue";
import request from "@/assets/js/request/request";
import {ElMessage} from "element-plus";

const formItemType = store.state.form.formItemType;

export default {
    components: {},
    data() {
        return {
            formItemType: formItemType,
            formObj: reactive({
                id: "",
                title: "title",
                text: "text",
                formItemList: [],

            }),
            oriFormObj: {}
        };
    },
    methods: {
        submitForm() {
            const valueArr = [];
            for (const item of this.formObj.formItemList) {
                valueArr.push(item.prop.value.value);
            }
            request.post("/public/form/submit", {
                formId: this.formObj.id,
                formValue: JSON.stringify(valueArr)
            }, {token: localStorage.getItem("token")})
                .then(res => {
                    ElMessage.success("提交成功");
                    this.resetForm();
                })
                .catch(err => {
                    console.log(err);
                    ElMessage.error(`提交失败，${err}`);
                });
        },
        resetForm() {
            this.formObj = JSON.parse(JSON.stringify(this.oriFormObj));
        },
        getForm() {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const formId = urlSearchParams.get("id");
            if (formId) {
                this.$http.get("/public/form/get", {params: {formId: formId}})
                    .then(res => {
                        if (res.statusCode === 50000) {
                            console.log(res);
                            this.oriFormObj = Object.assign({}, res.data);
                            this.formObj = JSON.parse(JSON.stringify(res.data));
                        } else {
                            ElMessage.error(res.message);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        ElMessage.error("获取表单失败");
                    });
            }
        }
    },
    mounted() {
        this.getForm();
    }
};
</script>

<template>
    <div class="formContainer">
            <el-form>
                <!--表单头部-->
                <div class="formHeader">
                    <h2 style="text-align: center">{{ formObj.title }}</h2>
                    <v-md-preview :text="formObj.text"></v-md-preview>
                </div>
                <!--表单主体-->
                <div class="formBody">
                    <el-card class="formItem" shadow="never" v-for="(element, index) in formObj.formItemList" :key="index">
                        <div class="itemBody">
                            <!--控件标签-->
                            <el-form-item v-if="element.prop.label" class="itemLabel" style="margin-bottom: .5em;">
                                            <span v-if="element.prop.require"
                                                  style="color: red;font-weight: bold;margin-right: .5em;">*</span>
                                <span style="font-size: 1.2em;">{{ element.prop.label }}</span>
                            </el-form-item>
                            <!--控件主体-->
                            <el-form-item v-if="element.type === formItemType.SubTitle">
                                <h3>{{ element.prop.text.value }}</h3>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Para" class="para">
                                <v-md-preview :text="element.prop.text"></v-md-preview>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Divider">
                                <el-divider :line-type="element.prop.lineType.selected"/>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Input">
                                <el-input v-model="element.prop.value" clearable
                                          :placeholder="element.prop.placeholder"
                                          :required="element.prop.require"/>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Textarea">
                                <el-input v-model="element.prop.value" type="textarea"
                                          :placeholder="element.prop.placeholder"
                                          :required="element.prop.require"/>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Selection">
                                <el-select class="selection" v-model="element.prop.value" clearable
                                           :placeholder="element.prop.placeholder"
                                           :required="element.prop.require"
                                           @clear="element.prop.value.value=-1">
                                    <el-option
                                        v-for="(option, index) in element.prop.option"
                                        :key="index"
                                        :label="option.label"
                                        :value="index">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.RadioList">
                                <el-radio-group v-model="element.prop.value"
                                                :required="element.prop.require"
                                                style="width: 100%;">
                                    <div
                                        style="margin-top: 5px;width: 100%;display: flex;align-items:center;;border: 1px solid lightgray;border-radius: 5px"
                                        v-for="(option, index) in element.prop.option"
                                        :key="index">
                                        <el-radio :label="option" :value="index"
                                                  style="margin: .2em .5em; width: 100%;">
                                            {{ option.label }}
                                        </el-radio>
                                    </div>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.CheckboxList">
                                <el-checkbox-group v-model="element.prop.value"
                                                   :min="element.prop.minCount"
                                                   :max="element.prop.maxCount.value>element.prop.minCount.value?element.prop.maxCount.value:element.prop.minCount"
                                                   :required="element.prop.require"
                                                   style="width: 100%;">
                                    <div
                                        style="margin-top: 5px;border: 1px solid lightgray;border-radius: 5px"
                                        v-for="(option, index) in element.prop.option"
                                        :key="index">
                                        <el-checkbox :label="option" :value="index"
                                                     style="margin: .2em .5em; width: 100%;">
                                            {{ option.label }}
                                        </el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                    </el-card>
                </div>
                <!--表单末尾-->
                <div class="formFooter">
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </div>
            </el-form>
            <!--{{ formObj }}-->
    </div>
</template>

<style scoped>
.formContainer {
    width: 720px;
    height: 100%;
    margin: 1em auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    padding: 1em 2em;
}

.formHeader {
    border-bottom: 1px solid lightgray;
}

.formBody {
    padding: 1em;
}

.v-md-editor-preview .github-markdown-body {
    padding: 0;
}

.formItem {
    margin-bottom: 1em;
}

.itemBody {
    margin-bottom: .5em;
}

.itemLabel ~ * {
    margin: 0 1em;
}

.selection {
    width: 100%;
}

.formFooter {
    text-align: center;
    margin-top: 2em;
    border-top: 1px solid lightgray;
    padding-top: 2em;
}
</style>