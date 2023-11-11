import { nanoid } from "nanoid"

export default {
    state: {
        appsData: [],
        currentTableInfo: {},
        currentTableFields: [],
        currentTableRecords: []
    },
    mutations: {
        setAppsData(state, arr) {
            state.appsData = arr
        },
        setCurrentTableInfo(state, obj) {
            state.currentTableInfo = obj
        },
        setCurrentTableFields(state, arr) {
            state.currentTableFields = arr
        },
        setCurrentTableRecords(state, arr) {
            state.currentTableRecords = arr
        },
        clearAppsData(state) {
            state.appsData = []
        },
        clearCurrentTableInfo(state) {
            state.currentTableInfo = {}
        },
        clearCurrentTableFields(state) {
            state.currentTableFields = []
        },
        clearCurrentTableRecords(state) {
            state.currentTableRecords = []
        },
        addNewTable(state, obj) {
            state.appsData.forEach((app, index) => {
                if (app.aid === obj.aid) {
                    state.appsData[index].tables.push(obj.table)
                    return
                }
            })
            localStorage.setItem('appsData', JSON.stringify(state.appsData))
        },
        // 用于sidebar中切换navigation时，更新DManagaer的信息
        changeCurrentTableInfo(state, obj) {
            state.appsData.forEach((app, index1) => {
                if (app.aid === obj.aid) {
                    state.appsData[index1].tables.forEach((table, index2) => {
                        if (table.tid === obj.tid) {
                            state.currentTableInfo = state.appsData[index1].tables[index2]
                            return
                        }
                    })
                    return
                }
            })
        },
        setTableName(state, obj) {
            state.appsData.forEach((app, index1) => {
                if (app.aid === obj.aid) {
                    state.appsData[index1].tables.forEach((table, index2) => {
                        if (table.tid === obj.tid) {
                            state.appsData[index1].tables[index2].name = obj.name
                            localStorage.setItem('appsData', JSON.stringify(state.appsData))
                            state.currentTableInfo = state.appsData[index1].tables[index2]
                            return
                        }
                    })
                    return
                }
            })
        },
        removeTable(state, obj) {
            state.appsData.forEach((app, index1) => {
                if (app.aid === obj.aid) {
                    state.appsData[index1].tables.forEach((table, index2) => {
                        if (table.tid === obj.tid) {
                            state.appsData[index1].tables.splice(index2, 1)
                            localStorage.setItem('appsData', JSON.stringify(state.appsData))
                            return
                        }
                    })
                    return
                }
            })
        }
    },
    actions: {
        getAppsData({commit}, uid) {
            // TODO: 从远程获取appsData
            commit('setAppsData', JSON.parse(localStorage.getItem('appsData')))
        },
        createNewTable({commit}, aid) {
            return new Promise((resolve) => {
                // TODO: 从远程创建新表，返回新表的tid
                let tid = nanoid()
                commit('addNewTable', {
                    aid: aid,
                    table: {
                        tid: tid,
                        name: "未命名表单",
                    }
                })
                resolve(tid)
            })
        },
        getCurrentTableFields({commit}, obj) {
            // TODO: 从远程获取表字段
            let result = localStorage.getItem('tableData' + obj.aid + '_' + obj.tid)
            if (result === null) {
                result = []
            } else {
                result = JSON.parse(result).fields
            }
            commit('setCurrentTableFields', result)
        },
        getCurrentTableRecords({commit}, obj) {
            // TODO: 从远程获取表数据
            let result = localStorage.getItem('tableData' + obj.aid + '_' + obj.tid)
            if (result === null) {
                result = []
            } else {
                result = JSON.parse(result).records
            }
            commit('setCurrentTableRecords', result)
        },
        changeTableName({commit}, obj) {
            // TODO: 修改远程的表名
            commit('setTableName', obj)
        },
        saveTableFields({commit}, obj) {
            // TODO: 保存表数据到远程
            localStorage.setItem('tableData' + obj.aid + '_' + obj.tid, JSON.stringify({
                fields: obj.fields,
                records: obj.records
            }))
            commit('setCurrentTableFields', obj.fields)
        },
        deleteTable({commit}, obj) {
            // TODO: 删除远程数据表
            localStorage.removeItem('tableData' + obj.aid + '_' + obj.tid)
            commit('removeTable', obj)
        }
    }
}