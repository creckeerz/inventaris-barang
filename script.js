document.getElementById("formInventaris").addEventListener("submit", async function (e) {
  e.preventDefault();

  const namaBPP = document.getElementById("namaBPP").value;
  const namaBarang = document.getElementById("namaBarang").value;
  const tahunRilis = document.getElementById("tahunRilis").value;

  const gambarDepan = await toBase64(document.getElementById("gambarDepan").files[0]);
  const gambarSamping = await toBase64(document.getElementById("gambarSamping").files[0]);
  const gambarBelakang = await toBase64(document.getElementById("gambarBelakang").files[0]);

  const payload = {
    namaBPP,
    namaBarang,
    tahunRilis,
    gambarDepan: gambarDepan.replace(/^data:image\\/\\w+;base64,/, ""),
    gambarSamping: gambarSamping.replace(/^data:image\\/\\w+;base64,/, ""),
    gambarBelakang: gambarBelakang.replace(/^data:image\\/\\w+;base64,/, "")
  };

  fetch("https://script.google.com/macros/s/AKfycbw7jzLT0EZV2FxWnrkaGmrsvzwXCP_-DDWQxbj8IxUcHFRuS6zyYVD7S6POfmrWQFBmow/exec", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("message").textContent = msg;
  })
  .catch(err => {
    document.getElementById("message").textContent = "❌ Gagal mengirim: " + err.message;
  });
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
