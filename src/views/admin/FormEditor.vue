<script>
import draggable from "vuedraggable";
import index from "vuex";
import {Close, Delete} from "@element-plus/icons-vue";

const formItemType = {
    SubTitle: 0,
    Para: 1,
    Divider: 2,
    Input: 3,
    Textarea: 4,
    Selection: 5,
    RadioList: 6,
    CheckboxList: 6,
};

export default {
    components: {
        Delete,
        draggable,
    },
    data() {
        return {
            formItemType: formItemType,
            groupAvailableFormItemArr: {
                name: "AvailableFormItem",
                put: false, //拖入
                pull: "clone",
            },
            groupFormItemList: {
                name: "FormItem",
                put: true, //拖入
                pull: true,
            },
            formObj: {
                id: "",
                countPerUser: 1,
                header: {
                    title: "编辑标题",
                    text: "编辑说明"
                },
                formItemList: [],
                footer: {
                    text: "提交"
                }
            },
            activeItem: {},

            modules: {
                availableFormItemArr: [
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
                            value: {
                                label: "默认值",
                                value: -1
                            },
                            placeholder: {
                                label: "选择提示",
                                value: ""
                            },
                            option: {
                                label: "选项",
                                value: []
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
                                label: "默认值",
                                value: -1
                            },
                            placeholder: {
                                label: "选择提示",
                                value: ""
                            },
                            option: {
                                label: "选项",
                                value: []
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
                            value: {
                                label: "默认值",
                                value: -1
                            },
                            minCount: {
                                label: "最小选择数量",
                                value: 1
                            },
                            maxCount: {
                                label: "最大选择数量",
                                value: -1
                            },
                            placeholder: {
                                label: "选择提示",
                                value: ""
                            },
                            option: {
                                label: "选项",
                                value: []
                            }
                        }
                    },
                ],
            },

        };
    },
    methods: {}
};
</script>

<template>
    <el-card>
        <template #header>
            <span>表单编辑</span>
        </template>
        <el-row>
            <!--元素列表-->

            <el-col :span="6">
                <el-scrollbar height="650">
                    <div class="grid-content">
                        <draggable :list="modules.availableFormItemArr" ghost-class="ghost" :force-fallback="true"
                                   chosen-class="chosenClass" animation="300" itemKey="id" :sort="false"
                                   :group="groupAvailableFormItemArr">
                            <template #item="{ element }">
                                <div class="formItemListCard">
                                    {{ element.name }}
                                </div>
                            </template>
                        </draggable>
                    </div>
                </el-scrollbar>
            </el-col>
            <el-divider style="height: inherit;" direction="vertical"/>
            <!--表格预览-->
            <el-col :span="11">
                <div class="grid-content">
                    <el-scrollbar height="600">
                        <div id="formHeader">
                            <h2 style="text-align: center">{{ formObj.header.title }}</h2>
                            <v-md-preview :text="formObj.header.text"></v-md-preview>
                        </div>
                        <el-divider/>
                        <!--元素编辑-->
                        <draggable :list="formObj.formItemList" ghost-class="ghost" :force-fallback="true"
                                   chosen-class="chosenClass" animation="300" itemKey="id"
                                   style="min-height: 5em"
                                   :group="groupFormItemList">
                            <template #item="{ element, index }">
                                <div class="formItemCard" @mousedown="activeItem=element">
                                    <div class="itemHeader">
                                        {{ element.name }}
                                        <el-icon style="float: right;cursor: pointer"
                                                 color="red"
                                                 @click="formObj.formItemList.splice(index, 1);activeItem={}">
                                            <Delete/>
                                        </el-icon>
                                    </div>
                                    <div class="itemBody">
                                        <div v-if="element.type === formItemType.SubTitle">
                                            <h3>{{ element.prop.text.value }}</h3>
                                        </div>
                                        <div v-if="element.type === formItemType.Para">
                                            <v-md-preview :text="element.prop.text.value"></v-md-preview>
                                        </div>
                                        <div v-if="element.type === formItemType.Divider">
                                            <el-divider :line-type="element.prop.lineType.selected"/>
                                        </div>
                                        <div v-if="element.type === formItemType.Input">
                                            <el-input v-model="element.prop.value.value" clearable
                                                      :placeholder="element.prop.placeholder.value"
                                                      :required="element.prop.require.value"/>
                                        </div>
                                        <div v-if="element.type === formItemType.Textarea">
                                            <el-input v-model="element.prop.value.value" type="textarea"
                                                      :placeholder="element.prop.placeholder.value"
                                                      :required="element.prop.require.value"/>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                        <el-divider/>
                        <div style="text-align: center">
                            <el-button type="success" plain>
                                {{ formObj.footer.text }}
                            </el-button>
                        </div>
                    </el-scrollbar>
                </div>
            </el-col>
            <el-divider style="height: inherit;" direction="vertical"/>
            <!--属性修改-->
            <el-col :span="6">
                <div class="grid-content" style="display: flex;flex-direction: column;height: 100%;width: 100%;">
                    <!--表单属性-->
                    <el-row style="flex: 1;">
                        <div class="grid-content" style="width: 100%;">
                            <div>
                                <h2>表格属性</h2>
                            </div>
                            <el-scrollbar height="250">
                                <!--<pre>-->
                                <!--{{ JSON.stringify(formObj, null, 2) }}-->
                                <!--</pre>-->
                                <h3>标题</h3>
                                <el-input v-model="formObj.header.title" clearable
                                          placeholder="标题"/>
                                <h3>表单说明（支持MD）</h3>
                                <el-input v-model="formObj.header.text" type="textarea"
                                          :autosize="{minRows:3,maxRows:6}"
                                          placeholder="说明"/>
                                <h3>表单ID</h3>
                                <el-input v-model="formObj.id" clearable
                                          placeholder="ID"/>
                                <h3>每人可填写次数</h3>
                                <el-input-number v-model="formObj.countPerUser" :min="-1"
                                                 placeholder="每人可填写次数"/>
                            </el-scrollbar>
                        </div>
                    </el-row>
                    <el-divider/>
                    <!--元素属性-->
                    <el-row style="flex: 1;">
                        <div class="grid-content" style="width: 100%;">
                            <div>
                                <h2>元素属性</h2>
                            </div>
                            <el-scrollbar height="200">
                                <template :key="index" v-for="(item, index) in activeItem.prop">
                                    <div class="propItem">
                                        <!--元素模板-->
                                        <div class="boolProp" style="display: flex;align-items: center;"
                                             v-if="typeof item.value === 'boolean'">
                                            <h3>{{ item.label }}</h3>
                                            <el-switch
                                                v-model="item.value"
                                                class="mt-2"
                                                style="margin-left: 24px"
                                                inline-prompt
                                                :active-icon="Check"
                                                :inactive-icon="Close"
                                            />
                                        </div>
                                        <div class="textProp" v-if="typeof item.value === 'string'">
                                            <h3>{{ item.label }}</h3>
                                            <el-input
                                                v-model="item.value"
                                                :placeholder="item.label"
                                                clearable
                                            />
                                        </div>
                                    </div>
                                </template>
                            </el-scrollbar>
                        </div>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <template #footer>
            <el-row justify="end">
                <el-col span="2">
                    <div style="margin-right: 0;margin-left: auto;">
                        <el-button plain>取消</el-button>
                        <el-button type="success" plain>创建</el-button>
                    </div>
                </el-col>
            </el-row>
        </template>
    </el-card>
</template>

<style scoped>
.formItemListCard {
    margin: 1em auto;
    width: 70%;
    user-select: none;
    cursor: move;
    padding: 1em;
    border: 1px solid lightgray;
    border-radius: 4px;
    transition: box-shadow .25s ease-in-out;
}

.formItemListCard:hover {
    box-shadow: rgba(0, 0, 0, 0.05) 0 0 5px 5px;
}

.formItemCard {
    margin: 1em auto;
    width: 90%;
    user-select: none;
    cursor: move;
    border: 1px solid lightgray;
    border-radius: 4px;
    transition: box-shadow .25s ease-in-out;
}

.formItemCard:hover {
    box-shadow: rgba(0, 0, 0, 0.05) 0 0 5px 5px;
}

.itemHeader{
    padding: 1em;
    border-bottom: 1px solid lightgray;
}

.itemBody{
    padding: 1em;
}
</style>