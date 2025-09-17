/**
 * JavaScript performance example: multiple appends on the page vs. one single append on the page
 * 
 * @author  Arturo Mora-Rioja
 * @version 1.0.0, December 2022
 * @version 1.1.0, June 2023. Adding a template literal to innerHTML added
 * @version 2.0.0, January 2024. The element list is substituted by an element card list with styling
 *                               A combination of cloneNode() and innerHTML is added
 * @version 2.0.1, September 2025. Refactoring
 */

const initialisePage = () => {
    const section = document.querySelector('main > section');
    if (section !== null) {
        section.remove(); 
    }
    return parseInt(document.querySelector('#txtIterations').value);
}

/**
 * Multiple appends
 */
document.querySelector('#multiple').addEventListener('click', (e) => {
    e.preventDefault();
    
    const iterations = initialisePage();
    const startTime = Date.now();

    document.querySelector('main').appendChild(document.createElement('section'));

    for (let index = 0; index < iterations; index++) {
        // Each iteration implies appends directly on the page

        let div = document.createElement('div');
        document.querySelector('main > section').appendChild(div);
        
        let header = document.createElement('header');
        div.appendChild(header);

        let h1 = document.createElement('h1');
        header.appendChild(h1)
        h1.appendChild(document.createTextNode('Multiple appends'));

        div.appendChild(document.createTextNode('Element card number ' + index));        
    }
    console.log('Multiple appends takes ' + (Date.now() - startTime) + ' ms.');
});

/**
 * Single append
 */
document.querySelector('#single').addEventListener('click', (e) => {
    e.preventDefault();

    const iterations = initialisePage();
    const startTime = Date.now();

    const section = document.createElement('section');

    for (let index = 0; index < iterations; index++) {

        let div = document.createElement('div');
        section.appendChild(div);
        
        let header = document.createElement('header');
        div.appendChild(header);

        div.appendChild(document.createTextNode('Element card number ' + index));

        let h1 = document.createElement('h1');
        header.appendChild(h1);
        h1.appendChild(document.createTextNode('Single append'));
    }
    
    // Only one append on the page
    document.querySelector('main').appendChild(section);

    console.log('Single append takes ' + (Date.now() - startTime) + ' ms.');
});

/**
 * cloneNode()
 */
document.querySelector('#cloneNode').addEventListener('click', (e) => {
    e.preventDefault();

    const iterations = initialisePage();
    const startTime = Date.now();

    const section = document.createElement('section');
    const divTemplate = document.createElement('div');
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode('cloneNode()'));
    header.appendChild(h1);

    divTemplate.appendChild(header);
    divTemplate.appendChild(document.createTextNode('Element card number '));
    divTemplate.appendChild(document.createElement('span'));

    let divElement;
    for (let index = 0; index < iterations; index++) {
        divElement = divTemplate.cloneNode(true);
        divElement.querySelector('span').innerText = index;
        section.appendChild(divElement);
    }

    document.querySelector('main').appendChild(section);

    console.log('cloneNode() takes ' + (Date.now() - startTime) + ' ms.');
});

/**
 * cloneNode() and innerHTML
 */
document.querySelector('#cloneNodeinnerHTML').addEventListener('click', (e) => {
    e.preventDefault();

    const iterations = initialisePage();
    const startTime = Date.now();

    const section = document.createElement('section');
    const divTemplate = document.createElement('div');
    divTemplate.innerHTML = `
        <header>
            <h1>cN() &amp; iH</h1>
            Element card number <span></span>
        </header>
    `;

    let divElement;
    for (let index = 0; index < iterations; index++) {
        divElement = divTemplate.cloneNode(true);
        divElement.querySelector('span').innerText = index;
        section.appendChild(divElement);
    }

    document.querySelector('main').appendChild(section);

    console.log('cloneNode() and innerHTML takes ' + (Date.now() - startTime) + ' ms.');
});

/**
 * innerHTML
 */
document.querySelector('#innerHTML').addEventListener('click', (e) => {
    e.preventDefault();

    const iterations = initialisePage();
    const startTime = Date.now();

    const sectionElement = document.createElement('section');
    
    // No appends. The new elements are added as template literals
    let section = '';
    for (let index = 0; index < iterations; index++) {        
        section += `
            <div>
                <header>
                    <h1>innerHTML</h1>
                </header>
                Element card number ${index}
            </div>
        `
    }
    section += '</section>';
    sectionElement.innerHTML = section;

    document.querySelector('main').appendChild(sectionElement);

    console.log('Changing innerHTML with template literals takes ' + (Date.now() - startTime) + ' ms.');
});