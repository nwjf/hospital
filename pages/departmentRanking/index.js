// 科室排名
const ranking = require('./ranking');

Page({
  data: {
    ranking,
    data: {},
    list: [],
    selectActiveIndex: 0,
    nominate: [],
  },
  onLoad() {
    this.setData({
      data: ranking[0],
      list: ranking[0].list,
      nominate: ranking[0].nominate.split('、'),
    });
  },
  bindPickerChange(data) {
    const selectActiveIndex = data.detail.value;
    this.setData({
      selectActiveIndex,
      data: ranking[selectActiveIndex],
      list: ranking[selectActiveIndex].list,
      nominate: ranking[selectActiveIndex].nominate.split('、')
    });
  },
});