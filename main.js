// Defining DOM elements
const distanceSlider = document.getElementById("distanceSlider");
let distanceValue = document.getElementById("distanceValue");
const lights = document.querySelectorAll(".traffic-light .light");
const caccEnableBtn = document.getElementById("caccEnable");
const cancelCaccBtn = document.getElementById("cancelCACC");
const resumeIncreaseBtn = document.getElementById("resumeIncrease");
const setDecreaseBtn = document.getElementById("setDecrease");
const activateLccBtn = document.getElementById("activateLCC");
const speedValue = document.querySelector(".speed-value");

// Defining state
const state = {
  cacc: {
    enabled: false,
    active: false,
    setSpeed: 65,
    previousSpeed: 65,
  },

  lcc: {
    active: false,
  },

  parking: {
    active: false,
    searching: false,
    parkingInProgress: false,
    spotFound: false,
  },
};

// ...existing code...
// Update UI based on state
function updateUI() {
  // CACC State
  if (state.cacc.enabled) {
    caccEnableBtn.textContent = "Disable";
    caccEnableBtn.classList.remove("btn-primary");
    caccEnableBtn.classList.add("btn-danger");

    resumeIncreaseBtn.disabled = false;
    setDecreaseBtn.disabled = false;
    distanceSlider.disabled = false;

    if (state.cacc.active) {
      cancelCaccBtn.disabled = false;
      document
        .querySelectorAll(".car-status")[0]
        .querySelector(".status-dot").className = "status-dot active";
      document
        .querySelectorAll(".car-status")[0]
        .querySelector("span").textContent = "CACC: Active";
    } else {
      cancelCaccBtn.disabled = true;
      document
        .querySelectorAll(".car-status")[0]
        .querySelector(".status-dot").className = "status-dot standby";
      document
        .querySelectorAll(".car-status")[0]
        .querySelector("span").textContent = "CACC: Standby";
    }
  } else {
    caccEnableBtn.textContent = "Enable";
    caccEnableBtn.classList.remove("btn-danger");
    caccEnableBtn.classList.add("btn-primary");
    cancelCaccBtn.disabled = true;
    resumeIncreaseBtn.disabled = true;
    setDecreaseBtn.disabled = true;
    document
      .querySelectorAll(".car-status")[0]
      .querySelector(".status-dot").className = "status-dot disabled";
    document
      .querySelectorAll(".car-status")[0]
      .querySelector("span").textContent = "CACC: Disabled";
  }

  // LCC State - FIXED
  if (state.cacc.enabled) {
    activateLccBtn.disabled = false;
    activateLccBtn.textContent = state.lcc.active ? "Cancel LCC" : "Enable";
    activateLccBtn.classList.remove("btn-danger");
    activateLccBtn.classList.add("btn-primary");

    document
      .querySelectorAll(".car-status")[1]
      .querySelector(".status-dot").className = "status-dot standby";
    document
      .querySelectorAll(".car-status")[1]
      .querySelector("span").textContent = "LCC: Standby";

    if (state.lcc.active) {
      activateLccBtn.textContent = "Cancel LCC";
      activateLccBtn.classList.remove("btn-primary");
      activateLccBtn.classList.add("btn-danger");
      document
        .querySelectorAll(".car-status")[1]
        .querySelector(".status-dot").className = "status-dot active";
      document
        .querySelectorAll(".car-status")[1]
        .querySelector("span").textContent = "LCC: Active";
    }
  } else {
    activateLccBtn.disabled = true;
    activateLccBtn.textContent = "Enable";
    activateLccBtn.classList.remove("btn-danger");
    activateLccBtn.classList.add("btn-primary");
    document
      .querySelectorAll(".car-status")[1]
      .querySelector(".status-dot").className = "status-dot disabled";
    document
      .querySelectorAll(".car-status")[1]
      .querySelector("span").textContent = "LCC: Disabled";
  }

  speedValue.textContent = state.cacc.setSpeed;
}

//Event listeners
caccEnableBtn.addEventListener("click", function () {
  state.cacc.enabled = !state.cacc.enabled;

  if (!state.cacc.enabled) {
    state.cacc.active = false;
    state.lcc.active = false;
    state.cacc.setSpeed = state.cacc.previousSpeed;
  }
  updateUI();
});

activateLccBtn.addEventListener("click", function () {
  state.lcc.active = !state.lcc.active;
  updateUI();
});

resumeIncreaseBtn.addEventListener("click", function () {
  if (!state.cacc.active) {
    state.cacc.active = true;
  } else {
    state.cacc.setSpeed += 1;
  }
  updateUI();
});

setDecreaseBtn.addEventListener("click", function () {
  if (!state.cacc.active) {
    state.cacc.active = true;
  } else {
    state.cacc.setSpeed = Math.max(0, state.cacc.setSpeed - 1);
  }
  updateUI();
});

cancelCaccBtn.addEventListener("click", function () {
  state.cacc.active = false;
  updateUI();
});

distanceSlider.addEventListener("input", function () {
  const distanceValues = ["Short", "Medium", "Long"];
  distanceValue.textContent = distanceValues[this.value - 1];
});

// Traffic light simulation
let current = 0; // 0 = red, 1 = yellow, 2 = green

function changeLight() {
  lights.forEach((l) => l.classList.remove("active"));
  lights[current].classList.add("active");

  if (current === 0) {
    // Red → Green after 5s
    setTimeout(() => {
      current = 2;
      changeLight();
    }, 5000);
  } else if (current === 2) {
    // Green → Yellow after 4s
    setTimeout(() => {
      current = 1;
      changeLight();
    }, 4000);
  } else if (current === 1) {
    // Yellow → Red after 2s
    setTimeout(() => {
      current = 0;
      changeLight();
    }, 2000);
  }
}

// Start simulation when page loads
changeLight();
