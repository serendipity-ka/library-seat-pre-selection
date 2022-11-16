import Vue from "vue";
//引用vue和vuex
import Vuex from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

//挂载Vuex
Vue.use(Vuex);
// 首先声明一个需要全局维护的状态 state
//创建Vuex对象
const state = {
    // 存放的键值对就是索要管理的状态
    libraryName: "华商图书馆",
    adminUser: {
        name: "系统管理员",
        userName: "root",
        pwd: "123456",
    },
    student: [
        {
            id: "001",
            name: "张三",
            idCard: "441581200001234152",
            department: "信息工程",
            grade: "软件工程",
            class: "四班",
            date: "2022-01-03",
        },
        {
            id: "002",
            name: "李四",
            idCard: "441581200011234174",
            department: "信息工程",
            grade: "软件工程",
            class: "五班",
            date: "2022-01-04",
        },
        {
            id: "003",
            name: "卖鱼强",
            idCard: "441581200010234354",
            department: "信息工程",
            grade: "计算机科学与技术",
            class: "一班",
            date: "2022-01-05",
        },
    ],
    seatList: [
        {
            id: "001",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-1",
        },
        {
            id: "002",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-2",
        },
        {
            id: "003",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-3",
        },
        {
            id: "004",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-4",
        },
        {
            id: "005",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-5",
        },
        {
            id: "006",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-6",
        },
        {
            id: "007",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-7",
        },
        {
            id: "008",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-8",
        },
        {
            id: "009",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-9",
        },
        {
            id: "010",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-10",
        },
        {
            id: "011",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-11",
        },
        {
            id: "012",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-12",
        },
        {
            id: "013",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-13",
        },
        {
            id: "014",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-14",
        },
        {
            id: "015",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-15",
        },
        {
            id: "016",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-16",
        },
        {
            id: "017",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-17",
        },
        {
            id: "018",
            booking: {
                userid: "",
                useTime: "",
            },
            used: false,
            name: "A-18",
        },
    ],
};

// 注册上面引入的各大模块
const store = new Vuex.Store({
    state, // 共同维护的一个状态，state里面可以是很多个全局状态
    getters, // 获取数据并渲染
    actions, // 数据的异步操作
    mutations, // 处理数据的唯一途径，state的改变或赋值只能在这里
});

export default store; // 导出store并在 main.js中引用注册。
