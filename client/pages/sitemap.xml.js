import ParfumService from "../API/ParfumService";

function generateSiteMap(products) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>https://selectparfumeries.ru</loc>
       </url>
       <url>
         <loc>https://selectparfumeries.ru/contacts</loc>
       </url>
       <url>
         <loc>https://selectparfumeries.ru/payment</loc>
       </url>
       <url>
         <loc>https://selectparfumeries.ru/delivery</loc>
       </url>
       <url>
         <loc>https://selectparfumeries.ru/booking</loc>
       </url>
       <url>
         <loc>https://selectparfumeries.ru/brands</loc>
       </url>
       <url>
         <loc>https://selectparfumeries.ru/contacts</loc>
       </url>
       <url>
         <loc>https://selectparfumeries.ru/catalog</loc>
       </url>
       <url>
         <loc>https://selectparfumeries.ru/catalog?raspiv=true</loc>
       </url>
       ${products
         .map(({ _id }) => {
           return `
         <url>
             <loc>https://selectparfumeries.ru/product/${_id}</loc>
         </url>
       `;
         })
         .join('')}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site

    const parfums = await ParfumService.getAll({limit: 0});

    const sitemap = generateSiteMap(parfums.data.parfums);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;