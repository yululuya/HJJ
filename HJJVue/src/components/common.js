import XLSX from "xlsx";
// 从网络上读取某个excel文件，url必须同域，否则报错
export function readWorkbookFromRemoteFile(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function (e) {
    if (xhr.status == 200) {
      var bytes = new Uint8Array(xhr.response);
      var length = bytes.byteLength;
      var binary = "";
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      // 接下来就是xlsx了，具体可看api
      let wb = XLSX.read(binary, {
        type: "binary"
      });
      let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      this.$emit("getResult", outdata);
      console.log(outdata);
    }
  };
  xhr.send();
}