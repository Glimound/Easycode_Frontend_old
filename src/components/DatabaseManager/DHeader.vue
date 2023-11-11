<template>
  <div class="header">
    <el-tooltip
        effect="dark"
        content="返回"
        placement="bottom"
    >
        <el-button round plain @click="back">
            <el-icon class="el-icon-back"></el-icon>
        </el-button>
    </el-tooltip>
    <el-tooltip
        effect="dark"
        content="保存"
        placement="save"
    >
        <el-button round plain @click="save">
            <el-icon class="el-icon-files"></el-icon>
        </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
    methods: {
        back() {
            
        },
        save() {
            
        }
    }

}
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px;
    white-space: nowrap;
    overflow-x: auto;
    background: #fff;
    border-bottom: 1px solid #ddd;
}
</style>