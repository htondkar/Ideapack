# Ideapack
  Webpack boilerplate for front-end development

## How to use
  Clone or download this repo, and start editing/adding files
  js files should be added to "./app/" 
  scss and images should be added to "./assets/" 
  html files should be at the root

### Development: 
  To start dev server, run `npm/yarn run dev` 
  server will be available at http://localhost:8080/[my-page.html]

### Production: 
  To bundle your project, run `npm/yarn run build`
  builded project will be available at dist/ folder

### Adding pages: 
  To add new pages to your project (more than index.html), add a new html file in the root for example test.html
  and then add js file for this page to app/xxx.js and include the Sass or css files you need in that js file, 
  next add the information for the new page in pages.js in the root of the project, your are good to go :)

