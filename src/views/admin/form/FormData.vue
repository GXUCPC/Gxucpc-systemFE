<script>
import {reactive} from "vue";

import TextAnalyse from "@/views/admin/form/TextAnalyse.vue";
import SelectionAnalyse from "@/views/admin/form/SelectionAnalyse.vue";

export default {
    components: {
        TextAnalyse,
        SelectionAnalyse,
    },
    data() {
        return {
            AnalyseType: {
                Text: 0,
                Selection: 1,
            },
            AnalyseTabList: reactive([]),
        };
    },
    methods: {
        addAnalyseTab(index, type) {

        }
    }
};
</script>

<template>
    <el-tabs>

    </el-tabs>
</template>

<style scoped>

</style>