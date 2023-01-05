Page({
  clickItem(event) {
    const { page } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/${page}/index`,
    });
  },
});