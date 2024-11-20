class Text {
    constructor(obj) {
        this.text = document.querySelector(obj.text);
        this.fullText = this.text.innerHTML;
        this.text.innerHTML = "";
        this.str();
    }

    str(x = 0) {
        this.text.innerHTML += this.fullText[x];
        x++;

        if (x < this.fullText.length) {
            setTimeout(() => {
                this.str(x);
            }, 200)
        }
    }
}

const text = new Text({
    text: ".header__title",
});
// 
class Parallax {
    constructor(obj) {
        this.clouds = document.querySelectorAll(obj.clouds);
        this.extraEl = document.querySelector(obj.extraEl);
        this.background = document.querySelector(obj.background);
        window.addEventListener('scroll', () => {
            this.moveElements();
        });
    }
    moveElements() {
        this.clouds.forEach(cloud => {
            const speed = cloud.getAttribute('data-speed');
            cloud.style.transform = `translateX(${window.scrollY * speed}px)`;
        });
        this.extraEl.style = `transform:translateX(${window.scrollY * .9}px);`;
        this.background.style.objectPosition = `0 ${window.scrollY / 10}%`;
    }
}
const parallax = new Parallax({
    clouds: '.header__cloud', // Получение класса для подключения элементов []
    extraEl: '.header__boat', // Получение элемента лодки 
    background: '.header__fantasy', // Получение заднего фона 
});

// 

class Scroll {
    constructor(obj) {
        this.section = document.querySelector(obj.section);

        window.addEventListener('scroll', () => {
            this.fadeRightAnim();
        });

    }

    fadeRightAnim() {
        const elements = this.section.querySelectorAll('.fade-right');

        elements.forEach(el => {
            const speed = el.getAttribute('data-speed');
            el.style.transition = speed + "ms";
            //    offsetTop - это смещение элемента от верхнего края страницы
            if (window.scrollY >= (this.section.offsetTop - this.section.offsetHeight * 2)) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

    }

}

const scroll = new Scroll({
    section: '.about',
});
const scroll1 = new Scroll({
    section: '.scroll',
});

// 

class ParallaxMove {
    constructor(obj) {
        this.moveEl = document.querySelectorAll(obj.moveEl);
        window.addEventListener('mousemove', (e) => {
            this.moveItems(e);
        });
    }
    moveItems(e) {
        this.moveEl.forEach(item => {
            const speed = item.getAttribute('data-speed');
            const X = (window.innerWidth - e.pageX * speed) / 50;
            const Y = (window.innerWidth - e.pageY * speed) / 100;
            item.style.transform = `translate(${X}px,${Y}px)`;
        });
    }
}
const parallaxMove = new ParallaxMove({
    moveEl: '.parallax__ball',
});
//
class Bubble {
    constructor(obj) {
        this.bubble = document.querySelectorAll(obj.bubble);
        this.bubble.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                this.bubbleShow(e, btn);
            });
        });

    }
    bubbleShow(e, btn) {
        const X = e.pageX - btn.offsetLeft;
        const Y = e.pageY - btn.offsetTop;
        let span = btn.querySelector('span');
        span.style.left = `${X}px`;
        span.style.top = `${Y}px`;
    }
}

const bubble = new Bubble({
    bubble: '.timer__btn',
});

//



class Timer {
    constructor(obj) {
        this.timerNums = document.querySelectorAll(obj.timerNums);
        this.timerSection = document.querySelector(obj.timerSection);
        this.state = true;

        window.addEventListener('scroll', () => {
            this.zeroTimer();
        });

    }


    zeroTimer() {
        if (this.state) {
            if (window.scrollY >= (this.timerSection.offsetTop - this.timerSection.offsetHeight * 2)) {
                this.timerSet();
                this.state = false;
            }
        }
    }
    timerSet() {
        this.timerNums.forEach(num => {
            const count = +num.getAttribute('data-num');
            num.innerHTML = 0;

            function timer(i = 0) {
                num.innerHTML = i;
                i++;

                if (i <= count) {
                    setTimeout(() => {
                        timer(i);
                    }, 5);
                }
            }
            timer();

        });
    }


}

const timer = new Timer({
    timerSection: '.timer',
    timerNums: '.timer__num',
});


class Rotate3D {
    constructor(obj) {
        this.cards = document.querySelectorAll(obj.cards);
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.rotate(e, card)
            });
            card.addEventListener('mouseout', () => {
                this.rotateOff(card)
            });
        });
    }

    rotate(e, item) {
        const cardItem = item.querySelector('.card__item');
        const halfHeight = cardItem.offsetHeight / 2;
        cardItem.style.transform =
            `rotateX(${(halfHeight - e.offsetY) / 10}deg) rotateY(${-(halfHeight - e.offsetX) / 10}deg)`
    }
    rotateOff(item) {
        const cardItem = item.querySelector('.card__item');
        cardItem.style.transform =
            `rotateX(0) rotateY(0)`;
    }


}

const rotate3D = new Rotate3D({
    cards: '.card',
});