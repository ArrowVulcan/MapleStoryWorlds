/*************************/
/* Button Position Start */
/*************************/

let centerBody = document.getElementById("content")
let scrollTopBtn = document.getElementById("scroll-top-button")

function positionButton(){

    if(centerBody){

        let offset = 20
        let offset2 = 10
        let rect = centerBody.getBoundingClientRect()

        let windowWidth = window.innerWidth;
        
        if(windowWidth < 1470){
            offset = -50
        }
        
        if(windowWidth < 1120){
            offset = -150
        }

        if(windowWidth < 1320){
            offset2 = 90
        }

        scrollTopBtn.style.bottom = `${offset2}px`
        scrollTopBtn.style.left = `${rect.right + offset}px`
    }
}

if(scrollTopBtn != null){
    window.addEventListener("scroll", positionButton)
    window.addEventListener("resize", positionButton)
    positionButton()
}

/***********************/
/* Button Position End */
/***********************/


/*********************/
/* Cursor Icon Start */
/*********************/

document.addEventListener("mousedown", function(event){
    if(event.button === 0){
        document.body.classList.add("cursor-down")
    }
})

document.addEventListener("mouseup", function(){
    document.body.classList.remove("cursor-down")
})

/*******************/
/* Cursor Icon End */
/*******************/


/***************************/
/* Scroll To Content Start */
/***************************/

let currentObservEntity = null
let isScrolling = false

let observer = new IntersectionObserver((entries) => {

    if(!isScrolling){
        return
    }

    if( entries[0].target.id != currentObservEntity ){
        return
    }

    if (entries[0].isIntersecting) {

        isScrolling = false
        entries[0].target.classList.add("blink")

        setTimeout(() => {
            entries[0].target.classList.remove("blink")
        }, 2000)

        currentObservEntity = null

    }

}, { threshold: 0 })

document.querySelectorAll(".scroll-element").forEach( e => 
    observer.observe(document.getElementById(e.id))
)

function scrollToElement(element){
    
    currentObservEntity = element
    isScrolling = true

    let rect = document.getElementById(element).getBoundingClientRect()
    let inViewport = rect.top >= 0 && rect.bottom <= window.innerHeight

    if(inViewport){
        isScrolling = false
        document.getElementById(element).classList.add("blink")

        setTimeout(() => {
            document.getElementById(element).classList.remove("blink")
        }, 2000)

        currentObservEntity = null
    }

    document.getElementById(element).scrollIntoView({behavior: "smooth"})

}

/*************************/
/* Scroll To Content End */
/*************************/


function setButton(e, str){

    return // Not in use yet

    document.querySelectorAll(".button").forEach((e) => {
        e.classList.remove("button-selected")
    })

    e.classList.add("button-selected")

}


/*************************/
/* Add LUA Styling Start */
/*************************/

function addText(cName, cBegin){

    hljs.registerLanguage('lua', function(hljs) {
        
        let lua = hljs.getLanguage('lua')

        return {
            ...lua,
            case_insensitive: false,
            contains: [
                ...lua.contains,
                {
                    className: cName,
                    begin: cBegin
                }
            ]
        }

    })

}

if(typeof hljs !== "undefined"){

    addText('custom-purple', 'Method:')
    addText('custom-purple', 'Property:')
    addText('custom-red', 'Event Handler:')
    addText('custom-red', 'None')
    addText('custom-purple', 'Function:')
    addText('custom-purple', '\\b\\w+(?=\\()')

    hljs.highlightAll()

}

/***********************/
/* Add LUA Styling End */
/***********************/