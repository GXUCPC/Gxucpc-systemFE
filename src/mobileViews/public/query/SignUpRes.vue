<script>
import {ref} from "vue";
import {reactive} from "vue";
import SignUpForm from "@/views/public/query/SignUpForm.vue";


export default {
    components: {SignUpForm},
    data() {
        return {
            res: {
                name: "aaa",
                email: "bbb@ccc.com",
                list: [
                    {
                        contestId: "",
                        name: "南宁市赛",
                        list: [
                            {
                                team: "aaa",
                                time: 1425942400000,
                            },
                            {
                                team: "abaa",
                                time: 1425972400000,
                            }
                        ]
                    },
                    {
                        contestId: "",
                        name: "东信杯",
                        list: [
                            {
                                team: "abaa",
                                time: 1425972400000,
                            }]
                    },
                ],
            },
            signUpForm: reactive({
                visible: ref(false),
                contestId: "",
                content: {}
            })
        };
    }
};
</script>

<template>
    <div style="padding: 2em;">
        <div style="text-align: center;">
            <h1>报名情况查询结果</h1>
            <p>{{ res.name }}&lt;{{ res.email }}&gt;</p>
        </div>
        <div>
            <el-card :key="contest.contestId"
                     style="margin-bottom: 2em;"
                     v-for="contest in res.list">
                <template #header>
                    <span>{{ contest.name }}</span>
                </template>
                <el-button type="primary"
                           style="margin-bottom: 1em;"
                           @click="signUpForm.visible = true"
                           plain>
                    查看最新报名表
                </el-button>
                <el-table :data="contest.list" border>
                    <el-table-column label="队名" prop="team"></el-table-column>
                    <el-table-column label="报名时间" prop="time"
                                     :formatter="(row) => {return new Date(row.time).toLocaleString()} ">
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <el-dialog v-model="$data.signUpForm.visible"
                   title="报名表详情">
            <SignUpForm/>
        </el-dialog>
    </div>

</template>

<style scoped>

</style>