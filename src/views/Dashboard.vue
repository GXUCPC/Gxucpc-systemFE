<template>
    <el-row :gutter="24">
        <el-col :span="8">
            <el-card shadow="always">
                <el-row>
                    <el-col :span="10">

                        <div class="image-user">
                            <img class="avatar" src="@/assets/images/user.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="user-info">
                            <p class="admin-info-name">西大小迷弟</p>
                            <p>Super Admin</p>
                        </div>
                    </el-col>

                </el-row>
            </el-card>
        </el-col>

    </el-row>

</template>

<style>
.avatar {
    max-width: 100%;
}

.admin-info-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #409eff;
}
.user-info {
    margin-left: 20%;
    margin-top: 20;
}
</style>