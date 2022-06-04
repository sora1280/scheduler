//tableの取得
let table = document.getElementById('mainTable');

//入力データ保持用配列
let data = {
    dow : [], //曜日の値
    start : [], // 開始時刻
    end : [], //終了時刻
    plan : []  //
};

let allData =

// 時間軸の生成
function timeBar() {
    let time = [];
    for(let i = 5; i < 24; i++) {
        for(let j = 0; j <= 45; j = j + 15) {
            let newRow = table.insertRow();
            let cell = newRow.insertCell(-1);
            if (j === 0) {
                time.push(i + ":00");
                if (i < 10) {
                    cell.innerHTML =  "0" + i + ":00";
                } else {
                    cell.innerHTML = i + ":00";
                }
            } else {
                time.push(i + ":" + j);
                if (i < 10) {
                cell.innerHTML = "0" + i + ":" + j;
                } else {
                cell.innerHTML = i + ":" + j;
                }
            }
            //空セルの生成
            for(let x = 0; x < 7; x++) {
                newRow.insertCell(-1);
            }
        }
    }

    for(let l = 0; l < 5; l++) {
        for(let k = 0; k <= 45; k = k + 15) {
            let newRow = table.insertRow();
            let cell = newRow.insertCell(-1);
            if (k === 0) {
                time.push(l + ":00");
                cell.innerHTML = "0" + l + ":00";
            } else {
                time.push(l + ":" + k);
                cell.innerHTML = "0" + l + ":" + k;
            }

            // 空セルの生成
            for(let x = 0; x < 7; x++) {
                newRow.insertCell(-1);

            }
        }
    }

    //予定の保持
    for(let f = 0; f < data.plan.length; f++) {
        allData.
        writePlan(allData);
    }
    table.rows[1].cells[6].innerHTML = "わーい";


}

// 列の取得
function getDow(dow) {
    if(dow === "月曜日") {
        return 1;
    } else if(dow === "火曜日") {
        return 2;
    } else if(dow === "水曜日") {
        return 3;
    } else if(dow === "木曜日") {
        return 4;
    } else if(dow === "金曜日") {
        return 5;
    } else if(dow === "土曜日") {
        return 6;
    } else {
        return 7;
    }
}

// 予定
function plan(dow, startValue, endValue, planValue) {
    console.log('plan');
    //時間を時と分に分ける
    const splitStart = String(startValue).split(":");
    const startHour = splitStart[0];
    const startMinutes = splitStart[1];

    const splitEnd = String(endValue).split(":");
    const endHour = splitEnd[0];
    const endMinutes = splitEnd[1];

    writePlan(dow, startHour, startMinutes, endHour, endMinutes, planValue);

}

//予定の生成
function writePlan(dow, startHour, startMinutes, endHour, endMinutes, planValue) {
    let dowNum = getDow(dow);
    startHour = correspondenceHour(startHour);
    startMinutes = correspondenceMinutes(startMinutes);

    let planNum = startHour * 4 + startMinutes;

    table.rows[planNum].cells[dowNum].innerText = String(planValue);
    table.rows[planNum].cells[1].innerHTML = "わーい";
}

//時、分のセル位置に対応させるための変更
function correspondenceHour(hour) {
    if(24 > hour && hour > 4) {
        hour = hour - 5;
    } else {
        hour = hour + 19;
    }

    return hour;
}

function correspondenceMinutes(minutes) {
    switch(minutes) {
        case "00":
            minutes = 0;
            break;
        case "15":
            minutes = 1;
            break;
        case "30":
            minutes = 2;
            break;
        case "45":
            minutes = 3;
            break;
    }
    return minutes;
}

// 決定ボタンを押したときの動作
function save() {
    // 要素の取得
    const dow = document.getElementsByName("dow");
    const startTime = document.getElementById("startTime");
    const endTime = document.getElementById("endTime");
    const planName = document.getElementById("planName");

    const dowValue = dow.value;
    const startValue = startTime.value;
    const endValue = endTime.value;
    const planValue = planName.value;

    data.dow = dowValue;
    data.start = startValue;
    data.end = endValue;
    data.plan = planValue;

    console.log(data);

    plan(data);

}

// リロードした時の読み込みなおし
window.onload = function () {
    timeBar();
    writePlan()
}


const main = () => {

}

main();