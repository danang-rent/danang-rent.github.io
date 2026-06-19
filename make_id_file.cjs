const fs = require('fs')

const escape_html = html =>
    String(html)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

module.exports = (html, ad) => {
    const subject = escape_html(ad.subject)
    const body = escape_html(ad.body)
    
    html = html.replace(
        '<div id="map"></div>',
        `<div id="map"></div><article><h1>${subject}</h1><p>${body}</p></article>`
    )
    html = html.replace(
        '<title>Danang Rent Map</title>',
        `<title>${subject}</title>`
    )
    html = html.replace(
        '<meta property="og:title" content="Danang Rent Map" />',
        `<meta property="og:title" content="${subject}" />`
    )
    html = html.replace(
        '<meta property="og:url" content="https://danang.kim/">',
        `<meta property="og:url" content="https://danang.kim/id/${ad.ad_id}">`
    )
    html = html.replace(
        '<meta name="description" content="Interactive map for Danang, Vietnam with rental ads" />',
        `<meta name="description" content="${subject}" />`
    )
    html = html.replace(
        '<meta name="twitter:title" content="Danang Rent Map">',
        `<meta name="twitter:title" content="${subject}">`
    )
    html = html.replace(
        '<link rel="canonical" href="https://danang.kim/">',
        `<link rel="canonical" href="https://danang.kim/id/${ad.ad_id}">`,
    )
    html = html.replace(
        '"@type":"WebSite"',
        `"@type":"Offer"`
    )
    html = html.replace(
        '"name":"Danang Rent Map"',
        `"name":"${subject}"`
    )
    html = html.replace(
        '"url":"https://danang.kim/"',
        `"url":"https://danang.kim/id/${ad.ad_id}",\n\t\t\t"price":"${ad.price}",\n\t\t\t"priceCurrency":"VND"`
    )
    
    fs.writeFileSync('id/' + ad.ad_id + '.html', html)
}