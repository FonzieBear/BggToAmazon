function httpGet(theUrl)
{
  var xhr = new XMLHttpRequest();
  xhr.open( "GET", theUrl, true ); // false for synchronous request

  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var rating = xhr.responseText.match(/collection_bggrating\D*([0-9]{1,2}\.[0-9]{1,3})/)[1];
        console.log(rating);
      } else {
        console.error(xhr.statusText);
      }
    }
  };

  xhr.onerror = function (e) {
      console.error(xhr.statusText);
  };

  xhr.send(null);
}

var firstBreadCrumb = $("#wayfinding-breadcrumbs_feature_div a").first();
var category = firstBreadCrumb.length ? firstBreadCrumb[0].innerText : null;

if (category != 'Toys & Games') {
  console.log('Deactivating');
} else {
  var title = $('#productTitle')[0].innerText;
  console.log(title);

  var bggResponse = httpGet('https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=' + title);
}
