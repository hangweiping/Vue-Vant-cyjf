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
