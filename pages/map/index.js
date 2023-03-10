const hospital = require('../../json/hospital');
// import hospital from '../../json/hospital';
Page({
  data: {
    longitude: 116.40,
    latitude: 39.91,
    userMarkers: {},
    markers: [], // 标注

    bottomContainerConfig: {
      show: false,
    },
    hospitalInfo: {},
  },
  onLoad() {
    // this.getMarkers(hospital);
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('res', res);
        const { longitude, latitude } = res;
        this.setData({
          longitude,
          latitude,
          userMarkers: {
            id: 99999,
            iconPath: '../../assets/marker-black.png',
            width: 30,
            height: 30,
            longitude,
            latitude,
          }
        });
      },
      fail: (e) => {
        console.log('e', e);
      },
      complete: () => {
        this.getMarkers(hospital);
      }
    });
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
      markers: [this.data.userMarkers, ...markers],
    });
  },

  markerTap(markerData) {
    const { markerId } = markerData;
    const data = this.data.markers.find(item => item.id === markerId).data;
    if (data) {
      this.setData({
        bottomContainerConfig: {
          ...this.data.bottomContainerConfig,
          show: true,
        },
        hospitalInfo: data,
      });
    }
  },
});