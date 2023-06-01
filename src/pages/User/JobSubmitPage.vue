<!--action：必传参数，上传的地址，类型为String 
  headers：设置上传头部，类型为Object,一般为 Authorization: 'Bearer ' + Cookie.get('token'), 类型object
  multiple: 是否支持多选文件，true可以选多个，false只能选一个 类型boolean
  data：上传时的额外参数 类型object
  name: 上传的文件字段名字 类型string
  with-credentials: 支持发送 cookie 凭证信息,默认为true， 类型boolean
  show-file-list: 是否显示已上传文件列表,默认为true 类型boolean
  drag: 是否启用拖拽上传，默认为false             类型 boolean
  accept: 接收上传的文件类型，限制上传的文件格式，before-upload可以达到同样的效果 类型string
  on-preview：点击文件列表中已上传的文件时的钩子,就是点击已经上传文件列表触发的函数，比如点击已经上传的图片可以进行放大和删除 类型function(file)
  on-remove: 文件移除时的钩子，相当于我把文件点叉了，触发的函数 类型function(file, fileList)
  on-success：文件上传成功时的钩子，比如可以弹出上传成功，在一些文件列表新增中也可以做一些处理 类型function(response, file, fileList)
  on-error：文件上传失败出发的钩子 类型function(err, file, fileList)
  on-progress： 文件上传时的钩子，可以理解为文件上传触发的函数 类型function(event, file, fileList)
  on-change: 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 类型function(file, fileList)
  before-upload: 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传,同accept，可以做一些文件上传的限制，比如后缀名是不是为png/jpg之类的 类型 function(file)
  before-remove：删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除，优先级在on-remove之前 function(file, fileList)
  list-type:文件列表上传的类型，比如我类型为picture-card或者text，可选列表text/picture/picture-card，默认为text 类型string
  auto-upload: 是否在选取文件后立即进行上传，默认为true 类型boolean
  file-list: 上传的文件列表，默认为[] 数组形式  类型：array
  http-request 覆盖默认的上传行为，可以自定义上传的实现,一些特殊需求可以用到 类型function
  disabled: 是否禁用 默认为flase 类型boolean
  limit: 最大允许上传个数 number类型 	类型number
  on-exceed：文件超出个数限制时的钩子 类型function(files, fileList)
  :on-preview="handlePreview"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :on-change="fileChange"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :auto-upload="false"
  -->
 
<template>
  <div class="box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="选择作业"
        prop="job"
      >
        <el-select
          v-model="ruleForm.job"
          placeholder="请选择要提交的作业"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>

        </el-select>
      </el-form-item>
    </el-form>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="submitUpload(userId,ruleForm.job)"
      :before-upload="beforeAvatarUpload"
      :on-success="handleFileSuccess"
    >
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
      >选取文件</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >点击上传文件，且不超过50MB</div>
    </el-upload>
  </div>
</template>

<script>
import { getAllUserJobs, userUpload } from '../../../src/api/index.js';
export default {
  data () {
    return {
      userId: "1",
      ruleForm: {
        job: "",
      },
      options: [],
      rules: {
        job: [
          {
            required: true,
            message: "请选择要提交的作业",
            trigger: "change",
          },
        ],
      },
      fileList: [],
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      let params = this.userId;
      getAllUserJobs(params).then((res) => {
        // console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].state == "CONFIRMED" || res.data[i].state == "SUBMITTED") {
            this.options.push(res.data[i])
          }
        }

      })
    },
    //限制上传文件的大小
    beforeAvatarUpload (file) {
      const isLt50M = (file.size / 1024 / 1024) < 50;
      if (!isLt50M) {
        //this.loading = false;
        this.$message.error("上传文件大小不超过50MB");
        //this.$refs.upload.clearFiles();
        return false
      } else {
        this.$message.success("文件大小格式正确");
      }
      return true;
    },
    //文件上传成功后
    handleFileSuccess (res) {
      // console.log(res.status)
      if (res.status == 1) {
        this.$notify({
          title: "上传成功",
          type: "success"
        })
      } else {
        this.$notify({
          title: "上传失败",
          type: "error"
        })
      }
    },
    // 选择文件、移除文件、上传文件成功/失败后，都会触发
    fileChange (files, fileList) {
      this.fileList = fileList
      console.log(fileList);
    },

    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList);
      this.fileList = fileList
    },
    handlePreview (file) {
      console.log(file);
    },
    submitUpload (id, jobid) {
      // this.$refs.upload.submit();
      return `${this.$store.state.HOST}/userJob/uploadFile?userId=${id}&jobId=${jobid}`
      //userUpload(params).then((res) => {
      // console.log(res.data);
      //})
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
</style>
