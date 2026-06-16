const fs = require('fs')

module.exports = (html, ad) => {
    html = html.replace(
        '<h1 style="display:none">Danang Rent Map – Apartments, Rooms and Houses for Rent in Da Nang, Vietnam</h1>',
        `<h1 style="display:none">${ad.subject}</h1>`
    )
    html = html.replace(
        '<title>Danang Rent Map</title>',
        `<title>${ad.subject}</title>`
    )
    html = html.replace(
        '<meta property="og:title" content="Danang Rent Map" />',
        `<meta property="og:title" content="${ad.subject}" />`
    )
    html = html.replace(
        '<meta name="description" content="Interactive map for Danang, Vietnam with rental ads" />',
        `<meta name="description" content="${ad.subject}" />`
    )
    html = html.replace(
        '<meta name="twitter:title" content="Danang Rent Map">',
        `<meta name="twitter:title" content="${ad.subject}">`
    )
    
    fs.writeFileSync('id/' + ad.ad_id + '.html', html)
}