//格式化时间
//dateTime：时间戳；  flag：取值为true/false，用于判断是否需要显示时分秒
export function getFormtTime(dateTime, flag) {
    if (dateTime != null && dateTime > 0) {
        //若传入的dateTime为字符串类型，需要进行转换成数值
        if (typeof (dateTime) === 'string') {
            var time = parseInt(dateTime)
        } else {
            var time = dateTime;
        }
        var date = new Date(time);
        //获取年份
        var YY = date.getFullYear();
        //获取月份
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //获取日期
        var DD = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        if (flag) { //flag为true，显示时分秒格式
            //获取小时
            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
            //获取分
            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            ///获取秒
            var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            //返回时间格式： 2022-06-28 13:14:52
            return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
        } else {
            //返回时间格式： 2022-06-28
            return YY + '-' + MM + '-' + DD;
        }
    } else {
        return "";
    }
}

//字符串转时间戳
export function dateStr2TimeTamp(dateStr){
   dateStr = dateStr.substring(0,19);
   dateStr = dateStr.replace(/-/g,'/');
   var timeTamp = new Date(dateStr).getTime();
   return timeTamp
}