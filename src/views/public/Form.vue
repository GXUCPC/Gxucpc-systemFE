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
                countPerUser: 1,
                header: {
                    title: "测试表单",
                    text: "说明"
                },
                formItemList: [
                    {
                        type: formItemType.SubTitle,
                        name: "小标题",
                        prop: {
                            text: {
                                label: "标题文字",
                                value: "小标题"
                            }
                        }
                    },
                    {
                        type: formItemType.Para,
                        name: "段落文本",
                        prop: {
                            text: {
                                label: "段落文本",
                                value: "段落"
                            }
                        }
                    },
                    {
                        type: formItemType.Divider,
                        name: "分割线",
                        prop: {
                            lineType: {
                                label: "线条类型",
                                selected: 0,
                                value: ["", ""]
                            }
                        }
                    },
                    {
                        type: formItemType.Input,
                        name: "输入框",
                        prop: {
                            require: {
                                label: "是否为必填",
                                value: false
                            },
                            label: {
                                label: "标签",
                                value: "输入框"
                            },
                            value: {
                                label: "默认值",
                                value: ""
                            },
                            placeholder: {
                                label: "输入提示",
                                value: ""
                            }
                        }
                    },
                    {
                        type: formItemType.Textarea,
                        name: "文本域",
                        prop: {
                            require: {
                                label: "是否为必填",
                                value: false
                            },
                            label: {
                                label: "标签",
                                value: "文本域"
                            },
                            value: {
                                label: "默认值",
                                value: ""
                            },
                            placeholder: {
                                label: "输入提示",
                                value: ""
                            }
                        }
                    },
                    {
                        type: formItemType.Selection,
                        name: "下拉选项",
                        prop: {
                            require: {
                                label: "是否为必填",
                                value: false
                            },
                            label: {
                                label: "标签",
                                value: "下拉选项"
                            },
                            value: {
                                label: "默认选择",
                                value: -1
                            },
                            placeholder: {
                                label: "选择提示",
                                value: "请选择"
                            },
                            option: {
                                label: "选项",
                                value: [
                                    {
                                        label: "选项1",
                                        value: 0
                                    }
                                ]
                            }
                        }
                    },
                    {
                        type: formItemType.RadioList,
                        name: "单选列表",
                        prop: {
                            require: {
                                label: "是否为必填",
                                value: false
                            },
                            value: {
                                label: "默认选择",
                                value: -1
                            },
                            label: {
                                label: "标签",
                                value: "单选列表"
                            },
                            placeholder: {
                                label: "选择提示",
                                value: ""
                            },
                            option: {
                                label: "选项",
                                value: [
                                    {
                                        label: "选项1",
                                        value: 0
                                    },
                                    {
                                        label: "选项2",
                                        value: 1
                                    },
                                    {
                                        label: "选项3",
                                        value: 2
                                    }
                                ]
                            }
                        }
                    },
                    {
                        type: formItemType.CheckboxList,
                        name: "多选列表",
                        prop: {
                            require: {
                                label: "是否为必填",
                                value: false
                            },
                            label: {
                                label: "标签",
                                value: "多选列表"
                            },
                            value: {
                                label: "默认选择",
                                value: [],
                                editable: false
                            },
                            minCount: {
                                label: "最小选择数量",
                                value: 0
                            },
                            maxCount: {
                                label: "最大选择数量",
                                value: 1
                            },
                            placeholder: {
                                label: "选择提示",
                                value: ""
                            },
                            option: {
                                label: "选项",
                                value: [
                                    {
                                        label: "选项1",
                                        value: 0
                                    },
                                    {
                                        label: "选项2",
                                        value: 1
                                    },
                                    {
                                        label: "选项3",
                                        value: 2
                                    }
                                ]
                            }
                        }
                    },
                ],
                footer: {
                    text: "提交"
                }
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
            request.post("/api/admin/form/submit", {
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
            this.formObj = Object.assign({}, this.oriFormObj);
        },
        getForm() {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const formId = urlSearchParams.get("id");
            if (formId) {
                request.get("/api/admin/form/get", {id: formId})
                    .then(res => {
                        this.oriFormObj = Object.assign({}, JSON.parse(res.form));
                        this.formObj = Object.assign({}, this.oriFormObj);
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
        <el-scrollbar height="750">
            <el-form>
                <!--表单头部-->
                <div class="formHeader">
                    <h2 style="text-align: center">{{ formObj.header.title }}</h2>
                    <v-md-preview :text="formObj.header.text"></v-md-preview>
                </div>
                <!--表单主体-->
                <div class="formBody">
                    <div v-for="(element, index) in formObj.formItemList" :key="index">
                        <div class="itemBody">
                            <!--控件标签-->
                            <el-form-item v-if="element.prop.label" class="itemLabel" style="margin-bottom: .5em;">
                                            <span v-if="element.prop.require.value"
                                                  style="color: red;font-weight: bold;margin-right: .5em;">*</span>
                                <span style="font-size: 1.2em;">{{ element.prop.label.value }}</span>
                            </el-form-item>
                            <!--控件主体-->
                            <el-form-item v-if="element.type === formItemType.SubTitle">
                                <h3>{{ element.prop.text.value }}</h3>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Para" class="para">
                                <v-md-preview :text="element.prop.text.value"></v-md-preview>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Divider">
                                <el-divider :line-type="element.prop.lineType.selected"/>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Input">
                                <el-input v-model="element.prop.value.value" clearable
                                          :placeholder="element.prop.placeholder.value"
                                          :required="element.prop.require.value"/>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Textarea">
                                <el-input v-model="element.prop.value.value" type="textarea"
                                          :placeholder="element.prop.placeholder.value"
                                          :required="element.prop.require.value"/>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.Selection">
                                <el-select class="selection" v-model="element.prop.value.value" clearable
                                           :placeholder="element.prop.placeholder.value"
                                           :required="element.prop.require.value"
                                           @clear="element.prop.value.value=-1">
                                    <el-option
                                        v-for="(option, index) in element.prop.option.value"
                                        :key="index"
                                        :label="option.label"
                                        :value="index">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.RadioList">
                                <el-radio-group v-model="element.prop.value.value"
                                                :required="element.prop.require.value"
                                                style="width: 100%;">
                                    <div
                                        style="margin-top: 5px;width: 100%;display: flex;align-items:center;;border: 1px solid lightgray;border-radius: 5px"
                                        v-for="(option, index) in element.prop.option.value"
                                        :key="index">
                                        <el-radio :label="option.value" :value="index"
                                                  style="margin: .2em .5em; width: 100%;">
                                            {{ option.label }}
                                        </el-radio>
                                    </div>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-if="element.type === formItemType.CheckboxList">
                                <el-checkbox-group v-model="element.prop.value.value"
                                                   :min="element.prop.minCount.value"
                                                   :max="element.prop.maxCount.value>element.prop.minCount.value?element.prop.maxCount.value:element.prop.minCount.value"
                                                   :required="element.prop.require.value"
                                                   style="width: 100%;">
                                    <div
                                        style="margin-top: 5px;border: 1px solid lightgray;border-radius: 5px"
                                        v-for="(option, index) in element.prop.option.value"
                                        :key="index">
                                        <el-checkbox :label="option.value" :value="index"
                                                     style="margin: .2em .5em; width: 100%;">
                                            {{ option.label }}
                                        </el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <!--表单末尾-->
                <div class="formFooter">
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </div>
            </el-form>
            {{ formObj }}
        </el-scrollbar>
    </div>
</template>

<style scoped>
.formContainer {
    width: 720px;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    padding: 1em 2em;
}

.formHeader {
    border-bottom: 1px solid lightgray;
}

.formBody {
    padding: 2em 4em;
}

.v-md-editor-preview .github-markdown-body {
    padding: 0;
}

.el-form-item {
    margin-bottom: 0;
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