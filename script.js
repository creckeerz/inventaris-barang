document.getElementById("formInventaris").addEventListener("submit", async function (e) {
  e.preventDefault();

  const namaBPP = document.getElementById("namaBPP").value;
  const namaBarang = document.getElementById("namaBarang").value;
  const tahunRilis = document.getElementById("tahunRilis").value;

  // convert gambar ke base64
  const gambarDepan = await toBase64(document.getElementById("gambarDepan").files[0]);
  const gambarSamping = await toBase64(document.getElementById("gambarSamping").files[0]);
  const gambarBelakang = await toBase64(document.getElementById("gambarBelakang").files[0]);

  const payload = {
    namaBPP,
    namaBarang,
    tahunRilis,
    gambarDepan: gambarDepan.replace(/^data:image\/(png|jpeg);base64,/, ""),
    gambarSamping: gambarSamping.replace(/^data:image\/(png|jpeg);base64,/, ""),
    gambarBelakang: gambarBelakang.replace(/^data:image\/(png|jpeg);base64,/, "")
  };

  fetch("https://script.google.com/macros/s/AKfycbwX1kc-EyGVOrNvBEMjIl9WSsrfSpOe2O643lN4tUGIcoiAAfkeTWVN6Ze_06cLhlZkiQ/exec", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Gagal mengirim data: " + err));
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
