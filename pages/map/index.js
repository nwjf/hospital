const hospital = require('../../json/hospital');
// import hospital from '../../json/hospital';
Page({
  data: {
    longitude: 116.40,
    latitude: 39.91,
    markers: [], // 标注

    bottomContainerConfig: {
      show: false,
    },
    hospitalInfo: {},
  },
  onLoad() {
    this.getMarkers(hospital);
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: (res) => {
    //     console.log('res', res);
    //   },
    //   fail: (e) => {
    //     console.log('e', e);
    //   }
    // });
  },
  toPage(event) {
    const { page } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/${page}/index`,
    });
  },
  getMarkers(hospitalArr) {
    const markers = hospitalArr.map((item, index) => {
      return {
        id: index + 1,
        latitude: item.latitude,
        longitude: item.longitude,
        title: item.fullName,
        iconPath: '../../assets/marker-icon.png',
        width: 30,
        height: 30,
        data: item,
      };
    });
    this.setData({
      markers,
    });
  },

  markerTap(markerData) {
    const { markerId } = markerData;
    const data = this.data.markers.find(item => item.id === markerId).data;
    this.setData({
      bottomContainerConfig: {
        ...this.data.bottomContainerConfig,
        show: true,
      },
      hospitalInfo: data,
    });
  },
});