# Logo Switcher
Cool smooth logo switcher like the one on Squarespace

### Installation

Include the CSS file in your \<head> tag
```html
<link rel="stylesheet" href="assets/css/logoswitcher.css">
```

Include the script right before the end of the \<body> tag

```html
<script src="assets/js/logoswitcher.js"></script>
```

Right after the include, start the app

```html
<script src="assets/js/logoswitcher.js"></script>
<script>
    const switcher1 = new Logoswitcher()
</script>
```
### Configuration
Some configuration is needed for the script to work. It takes two parameters. The first is the ID of the element where you want the Logo Switcher to render. The second is an object of options
```html
<div id="myLogoSwitcher"></div>

<script src="assets/js/logoswitcher.js"></script>
<script>
    const switcher1 = new Logoswitcher('myLogoSwitcher', options)
</script>
```
The options are as follow:

```html
<script src="assets/js/logoswitcher.js"></script>
<script>
    const switcher1 = new Logoswitcher('myLogoSwitcher', {
        visible: 5, // Number of element visible. Default 5
        urls: [ // Required. Array containing objects with links and imgs
            {
                link: 'http://example.com', // Links are optional
                img: 'https://static1.squarespace.com/static/images/57fea8f720099e55c3901865?format=100w'
            },
            {
                link: 'http://example.com',
                img: 'https://static1.squarespace.com/static/images/57feaa162994cab82c6cc4b5?format=100w'
            }
        ]
    })
</script>
``` 
## Authors

* **Martin Gagné** - *Initial work* - [martin_gagne@outlook.com](mailto:martin_gagne@outlook.com)


