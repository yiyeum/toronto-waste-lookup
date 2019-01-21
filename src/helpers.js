import ReactHtmlParser from 'react-html-parser';

export const HtmlToReact = (stringToParse) => {
    const parser = new DOMParser();
    const html = parser.parseFromString(stringToParse, 'text/html').body.textContent;
    return ReactHtmlParser(html);
}
