// START OF HELPER FUNCTIONS ///////////////////////////////////////////////////
const randomFormVersion = Math.floor(Math.random() * 7) + 1;
const isMobile = window.innerWidth <= 768;
const getPreviewVideoSource = (contextProcedure) => {
  if (contextProcedure === "BBL") {
    return "https://clinic-os.com/flow-assets/video-preview/preview-bbl.mp4";
  } else if (contextProcedure === "TUMMY_TUCK") {
    return "https://clinic-os.com/flow-assets/video-preview/preview-tummy-tuck.mp4";
  } else if (contextProcedure === "BREAST_AUGMENTATION") {
    return "https://clinic-os.com/flow-assets/video-preview/preview-breast-aug.mp4";
  } else if (contextProcedure === "BREAST_LIFT") {
    return "https://clinic-os.com/flow-assets/video-preview/preview-breast-lift.mp4";
  } else if (contextProcedure === "BREAST_REDUCTION") {
    return "https://clinic-os.com/flow-assets/video-preview/preview-breast-reduction.mp4";
  } else if (contextProcedure === "BREAST_LIFT_AND_AUGMENTATION") {
    return "https://clinic-os.com/flow-assets/video-preview/preview-breast-lift-and-aug.mp4";
  } else {
    return "https://clinic-os.com/flow-assets/video-preview/preview-breast-aug.mp4";
  }
};
function getContrastingTextColor(backgroundColor) {
  const hex = backgroundColor.replace("#", "");

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
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

let themeColor = "#00B7F4";
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

let positionMobile = "right";
if (scriptElement && scriptElement.hasAttribute("positionMobile")) {
  const positionMobileParam = scriptElement
    .getAttribute("positionMobile")
    .toLowerCase()
    .trim();
  if (positionMobileParam === "left") {
    positionMobile = "left";
  } else if (positionMobileParam === "right") {
    positionMobile = "right";
  } else {
    console.error("Invalid positionMobile, defaulting to right");
  }
}

let positionDesktop = "right";
if (scriptElement && scriptElement.hasAttribute("positionDesktop")) {
  const positionDesktopParam = scriptElement
    .getAttribute("positionDesktop")
    .toLowerCase()
    .trim();
  if (positionDesktopParam === "left") {
    positionDesktop = "left";
  } else if (positionDesktopParam === "right") {
    positionDesktop = "right";
  } else {
    console.error("Invalid positionDesktop, defaulting to right");
  }
}

let horizontalOffsetDesktop = "20px";
if (scriptElement && scriptElement.hasAttribute("horizontalOffsetDesktop")) {
  const horizontalOffsetParam = scriptElement
    .getAttribute("horizontalOffsetDesktop")
    .toLocaleLowerCase()
    .trim();
  const regex = /^\d+px$/;
  if (regex.test(horizontalOffsetParam)) {
    horizontalOffsetDesktop = horizontalOffsetParam;
  } else {
    console.error("invalid horizontalOffsetDesktop, defaulting to 20px");
  }
}

let verticalOffsetDesktop = "20px";
if (scriptElement && scriptElement.hasAttribute("verticalOffsetDesktop")) {
  const verticalOffsetParam = scriptElement
    .getAttribute("verticalOffsetDesktop")
    .toLocaleLowerCase()
    .trim();
  const regex = /^\d+px$/;
  if (regex.test(verticalOffsetParam)) {
    const verticalOffsetInt = parseInt(verticalOffsetParam.slice(0, -2));
    if (verticalOffsetInt > 30) {
      verticalOffsetDesktop = "30px";
      console.error(
        "verticalOffsetDesktop can't be greater than 30px, defaulting to 30px",
      );
    } else verticalOffsetDesktop = verticalOffsetParam;
  } else {
    console.error("invalid verticalOffsetDesktop, defaulting to 20px");
  }
}

let horizontalOffsetMobile = "20px";
if (scriptElement && scriptElement.hasAttribute("horizontalOffsetMobile")) {
  const mobileHorizontalOffsetParam = scriptElement
    .getAttribute("horizontalOffsetMobile")
    .toLocaleLowerCase()
    .trim();
  const regex = /^\d+px$/;
  if (regex.test(mobileHorizontalOffsetParam)) {
    horizontalOffsetMobile = mobileHorizontalOffsetParam;
  } else {
    console.error("Invalid horizontalOffsetMobile, defaulting to 20px");
  }
}

let verticalOffsetMobile = "20px";
if (scriptElement && scriptElement.hasAttribute("verticalOffsetMobile")) {
  const mobileVerticalOffsetParam = scriptElement
    .getAttribute("verticalOffsetMobile")
    .toLocaleLowerCase()
    .trim();
  const regex = /^\d+px$/;
  if (regex.test(mobileVerticalOffsetParam)) {
    verticalOffsetMobile = mobileVerticalOffsetParam;
  } else {
    console.error("Invalid verticalOffsetMobile, defaulting to 20px");
  }
}

let videoPlayFrequency = 300;
if (scriptElement && scriptElement.hasAttribute("videoPlayFrequency")) {
  const videoPlayFrequencyParam = parseInt(
    scriptElement.getAttribute("videoPlayFrequency").trim(),
  );

  if (!isNaN(videoPlayFrequencyParam) && videoPlayFrequencyParam >= 10) {
    videoPlayFrequency = videoPlayFrequencyParam;
  } else {
    console.error(
      "Invalid videoPlayFrequency, it must be at least 10 seconds. Using the default value of 300s (5 minutes).",
    );
  }
}

let ctaPosition = "above";
if (scriptElement && scriptElement.hasAttribute("ctaPosition")) {
  const ctaPositionParam = scriptElement
    .getAttribute("ctaPosition")
    .toLocaleLowerCase()
    .trim();

  if (ctaPositionParam === "above" || ctaPositionParam === "side") {
    ctaPosition = ctaPositionParam;
  } else {
    console.error(
      `Invalid ctaPosition: "${ctaPositionParam}". Using the default value "above".`,
    );
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
const onboardingTier1 = `https://form.clinicos.ai/?formName=${formName}&clinicSdkKey=${clinicSdkKey}&themeColor=${encodeURIComponent(
  themeColor,
)}&referrer=${document.referrer}#`;
// END OF FORM URL /////////////////////////////////////////////////////////////

const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

const keyframesModalPulse = `
@keyframes buttonPulse {
  25% 100% {
		transform: scale(1);
		box-shadow: 0 0 0 0 ${themeColor}B3;

    }
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 ${themeColor}B3;
	}

	14% {
		transform: scale(1);
		box-shadow: 0 0 0 20px ${themeColor}00;
	}

	20% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 ${themeColor}00;
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
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 2L17 17M17 2L2 17" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const closeButtonSvgDataUri = `data:image/svg+xml,${encodeURIComponent(
  closeButtonSvg,
)}`;
// END OF ASSETS ///////////////////////////////////////////////////////////////

styleElement.sheet.insertRule(keyframesModalPulse, 0);
styleElement.sheet.insertRule(keyframesModalSelectFadeIn, 0);
styleElement.sheet.insertRule(keyframesModalSelectFadeOut, 0);
styleElement.sheet.insertRule(hovered, 0);

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
clinicosFlowDiv.style.gap = "10px";
clinicosFlowDiv.style.zIndex = "2147483646";
clinicosFlowDiv.style.position = "fixed";
if (ctaPosition === "side" && !isMobile) {
  clinicosFlowDiv.style.flexDirection = "row";
} else {
  clinicosFlowDiv.style.flexDirection = "column";
}
if (isMobile) {
  clinicosFlowDiv.style.bottom = verticalOffsetMobile;
  if (positionMobile === "left") {
    clinicosFlowDiv.style.left = horizontalOffsetMobile;
    clinicosFlowDiv.style.alignItems = "flex-start";
  } else {
    clinicosFlowDiv.style.right = horizontalOffsetMobile;
    clinicosFlowDiv.style.alignItems = "flex-end";
  }
} else {
  clinicosFlowDiv.style.bottom = verticalOffsetDesktop;
  if (positionDesktop === "left") {
    clinicosFlowDiv.style.left = horizontalOffsetDesktop;
    clinicosFlowDiv.style.alignItems = "flex-start";
  } else {
    clinicosFlowDiv.style.right = horizontalOffsetDesktop;
    clinicosFlowDiv.style.alignItems = "flex-end";
  }
}

const videoWidth = "300px";
const floatingVideoContainer = document.createElement("div");
if (!floatingVideoContainer)
  console.error("error creating floatingVideoContainer");
floatingVideoContainer.id = "clinicos-flow__floating-video-container";
floatingVideoContainer.style.all = "initial";
floatingVideoContainer.style.position = "relative";
floatingVideoContainer.style.width = videoWidth;
floatingVideoContainer.style.height = "0px";

const floatingVideo = document.createElement("video");
if (!floatingVideo) console.error("error creating floatingVideo");
floatingVideo.id = "clinicos-flow__floating-video";
floatingVideo.type = "video/mp4";
floatingVideo.controls = false;
floatingVideo.muted = true;
floatingVideo.playsInline = true;
floatingVideo.style.all = "initial";
floatingVideo.style.display = "none";
floatingVideo.style.position = "relative";
floatingVideo.style.width = videoWidth;
floatingVideo.style.height = "100%";
floatingVideo.style.zIndex = "2";
floatingVideo.style.objectFit = "cover";

const modalSelectDiv = document.createElement("div");
if (!modalSelectDiv) console.error("error creating modalSelectDiv");
modalSelectDiv.id = "clinicos-flow__modal-select";
modalSelectDiv.style.all = "initial";
modalSelectDiv.style.position = "relative";
modalSelectDiv.style.flexDirection = "column";
modalSelectDiv.style.justifyContent = "center";
modalSelectDiv.style.alignItems = "center";
modalSelectDiv.style.padding = "12px";
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

const selectFirstOptionDiv = document.createElement("div");
if (!selectFirstOptionDiv) console.error("error creating selectFirstOptionDiv");
selectFirstOptionDiv.style.all = "initial";
selectFirstOptionDiv.style.fontFamily =
  "Urbanist, Times New Roman, Times, serif";
selectFirstOptionDiv.style.zIndex = "1";
selectFirstOptionDiv.style.cursor = "pointer";
selectFirstOptionDiv.style.width = "100%";
selectFirstOptionDiv.style.display = "flex";
selectFirstOptionDiv.style.flexDirection = "column";
selectFirstOptionDiv.style.justifyContent = "center";
selectFirstOptionDiv.style.alignItems = "center";

const selectFirstOptionNonDefaultTextContainer = document.createElement("div");
if (!selectFirstOptionNonDefaultTextContainer)
  console.error("error creating selectFirstOptionNonDefaultTextContainer");
selectFirstOptionNonDefaultTextContainer.style.all = "initial";
selectFirstOptionNonDefaultTextContainer.style.fontFamily =
  "Urbanist, Times New Roman, Times, serif";
selectFirstOptionNonDefaultTextContainer.style.zIndex = "1";
selectFirstOptionNonDefaultTextContainer.style.cursor = "pointer";
selectFirstOptionNonDefaultTextContainer.style.width = "100%";
selectFirstOptionNonDefaultTextContainer.style.display = "none";
selectFirstOptionNonDefaultTextContainer.style.flexDirection = "column";
selectFirstOptionNonDefaultTextContainer.style.justifyContent = "center";
selectFirstOptionNonDefaultTextContainer.style.alignItems = "center";

const selectFirstOptionDefaultTextContainer = document.createElement("div");
if (!selectFirstOptionDefaultTextContainer)
  console.error("error creating selectFirstOptionDefaultTextContainer");
selectFirstOptionDefaultTextContainer.style.all = "initial";
selectFirstOptionDefaultTextContainer.style.fontFamily =
  "Urbanist, Times New Roman, Times, serif";
selectFirstOptionDefaultTextContainer.style.zIndex = "1";
selectFirstOptionDefaultTextContainer.style.cursor = "pointer";
selectFirstOptionDefaultTextContainer.style.width = "100%";
selectFirstOptionDefaultTextContainer.style.display = "flex";
selectFirstOptionDefaultTextContainer.style.flexDirection = "column";
selectFirstOptionDefaultTextContainer.style.justifyContent = "center";
selectFirstOptionDefaultTextContainer.style.alignItems = "center";

const selectFirstOptionTextDefaultOne = document.createElement("span");
if (!selectFirstOptionTextDefaultOne)
  console.error("error creating selectFirstOptionTextDefaultOne");
selectFirstOptionTextDefaultOne.textContent = "Considering plastic surgery?";
selectFirstOptionTextDefaultOne.style.all = "initial";
selectFirstOptionTextDefaultOne.style.fontFamily =
  "Urbanist, Times New Roman, Times, serif";
selectFirstOptionTextDefaultOne.style.fontSize = "18px";
selectFirstOptionTextDefaultOne.style.fontWeight = "600";
selectFirstOptionTextDefaultOne.style.marginBottom = "15px";
selectFirstOptionTextDefaultOne.style.cursor = "pointer";

const selectFirstOptionTextDefaultTwo = document.createElement("span");
if (!selectFirstOptionTextDefaultTwo)
  console.error("error creating selectFirstOptionTextDefaultTwo");
selectFirstOptionTextDefaultTwo.textContent = "Visualize your next procedure";
selectFirstOptionTextDefaultTwo.style.all = "initial";
selectFirstOptionTextDefaultTwo.style.fontFamily =
  "Urbanist, Times New Roman, Times, serif";
selectFirstOptionTextDefaultTwo.style.fontSize = "18px";
selectFirstOptionTextDefaultTwo.style.fontWeight = "600";
selectFirstOptionTextDefaultTwo.style.cursor = "pointer";

const selectFirstOptionTextDefaultThree = document.createElement("span");
if (!selectFirstOptionTextDefaultThree)
  console.error("error creating selectFirstOptionTextDefaultThree");
selectFirstOptionTextDefaultThree.textContent = "with our AI.";
selectFirstOptionTextDefaultThree.style.all = "initial";
selectFirstOptionTextDefaultThree.style.fontFamily =
  "Urbanist, Times New Roman, Times, serif";
selectFirstOptionTextDefaultThree.style.fontSize = "18px";
selectFirstOptionTextDefaultThree.style.fontWeight = "600";
selectFirstOptionTextDefaultThree.style.cursor = "pointer";

const selectFirstOptionChildTwo = document.createElement("span");
if (!selectFirstOptionChildTwo)
  console.error("error creating selectFirstOptionChildTwo");
selectFirstOptionChildTwo.textContent = "in 2 minutes.";
selectFirstOptionChildTwo.style.all = "initial";
selectFirstOptionChildTwo.style.fontFamily =
  "Urbanist, Times New Roman, Times, serif";
selectFirstOptionChildTwo.style.fontSize = "18px";
selectFirstOptionChildTwo.style.fontWeight = "600";
selectFirstOptionChildTwo.style.cursor = "pointer";

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
buttonImgDiv.style.borderRadius = "100px";
buttonImgDiv.style.padding = "20px 10px 10px 20px";
buttonImgDiv.style.height = "40px";
buttonImgDiv.style.width = "40px";
buttonImgDiv.style.aspectRatio = "1";
buttonImgDiv.style.animation = "buttonPulse 10s infinite";
buttonImgDiv.style.boxShadow = `0 0 0 0 ${themeColor}`;
buttonImgDiv.style.transform = "scale(1)";
if (ctaPosition === "above") {
  buttonImgDiv.style.marginBottom = "auto";
} else {
  buttonImgDiv.style.marginTop = "auto";
}
buttonImgDiv.addEventListener("touchend", function () {
  buttonImgDiv.classList.remove("clinicos-flow__hovered");
});
buttonImgDiv.addEventListener("mouseenter", function () {
  buttonImgDiv.classList.add("clinicos-flow__hovered");
});
buttonImgDiv.addEventListener("mouseleave", function () {
  buttonImgDiv.classList.remove("clinicos-flow__hovered");
});
let lastClickTime = 0;
buttonImgDiv.onclick = function (event) {
  const debounceTime = 700;
  const currentTime = new Date().getTime();
  if (currentTime - lastClickTime < debounceTime) {
    return;
  }
  lastClickTime = currentTime;
  handleModalButtonOnClick(event);
};

const buttonImg = document.createElement("img");
if (!buttonImg) console.error("error creating buttonImg");
buttonImg.id = "clinicos-flow__open-modal-btn";
buttonImg.src = floatingButtonSvgDataUri;
buttonImg.draggable = false;
buttonImg.style.all = "initial";
buttonImg.style.cursor = "pointer";
buttonImg.style.width = "35px";
buttonImg.style.height = "35px";
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
closeModalButtonMobile.style.top = "5px";
closeModalButtonMobile.style.right = "-8px";
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
iframeOnboardingTier1.style.height = "680px";
iframeOnboardingTier1.style.width = "380px";
iframeOnboardingTier1.style.position = "relative";

// END IFRAME DESKTOP

// START ADDING ELEMENTS TO DOM
document.head.appendChild(fontLink);
document.body.appendChild(clinicosFlowDiv);
document.body.appendChild(iframeOnboardingTier1MobileWrapper);
document.body.appendChild(closeModalButtonMobile);

iframeOnboardingTier1MobileWrapper.appendChild(iframeOnboardingTier1Mobile);
if (ctaPosition === "side" && !isMobile) {
  if (positionDesktop === "left") {
    clinicosFlowDiv.appendChild(buttonImgDiv);
    clinicosFlowDiv.appendChild(modalSelectDiv);
    clinicosFlowDiv.appendChild(iframeWrapperDiv);
  } else {
    clinicosFlowDiv.appendChild(iframeWrapperDiv);
    clinicosFlowDiv.appendChild(modalSelectDiv);
    clinicosFlowDiv.appendChild(buttonImgDiv);
  }
} else {
  clinicosFlowDiv.appendChild(iframeWrapperDiv);
  clinicosFlowDiv.appendChild(modalSelectDiv);
  clinicosFlowDiv.appendChild(buttonImgDiv);
}
buttonImgDiv.appendChild(buttonImg);

floatingVideoContainer.appendChild(floatingVideo);
modalSelectDiv.appendChild(floatingVideoContainer);
modalSelectDiv.appendChild(selectFirstOptionDiv);
selectFirstOptionDiv.appendChild(selectFirstOptionDefaultTextContainer);
selectFirstOptionDiv.appendChild(selectFirstOptionNonDefaultTextContainer);
selectFirstOptionDefaultTextContainer.appendChild(
  selectFirstOptionTextDefaultOne,
);
selectFirstOptionDefaultTextContainer.appendChild(
  selectFirstOptionTextDefaultTwo,
);
selectFirstOptionDefaultTextContainer.appendChild(
  selectFirstOptionTextDefaultThree,
);

// START FORM RANDOMIZATION
const selectFirstOptionContextProcedureText = document.createElement("span");
if (!selectFirstOptionContextProcedureText)
  console.error("error creating selectFirstOptionContextProcedureText");
selectFirstOptionContextProcedureText.textContent = "Breast Augmentation";
selectFirstOptionContextProcedureText.style.all = "initial";
selectFirstOptionContextProcedureText.style.fontFamily =
  "Urbanist, Times New Roman, Times, serif";
selectFirstOptionContextProcedureText.style.fontSize = "18px";
selectFirstOptionContextProcedureText.style.fontWeight = "700";
selectFirstOptionContextProcedureText.style.cursor = "pointer";

const selectFirstOption2TextsContainer = document.createElement("div");
selectFirstOption2TextsContainer.style.all = "initial";

if (randomFormVersion === 1) {
  const selectFirstOptionChildOne = document.createElement("span");
  if (!selectFirstOptionChildOne)
    console.error("error creating selectFirstOptionChildOne");
  selectFirstOptionChildOne.textContent = "See how you'll look with a";
  selectFirstOptionChildOne.style.all = "initial";
  selectFirstOptionChildOne.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildOne.style.fontSize = "18px";
  selectFirstOptionChildOne.style.fontWeight = "600";
  selectFirstOptionChildOne.style.cursor = "pointer";

  const selectFirstOptionChildTwo = document.createElement("span");
  if (!selectFirstOptionChildTwo)
    console.error("error creating selectFirstOptionChildTwo");
  selectFirstOptionChildTwo.textContent = ".";
  selectFirstOptionChildTwo.style.all = "initial";
  selectFirstOptionChildTwo.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildTwo.style.fontSize = "18px";
  selectFirstOptionChildTwo.style.fontWeight = "600";
  selectFirstOptionChildTwo.style.cursor = "pointer";

  selectFirstOption2TextsContainer.appendChild(
    selectFirstOptionContextProcedureText,
  );
  selectFirstOption2TextsContainer.appendChild(selectFirstOptionChildTwo);
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOptionChildOne,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOption2TextsContainer,
  );
} else if (randomFormVersion === 2) {
  const selectFirstOptionChildOne = document.createElement("span");
  if (!selectFirstOptionChildOne)
    console.error("error creating selectFirstOptionChildOne");
  selectFirstOptionChildOne.textContent = "See how a ";
  selectFirstOptionChildOne.style.all = "initial";
  selectFirstOptionChildOne.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildOne.style.fontSize = "18px";
  selectFirstOptionChildOne.style.fontWeight = "600";
  selectFirstOptionChildOne.style.cursor = "pointer";

  const selectFirstOptionChildTwo = document.createElement("span");
  if (!selectFirstOptionChildTwo)
    console.error("error creating selectFirstOptionChildTwo");
  selectFirstOptionChildTwo.textContent = "Would look on you - for free";
  selectFirstOptionChildTwo.style.all = "initial";
  selectFirstOptionChildTwo.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildTwo.style.fontSize = "18px";
  selectFirstOptionChildTwo.style.fontWeight = "600";
  selectFirstOptionChildTwo.style.cursor = "pointer";

  selectFirstOption2TextsContainer.appendChild(selectFirstOptionChildOne);
  selectFirstOption2TextsContainer.appendChild(
    selectFirstOptionContextProcedureText,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOption2TextsContainer,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOptionChildTwo,
  );
} else if (randomFormVersion === 3) {
  const selectFirstOptionChildOne = document.createElement("span");
  if (!selectFirstOptionChildOne)
    console.error("error creating selectFirstOptionChildOne");
  selectFirstOptionChildOne.textContent = "Show up prepared. Visualize your";
  selectFirstOptionChildOne.style.all = "initial";
  selectFirstOptionChildOne.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildOne.style.fontSize = "18px";
  selectFirstOptionChildOne.style.fontWeight = "600";
  selectFirstOptionChildOne.style.cursor = "pointer";

  const selectFirstOptionChildTwo = document.createElement("span");
  if (!selectFirstOptionChildTwo)
    console.error("error creating selectFirstOptionChildTwo");
  selectFirstOptionChildTwo.textContent = ".";
  selectFirstOptionChildTwo.style.all = "initial";
  selectFirstOptionChildTwo.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildTwo.style.fontSize = "18px";
  selectFirstOptionChildTwo.style.fontWeight = "600";
  selectFirstOptionChildTwo.style.cursor = "pointer";

  selectFirstOption2TextsContainer.appendChild(
    selectFirstOptionContextProcedureText,
  );
  selectFirstOption2TextsContainer.appendChild(selectFirstOptionChildTwo);
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOptionChildOne,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOption2TextsContainer,
  );
} else if (randomFormVersion === 4) {
  const selectFirstOptionChildOne = document.createElement("span");
  if (!selectFirstOptionChildOne)
    console.error("error creating selectFirstOptionChildOne");
  selectFirstOptionChildOne.textContent = "Simulate your next";
  selectFirstOptionChildOne.style.all = "initial";
  selectFirstOptionChildOne.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildOne.style.fontSize = "18px";
  selectFirstOptionChildOne.style.fontWeight = "600";
  selectFirstOptionChildOne.style.cursor = "pointer";

  const selectFirstOptionChildTwo = document.createElement("span");
  if (!selectFirstOptionChildTwo)
    console.error("error creating selectFirstOptionChildTwo");
  selectFirstOptionChildTwo.textContent = ".";
  selectFirstOptionChildTwo.style.all = "initial";
  selectFirstOptionChildTwo.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildTwo.style.fontSize = "18px";
  selectFirstOptionChildTwo.style.fontWeight = "600";
  selectFirstOptionChildTwo.style.cursor = "pointer";

  selectFirstOption2TextsContainer.appendChild(
    selectFirstOptionContextProcedureText,
  );
  selectFirstOption2TextsContainer.appendChild(selectFirstOptionChildTwo);
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOptionChildOne,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOption2TextsContainer,
  );
} else if (randomFormVersion === 5) {
  const selectFirstOptionChildOne = document.createElement("span");
  if (!selectFirstOptionChildOne)
    console.error("error creating selectFirstOptionChildOne");
  selectFirstOptionChildOne.textContent = "Visualize your ";
  selectFirstOptionChildOne.style.all = "initial";
  selectFirstOptionChildOne.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildOne.style.fontSize = "18px";
  selectFirstOptionChildOne.style.fontWeight = "600";
  selectFirstOptionChildOne.style.cursor = "pointer";

  const selectFirstOptionChildTwo = document.createElement("span");
  if (!selectFirstOptionChildTwo)
    console.error("error creating selectFirstOptionChildTwo");
  selectFirstOptionChildTwo.textContent = "in 2 minutes.";
  selectFirstOptionChildTwo.style.all = "initial";
  selectFirstOptionChildTwo.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildTwo.style.fontSize = "18px";
  selectFirstOptionChildTwo.style.fontWeight = "600";
  selectFirstOptionChildTwo.style.cursor = "pointer";

  selectFirstOption2TextsContainer.appendChild(selectFirstOptionChildOne);
  selectFirstOption2TextsContainer.appendChild(
    selectFirstOptionContextProcedureText,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOption2TextsContainer,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOptionChildTwo,
  );
  // selectFirstOptionDiv.appendChild(selectFirstOption2TextsContainer);
  // selectFirstOptionDiv.appendChild(selectFirstOptionChildTwo);
} else if (randomFormVersion === 6) {
  const selectFirstOptionChildOne = document.createElement("span");
  if (!selectFirstOptionChildOne)
    console.error("error creating selectFirstOptionChildOne");
  selectFirstOptionChildOne.textContent = "Visualize your ";
  selectFirstOptionChildOne.style.all = "initial";
  selectFirstOptionChildOne.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildOne.style.fontSize = "18px";
  selectFirstOptionChildOne.style.fontWeight = "600";
  selectFirstOptionChildOne.style.cursor = "pointer";

  const selectFirstOptionChildTwo = document.createElement("span");
  if (!selectFirstOptionChildTwo)
    console.error("error creating selectFirstOptionChildTwo");
  selectFirstOptionChildTwo.textContent = "in 2 minutes.";
  selectFirstOptionChildTwo.style.all = "initial";
  selectFirstOptionChildTwo.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildTwo.style.fontSize = "18px";
  selectFirstOptionChildTwo.style.fontWeight = "600";
  selectFirstOptionChildTwo.style.cursor = "pointer";

  selectFirstOption2TextsContainer.appendChild(selectFirstOptionChildOne);
  selectFirstOption2TextsContainer.appendChild(
    selectFirstOptionContextProcedureText,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOption2TextsContainer,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOptionChildTwo,
  );
} else {
  const selectFirstOptionChildOne = document.createElement("span");
  if (!selectFirstOptionChildOne)
    console.error("error creating selectFirstOptionChildOne");
  selectFirstOptionChildOne.textContent = "Visualize your ";
  selectFirstOptionChildOne.style.all = "initial";
  selectFirstOptionChildOne.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildOne.style.fontSize = "18px";
  selectFirstOptionChildOne.style.fontWeight = "600";
  selectFirstOptionChildOne.style.cursor = "pointer";

  const selectFirstOptionChildTwo = document.createElement("span");
  if (!selectFirstOptionChildTwo)
    console.error("error creating selectFirstOptionChildTwo");
  selectFirstOptionChildTwo.textContent = "instantly.";
  selectFirstOptionChildTwo.style.all = "initial";
  selectFirstOptionChildTwo.style.fontFamily =
    "Urbanist, Times New Roman, Times, serif";
  selectFirstOptionChildTwo.style.fontSize = "18px";
  selectFirstOptionChildTwo.style.fontWeight = "600";
  selectFirstOptionChildTwo.style.cursor = "pointer";

  selectFirstOption2TextsContainer.appendChild(selectFirstOptionChildOne);
  selectFirstOption2TextsContainer.appendChild(
    selectFirstOptionContextProcedureText,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOption2TextsContainer,
  );
  selectFirstOptionNonDefaultTextContainer.appendChild(
    selectFirstOptionChildTwo,
  );
}

modalSelectDiv.appendChild(modelSelectOpacityDiv);
iframeWrapperDiv.appendChild(iframeOnboardingTier1);
// END FORM RANDOMIZATION

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
  clinicosFlowDiv.style.animation = "none";
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

  if (isMobile) {
    iframeOnboardingTier1MobileWrapper.style.left = 0;
    closeModalButtonMobile.style.display = "block";
  } else {
    if (!isCtaOpenByDefaultDesktop) {
      toggleIframe(0);
      return;
    }
    const modalSelectDivDsiplay = window
      .getComputedStyle(modalSelectDiv)
      .getPropertyValue("display");
    if (modalSelectDivDsiplay === "flex") {
      toggleSelections();
      setTimeout(() => {
        toggleIframe(0);
      }, 200);
    } else {
      toggleIframe(0);
      setTimeout(() => {
        toggleSelections();
      }, 510);
    }
  }
}

// START AUTOPLAY VIDEO
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("clinicos-flow__floating-video");
  const parent = video.parentElement;
  const initialDelay = 4000;
  const reappearDelay = videoPlayFrequency * 1000;
  const transitionDuration = 1500;

  function isVideoInViewport() {
    const rect = video.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function autoplayVideo() {
    parent.style.transition = `height ${transitionDuration}ms ease-in-out`;
    parent.style.height = "0px";
    if (isVideoInViewport() && video.paused) {
      video.src = getPreviewVideoSource(contextProcedure);
      video
        .play(0)
        .then(() => {
          video.style.display = "block";
          parent.style.height = videoWidth;
          video.style.clipPath = "inset(0 0 0 0)";
        })
        .catch((error) => console.error("Error playing video:", error));
    }
  }

  setTimeout(() => {
    autoplayVideo();
    video.addEventListener("ended", () => (parent.style.height = "0px"));
  }, initialDelay);

  setInterval(autoplayVideo, reappearDelay + transitionDuration);
});
// END AUTOPLAY VIDEO

const options = document.querySelectorAll(
  "#clinicos-flow__modal-select div:not(:first-child):not(:last-child)",
);
options.forEach((opt, index) => {
  opt.addEventListener("click", function () {
    clinicosFlowDiv.style.animation = "none";

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

// START SENDING URL TO IFRAME
let formatUrl;
let contextProcedure;
let previousContextProcedure;
setInterval(() => {
  // if form is open, don't send the url
  if (
    iframeOnboardingTier1MobileWrapper.style.left !== "100%" ||
    iframeWrapperDiv.style.width !== "0px"
  )
    return;

  if (iframeWrapperDiv.style.width !== "0px") return;

  if (window.location.href === formatUrl) return;
  formatUrl = window.location.href
    .replace(" ", "")
    .replace("-", "")
    .replace("_", "")
    .toLowerCase();

  if (
    formatUrl.includes("tummytuck") ||
    formatUrl.includes("abdominoplasty") ||
    formatUrl.includes("abdominalcontouring") ||
    formatUrl.includes("bellytuck") ||
    formatUrl.includes("abdominalsculpting") ||
    formatUrl.includes("abdominalskinremoval")
  ) {
    contextProcedure = "TUMMY_TUCK";
  } else if (
    formatUrl.includes("bbl") ||
    formatUrl.includes("brazilianbuttlift") ||
    formatUrl.includes("buttockaugmentation") ||
    formatUrl.includes("buttockenhancement") ||
    formatUrl.includes("buttocklift") ||
    formatUrl.includes("buttocksculpting") ||
    formatUrl.includes("butt")
  ) {
    contextProcedure = "BBL";
  } else if (
    formatUrl.includes("breastaug") ||
    formatUrl.includes("breastimplants") ||
    formatUrl.includes("breastimplant") ||
    formatUrl.includes("boobjob") ||
    formatUrl.includes("breastenhancement") ||
    formatUrl.includes("breastaugmentation")
  ) {
    contextProcedure = "BREAST_AUGMENTATION";
  } else if (
    formatUrl.includes("breastlift") ||
    formatUrl.includes("mastopexy")
  ) {
    contextProcedure = "BREAST_LIFT";
  } else if (
    formatUrl.includes("breastreduction") ||
    formatUrl.includes("reductionmammoplasty") ||
    formatUrl.includes("mammaryreduction") ||
    formatUrl.includes("breastcontouring") ||
    formatUrl.includes("breastreshaping")
  ) {
    contextProcedure = "BREAST_REDUCTION";
  } else if (
    formatUrl.includes("breastliftandaug") ||
    formatUrl.includes("breastliftandimplants") ||
    formatUrl.includes("breastliftandaugmentation")
  ) {
    contextProcedure = "BREAST_LIFT_AND_AUGMENTATION";
  } else {
    contextProcedure = null;
  }
  const message = {
    message: "Context Procedure Update",
    payload: {
      contextProcedure: contextProcedure,
    },
  };

  iframeOnboardingTier1Mobile.contentWindow.postMessage(message, "*");
  iframeOnboardingTier1.contentWindow.postMessage(message, "*");

  if (previousContextProcedure !== contextProcedure) {
    if (!contextProcedure) {
      selectFirstOptionDefaultTextContainer.style.display = "flex";
      selectFirstOptionNonDefaultTextContainer.style.display = "none";
    } else {
      selectFirstOptionDefaultTextContainer.style.display = "none";
      selectFirstOptionNonDefaultTextContainer.style.display = "flex";
      let titltedContextProcedure = contextProcedure
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      if (titltedContextProcedure === "Bbl") titltedContextProcedure = "BBL";

      selectFirstOptionContextProcedureText.textContent =
        titltedContextProcedure;
    }
  }

  previousContextProcedure = contextProcedure;
}, 1000);
// END SENDING URL TO IFRAME
