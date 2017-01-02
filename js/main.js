// TODO
// * add responsive on window resize
// * add images in row dependency on window innerWidth
// * add gallery bahavior - go to next and previous image

var wrapper = document.getElementById('wrapper');
var images = document.getElementById('wrapper').getElementsByTagName('img');
var imagesLinks = [];
var options = {
    wrapperHeight: 500,
    imagesInRow: 4
};
var urlPath = window.location.protocol + '//' + window.location.hostname + '' + window.location.pathname;
var lightboxContent;

for (var i = 0; i < images.length; i++) {
    var imageWrapper = document.createElement('div');
    var imageOveraly = document.createElement('div');
    var imageMagnifier = document.createElement('div');

    // create Array of links
    imagesLinks.push(images[i].getAttribute('src'));

    imageWrapper.className = 'gallery-item';
    // set styles to imageoverlay
    imageOveraly.setAttribute('style', 'display:none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0,0,0,0.6); opacity: 0;');
    // bind event listeners to wrapper
    imageWrapper.addEventListener('click', enableLightBox, false);
    imageWrapper.addEventListener('mouseenter', enableOverlay, false);
    imageWrapper.addEventListener('mouseleave', disableOverlay, false);
    // add img to wrapper as a child node
    imageWrapper.appendChild(images[i].cloneNode(false));
    // replace img with img wrapper
    wrapper.replaceChild(imageWrapper, images[i]);
    // add img overlay
    imageWrapper.appendChild(imageOveraly);
    imageMagnifier.setAttribute('style', 'position: absolute; top: 50%; left: 50%; width: 64px; height: 64px; transform: translate(-50%, -50%);');
    imageMagnifier.style.backgroundImage = "url('img/magnifier.png')";
    imageOveraly.appendChild(imageMagnifier);
}

(function () {
    var galleryItems = document.getElementsByClassName('gallery-item');
    var wrapperWidth = wrapper.getBoundingClientRect().width;
    var imageHeight = (galleryItems.length % options.imagesInRow === 0 ? options.wrapperHeight / (galleryItems.length / options.imagesInRow) : (options.wrapperHeight / parseInt(galleryItems.length / options.imagesInRow + 1)));
    var imageWidth = wrapperWidth / options.imagesInRow + 'px';
    wrapper.style.height = options.wrapperHeight + 'px';


    for (var i = 0; i < galleryItems.length; i++) {
        galleryItems[i].style.width = imageWidth;
        galleryItems[i].style.height = imageHeight + 'px';
        galleryItems[i].childNodes[0].style.position = 'absolute';
        galleryItems[i].childNodes[0].style.width = imageWidth;
        galleryItems[i].childNodes[0].style.maxWidth = '999em';
        galleryItems[i].childNodes[0].style.minHeight = imageHeight + 'px';
        galleryItems[i].childNodes[0].style.top = '-' + ((imageHeight - galleryItems[i].childNodes[0].height) / (-2)) + 'px';

    }

}());

function enableLightBox(e) {
    var imagePositionInArray = imagesLinks.indexOf(this.childNodes[0].getAttribute('src'));
    var lightboxWrapper = document.createElement('div');
    lightboxContent = document.createElement('img');
    lightboxContent.src = this.childNodes[0].src;
    var lightboxContentWidth = lightboxContent.width;
    var lightboxContentHeight = lightboxContent.height;
    var lightboxContentMaxWidth = window.innerWidth - 50;
    var lightboxContentMaxHeight = window.innerHeight - 50;
    var lightboxContentRatio = 0;

    // add navigation
    if (window.innerWidth >= 796) {
        var navigationLeft = document.createElement('div');
        navigationLeft.setAttribute('style', 'position: absolute; width: 64px; height: 64px; left: 0; top: 50%; transform: translateY(-50%); z-index: 9999;');
        navigationLeft.style.backgroundImage = "url('img/left.png')";
        var navigationLeftEvent = navigationLeft.addEventListener('click', navGalleryPrev.bind(null, imagePositionInArray), false);
        lightboxWrapper.appendChild(navigationLeft);

        var navigationRight = document.createElement('div');
        navigationRight.setAttribute('style', 'position: absolute; width: 64px; height: 64px; right: 0; top: 50%; transform: translateY(-50%); z-index: 9999;');
        navigationRight.style.backgroundImage = "url('img/right.png')";
        var navigationRightEvent = navigationRight.addEventListener('click', navGalleryNext.bind(null, imagePositionInArray), false);
        lightboxWrapper.appendChild(navigationRight);
    }

    if (lightboxContentWidth >= lightboxContentMaxWidth) {
        lightboxContentRatio = lightboxContentMaxWidth / lightboxContentWidth;
        lightboxContentWidth = lightboxContentMaxWidth;
        lightboxContentHeight = lightboxContentHeight * lightboxContentRatio;
    }
    if (lightboxContentHeight >= lightboxContentMaxHeight) {
        lightboxContentRatio = lightboxContentMaxHeight / lightboxContentHeight;
        lightboxContentHeight = lightboxContentMaxHeight;
        lightboxContentWidth = lightboxContentWidth * lightboxContentRatio;
    }

    lightboxContent.setAttribute('height', lightboxContentHeight);
    lightboxContent.setAttribute('width', lightboxContentWidth);
    // center image
    lightboxContent.setAttribute('style', 'position: absolute; top:' + (window.innerHeight - lightboxContentHeight) / 2 + 'px; left:' + (window.innerWidth - lightboxContentWidth) / 2 + 'px;');
    lightboxContent.setAttribute('lightbox', 'true');
    lightboxWrapper.setAttribute('style', 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); z-index: 9998; cursor: pointer;');
    lightboxWrapper.setAttribute('lightbox', 'true');
    lightboxWrapper.appendChild(lightboxContent);
    // show lightbox
    document.body.appendChild(lightboxWrapper);
    lightboxWrapper.addEventListener('click', function (e) {
        if (e.target.getAttribute('lightbox') === 'true') this.parentNode.removeChild(this);
    }, false);
}

function enableOverlay(e) {
    var el = this.childNodes[1];
    el.style.display = 'block';
    el.setAttribute('anim', 'fadeIn');
    (function fadeIn() {
        if (el.style.opacity < 1 && el.getAttribute('anim') === 'fadeIn') {
            el.style.opacity = parseFloat(el.style.opacity) + Number(0.1);
            setTimeout(fadeIn, 30);
        }
    }());
}

function disableOverlay(e) {
    var el = this.childNodes[1];
    el.setAttribute('anim', 'fadeOut');
    (function fadeOut() {
        if (el.style.opacity > 0 && el.getAttribute('anim') === 'fadeOut') {
            el.style.opacity = parseFloat(el.style.opacity) - Number(0.1);
            setTimeout(fadeOut, 30);
        } else {
            el.style.display = 'none';
        }
    }());
}

function navGalleryPrev(el) {
    console.log(el);
}

function navGalleryNext(el) {
    console.log(el);
}