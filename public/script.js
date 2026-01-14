(function () {
  const API = "/collect";

  // get project id from <script data-project="...">
  const scriptTag = document.currentScript;
  const projectId = scriptTag?.getAttribute("data-project");

  if (!projectId) {
    console.warn("[Analytics] data-project missing");
    return;
  }

  function vid() {
    let id = localStorage.getItem("vid");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("vid", id);
    }
    return id;
  }

  function send(event, extra = {}) {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,               // 🔥 THIS IS THE IMPORTANT PART
        event,
        url: location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        visitorId: vid(),
        timestamp: Date.now(),
        ...extra
      })
    }).catch(() => { });
  }

  // page view
  send("page_view");

  // time on page
  const start = Date.now();
  window.addEventListener("beforeunload", () => {
    send("time_spent", { duration: Date.now() - start });
  });
})();


/*
<script
  src="/script.js"
  data-project="project_abc123">
</script>
*/
