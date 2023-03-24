const hospital = require('../../json/hospital');
Page({
  data: {
    list: hospital,
  },
  search(e) {
    let name = e.detail.value;
    let list = hospital.filter(item => item.fullName.indexOf(name) >= 0);
    this.setData({ list });
  },
});