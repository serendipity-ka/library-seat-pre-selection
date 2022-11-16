// 提交 mutations是更改Vuex状态的唯一合法方法
// export const modifyAName = (state, name) => {
//     state.resturantName = name;
// };
// export const modifyBName = (state, name) => {
//     state.resturantName = name;
// };

export function addStudent(state, user) {
     // 把方法传递过来的参数，赋值给state
    state.student = [...state.student, user];
}

export function updateStudent(state, user) {
    state.student = state.student.map((x) => {
        if (x.id == user.id) {
            return user;
        }
        return x;
    });
}

export function delStudent(state, user) {
    state.student = state.student.filter((x) => {
        return x.id !== user.id;
    });
}

export function addBooking(state, booking) {
    state.seatList = state.seatList.map((x) => {
        if (x.id == booking.id) {
            x.booking = {
                userid: booking.userid,
                useTime: booking.useTime,
            };
            x.used = true;
        }
        return x;
    });
}

export function delBooking(state, booking) {
    state.seatList = state.seatList.map((x) => {
        if (x.id == booking.id) {
            x.booking = {
                userid: "",
                useTime: "",
            };
            x.used = false;
        }
        return x;
    });
}
