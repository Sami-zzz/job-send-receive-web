<template>
  <div class="box">
    <div class="sm-box">
      <el-button
        type="text"
        @click="dialogVisible = true"
      >点击打开 通知</el-button>
      <el-button
        type="text"
        disabled
        class="time"
      >{{Noticetime}}</el-button>
    </div>

    <div class="sm-box">
      <el-button
        type="text"
        @click="dialogVisible = true"
      >点击打开 通知</el-button>
      <el-button
        type="text"
        disabled
        class="time"
      >{{Noticetime}}</el-button>
    </div>

    <div class="sm-box">
      <el-button
        type="text"
        @click="dialogVisible = true"
      >点击打开 通知</el-button>
      <el-button
        type="text"
        disabled
        class="time"
      >{{Noticetime}}</el-button>
    </div>

    <el-dialog
      title="通知标题"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      Noticetime: '2022-10-06'
    };
  },
  methods: {
    handleClose (done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
  },
};
</script>
<style scoped>
.box {
  width: 1000px;
  margin-top: 100px;
  margin-left: 200px;
  background-color: #fff;
  padding: 20px;
}
.sm-box {
  background-color: #fff;
  margin-top: 10px;
}
.time {
  margin-left: 600px;
}
</style>
