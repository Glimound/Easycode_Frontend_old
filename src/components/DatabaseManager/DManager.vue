<template>
  <div v-if="!isNull">
    <div class="info">
        <div v-if="!isTitleEditing">
            <h2 style="display: inline-block">{{info.name}}</h2>
            <i class="el-icon-edit icon" @click="editTitle()"></i>
        </div>
        <div v-if="isTitleEditing">
            <el-input class="edit-input" size="medium" v-model="editInput" placeholder="请输入内容"></el-input>
            <i class="el-icon-check icon" @click="editTitleConfirm()"></i>
        </div>
        <el-radio-group class="radio-group" v-model="switching">
          <el-radio-button label="视图"></el-radio-button>
          <el-radio-button label="设置"></el-radio-button>
        </el-radio-group>
    </div>
    <div v-if="switching === '设置'" class="cards">
        <el-card v-for="(field, index) in fields" :key="index" class="database-card">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input v-model="field.name" placeholder="键名"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="field.type" placeholder="类型" style="display: flex;">
                        <el-option label="字符" value="string"></el-option>
                        <el-option label="数字" value="number"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-button type="danger" @click="deleteField(index)">删除</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
    <div v-else class="table">
      <el-table :data="records" style="width: 100%" stripe>
        <el-table-column
          v-for="(field, index) in fields"
          :key="index"
          :prop="field.name"
          :label="field.name"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.$index === recordEditingRow"
              v-model="scope.row[field.name]"
              style="width: 120px;"
            >
            </el-input>
            <span v-else>{{ scope.row[field.name] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index === recordEditingRow"
              @click.native.prevent="editRowConfirm()"
              type="text"
              size="small">
              完成
            </el-button>
            <el-button
              v-else
              @click.native.prevent="editRow(scope.$index, scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, records)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="buttons">
      <el-button style="margin-top: 10px" @click="add">新增</el-button>
      <el-button style="margin-top: 10px" @click="saveTable">保存</el-button>
      <el-button style="margin-top: 10px" @click="deleteTable">删除表单</el-button>
    </div>
  </div>
  <div class="empty-wrapper" v-else>
    <el-empty description="暂无数据"></el-empty>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import eventBus from '@/utils/eventBus';
import { deepCopy } from '@/utils/utils';
export default {
  computed: {
    ...mapState(['currentTableInfo', 'currentTableFields', 'currentTableRecords'])
  },
  data() {
    return {
      switching: '视图',
      isTitleEditing: false,
      editInput: '',
      fields: [],
      records: [],
      info: {},
      aid: 0,
      isNull: true,
      recordEditingRow: -1
    }
  },
  methods: {
    add() {
      if (this.switching === '视图') {
        let obj = this.fields.reduce((acc, field) => {
          acc[field.name] = ''
          return acc
        }, {})
        this.records.push(obj)
      } else {
        this.fields.push({ name: '', type: '' })
      }
    },
    deleteField(index) {
      this.fields.splice(index, 1)
    },
    saveTable() {
      const invalidFields = this.fields.filter(field => !field.name || !field.type)
      const invalidInfo = !this.info.name
      if (invalidFields.length === 0 && !invalidInfo) {
        if (this.info.name !== this.currentTableInfo.name) {
          this.$store.dispatch('changeTableName', {
            aid: this.aid,
            tid: this.info.tid,
            name: this.info.name
          })
        }
        this.$store.dispatch('saveTableFields', {
          aid: this.aid,
          tid: this.info.tid,
          fields: this.fields,
          records: this.records
        })
        this.$message.success('保存成功')
      } else {
        this.$message.error('键名或类型不能为空')
      }
    },
    deleteTable() {
      this.$confirm('此操作将永久删除该表单, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteTable', {
          aid: this.aid,
          tid: this.info.tid
        })
        this.isNull = true
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {})
    },
    editTitle() {
      this.isTitleEditing = true
      this.editInput = this.info.name
    },
    editTitleConfirm() {
      this.info.name = this.editInput
      this.isTitleEditing = false
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    editRow(index, row) {
      this.recordEditingRow = index
    },
    editRowConfirm() {
      this.recordEditingRow = -1
    }
  },
  mounted() {
    eventBus.$on('DManagerInit', (aid) => {
      this.info = deepCopy(this.currentTableInfo)
      this.fields = deepCopy(this.currentTableFields)
      this.records = deepCopy(this.currentTableRecords)
      this.aid = aid
      this.isNull = false
    })
  }
}
</script>

<style lang="scss">
.cards {
    padding: 20px 20px 0px 20px;

    .database-card {
        margin-bottom: 15px;
    }
}

.table {
    padding: 20px 20px 10px 20px;
}

.buttons {
    padding: 0px 20px 20px 20px;
}

.info {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 5px 30px 5px 30px;
    height: 80px;
    
    .icon {
        display: inline-block;
        padding-left: 10px;
        color: #606266;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .icon:hover {
        color: #409EFF;
    }

    .edit-input {
        display: inline-block;
        width: 200px;
    }

    .radio-group {
        margin-left: 40px;
    }
}

.empty-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>