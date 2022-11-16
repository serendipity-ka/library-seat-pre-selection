<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    ><i class="el-icon-menu"></i> 学生</el-breadcrumb-item
                >
                <el-breadcrumb-item>信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input
                v-model="select_word"
                placeholder="输入学生姓名"
                class="handle-input mr10"
            ></el-input>
            <el-button type="primary" icon="search" @click="search"
                >搜索</el-button
            >
            <el-button type="primary" @click="operaForm('add')">添加</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            ref="multipleTable"
        >
            <el-table-column prop="id" label="学号">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="idCard" label="身份证" width="180">
            </el-table-column>
            <el-table-column prop="department" label="院系">
            </el-table-column>
            <el-table-column prop="grade" label="专业">
            </el-table-column>
            <el-table-column prop="class" label="班级">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="150">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total"
                :page-size="pagesize"
            >
            </el-pagination>
        </div>

        <!--新增/修改-->
        <el-dialog
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @close="resetForm('userForm')"
            :title="isModelType === 'add' ? '新增' : '修改'"
            :visible.sync="userFormVisible"
            width="50%"
        >
            <el-form
                :model="userForm"
                :rules="rules"
                ref="userForm"
                label-width="120px"
            >
                <el-form-item label="学号：" prop="id">
                    <el-input
                        v-model="userForm.id"
                        placeholder="请输入学号"
                        :disabled="isModelType !== 'add'"
                    ></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input
                        v-model="userForm.name"
                        placeholder="请输入姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="身份证：" prop="idCard">
                    <el-input
                        v-model="userForm.idCard"
                        placeholder="请输入身份证"
                    ></el-input>
                </el-form-item>
                <el-form-item label="系部：" prop="department">
                    <el-input
                        v-model="userForm.department"
                        placeholder="请输入系部"
                    ></el-input>
                </el-form-item>
                <el-form-item label="专业：" prop="grade">
                    <el-input
                        v-model="userForm.grade"
                        placeholder="请输入专业"
                    ></el-input>
                </el-form-item>
                <el-form-item label="班级：" prop="class">
                    <el-input
                        v-model="userForm.class"
                        placeholder="请输入班级"
                    ></el-input>
                </el-form-item>
                <el-form-item label="日期：" prop="date">
                    <el-input
                        v-model="userForm.date"
                        placeholder="请输入日期"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('userForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('userForm')"
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
            tableData: [],
            pagesize: 10,
            total: 0,
            cur_page: 1,
            select_word: "",
            userFormVisible: false,
            isModelType: "",
            userForm: {
                id: "",
                name: "",
                idCard: "",
                department: "",
                grade: "",
                class: "",
                date: "",
            },
            rules: {
                id: [
                    {
                        required: true,
                        message: "请输入学号",
                        trigger: "blur",
                    },
                ],
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur",
                    },
                ],
                idCard: [
                    {
                        required: true,
                        message: "请输入身份证号",
                        trigger: "blur",
                    },
                ],
                department: [
                    {
                        required: true,
                        message: "请输入系部",
                        trigger: "blur",
                    },
                ],
                grade: [
                    {
                        required: true,
                        message: "请输入专业",
                        trigger: "blur",
                    },
                ],
                class: [
                    {
                        required: true,
                        message: "请输入班级",
                        trigger: "blur",
                    },
                ],
                date: [
                    {
                        required: true,
                        message: "请输入日期",
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
        ...mapGetters(["student"]),
    },
    methods: {
        ...mapActions(["addStudent", "updateStudent", "delStudent"]),
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            let tableData = [];
            let list = this.student;
            if (this.select_word !== "") {
                list = this.student.filter((x) => x.name == this.select_word);
            }
            this.total = list.length;
            let index = 1;
            for (
                let i = (this.cur_page - 1) * this.pagesize;
                i < list.length;
                i++
            ) {
                if (index > this.pagesize) {
                    break;
                }
                tableData.push(list[i]);
                index++;
            }
            this.tableData = tableData;
        },
        search() {
            this.getData();
        },
        operaForm(type, row = {}) {
            this.userForm = {};
            this.userFormVisible = true;
            if (type === "add") this.isModelType = "add";
            else {
                this.isModelType = "update";
                this.userForm = { ...row };
            }
        },
        resetForm(formName) {
            // this.$refs[formName].clearValidate();
            this.userFormVisible = false;
        },
        submitForm(formName) {
            let isValid = false;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    isValid = true;
                }
            });
            if (isValid) {
                if (this.isModelType === "add") {
                    this.addStudent(this.userForm);
                } else {
                    this.updateStudent(this.userForm);
                }
                this.getData();
                this.userFormVisible = false;
            }
        },
        handleEdit(index, row) {
            this.operaForm("update", row);
        },
        handleDelete(index, row) {
            this.delStudent(row);
            this.$message.success("删除成功!");
            this.getData();
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
</style>
