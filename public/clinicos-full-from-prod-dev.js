const isMobile = window.innerWidth <= 768;
function getContrastingTextColor(backgroundColor) {
  const hex = backgroundColor.replace("#", "");

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function getOrGenerateUUID() {
  // Check if UUID exists in local storage
  let uuid = localStorage.getItem("clinicosFlowUUID");

  // If UUID doesn't exist, generate a new one and store it
  if (!uuid) {
    uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
    localStorage.setItem("clinicosFlowUUID", uuid);
  }

  return uuid;
}
// END OF HELPER FUNCTIONS /////////////////////////////////////////////////////

// PARSE SCRIPT PARAMS /////////////////////////////////////////////////////////
let formName = "";
let clinicSdkKey = "";
const scriptElement = document.currentScript;
if (
  scriptElement &&
  scriptElement.hasAttribute("formName") &&
  scriptElement.hasAttribute("clinicSdkKey")
) {
  formName = scriptElement.getAttribute("formName");
  clinicSdkKey = scriptElement.getAttribute("clinicSdkKey");
} else {
  console.error("script requires formName and clinicSdkKey");
}

let themeColor = "#355262";
if (scriptElement && scriptElement.hasAttribute("themeColor")) {
  const themeColorParam = scriptElement.getAttribute("themeColor");
  const colorHexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (!colorHexRegex.test(themeColorParam))
    console.error("invalid themeColor, defaulting to #355262");
  else themeColor = themeColorParam;
}

let textColor = getContrastingTextColor(themeColor);
if (scriptElement && scriptElement.hasAttribute("textColor")) {
  const textColorParam = scriptElement.getAttribute("textColor");
  const colorHexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (!colorHexRegex.test(textColorParam))
    console.error("invalid textColor, defaulting to black or white");
  else textColor = textColorParam;
}

let position = "right";
if (scriptElement && scriptElement.hasAttribute("position")) {
  const positionParam = scriptElement
    .getAttribute("position")
    .toLowerCase()
    .trim();
  if (positionParam === "left") {
    position = "left";
  } else if (positionParam === "right") {
    position = "right";
  } else {
    console.error("invalid position, defaulting to right");
  }
}

let horizontalOffset = "20px";
if (scriptElement && scriptElement.hasAttribute("horizontalOffset")) {
  const horizontalOffsetParam = scriptElement
    .getAttribute("horizontalOffset")
    .toLocaleLowerCase()
    .trim();
  const regex = /^\d+px$/;
  if (regex.test(horizontalOffsetParam)) {
    horizontalOffset = horizontalOffsetParam;
  } else {
    console.error("invalid horizontalOffset, defaulting to 20px");
  }
}

let verticalOffset = "20px";
if (scriptElement && scriptElement.hasAttribute("verticalOffset")) {
  const verticalOffsetParam = scriptElement
    .getAttribute("verticalOffset")
    .toLocaleLowerCase()
    .trim();
  const regex = /^\d+px$/;
  if (regex.test(verticalOffsetParam)) {
    const verticalOffsetInt = parseInt(verticalOffsetParam.slice(0, -2));
    if (verticalOffsetInt > 30) {
      verticalOffset = "30px";
      console.error(
        "verticalOffset can't be greater than 30px, defaulting to 30px",
      );
    } else verticalOffset = verticalOffsetParam;
  } else {
    console.error("invalid verticalOffset, defaulting to 20px");
  }
}

let isCtaOpenByDefaultMobile = true;
if (scriptElement && scriptElement.hasAttribute("isCtaOpenByDefaultMobile")) {
  const isCtaOpenByDefaultParamMobile = scriptElement
    .getAttribute("isCtaOpenByDefaultMobile")
    .toLocaleLowerCase()
    .trim();
  if (isCtaOpenByDefaultParamMobile === "true") isCtaOpenByDefaultMobile = true;
  else if (isCtaOpenByDefaultParamMobile === "false")
    isCtaOpenByDefaultMobile = false;
  else console.error("invalid isCtaOpenByDefaultMobile, defaulting to true");
}
let isCtaOpenByDefaultDesktop = true;
if (scriptElement && scriptElement.hasAttribute("isCtaOpenByDefaultDesktop")) {
  const isCtaOpenByDefaultParamDesktop = scriptElement
    .getAttribute("isCtaOpenByDefaultDesktop")
    .toLocaleLowerCase()
    .trim();
  if (isCtaOpenByDefaultParamDesktop === "true")
    isCtaOpenByDefaultDesktop = true;
  else if (isCtaOpenByDefaultParamDesktop === "false")
    isCtaOpenByDefaultDesktop = false;
  else console.error("invalid isCtaOpenByDefault, defaulting to true");
}
// END OF PARSE SCRIPT PARAMS //////////////////////////////////////////////////

// FORM URL ////////////////////////////////////////////////////////////////////
const onboardingTier1 = `https://main.dp9ch69srufqq.amplifyapp.com/?formName=${formName}&clinicSdkKey=${clinicSdkKey}&themeColor=${encodeURIComponent(
  themeColor,
)}&referrer=${
  document.referrer
}&visitorId=${getOrGenerateUUID()}#Areas_of_Interest`;
// END OF FORM URL /////////////////////////////////////////////////////////////

const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

const keyframesModalBtnPulse = `
  @keyframes pulse {
    0% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 30px rgba(90, 153, 212, 0);
    }
    100% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
    }
  }
`;

const keyframesModalSelectFadeIn = `
@keyframes modalSelectFadeIn {
    0% {
        display: none;
        opacity: 0;
    }
    100% {
        opacity: 1;
        display: flex;
    }
}
`;

const keyframesModalSelectFadeOut = `
@keyframes modalSelectFadeOut {
    0% {
        display: flex;
        opacity: 1;
    }
    1% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none;
    }
}
`;

const hovered = `.clinicos-flow__hovered { \
    filter: brightness(90%) !important; \
    cursor: pointer !important; \
}`;

const selected = `.clinicos-flow__selected { \
    background-color: ${themeColor} !important; \
    border: 1.5px solid ${themeColor} !important; \
}`;

// ASSETS //////////////////////////////////////////////////////////////////////
const floatingButtonSvg = `
<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_6749_3864)">
    <path d="M11.8777 35.5121C14.6128 31.8508 18.9808 29.4805 23.9025 29.4805C27.4061 29.4805 30.6292 30.6817 33.1824 32.6948" stroke="${textColor}" stroke-width="3.42857" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.7584 45.5524H6.75844C5.62183 45.5524 4.53171 45.1007 3.728 44.2971C2.92428 43.4936 2.47275 42.4034 2.47275 41.2668V6.98104C2.47275 5.84439 2.92428 4.75432 3.728 3.95057C4.53171 3.14684 5.62183 2.69531 6.75844 2.69531H41.0442C42.1808 2.69531 43.2708 3.14684 44.0748 3.95057C44.8784 4.75432 45.3301 5.84439 45.3301 6.98104V22.5" stroke="${textColor}" stroke-width="3.42857" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23.9013 23.0525C27.4517 23.0525 30.3299 20.1743 30.3299 16.6239C30.3299 13.0735 27.4517 10.1953 23.9013 10.1953C20.3509 10.1953 17.4727 13.0735 17.4727 16.6239C17.4727 20.1743 20.3509 23.0525 23.9013 23.0525Z" stroke="${textColor}" stroke-width="3.42857" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M32.1281 46.7171C30.6241 46.4552 30.6241 44.2962 32.1281 44.0346C37.5768 43.0867 41.9104 38.9365 43.0931 33.5339L43.1837 33.1198C43.5091 31.6334 45.6257 31.6241 45.9639 33.1076L46.074 33.5903C47.3006 38.9674 51.6351 43.0824 57.069 44.0277C58.5806 44.2907 58.5806 46.4608 57.069 46.724C51.6351 47.669 47.3006 51.7841 46.074 57.1614L45.9639 57.644C45.6257 59.1272 43.5091 59.1182 43.1837 57.6315L43.0931 57.2175C41.9104 51.815 37.5768 47.6647 32.1281 46.7171Z" stroke="${textColor}" stroke-width="3.42857" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_6749_3864">
      <rect width="60" height="60" fill="black"/>
    </clipPath>
  </defs>
</svg>
`;

const floatingButtonSvgDataUri = `data:image/svg+xml,${encodeURIComponent(
  floatingButtonSvg,
)}`;

const closeButtonSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M1 1L13 13M13 1L1 13" stroke="#282B33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const closeButtonSvgDataUri = `data:image/svg+xml,${encodeURIComponent(
  closeButtonSvg,
)}`;
// END OF ASSETS ///////////////////////////////////////////////////////////////

styleElement.sheet.insertRule(keyframesModalBtnPulse, 0);
styleElement.sheet.insertRule(keyframesModalSelectFadeIn, 0);
styleElement.sheet.insertRule(keyframesModalSelectFadeOut, 0);
styleElement.sheet.insertRule(hovered, 0);
styleElement.sheet.insertRule(selected, 0);

const fontLink = document.createElement("link");
if (!fontLink) console.error("error creating fontLink");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css?family=Urbanist:300,300i,400,400i,700,700i";

// START FLOATING BUTTON
const clinicosFlowDiv = document.createElement("div");
if (!clinicosFlowDiv) console.error("error creating clinicosFlowDiv");
clinicosFlowDiv.id = "clinicos-flow";
clinicosFlowDiv.style.all = "initial";
clinicosFlowDiv.style.display = "flex";
clinicosFlowDiv.style.flexDirection = "column";
clinicosFlowDiv.style.justifyContent = "end";
clinicosFlowDiv.style.gap = "10px";
clinicosFlowDiv.style.zIndex = "2147483646";
clinicosFlowDiv.style.position = "fixed";
if (position === "right") {
  clinicosFlowDiv.style.alignItems = "flex-end";
  clinicosFlowDiv.style.right = horizontalOffset;
  clinicosFlowDiv.style.bottom = verticalOffset;
} else {
  clinicosFlowDiv.style.alignItems = "flex-start";
  clinicosFlowDiv.style.left = horizontalOffset;
  clinicosFlowDiv.style.bottom = verticalOffset;
}

const modalSelectDiv = document.createElement("div");
if (!modalSelectDiv) console.error("error creating modalSelectDiv");
modalSelectDiv.id = "clinicos-flow__modal-select";
modalSelectDiv.style.all = "initial";
modalSelectDiv.style.position = "relative";
modalSelectDiv.style.flexDirection = "column";
modalSelectDiv.style.justifyContent = "center";
modalSelectDiv.style.alignItems = "center";
modalSelectDiv.style.gap = "10px";
modalSelectDiv.style.padding = "16px";
if (isMobile) {
  if (isCtaOpenByDefaultMobile) modalSelectDiv.style.display = "flex";
  else modalSelectDiv.style.display = "none";
} else {
  if (isCtaOpenByDefaultDesktop) modalSelectDiv.style.display = "flex";
  else modalSelectDiv.style.display = "none";
}

const modelSelectOpacityDiv = document.createElement("div");
if (!modelSelectOpacityDiv)
  console.error("error creating modelSelectOpacityDiv");
modelSelectOpacityDiv.id = "clinicos-flow__test-div";
modelSelectOpacityDiv.style.all = "initial";
modelSelectOpacityDiv.style.display = "flex";
modelSelectOpacityDiv.style.position = "absolute";
modelSelectOpacityDiv.style.width = "100%";
modelSelectOpacityDiv.style.height = "100%";
modelSelectOpacityDiv.style.borderRadius = "15px";
modelSelectOpacityDiv.style.background = "#F0F0F0";
modelSelectOpacityDiv.style.opacity = "0.8";
modelSelectOpacityDiv.style.boxShadow = "0 4px 6px 1px rgba(0, 0, 0, 0.15)";

const selectedOptionDiv = document.createElement("div");
if (!selectedOptionDiv) console.error("error creating selectedOptionDiv");
selectedOptionDiv.className = "clinicos-flow__selected";
selectedOptionDiv.textContent = "Simulate your next procedure";
selectedOptionDiv.style.fontFamily = "Urbanist, Times New Roman, Times, serif";
selectedOptionDiv.style.fontSize = "16px";
selectedOptionDiv.style.fontWeight = "600";
selectedOptionDiv.style.borderRadius = "30px";
selectedOptionDiv.style.color = textColor;
selectedOptionDiv.style.border = `1.5px solid #EAE9E9`;
selectedOptionDiv.style.zIndex = "1";
selectedOptionDiv.style.textAlign = "center";
selectedOptionDiv.style.transition = "filler 0.25s ease";
selectedOptionDiv.style.padding = "13px 20px";
selectedOptionDiv.style.boxShadow = "0px 1px 2px 1px rgba(0, 0, 0, 0.08)";
selectedOptionDiv.addEventListener("touchstart", function () {
  selectedOptionDiv.classList.add("clinicos-flow__hovered");
});
selectedOptionDiv.addEventListener("mouseover", function () {
  selectedOptionDiv.classList.add("clinicos-flow__hovered");
});
selectedOptionDiv.addEventListener("touchend", function () {
  selectedOptionDiv.classList.remove("clinicos-flow__hovered");
});
selectedOptionDiv.addEventListener("mouseout", function () {
  selectedOptionDiv.classList.remove("clinicos-flow__hovered");
});

const buttonImgDiv = document.createElement("div");
if (!buttonImgDiv) console.error("error creating buttonImgDiv");
buttonImgDiv.id = "clinicos-flow__open-modal-btn";
buttonImgDiv.src = floatingButtonSvgDataUri;
buttonImgDiv.draggable = false;
buttonImgDiv.style.all = "initial";
buttonImgDiv.style.cursor = "pointer";
buttonImgDiv.style.backgroundColor = `${themeColor}`;
buttonImgDiv.style.overflow = "visible";
buttonImgDiv.style.boxShadow = "0 0 0 0 #5A99D4";
buttonImgDiv.style.transition = "rotate 0.5s ease-in-out";
buttonImgDiv.style.borderRadius = "100px";
buttonImgDiv.style.padding = "20px 16px 16px 20px";
buttonImgDiv.style.width = "30px";
buttonImgDiv.style.height = "30px";
buttonImgDiv.style.aspectRatio = "1";
buttonImgDiv.onclick = handleModalButtonOnClick;
buttonImgDiv.addEventListener("touchstart", function () {
  buttonImgDiv.classList.add("clinicos-flow__hovered");
});
buttonImgDiv.addEventListener("touchend", function () {
  buttonImgDiv.classList.remove("clinicos-flow__hovered");
});
buttonImgDiv.addEventListener("mouseenter", function () {
  buttonImgDiv.classList.add("clinicos-flow__hovered");
});
buttonImgDiv.addEventListener("mouseleave", function () {
  buttonImgDiv.classList.remove("clinicos-flow__hovered");
});

const buttonImg = document.createElement("img");
if (!buttonImg) console.error("error creating buttonImg");
buttonImg.id = "clinicos-flow__open-modal-btn";
buttonImg.src = floatingButtonSvgDataUri;
buttonImg.draggable = false;
buttonImg.style.all = "initial";
buttonImg.style.cursor = "pointer";
buttonImg.style.width = "30px";
buttonImg.style.height = "30px";
buttonImg.style.pointerEvents = "none";
buttonImg.style.userSelect = "none";
// END FLOATING BUTTON

// START IFRAME MOBILE
const iframeOnboardingTier1MobileWrapper = document.createElement("div");
if (!iframeOnboardingTier1MobileWrapper)
  console.error("error creating iframeOnboardingTier1MobileWrapper");
iframeOnboardingTier1MobileWrapper.id =
  "clinicos-flow__iframe-onboarding-tier-1-mobile-wrapper";
iframeOnboardingTier1MobileWrapper.style.all = "initial";
iframeOnboardingTier1MobileWrapper.style.backgroundColor = "white";
iframeOnboardingTier1MobileWrapper.style.zIndex = "2147483647";
iframeOnboardingTier1MobileWrapper.style.position = "fixed";
iframeOnboardingTier1MobileWrapper.style.top = "0";
iframeOnboardingTier1MobileWrapper.style.left = "100%";
iframeOnboardingTier1MobileWrapper.style.width = "100%";
iframeOnboardingTier1MobileWrapper.style.height = "100%";
iframeOnboardingTier1MobileWrapper.style.transition = "left 0.5s ease 0s";
iframeOnboardingTier1MobileWrapper.style.background = "#ffffff";

const iframeOnboardingTier1Mobile = document.createElement("iframe");
if (!iframeOnboardingTier1Mobile)
  console.error("error creating iframeOnboardingTier1Mobile");
iframeOnboardingTier1Mobile.id =
  "clinicos-flow__iframe-onboarding-tier-1-mobile";
if (formName) {
  iframeOnboardingTier1Mobile.src = `${onboardingTier1}`;
}
iframeOnboardingTier1Mobile.frameBorder = "0";
iframeOnboardingTier1Mobile.scrolling = "no";
iframeOnboardingTier1Mobile.allow = "camera";
iframeOnboardingTier1Mobile.style.all = "initial";
iframeOnboardingTier1Mobile.style.height = "100%";
iframeOnboardingTier1Mobile.style.width = "100%";
iframeOnboardingTier1Mobile.style.position = "relative";

const closeModalButtonMobile = document.createElement("img");
if (!closeModalButtonMobile)
  console.error("error creating closeModalButtonMobile");
closeModalButtonMobile.draggable = false;
closeModalButtonMobile.id = "clinicos-flow__close-modal-button-mobile";
closeModalButtonMobile.src = closeButtonSvgDataUri;
closeModalButtonMobile.alt = "close modal button";
closeModalButtonMobile.style.all = "initial";
closeModalButtonMobile.style.position = "fixed";
closeModalButtonMobile.style.zIndex = "2147483647";
closeModalButtonMobile.style.cursor = "pointer";
closeModalButtonMobile.style.width = "18px";
closeModalButtonMobile.style.height = "18px";
closeModalButtonMobile.style.display = "none";
closeModalButtonMobile.style.top = "10px";
closeModalButtonMobile.style.right = "0px";
closeModalButtonMobile.style.padding = "15px";
closeModalButtonMobile.addEventListener("click", function () {
  iframeOnboardingTier1MobileWrapper.style.left = "100%";
  closeModalButtonMobile.style.display = "none";
});
// END IFRAME MOBILE

// START IFRAME DESKTOP
const iframeWrapperDiv = document.createElement("div");
if (!iframeWrapperDiv) console.error("error creating iframeWrapperDiv");
iframeWrapperDiv.id = "clinicos-flow__iframe-wrapper";
iframeWrapperDiv.style.all = "initial";
iframeWrapperDiv.style.overflow = "hidden";
iframeWrapperDiv.style.borderRadius = "16px";
iframeWrapperDiv.style.width = "0px";
iframeWrapperDiv.style.height = "0px";
iframeWrapperDiv.style.transition = "width 0.5s linear, height 0.50s linear";
iframeWrapperDiv.style.boxShadow = "0px 3px 12px #20222825";
iframeWrapperDiv.style.background = "#ffffff";

const iframeOnboardingTier1 = document.createElement("iframe");
if (!iframeOnboardingTier1)
  console.error("error creating iframeOnboardingTier1");
iframeOnboardingTier1.id = "clinicos-flow__iframe";
if (formName) {
  iframeOnboardingTier1.src = `${onboardingTier1}`;
}
iframeOnboardingTier1.frameBorder = "0";
iframeOnboardingTier1.scrolling = "no";
iframeOnboardingTier1.allow = "camera";
iframeOnboardingTier1.style.height = "70vh";
iframeOnboardingTier1.style.width = "35vh";
iframeOnboardingTier1.style.minHeight = "640px";
iframeOnboardingTier1.style.minWidth = "375px";
iframeOnboardingTier1.style.position = "relative";
iframeOnboardingTier1.style.top = "-8px";
// END IFRAME DESKTOP

// START PULSE ANIMATIONS
setInterval(() => {
  buttonImgDiv.style.animation = "pulse 1.5s infinite";
  setTimeout(() => {
    buttonImgDiv.style.animation = "none";
  }, 1500);
}, 15000);
// END PULSE ANIMATIONS

// START ADDING ELEMENTS TO DOM
document.head.appendChild(fontLink);
document.body.appendChild(clinicosFlowDiv);
document.body.appendChild(iframeOnboardingTier1MobileWrapper);
document.body.appendChild(closeModalButtonMobile);

iframeOnboardingTier1MobileWrapper.appendChild(iframeOnboardingTier1Mobile);
clinicosFlowDiv.appendChild(iframeWrapperDiv);
clinicosFlowDiv.appendChild(modalSelectDiv);
clinicosFlowDiv.appendChild(buttonImgDiv);
buttonImgDiv.appendChild(buttonImg);

modalSelectDiv.appendChild(selectedOptionDiv);
modalSelectDiv.appendChild(modelSelectOpacityDiv);

iframeWrapperDiv.appendChild(iframeOnboardingTier1);
// END ADDING ELEMENTS TO DOM

// START EVENT LISTENERS
function toggleSelections() {
  const computedStyle = window.getComputedStyle(modalSelectDiv);
  if (computedStyle.getPropertyValue("display") === "flex") {
    modalSelectDiv.style.animation = "modalSelectFadeOut 0.5s ease-in-out 0s";
    modalSelectDiv.style.display = "none";
  } else {
    modalSelectDiv.style.animation = "modalSelectFadeIn 0.5s ease-in-out 0s";
    modalSelectDiv.style.display = "flex";
  }
}

function toggleIframe(index) {
  if (isMobile) return;
  if (index === 0) {
    iframeOnboardingTier1.style.display = "initial";
  } else if (index === 1) {
    iframeOnboardingTier1.style.display = "none";
  } else {
  }

  const iframeWrapperStyle = window.getComputedStyle(iframeWrapperDiv);

  if (iframeWrapperStyle.getPropertyValue("height") === "0px") {
    const width = Math.max(iframeOnboardingTier1.offsetWidth);
    const height = Math.max(iframeOnboardingTier1.offsetHeight);
    iframeWrapperDiv.style.width = `${width}px`;
    iframeWrapperDiv.style.height = `${height}px`;
  } else {
    iframeWrapperDiv.style.width = "0px";
    iframeWrapperDiv.style.height = "0px";
  }
}

function handleModalButtonOnClick() {
  const iframeWrapperStyle = window.getComputedStyle(iframeWrapperDiv);
  if (iframeWrapperStyle.getPropertyValue("height") !== "0px") {
    toggleIframe(-1);
    setTimeout(() => {
      toggleSelections();
    }, 510);
  } else {
    toggleSelections();
  }
}

const options = document.querySelectorAll(
  "#clinicos-flow__modal-select div:not(:last-child)",
);
options.forEach((opt, index) => {
  opt.addEventListener("click", function () {
    options.forEach((opt) => opt.classList.remove("clinicos-flow__selected"));
    this.classList.add("clinicos-flow__selected");

    // FOR MIXPANEL TRACKING
    if (isMobile) {
      iframeOnboardingTier1Mobile.contentWindow.postMessage(
        { message: "Form Opened" },
        "*",
      );
    } else {
      iframeOnboardingTier1.contentWindow.postMessage(
        { message: "Form Opened" },
        "*",
      );
    }
    // END OF MIXPANEL TRACKING

    if (isMobile) {
      if (index === 0) {
        iframeOnboardingTier1MobileWrapper.style.left = 0;
      }
      closeModalButtonMobile.style.display = "block";
      return;
    }

    toggleSelections();
    setTimeout(() => {
      toggleIframe(index);
    }, 510);
  });
});
// END EVENT LISTENERS

// START IFRAME POSTMESSAGE
if (formName) {
  iframeOnboardingTier1.setAttribute("allow", "autoplay; camera;");
  let iframeUrl = iframeOnboardingTier1.getAttribute("src");
  iframeOnboardingTier1.setAttribute("src", iframeUrl + "?v=2");

  iframeOnboardingTier1Mobile.setAttribute("allow", "autoplay; camera;");
  iframeUrl = iframeOnboardingTier1Mobile.getAttribute("src");
  iframeOnboardingTier1Mobile.setAttribute("src", iframeUrl + "?v=2");
}
// END IFRAME POSTMESSAGE
