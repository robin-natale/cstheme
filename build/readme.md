# Basic build process

* This process looks for section specific SASS files in `./sass/sections` and sends to `../assets`


* Section specific css files will then need to be included in the section's `.liquid` file 
  * E.G `{{ "section-custom-feature.css" | asset_url | stylesheet_tag }}` see [here](https://github.com/jakeretain/sptheme/blob/master/sections/custom-feature.liquid)
  * Overwrites to exisitng sections are done in the same way see [here](https://github.com/jakeretain/sptheme/blob/master/sections/contact-form.liquid)


* `custom.scss` is the global customisation stylesheet and is included in `../layout/theme.liquid:112`


* Library `./sass/lib` and partial `./sass/partials` files are included and imported where necessary as per usual SASS structures


### Development guide
* `npm install` to install the req. node modules
* `npm run start` *or* `npm start` to compile in development mode, this will trigger a watch
* `npm run build` to compile in production mode
* When watches are active [Livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) is available in Chrome


#### JS
* `build/js/index.js` is the main source file and can include modern ES6 syntax
* During compilation **gulp** uses **webpack** to make the output browser-friendly
