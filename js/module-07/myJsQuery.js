function $qs(selector, scope = document) {
    return scope.querySelector(selector);
}

function $qsa(selector, scope = document) {
    return scope.querySelectorAll(selector);
}

function $cel(tag, props = {}, text) {
    const elem = document.createElement(tag);
    Object.entries(props).forEach( ([key, value]) => (elem[key] = value) );
    if( text !== undefined ) {
        elem.textContent = text; 
    }
    
    return elem
}