// 新規DB作成
const db = new Dexie("scheduler_db");

// ストア定義
db.version(1).stores({
    schedule: "++id, dow, start, end, plan"
});

// データ追加
const putData = (obj) => {
    db.schedule.put(obj).catch((error) => {
        console.log(error);
    })
};

// データ削除
const deleteData = (id) => {
    db.schedule.delete(id);
}
