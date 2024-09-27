const isMobile = window.innerWidth <= 768;
const colorHexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

// script param
const scriptElement = document.currentScript;

const formName = scriptElement.getAttribute("formName") ?? "onboarding-scan";
const clinicSdkKey = scriptElement.getAttribute("clinicSdkKey") ?? "";
const bodyPartScan = scriptElement.getAttribute("bodyPartScan") ?? "";
let themeColor = scriptElement.getAttribute("themeColor") ?? "#00B7F4";
if (!colorHexRegex.test(themeColor)) themeColor = "#00B7F4";

const iframeSrcScan = `https://form-staging.clinicos.ai/${formName}/?clinicSdkKey=${clinicSdkKey}&themeColor=${encodeURIComponent(themeColor)}&bodyPartScan=${bodyPartScan}#`;

const modalBody = document.createElement("div");
modalBody.id = "scan-modal-k28vew83vj";
modalBody.style.all = "initial";
modalBody.style.position = "fixed";
modalBody.style.overflow = "hidden";
modalBody.style.zIndex = "2147483646";
modalBody.style.background = "white";
modalBody.style.userSelect = "none";
modalBody.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.2)";
modalBody.style.webkitBoxShadow = "0 0 20px rgba(0, 0, 0, 0.2)";
modalBody.style.display = "none";
if (isMobile) {
  modalBody.style.width = "100svw";
  modalBody.style.height = "100svh";
  modalBody.style.top = "0";
  modalBody.style.left = "0";
} else {
  modalBody.style.borderRadius = "16px";
  modalBody.style.height = "700px";
  modalBody.style.width = "390px";
  modalBody.style.top = "50%";
  modalBody.style.left = "50%";
  modalBody.style.transform = "translate(-50%, -50%)";
}

const iframeClinicosOnboarding = document.createElement("iframe");
iframeClinicosOnboarding.style.all = "initial";
iframeClinicosOnboarding.src = iframeSrcScan;
iframeClinicosOnboarding.frameBorder = "0";
iframeClinicosOnboarding.scrolling = "no";
iframeClinicosOnboarding.style.position = "relative";
iframeClinicosOnboarding.style.height = "100%";
iframeClinicosOnboarding.style.width = "100%";

const closeButtonSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 2L17 17M17 2L2 17" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const closeButtonSvgDataUri = `data:image/svg+xml,${encodeURIComponent(
  closeButtonSvg,
)}`;

const closeButtonBody = document.createElement("div");
closeButtonBody.style.all = "initial";
closeButtonBody.style.position = "absolute";
closeButtonBody.style.cursor = "pointer";
closeButtonBody.style.userSelect = "none";
closeButtonBody.style.padding = "10px";
closeButtonBody.style.top = "10px";
closeButtonBody.style.right = "-2px";
closeButtonBody.innerHTML = `<img src="${closeButtonSvgDataUri}" alt="Close" width="16" height="16" />`;

closeButtonBody.addEventListener("click", () => {
  modalBody.style.display = "none";
  iframeClinicosOnboarding.contentWindow.postMessage(
    { message: "reload" },
    "*",
  );
});

const procedure = document.createElement("div");
procedure.id = "scan-procedure-k28vew83vj";
procedure.display = "none";

modalBody.appendChild(iframeClinicosOnboarding);
modalBody.appendChild(closeButtonBody);
document.body.appendChild(modalBody);
document.body.appendChild(procedure);

iframeClinicosOnboarding.setAttribute("allow", "camera;");
let iframeUrl = iframeClinicosOnboarding.getAttribute("src");
iframeClinicosOnboarding.setAttribute("src", iframeUrl + "?v=2");

window.addEventListener("procedure-update", (event) => {
  const procedure = event.detail.procedure || "";
  const name = event.detail.name || "";
  const email = event.detail.email || "";
  const phone = event.detail.phone || "";
  const bodyPartScan = event.detail.bodyPartScan || "";

  const currentIframeSrcScan = `https://form-staging.clinicos.ai/${formName}/?clinicSdkKey=${clinicSdkKey}&themeColor=${encodeURIComponent(themeColor)}&procedure=${procedure}&name=${name}&email=${email}&phone=${phone}&bodyPartScan=${bodyPartScan}#`;
  iframeClinicosOnboarding.src = currentIframeSrcScan;
});

window.addEventListener("message", (ev) => {
  if (ev.data.message === "close modal") {
    closeButtonBody.click();
  }
});
