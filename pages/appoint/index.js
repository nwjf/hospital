const hospital = require('./hospital');
let run = null;
Page({
  data: {
    hospital,
    list: [],
    page: 1,
    pageSize: 20,
    searchData: {
      name: '',
      type: '',
      grade: '',
    },
    showFlutter: false,

    gradeList: [
      { id: '', name: '全部' },
      { id: '无等级', name: '无等级' },
      { id: '一级', name: '一级' },
      { id: '二级', name: '二级' },
      { id: '三级', name: '三级' },
      { id: '三级甲等', name: '三级甲等' },
    ],
    typeList: [
      { id: '', name: '全部' },
      { id: '综合', name: '综合' },
      { id: '专科', name: '专科' },
      { id: '中医', name: '中医' },
    ],
  },
  onLoad() {
    this.getDatas(1);
  },
  getDatas(page) {
    let data = hospital;
    let searchData = this.data.searchData;
    const { name, type, grade } = searchData;

    data = data.filter(item => {
      let isName = true;
      let isType = true;
      let isGrade = true;
      if (name) { isName = item[1].indexOf(name) >= 0; }
      if (type) { isType = item[3].indexOf(type) >= 0; }
      if (grade) { isGrade = item[4].indexOf(grade) >= 0; }
      return isName && isType && isGrade;
    });
    console.log('len', data.length);


    let list = data.slice(this.data.pageSize * (page - 1), this.data.pageSize * page);
    this.setData({
      list: [...this.data.list, ...list]
    });
  },
  onReachBottom() {
    let page = this.data.page + 1;
    this.setData({ page });
    this.getDatas(page);
  },
  search(e) {
    clearTimeout(run);
    run = setTimeout(() => {
      let name = e.detail.value;
      this.setData({
        searchData: { ...this.data.searchData, name },
        page: 1,
        list: [],
      });
      this.getDatas(1);
    }, 300);
  },

  onFlutterBtn(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ showFlutter: type === 'show' });
  },
  onFluterSlect(e) {
    const { id, type } = e.currentTarget.dataset;
    this.setData({
      list: [],
      page: 1,
      searchData: {
        ...this.data.searchData,
        [type]: id,
      },
    });
    this.getDatas(1);
  },
});