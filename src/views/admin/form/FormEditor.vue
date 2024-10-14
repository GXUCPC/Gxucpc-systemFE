<script>
import draggable from "vuedraggable";
import store from "@/assets/js/store";
import {Delete} from "@element-plus/icons-vue";
import request from "@/assets/js/request/request";
import {ElMessage} from "element-plus";


export default {
    components: {
        Delete,
        draggable,
    },
    data() {
        return {
            formItemType: store.state.form.formItemType,
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
            groupItemPropOptionList: {
                name: "itemPropOptionList",
                put: false, //拖入
                pull: false,
            },
            formObj: {
                id: "",
                countPerUser: 1,
                contestId: "",
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
                availableFormItemArr: store.state.form.availableFormItemArr
            },

        };
    },
    methods: {
        async createForm(obj) {
            const data = {
                username: localStorage.getItem("username"),

                // 表单对象 formObject
                countPerUser: obj.countPerUser,
                title: obj.header.title,
                text: obj.header.text,

                formItemList: JSON.stringify(obj.formItemList),

                footer: obj.footer.text
            };
            console.log(data);
            this.$http.post("/admin/form/add", data,
                {token: localStorage.getItem("token")})
                .then(res => console.log(res))
                .catch(err => {
                    console.log(err);
                    ElMessage.error("创建失败");
                });
        }
    }
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
            <!--表单预览-->
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
                                        <!--控件标签-->
                                        <div v-if="element.prop.label" class="itemLabel" style="margin-bottom: .5em;">
                                            <span v-if="element.prop.require.value"
                                                  style="color: red;font-weight: bold;margin-right: .5em;">*</span>
                                            <span style="font-size: 1.2em;">{{ element.prop.label.value }}</span>
                                        </div>
                                        <!--控件主体-->
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
                                        <div v-if="element.type === formItemType.Selection">
                                            <el-select class="Selection" v-model="element.prop.value.value" clearable
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
                                        </div>
                                        <div v-if="element.type === formItemType.RadioList">
                                            <el-radio-group v-model="element.prop.value.value"
                                                            :required="element.prop.require.value"
                                                            style="width: 100%;">
                                                <div
                                                    style="width: 95%;margin: 3px auto;border: 1px solid lightgray;border-radius: 5px"
                                                    v-for="(option, index) in element.prop.option.value"
                                                    :key="index">
                                                    <el-radio :label="option.value" :value="index"
                                                              style="margin: .2em .5em; width: 100%;">
                                                        {{ option.label }}
                                                    </el-radio>
                                                </div>
                                            </el-radio-group>
                                        </div>
                                        <div v-if="element.type === formItemType.CheckboxList">
                                            <el-checkbox-group v-model="element.prop.value.value"
                                                               :min="element.prop.minCount.value"
                                                               :max="element.prop.maxCount.value>element.prop.minCount.value?element.prop.maxCount.value:element.prop.minCount.value"
                                                               :required="element.prop.require.value"
                                                               style="width: 100%;">
                                                <div
                                                    style="width: 95%;margin: 3px auto;border: 1px solid lightgray;border-radius: 5px"
                                                    v-for="(option, index) in element.prop.option.value"
                                                    :key="index">
                                                    <el-checkbox :label="option.value" :value="index"
                                                                 style="margin: .2em .5em; width: 100%;">
                                                        {{ option.label }}
                                                    </el-checkbox>
                                                </div>
                                            </el-checkbox-group>
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
                            <el-scrollbar height="200">
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
                                <h3>比赛ID</h3>
                                <el-input v-model="formObj.contestId" clearable
                                          placeholder="ID"/>
                                <h3>每人可填写次数</h3>
                                <el-input-number v-model="formObj.countPerUser" :min="-1"
                                                 placeholder="每人可填写次数"/>
                            </el-scrollbar>
                        </div>
                    </el-row>
                    <el-divider style="height: 1em;margin: .5em 0;"/>
                    <!--元素属性-->
                    <el-row style="flex: 1;">
                        <div class="grid-content" style="width: 100%;">
                            <div>
                                <h2>元素属性</h2>
                            </div>
                            <el-scrollbar height="200">
                                <!--{{ activeItem }}-->
                                <template v-for="(item, index) in activeItem.prop">
                                    <div :key="index" v-if="item.editable!==false" class="propItem">
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
                                        <div class="numberProp"
                                             v-if="typeof item.value === 'number' && activeItem.prop.option.value.length">
                                            <h3>{{ item.label }}</h3>
                                            <el-input-number
                                                v-model="item.value"
                                                :min="-1"
                                                :max="activeItem.prop.option.value.length"
                                                :placeholder="item.label"
                                            />
                                        </div>
                                        <div class="itemListProp" v-if="Array.isArray(item.value)">
                                            <h3>{{ item.label }}</h3>
                                            <div style="padding: .5em;border: 1px solid lightgray;border-radius: 4px;">
                                                <draggable :list="item.value" ghost-class="ghost"
                                                           chosen-class="chosenClass" animation="300" itemKey="id"
                                                           :group="groupItemPropOptionList">
                                                    <template #item="{ element, index }">
                                                        <div class="itemListPropItem">
                                                            <el-input
                                                                v-model="element.label"
                                                                clearable
                                                                placeholder="显示文本"
                                                                style="width: 100%"
                                                            />
                                                            <!--<el-input-->
                                                            <!--    v-model="element.value"-->
                                                            <!--    clearable-->
                                                            <!--    placeholder="选项值"-->
                                                            <!--    style="width: 100%"-->
                                                            <!--/>-->
                                                            <el-icon
                                                                class="itemListPropItemIcon"
                                                                style="float: right;cursor: pointer"
                                                                color="red"
                                                                @click="item.value.splice(index, 1)">
                                                                <Delete/>
                                                            </el-icon>
                                                        </div>
                                                    </template>
                                                </draggable>
                                                <el-button
                                                    type="primary" plain
                                                    style="margin: .5em auto;"
                                                    @click="item.value.push({label: '', value: item.value.length})">
                                                    添加
                                                </el-button>
                                            </div>
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
                        <el-button type="success" plain @click="createForm(formObj)">创建</el-button>
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

.itemHeader {
    padding: 1em;
    border-bottom: 1px solid lightgray;
}

.itemBody {
    padding: 1em;
}

.itemLabel ~ * {
    margin: 0 1em;
}

.itemListPropItem {
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    padding: .2em;
    margin-bottom: .2em;
}

.itemListPropItemIcon {
    padding: .5em;
}


</style>