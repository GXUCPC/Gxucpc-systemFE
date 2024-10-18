import {createStore} from 'vuex';

let baseUrl;
switch (process.env.VUE_APP_CURENV) {
    case "development":
        baseUrl = "http://123.207.50.47:8080/api";
        break;
    case "production":
        baseUrl = "/api";
        break;
}

const formItemType = {
    SubTitle: 0,
    Para: 1,
    Divider: 2,
    Input: 3,
    Textarea: 4,
    Selection: 5,
    RadioList: 6,
    CheckboxList: 7,
    Email: 8,
    Phone: 9,
};

const formItemPropType = {
    text: 0,
    number: 1,
    selection: 2,
    option: 3,
};


export default createStore({
    state: {
        // 后端地址
        backURL: baseUrl,
        // 表单配置
        form: {
            formItemType: formItemType,
            formItemPropType: formItemPropType,
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
                            value: ""
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
                                }]
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
                                    value: 1
                                }
                            ]
                        }
                    }
                },
            ],
        }
    },
    mutations: {},
    actions: {},
    modules: {}
});

