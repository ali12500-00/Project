const key="0BPRkE70dfD2wx2JaMc45618M8kbEKH7bJdyUFeonjCzRPxCn5bLiBQU";
let input = document.getElementById("search-input");
let button = document.getElementById("search-button");
let videoButton = document.getElementById("btn-video");
let modal = document.getElementById("imageModal");
let modalImg = document.getElementById("modalImg");
let closeBtn = document.querySelector(".close");


const column1 = document.getElementById("column-1");
const column2 = document.getElementById("column-2");
const column3 = document.getElementById("column-3");
const column4 = document.getElementById("column-4");

let columns = [column1, column2, column3, column4];

let section2 = document.getElementById("section-2");
let loader = document.getElementById("loader");
let toaster = document.getElementById("toaster");
let p = document.getElementById("notification");

const categoryButtons = document.querySelectorAll("#category button");


let mode = "image";
let currentPage = 1;
let currentQuery = "nature"; 
let isLoading = false;
let perPage = 40;

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentQuery = btn.innerText.toLowerCase();
    input.value = currentQuery;
      categoryButtons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    currentPage = 1;
    clearColumns();
    getData();
  });
});
categoryButtons.forEach(btn => {
  if (btn.innerText.toLowerCase() === currentQuery) {
    btn.classList.add("active");
  }
});

videoButton.addEventListener("click", () => {
  mode = mode === "image" ? "video" : "image";
  videoButton.innerText = mode === "image" ? "Videos" : "Images";

  currentPage = 1;
  clearColumns();
  getData();
});

button.addEventListener("click", () => {
  let query = input.value.trim();
  if (!query) {
    showNotification("Please enter a search term");
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearColumns();
  getData();
});

input.addEventListener("keydown", e => {
  if (e.key === "Enter") button.click();
});

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 150
  ) {
    getData();
  }
});

async function getData() {
  if (isLoading) return;
  isLoading = true;
  loader.style.display = "block";

  try {
    let url =
      mode === "image"
        ? `https://api.pexels.com/v1/search?query=${currentQuery}&per_page=${perPage}&page=${currentPage}`
        : `https://api.pexels.com/videos/search?query=${currentQuery}&per_page=${perPage}&page=${currentPage}`;

    let response = await fetch(url, {
      headers: { Authorization: key }
    });

    let data = await response.json();
    section2.style.display = "grid";

    if (mode === "image") {
      renderImages(data.photos);
    } else {
      renderVideos(data.videos);
    }

    currentPage++;
  } catch (error) {
    console.log(error);
  }

  loader.style.display = "none";
  isLoading = false;
}

function renderImages(photos) {
  photos.forEach((photo, index) => {
    let box = document.createElement("div");
    box.className = "img-container";

    let photographer = document.createElement("p");
    photographer.className="name"
    photographer.innerText = photo.photographer;

    let img = document.createElement("img");
    img.src = photo.src.large;
    img.alt = photo.alt || "Image";
    img.style.borderRadius="8px";
    img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = photo.src.original;
    
});

      closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

    let innerDiv=document.createElement("div")
    innerDiv.className = "innerDiv";
    let title = document.createElement("p");
    title.innerText = photo.alt || "Untitled";
    let download = document.createElement("a");
    download.href = photo.src.original;
    download.download = "";
    download.target = "_blank";

    let icon = document.createElement("i");
    icon.className = "ri-download-line";
    download.appendChild(icon);
    download.addEventListener("click", (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    })
    download.addEventListener("click", () => {
    downloadImage(photo.src.original, "pexels-image.jpg");
    });
    box.append(photographer, img, innerDiv);
    innerDiv.appendChild(title)
    innerDiv.appendChild(download,)
     box.addEventListener("mouseenter", () => {
      title.style.opacity = "1";
      innerDiv.style.opacity = "1";
    });

    box.addEventListener("mouseleave", () => {
      title.style.opacity = "0";
      innerDiv.style.opacity = "0";
    });
    columns[index % 4].appendChild(box);
  });
}
async function downloadImage(url, filename = "image.jpg") {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.log("Download error:", error);
  }
}

function renderVideos(videos) {
  videos.forEach((video, index) => {
    let videoEl = document.createElement("video");
    let file = video.video_files.find(v => v.quality === "sd");

    videoEl.src = file.link;
    videoEl.controls = true;
    videoEl.muted = true;
    videoEl.style.width = "100%";

    columns[index % 4].appendChild(videoEl);
  });
}

function clearColumns() {
  columns.forEach(col => (col.innerHTML = ""));
}

function showNotification(message) {
  toaster.style.display = "block";
  p.innerText = message;
  setTimeout(() => (toaster.style.display = "none"), 3000);
}

getData();


