
    // let mapToken=mapToken
    // console.log(mapToken);
    maptilersdk.config.apiKey = mapToken;
    const map = new maptilersdk.Map({
      container: 'map', // container's id or the HTML element to render the map
      style: maptilersdk.MapStyle.STREETS,
      center: [77.2088, 28.6139], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
