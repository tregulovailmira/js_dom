"use strict";

class Slide {
    constructor(src, description) {
        this._src = src;
        this._description = description;
    }

    get src() {
        return this._src;
    }

    get description() {
        return this._description;
    }
}

class Slider {
    /**
     * @param {Slides} slides
     * @param {number} currentIndex
     */
    constructor(slides, currentIndex = 0) {
        this._slides = slides;
        this._currentIndex = currentIndex;
    }

    get currentIndex() {
        return this._currentIndex;
    }

    set currentIndex(newIndex) {
        if(typeof newIndex !== 'number') {
            throw new TypeError('Index must be a number');
        }
        if(newIndex > this._slides.length) {
            throw new RangeError('Index must be less than slides length!')
        }
        return (this._currentIndex = newIndex);
    }

    get nextIndex() {
        return (this.currentIndex + 1) % this._slides.length;
    }

    get prevIndex() {
        return (this.currentIndex - 1 + this._slides.length) % this._slides.length;
    }

    get currentSlide() {
        return this._slides[this.currentIndex];
    }
}

function updateView(img) {
    const {
        currentSlide: { src, description },
    } = slider;

    img.setAttribute("src", src);
    img.setAttribute("title", description);
}

const database = [{
    src:
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    desr: "man",
},
    {
        src:
            "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        desr: "man",
    },
    {
        src:
            "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        desr: "man",
    },
];


const slider = new Slider([
    new Slide(
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        "man"
    ),
    new Slide(
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "demo"
    ),
    new Slide(
        "https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg",
        "grass"
    ),
]);

const [img] = document.getElementsByClassName("sliderImage");
const [prevBtn, nextBtn] = document.querySelectorAll(
    ".sliderButtons > button"
);

const createButtonHandler = (direction = "next") => {
    return (event) => {
        const container = document.getElementById('sliderContainer');
        const oldImage = document.getElementById('image');
        const newImage = document.createElement("img");
        const newIndex = slider[direction === "next" ? "nextIndex" : "prevIndex"];
        slider.currentIndex = newIndex;
        updateView(newImage);
        newImage.classList.add('hideImage');
        newImage.setAttribute('id', 'newImage');
        container.appendChild(newImage);

        setTimeout(() => {
            newImage.classList.remove('hideImage');
            newImage.classList.add('newImage');

            if (oldImage) {
                oldImage.classList.remove('newImage');
                oldImage.classList.add('oldImage');
            }

            setTimeout(() => {
                let childNodes = container.childNodes;
                for (let i = childNodes.length - 1; i >= 0; i--) {
                    if (childNodes[i].id !== 'newImage') {
                        container.removeChild(childNodes[i]);
                    }
                }
                newImage.setAttribute('id', 'image');
            }, 700);
        }, 10);
    };

};

nextBtn.addEventListener("click", createButtonHandler("next"));
prevBtn.addEventListener("click", createButtonHandler("prev"));
updateView(img);