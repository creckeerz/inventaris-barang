document.getElementById("formInventaris").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const getBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const payload = {
    namaBPP: data.get("namaBPP"),
    namaBarang: data.get("namaBarang"),
    tahunRilis: data.get("tahunRilis"),
    gambarDepan: await getBase64(data.get("gambarDepan")),
    gambarSamping: await getBase64(data.get("gambarSamping")),
    gambarBelakang: await getBase64(data.get("gambarBelakang"))
  };

  fetch("https://script.google.com/macros/s/PASTE_WEBAPP_URL/exec", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("message").innerText = msg;
    form.reset();
  })
  .catch(err => {
    console.error(err);
    document.getElementById("message").innerText = "Gagal kirim data.";
  });
});
