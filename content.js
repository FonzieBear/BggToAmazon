function httpGet(theUrl)
{
  var xhr = new XMLHttpRequest();
  xhr.open( "GET", theUrl, true ); // false for synchronous request

  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var ratings = xhr.responseText.match(/collection_bggrating\D*([0-9]{1,2}\.[0-9]{1,3})/);
        if (ratings) {
          var titleSpan = $('#productTitle')[0];

          var el = document.createElement('div');

          el.innerHTML = 'BGG rating: ' + ratings[1];
          el.style['color'] = 'green';
          el.style['font-size'] = '16px';

          titleSpan.append(el);
        } else {
          console.log('No results found');
        }
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

  title = title.replace(/board/gi, '');
  title = title.replace(/game/gi, '');
  title = title.replace(/edition/gi, '');
  title = title.replace(/\d+st|\d+nd|\d+rd|\dth/gi, '');
  title = title.replace(/expansion/gi, '');
  title = title.replace(/\s/gi, '+');
  title = title.replace(/&/gi, '');
  title = title.trim();
  title = encodeURI(title);

  console.log('Looking for title: ' + title);
  var bggResponse = httpGet('https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=' + title);
}
