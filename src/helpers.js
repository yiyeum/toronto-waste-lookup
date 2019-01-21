import ReactHtmlParser from 'react-html-parser';

export const HtmlToReact = (stringToParse) => {
    const parser = new DOMParser();
    console.log(parser);
    const html = parser.parseFromString(stringToParse, 'text/html').body.textContent;
    console.log(html);

    return ReactHtmlParser(html);
}
