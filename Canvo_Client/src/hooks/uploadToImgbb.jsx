export async function uploadToImgbb(file, apiKey) {
  if (!file) return null;

  const formData = new FormData();
  formData.append("image", file); // raw file, no base64

  const resp = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const json = await resp.json();

  if (!json.success) {
    console.error("ImgBB Upload Error:", json);
    return null;
  }

  return json.data.url; 
}
