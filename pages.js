exports.default = [
  {
    filename: 'index.html', // bundle name
    template: 'index.html', // initial html file
    chunks: ['index'] // name of js entry file
  },
  {
    filename: 'test.html', // bundle name
    template: 'test.html', // initial html file
    chunks: ['test'] // name of js entry file
  }
  /*  
  {
    next page ...
  },
   */
]
