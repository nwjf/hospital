const hospital = require('./hospital');
Page({
  data: {
    hospital,
    list: [],
    page: 1,
    pageSize: 20,
    searchData: {
      name: '',
    },
  },
  onLoad() {
    this.getDatas(1);
  },
  getDatas(page) {
    let data = hospital;
    let searchData = this.data.searchData;
    
    data = data.filter(item => {
      let isName = !searchData.name || item[1].indexOf(searchData.name) >= 0;
      return isName;
    });


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
    let name = e.detail.value;
    this.setData({
      searchData: { ...this.data.searchData, name },
      page: 1,
      list: [],
    });
    this.getDatas(1);
  },
});