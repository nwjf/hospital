Component({
  properties: {
    latitude: { type: Number },
    longitude: { type: Number },
    name: { type: String },
  },
  data: {},
  methods: {
    launchAppError(err) {
      console.log('err', err);
    },
    openLocation() {
      wx.openLocation({
        name: this.data.name,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      });
    },
  },
});