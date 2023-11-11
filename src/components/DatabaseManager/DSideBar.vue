<template>
    <div>
        <el-row class="tac">
            <el-col>
                <el-menu :unique-opened="true">
                    <el-submenu v-for="(app, index1) in appsData" :key="index1" :index="index1.toString()">
                        <template slot="title">
                            <i class="el-icon-share"></i>
                            <span>{{app.name}}</span>
                        </template>
                        <el-menu-item v-for="(table, index2) in app.tables"
                            :key="index2"
                            :index="`${index1}-${index2}`"
                            @click="select(index1, index2)"
                        >
                            {{table.name}}
                        </el-menu-item>
                        <div class="button-container">
                            <el-button plain icon="el-icon-plus" class="button" @click="createNewTable(app.aid)">创建新数据表</el-button>
                        </div>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
    props: {
        appsData: {
            type: Array,
            required: true
        }
    },
    methods: {
        createNewTable(aid) {
            this.$store.dispatch('createNewTable', aid).then((tid) => {
                // 切换到新建的表单
                this.$store.commit('changeCurrentTableInfo', { aid, tid })
                this.$store.dispatch('getCurrentTableFields', { aid, tid })
                this.$store.dispatch('getCurrentTableRecords', { aid, tid })
                eventBus.$emit('DManagerInit', aid)
            })
        },
        select(index1, index2) {
            let aid = this.appsData[index1].aid
            let tid = this.appsData[index1].tables[index2].tid
            this.$store.commit('changeCurrentTableInfo', { aid, tid })
            this.$store.dispatch('getCurrentTableFields', { aid, tid })
            this.$store.dispatch('getCurrentTableRecords', { aid, tid })
            eventBus.$emit('DManagerInit', aid)
        }
    }
}
</script>

<style lang="scss">
.button-container {
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    .button {
        height: 40px;
        width: 180px;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
    }
}
</style>