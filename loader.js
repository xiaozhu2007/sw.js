const getFileBlob = async (url) => {
  const FileResponse = await fetch(url);
  if (!FileResponse.ok) {
    throw new Error(
      `File didn't load successfully; error code: ${
        FileResponse.statusText || FileResponse.status
      }`
    );
  }
  return FileResponse.blob();
};

const registerServiceWorker = async (url) => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(url, {
        scope: "/",
      });
      if (registration.installing) {
        console.log("正在安装 Service worker");
      } else if (registration.waiting) {
        console.log("已安装 Service worker installed");
      } else if (registration.active) {
        console.log("激活 Service worker");
      }
    } catch (error) {
      console.error(`注册失败：${error}`);
    }
  }
};

registerServiceWorker(
  window.URL.createObjectURL(
    new Blob([
      getFileBlob(
        `https://xiaozhu2007.github.io/sw.js/index.js?_t=${Date.now()}`
      ),
    ])
  )
);
