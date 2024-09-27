const formVersion = "v2.0.1";
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

const fetchWidgetSetting = async (url) => {
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from R2:", error);
    return null;
  }
};

// END OF HELPER FUNCTIONS /////////////////////////////////////////////////////

const formName = document.currentScript.getAttribute("formName");
const clinicSdkKey = document.currentScript.getAttribute("clinicSdkKey");
if (!formName || !clinicSdkKey) {
  console.error("Missing required attributes: formName, clinicSdkKey");
}
const widgetSettingUrl = `https://www.clinic-assets.clinic-os.com/${clinicSdkKey}/widget_settings.json`;

let themeColor = "#00B4F4";
let textColor = "#ffffff";
let videoPlayFrequency = "300";
let ctaPosition = "above";
let ctaPositionDesktop = "right";
let ctaPositionMobile = "right";
let isCtaOpenByDefaultDesktop = "true";
let isCtaOpenByDefaultMobile = "true";
let isAutoPlayMobile = "true";
let isAutoPlayDesktop = "true";
let horizontalOffsetDesktop = "10px";
let verticalOffsetDesktop = "10px";
let horizontalOffsetMobile = "10px";
let verticalOffsetMobile = "10px";

fetchWidgetSetting(widgetSettingUrl)
  .then((data) => {
    themeColor = data.themeColor ?? themeColor;
    textColor = data.textColor ?? textColor;
    videoPlayFrequency = data.videoPlayFrequency ?? videoPlayFrequency;
    ctaPosition = data.ctaPosition ?? ctaPosition;
    ctaPositionDesktop = data.ctaPositionDesktop ?? ctaPositionDesktop;
    ctaPositionMobile = data.ctaPositionMobile ?? ctaPositionMobile;
    isCtaOpenByDefaultDesktop =
      data.isCtaOpenByDefaultDesktop ?? isCtaOpenByDefaultDesktop;
    isCtaOpenByDefaultMobile =
      data.isCtaOpenByDefaultMobile ?? isCtaOpenByDefaultMobile;
    isAutoPlayMobile = data.isAutoPlayMobile ?? isAutoPlayMobile;
    isAutoPlayDesktop = data.isAutoPlayDesktop ?? isAutoPlayDesktop;
    horizontalOffsetDesktop = `${data.horizontalOffsetDesktop ?? horizontalOffsetDesktop}px`;
    verticalOffsetDesktop = `${data.verticalOffsetDesktop ?? verticalOffsetDesktop}px`;
    horizontalOffsetMobile = `${data.horizontalOffsetMobile ?? horizontalOffsetMobile}px`;
    verticalOffsetMobile = `${data.verticalOffsetMobile ?? verticalOffsetMobile}px`;
  })
  .catch((error) => {
    console.error("Error fetching widget settings:", error);
  })
  .finally(() => {
    // FORM URL ////////////////////////////////////////////////////////////////////
    const onboardingTier1 = `http://localhost:3000/${formName}/?clinicSdkKey=${clinicSdkKey}&themeColor=${encodeURIComponent(themeColor)}&referrer=${document.referrer}&formVersion=${formVersion}&ctaCopy=${randomFormVersion}&isMobile=${isMobile}#`;
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
      if (ctaPositionMobile === "left") {
        clinicosFlowDiv.style.left = horizontalOffsetMobile;
        clinicosFlowDiv.style.alignItems = "flex-start";
      } else {
        clinicosFlowDiv.style.right = horizontalOffsetMobile;
        clinicosFlowDiv.style.alignItems = "flex-end";
      }
    } else {
      clinicosFlowDiv.style.bottom = verticalOffsetDesktop;
      if (ctaPositionDesktop === "left") {
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

    const floatingVideoMobile = document.createElement("video");
    if (!floatingVideoMobile)
      console.error("error creating floatingVideoMobile");
    floatingVideoMobile.id = "clinicos-flow__floating-video";
    floatingVideoMobile.type = "video/mp4";
    floatingVideoMobile.controls = false;
    floatingVideoMobile.muted = true;
    floatingVideoMobile.playsInline = true;
    floatingVideoMobile.src = getPreviewVideoSource("BREAST_AUGMENTATION");
    floatingVideoMobile.style.all = "initial";
    floatingVideoMobile.style.width = "100%";
    floatingVideoMobile.style.height = "100%";
    floatingVideoMobile.style.objectFit = "cover";

    const floatingVideoContainerMobile = document.createElement("div");
    if (!floatingVideoContainerMobile)
      console.error("error creating floatingVideoContainerMobile");
    floatingVideoContainerMobile.id = "clinicos-flow__floating-video-container";
    floatingVideoContainerMobile.style.all = "initial";
    floatingVideoContainerMobile.style.position = "absolute";
    floatingVideoContainerMobile.style.top = "50%";
    floatingVideoContainerMobile.style.left = "50%";
    floatingVideoContainerMobile.style.transform = "translate(-50%, -50%)";
    floatingVideoContainerMobile.style.width = "100%";
    floatingVideoContainerMobile.style.height = "100%";
    floatingVideoContainerMobile.style.opacity = "0";
    floatingVideoContainerMobile.style.transition = "all 1s ease 0s";

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
      if (isCtaOpenByDefaultMobile === "true")
        modalSelectDiv.style.display = "flex";
      else modalSelectDiv.style.display = "none";
    } else {
      if (isCtaOpenByDefaultDesktop === "true")
        modalSelectDiv.style.display = "flex";
      else modalSelectDiv.style.display = "none";
    }

    const modelSelectOpacityDiv = document.createElement("div");
    if (!modelSelectOpacityDiv)
      console.error("error creating modelSelectOpacityDiv");
    modelSelectOpacityDiv.id = "clinicos-flow__test-div";
    modelSelectOpacityDiv.style.all = "initial";
    modelSelectOpacityDiv.style.position = "absolute";
    modelSelectOpacityDiv.style.width = "100%";
    modelSelectOpacityDiv.style.height = "100%";
    modelSelectOpacityDiv.style.borderRadius = "15px";
    modelSelectOpacityDiv.style.background = "#F0F0F0";
    modelSelectOpacityDiv.style.opacity = "0.8";
    modelSelectOpacityDiv.style.display = "none";

    const selectFirstOptionDiv = document.createElement("div");
    if (!selectFirstOptionDiv)
      console.error("error creating selectFirstOptionDiv");
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

    const selectFirstOptionNonDefaultTextContainer =
      document.createElement("div");
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
    selectFirstOptionDefaultTextContainer.style.display = "none";
    selectFirstOptionDefaultTextContainer.style.flexDirection = "column";
    selectFirstOptionDefaultTextContainer.style.justifyContent = "center";
    selectFirstOptionDefaultTextContainer.style.alignItems = "center";

    const selectFirstOptionTextDefaultOne = document.createElement("span");
    if (!selectFirstOptionTextDefaultOne)
      console.error("error creating selectFirstOptionTextDefaultOne");
    selectFirstOptionTextDefaultOne.textContent =
      "Considering plastic surgery?";
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
    selectFirstOptionTextDefaultTwo.textContent =
      "Visualize your next procedure";
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
    buttonImgDiv.style.overflow = "hidden";
    buttonImgDiv.style.boxShadow = "0 0 0 0 #5A99D4";
    buttonImgDiv.style.borderRadius = "100px";
    buttonImgDiv.style.padding = "20px 10px 10px 20px";
    buttonImgDiv.style.height = "40px";
    buttonImgDiv.style.width = "40px";
    buttonImgDiv.style.aspectRatio = "1";
    buttonImgDiv.style.animation = "buttonPulse 10s infinite";
    buttonImgDiv.style.boxShadow = `0 0 0 0 ${themeColor}`;
    buttonImgDiv.style.transform = "scale(1)";
    buttonImgDiv.style.position = "relative";
    buttonImgDiv.style.transition = "all 1s ease 0s";
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
    iframeWrapperDiv.style.transition =
      "width 0.5s linear, height 0.50s linear";

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
      if (ctaPositionDesktop === "left") {
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
    floatingVideoContainer.appendChild(floatingVideo);
    floatingVideoContainerMobile.appendChild(floatingVideoMobile);

    buttonImgDiv.appendChild(buttonImg);
    buttonImgDiv.appendChild(floatingVideoContainerMobile);

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
    const selectFirstOptionContextProcedureText =
      document.createElement("span");
    if (!selectFirstOptionContextProcedureText)
      console.error("error creating selectFirstOptionContextProcedureText");
    selectFirstOptionContextProcedureText.textContent = "Breast Augmentation";
    selectFirstOptionContextProcedureText.style.all = "initial";
    selectFirstOptionContextProcedureText.style.fontFamily =
      "Urbanist, Times New Roman, Times, serif";
    selectFirstOptionContextProcedureText.style.fontSize = "18px";
    selectFirstOptionContextProcedureText.style.fontWeight = "700";
    selectFirstOptionContextProcedureText.style.cursor = "pointer";
    selectFirstOptionContextProcedureText.style.color =
      randomFormVersion === 6 ? "blue" : "initial";

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
      selectFirstOptionChildOne.textContent =
        "Show up prepared. Visualize your";
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
        modalSelectDiv.style.animation =
          "modalSelectFadeOut 0.5s ease-in-out 0s";
        modalSelectDiv.style.display = "none";
      } else {
        modalSelectDiv.style.animation =
          "modalSelectFadeIn 0.5s ease-in-out 0s";
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
        if (isCtaOpenByDefaultDesktop !== "true") {
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
    function playVideo() {
      const videoDesktop = floatingVideo;
      const videoMobile = floatingVideoMobile;
      const parent = videoDesktop.parentElement;
      const initialDelay = 4000;
      const reappearDelay = videoPlayFrequency * 1000;
      const transitionDuration = 1500;

      function autoplayVideo() {
        if (isMobile && isAutoPlayMobile === "true") {
          if (videoMobile.paused) {
            videoMobile.src = getPreviewVideoSource(contextProcedure);
            videoMobile
              .play(0)
              .then(() => {
                floatingVideoContainerMobile.style.opacity = "1";
                buttonImgDiv.style.scale = "1.2";
              })
              .catch((error) => console.error("Error playing video:", error));
          }
        }

        if (!isMobile && isAutoPlayDesktop === "true") {
          if (videoDesktop.paused) {
            videoDesktop.src = getPreviewVideoSource(contextProcedure);
            videoDesktop
              .play(0)
              .then(() => {
                parent.style.transition = `height ${transitionDuration}ms ease-in-out`;
                parent.style.height = "0px";
                videoDesktop.style.clipPath = "inset(0 0 0 0)";
                videoDesktop.style.display = "block";
                parent.style.height = videoWidth;
              })
              .catch((error) => console.error("Error playing video:", error));
          }
        }
      }

      setTimeout(() => {
        autoplayVideo();
        videoDesktop.addEventListener(
          "ended",
          () => (parent.style.height = "0px"),
        );
        videoMobile.addEventListener("ended", () => {
          floatingVideoContainerMobile.style.opacity = "0";
          buttonImgDiv.style.scale = "1";
        });
        setInterval(autoplayVideo, reappearDelay + transitionDuration);
      }, initialDelay);
    }
    playVideo();
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
      modelSelectOpacityDiv.style.display = "flex";

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
          if (titltedContextProcedure === "Bbl")
            titltedContextProcedure = "BBL";

          selectFirstOptionContextProcedureText.textContent =
            titltedContextProcedure;
        }
      }

      previousContextProcedure = contextProcedure;
    }, 1000);
    // END SENDING URL TO IFRAME
  });
