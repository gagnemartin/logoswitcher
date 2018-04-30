const Logoswitcher = function(id, conf)
{
	this.urls = this.getUrls(conf)
	this.element = this.getElement(id)
	this.visible = this.getVisible(conf)
	this.elements = []
	this.visibleElements = []
	this.notVisibleElements = []
	this.last = null
	this.lastNotVisible = null


	if (!this.urls || !this.element) {
		return false
	}

    window.onload = () => {
    	this.init()
	}
}

// *****************
// *** FUNCTIONS ***
// *****************

// Init function
Logoswitcher.prototype.init = function()
{
    this.mapUrls()
    this.appendChildren()
    this.update()
}

// Returns a random number
Logoswitcher.prototype.getRandom = function (max)
{
    return Math.floor(Math.random() * Math.floor((max)))
}

// The interval with the update system to switch the elements
Logoswitcher.prototype.update = function()
{
	setInterval(() => {
		// Select a random node visible to the user
        let elementIndex = this.getRandom(this.visibleElements.length)
		while (elementIndex === this.last) elementIndex = this.getRandom(this.visibleElements.length)
		this.last = elementIndex

        let visible =  this.visibleElements[elementIndex]
        let $element = this.elements[visible.index]

		// Select a random index from the index of the not visible
        let indexNotVisible = this.getRandom(this.notVisibleElements.length)
        while (indexNotVisible === this.lastNotVisible) indexNotVisible = this.getRandom(this.notVisibleElements.length)
        this.lastNotVisible = indexNotVisible
		let notVisible = this.notVisibleElements[indexNotVisible]

		// Swap the stuff
		if (typeof visible.link !== 'undefined') visible.link = lsSwap(notVisible.link, notVisible.link = visible.link);
        visible.img = lsSwap(notVisible.img, notVisible.img = visible.img);

		$element.style.opacity = '0'
		$element.style.transform = 'translateY(2px)'

		setTimeout(() => {
            if (typeof visible.link !== 'undefined') {
            	$element.setAttribute('href', visible.link)
                $element.getElementsByTagName('img')[0].setAttribute('src', visible.img)
            } else {
                $element.setAttribute('src', visible.img)
			}

			$element.style.opacity = '1'
            $element.style.transform = 'translateY(0)'
		}, 1000)
	}, 4000)
}

// Tests the visible parameter
Logoswitcher.prototype.getVisible = function(conf)
{
	if (typeof conf.visible === 'undefined' || conf.visible <= 0) {
		return 5
	}

	if (conf.urls.length < conf.visible) {
        return conf.urls.length - 2
	}

	return conf.visible
}

// Maps the urls
Logoswitcher.prototype.mapUrls = function()
{

	this.urls.map((data, index) => {
		let img = this.getUrl(data, index)

		if (img && (index < this.visible)) {
            data.index = index
            this.visibleElements.push(data)

            let element = this.newElement(data)
            this.elements.push(element)
		} else {
            this.notVisibleElements.push(data)
		}
	})
}

// Append every images
Logoswitcher.prototype.appendChildren = function()
{
	this.elements.map((child) => {
		this.element.appendChild(child)
	})
}

// Create the element
Logoswitcher.prototype.newElement = function(element)
{
	let wrap

	if (typeof element.link !== 'undefined') {
		wrap = document.createElement('a')
		wrap.setAttribute('class', 'ls-item');
		wrap.setAttribute('href', element.link);
	}

	img = document.createElement('img')
	img.setAttribute('src', element.img)

	if (typeof wrap !== 'undefined') {
		wrap.appendChild(img)

		return wrap
	}

	img.setAttribute('class','ls-item')
	return img
}

// Test the urls
Logoswitcher.prototype.getUrls = function(conf)
{
	if (typeof conf.urls === 'undefined' || conf.urls.length <= 0) {
		console.error('Logoswitcher: No URLs were specified.')
		return false
	}

	if (typeof conf.urls !== 'object') {
		console.error('Logoswitcher: URLs must be an object. ' + typeof conf.urls + ' given.')
		return false
	}

	return conf.urls
}

// Test the element and add the ls-wrap class to it
Logoswitcher.prototype.getElement = function(id)
{
	if (typeof id === 'undefined') {
		console.error('Logoswitcher: No element was defined.')
		return false
	}

	let element = document.getElementById(id)

	if (!element) {
		console.error('Logoswitcher: Could not find the element "' + id + '"')
		return false
	}

    element.classList.add('ls-wrap')

	return element
}

// Test an image url
Logoswitcher.prototype.getUrl = function(element, index)
{
	if (typeof element.img === 'undefined') {
		console.error('Logoswitcher: No URL was specified for element number ' + (index + 1) + '.')
		return false
	}

	if (typeof element.img !== 'string') {
		console.error('Logoswitcher: URL for element number ' + (index + 1) + ' is not a sting. ' + typeof element.url + ' given.')
		return false
	}

	return element.img
}

let lsSwap = function (x) { return x }