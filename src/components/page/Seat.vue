<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    ><i class="el-icon-menu"></i> 图书馆</el-breadcrumb-item
                >
                <el-breadcrumb-item>座位</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div>
            <div
                class="zuowei"
                v-for="(item, index) in seatListData"
                :key="index"
            >
                <img
                    @click="booking(item)"
                    v-if="!item.used"
                    src="../../assets/可选座位.png" class="yizi"
                />
                <img
                    @click="booking(item)"
                    v-if="item.used"
                    src="../../assets/已选座位.png" class="yizi"
                />
                <p @click="booking(item)">{{ item.name }}</p>
                <p v-if="item.used" @click="cancelBooking(item)" style="font-size:14px;margin-top:5px;color:red;">取消预约</p>
            </div>
        </div>

        <!--新增/修改-->
        <el-dialog
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @close="resetForm('bookingForm')"
            :title="'预约'"
            :visible.sync="bookingFormVisible"
            width="30%"
        >
            <el-form
                :model="bookingForm"
                :rules="rules"
                ref="bookingForm"
                label-width="120px"
            >
                <el-form-item label="学号：" prop="userid">
                    <el-input
                        v-model="bookingForm.userid"
                        placeholder="请输入学号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="预约时长：" prop="useTime">
                    <el-input
                        v-model="bookingForm.useTime"
                        placeholder="请输入预约时长"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('bookingForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('bookingForm')"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <!--end-->
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            seatListData: [],
            bookingFormVisible: false,
            bookingForm: {
                id: "",
                userid: "",
                useTime: "",
            },
            rules: {
                userid: [
                    {
                        required: true,
                        message: "请输入学号",
                        trigger: "blur",
                    },
                ],
                useTime: [
                    {
                        required: true,
                        message: "请输入预约时长",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    created() {
        this.getData();
    },
    computed: {
        ...mapGetters(["seatList", "student"]),
    },
    methods: {
        ...mapActions(["addBooking", "delBooking"]),
        getData() {
            this.seatListData = this.seatList;
        },
        resetForm(formName) {
            // this.$refs[formName].clearValidate();
            this.bookingFormVisible = false;
        },
        findStudent(userId) {
            return this.student.filter((x) => x.id == userId)[0];
        },
        submitForm(formName) {
            let isValid = false;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    isValid = true;
                }
            });
            if (isValid) {
                if (!this.findStudent(this.bookingForm.userid)) {
                    this.$message.warning("学号不存在!");
                    return;
                }
                this.addBooking(this.bookingForm);
                this.getData();
                this.bookingFormVisible = false;
                this.$message.success("预约成功!");
            }
        },
        booking(row) {
            if (row.used) {
                this.$message.warning("座位已被预约!");
            } else {
                this.bookingForm = {};
                this.bookingForm.id = row.id;
                this.bookingFormVisible = true;
            }
        },
        cancelBooking(row) {
            this.delBooking(row);
            this.$message.success("取消预约成功!");
        },
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.handle-select {
    width: 120px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}

.zuowei {
    width: 150px;
    height: 100px;
    text-align: center;
    float: left;
    cursor: pointer;
}
.yizi {
    width: 50px;
    height: 50px;
}
</style>
