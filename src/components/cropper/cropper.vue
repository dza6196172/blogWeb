<template>
  <div class="cropper" v-if="containerShow">
    <div class="box">
      <div class="leftPreview" :style="{ width: 200 * ratio +'px' }">
        <div class="preview"></div>
      </div>
      <div class="rightCutArea">
        <img :src="uncutimg" ref="image" alt="" />
      </div>
      <div class="info" :style="{ width: 200 * ratio +'px' }">
        <div class="cutRatio">裁剪比例：{{ 200 * ratio }}×200</div>
        <div class="cancel">
          <d-button content="取消" @click="cancelCut"></d-button>
        </div>
        <div class="confirm">
          <d-button content="确认" @click="ensurecut"></d-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  name: "cropper",
  data() {
    return {
      uncutimg: "",
      containerShow: false,
      imgUrl: "",
      cropper:null
    };
  },
  props: {
    file: {
      type: File,
      default() {
        return null;
      },
    },
    ratio: {
      type: Number,
      default() {
        return 1;
      },
    },
  },
  watch: {
    file(newval, oldval) {
      if(newval){
        this.triggerFile(newval);
      }
    },
  },
  methods: {
    triggerFile(file) {
      this.containerShow = true; //展示裁剪区域
      if (this.cropper) {
        this.cropper.destroy();
      }
      this.uncutimg = URL.createObjectURL(file); //获取文件url值给未裁剪的img

      var reader = new FileReader(); //FileReader将图片url转换成base64格式
      reader.readAsDataURL(file); //将图片读取为DataURL

      let that = this;
      reader.onload = function () {
        that.imgUrl = this.result; //imgUrl为base64格式
        that.initCropper(); //使用cropper
      };
    },
    initCropper() {
      this.cropper = new Cropper(this.$refs.image, {
        viewMode: 1, //视图控制，限制裁剪框不能超出图片的范围
        dragMode: "crop", //拖拽图片模式，可形成新的裁剪框
        aspectRatio: this.ratio, //设置裁剪框为固定的宽高比
        preview: ".preview", //预览的div
      });
    },
    cancelCut(){
      this.cropper.destroy();
      this.$parent.cropperfile = null
      this.containerShow = false
    },
    ensurecut() {
      var canvas = this.cropper.getCroppedCanvas({   //获取裁剪的canvas图像
        imageSmoothingQuality: "high",
      });   
      let that = this;
      canvas.toBlob(function (blobObj) {  //将canvas转为blob
        let file = new window.File([blobObj], 'cover', {  //将blob转为png图像
          type: "image/png",
        });
        var formData = new FormData();  //创建formdata对象
        formData.append("file", file);  //添加file
        that.$emit('cutImage',formData,file)
      });
 
      this.containerShow = false;
      this.cropper.destroy();
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.6);
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: fit-content;
    height: 450px;
    background-color: white;
    border-radius: 15px;
    border: 3px solid #090909;
    overflow: hidden;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    position: relative;
    .leftPreview {
      // width: 300px;
      height: 200px;
      overflow: hidden;
      border: 2px solid #090909;
      margin-left: 20px;
      .preview {
        width: 100%;
        height: 100%;
      }
    }
    .rightCutArea {
      width: 400px;
      height: 400px;
      border: 2px solid #090909;
      overflow: hidden;
    }
    .info{
      position: absolute;
      top: 240px;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .cutRatio{
        font-size: 14px;
        color: gray;
      }
      .cancel,.confirm{
        margin-top: 20px;
        .d-button{
          width: 100%;
        }
      }
    }
  }
}
</style>
