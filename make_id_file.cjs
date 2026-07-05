const fs = require('fs')

const escape_html = html =>
    String(html)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        
const v2e = _ => _
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")

const names = new Set()

module.exports = (html, ad) => {
    const subject = escape_html(ad.subject)
    const body = escape_html(ad.body)
    var name = v2e(ad.subject.toLowerCase()).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    
    if (names.has(name)) name += ('-' + ad.price / 1e6).replace('.', 'm')
    if (names.has(name)) name += '-' + ad.ad_id
    
    html = html.replace(
        '<div id="map"></div>',
        `<div id="map"></div><article><h1>${subject}</h1><p>${body}</p></article>`
    )
    html = html.replace(
        '<title>Danang Rent Map</title>',
        `<title>${subject}</title><meta name="ad:id" content="${ad.ad_id}">`
    )
    html = html.replace(
        '<meta property="og:title" content="Danang Rent Map" />',
        `<meta property="og:title" content="${subject}" />`
    )
    html = html.replace(
        '<meta property="og:url" content="https://danang.kim/">',
        `<meta property="og:url" content="https://danang.kim/id/${name}">`
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
        `<link rel="canonical" href="https://danang.kim/id/${name}">`,
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
        `"url":"https://danang.kim/id/${name}",\n\t\t\t"price":"${ad.price}",\n\t\t\t"priceCurrency":"VND"`
    )
    
    fs.writeFileSync('id/' + name + '.html', html)
    
    return name
}