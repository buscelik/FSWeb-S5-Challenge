import axios from "axios";
const Card = (makale) => {
  // GÖREV 5
  // ---------------------
  // Aşağıda gördüğünüz işaretlemeyi döndürmesi gereken bu fonksiyonu uygulayın.
  // Tek argümanı olarak "anabaslik", "yazarFoto" ve "yazarAdı" özelliklerine sahip bir "makale" nesnesi alır.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle tam olarak eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  // Bir kullanıcı bir kartı tıkladığında makalenin başlığının konsola kaydedilmesi için click event dinleyicisi ekleyin.
  //
  // <div class="card">
  //   <div class="headline">{ anabaslik }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ yazarFoto }>
  //     </div>
  //     <span>{ yazarAdı } tarafından</span>
  //   </div>
  // </div>
  //

  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  card.append(headline, author);
  author.append(imgContainer, span);
  imgContainer.append(img);

  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgContainer.classList.add("img-container");

  headline.textContent = makale.anabaslik;
  img.src = makale.yazarFoto;
  span.textContent = `tarafından ${makale.yazarAdi}`;

  card.setAttribute("data-id", makale.id);

  card.addEventListener("click", () => {
    console.log(makale.anabaslik);
  }); 

  return card;
}

const cardEkleyici = (secici) => {
  // GÖREV 6
  // ---------------------
  // Tek bağımsız değişkeni olarak bir css seçici alan bu fonksiyonu uygulayın.
  // Makaleleri bu uç noktadan almalıdır: `http://localhost:5001/api/makaleler` (console.log ile test edin!!).
  // Bununla birlikte, makaleler tek bir düzenli dizi halinde organize edilmemiştir. Yanıtı yakından inceleyin!
  // Card bileşenini kullanarak yanıttaki her makale nesnesinden bir kart oluşturun.
  // Her cardı, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //
 
  const makalelerContainer = document.querySelector(secici);
  
  axios
    .get("http://localhost:5001/api/makaleler")
    .then(function(response){
      console.log(response);
      const makalelerData = response.data.makaleler;
      const makalelerArray = Object.values(makalelerData).flat();

      makalelerArray.forEach((makale) => {
        const card = Card(makale);
        makalelerContainer.append(card);
      });
    })

    .catch(function(error) {
      console.log(error);
      makalelerContainer.textContent =
       error.message + " " + error.response.data.error;
    });

};
    


export { Card, cardEkleyici }
