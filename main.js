const fileBrowseButton = document.querySelector(".file-browse-button");
const fileBrowseInput = document.querySelector(".file-browse-input");
const fileUploadBox = document.querySelector(".file-upload-box");
const fileList = document.querySelector(".file-list");
const cancelButton = document.querySelector(".cancel-button");
const totalFiles = document.querySelector(".total");
const completedFiles = document.querySelector(".completed");

const handelSelectedFiles = (file) => {
  for (let i = 0; i < file.length; i++) {
    totalFiles.textContent++;
    let name = file[i].name;
    let type = file[i].name.split(".").pop();
    let size = (file[i].size / 1048576).toFixed(2);
    let item = `
            <li class="file-item">
              <div class="file-extension">${type}</div>
              <div class="file-content-wraper">
                <div class="file-content">
                  <div class="file-details">
                    <h5 class="file-name">${name}</h5>
                    <div class="file-info">
                      <small class="file-size">${size} MB</small>
                      <small class="file-divider">•</small>
                      <small class="file-status">Uploading...</small>
                    </div>
                  </div>
                  <button class="cancel-button">✖</button>
                </div>
                <div class="file-progress-bar">
                  <div data-speed="${size}" style = "transition:${size}s" class="file-progress"></div>
                </div>
              </div>
            </li>`;
    fileList.insertAdjacentHTML("afterbegin", item);
  }
  const fileProgress = Array.from(document.querySelectorAll(".file-progress"));
  const fileStatus = Array.from(document.querySelectorAll(".file-status"));
  for (let i = 0; i < file.length; i++) {
    setInterval(() => {
      fileProgress[i].style.width = "100%";
    }, 10);
    setTimeout(() => {
      completedFiles.textContent++;
      fileStatus[i].classList.add("Completed");
      fileStatus[
        i
      ].parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
        "completed"
      );
      fileStatus[i].textContent = "Completed";
    }, fileProgress[i].dataset.speed * 1000);
  }
};

fileUploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  handelSelectedFiles(e.dataTransfer.files);
  fileUploadBox.classList.remove("active");
  document.querySelector(".file-instruction").innerText = "Drag files here or";
});

fileUploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileUploadBox.classList.add("active");
  document.querySelector(".file-instruction").innerText =
    "Release to upload or";
});

fileUploadBox.addEventListener("dragleave", (e) => {
  e.preventDefault();
  fileUploadBox.classList.remove("active");
  document.querySelector(".file-instruction").innerText = "Drag files here or";
});

fileBrowseButton.addEventListener("click", () => fileBrowseInput.click());

fileBrowseInput.addEventListener("change", (e) => {
  handelSelectedFiles(e.target.files);
  console.log(e.target.files);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cancel-button")) {
    if (
      e.target.parentElement.parentElement.parentElement.classList.contains(
        "completed"
      )
    ) {
      completedFiles.textContent--;
      totalFiles.textContent--;
    } else {
      totalFiles.textContent--;
    }
    e.target.parentElement.parentElement.parentElement.remove();
  }
});