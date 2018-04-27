import Vue from 'vue'

Vue.filter(
  //借款类型
  'borrowingType', (value) => {
    switch (value) {
      case 'CREDIT':
        return '车商贷';
        break;
      case 'GUARANTEE':
        return '质押贷';
        break;
      case 'MORTGAGE':
        return '抵押贷';
        break;
      case 'TRANSFER':
        return '转让借款';
        break;
      default:
        break;
    }
  },
  //金额元转万
)
Vue.filter(
  //姓名加密
  'changeDate', (value) => {
    var date = new Date(value),
    Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = date.getDate() + ' ',
    h = date.getHours() + ':',
    m = date.getMinutes() + ':',
    s = date.getSeconds();
    var date = Y + M + D
    return date
  },
)
Vue.filter(
  //姓名加密
  'changeName', (value) => {
    return value.replace(/.(?=.)/g, '*');
  },
)
Vue.filter(
  //银行卡加密
  'changBankCard', (value) => {
    return value.replace(/^(\d{4})\d+(\d{4})$/,"$1 **** **** $2")
  }
)
Vue.filter(
  //身份证加密
  'changIdCard', (value) => {
    return value.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2")
  }
)
Vue.filter(
  //手机号加密
  'changPhoneNum', (value) => {
    return value.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }
)
