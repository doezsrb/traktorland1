import httpProxy from "http-proxy";
import Cookies from "cookies";
import url from "url";

const proxy = httpProxy.createProxyServer();
const HOST = process.env.NEXT_PUBLIC_HOST;
const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
const API_URL = PROTOCOL + "://" + HOST + "/api";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  return new Promise((resolve) => {
    if (req.url == "/api/proxy/checkauth") {
      req.url = req.url.replace(/^\/api\/proxy/, "");

      var cookies = new Cookies(req, res);
      var authToken = cookies.get("auth-token");
      if (authToken == undefined) {
        res.end(JSON.stringify({ result: "Failed" }));
        resolve();
        return;
      }
      req.headers["auth-token"] = authToken;

      proxy
        .once("proxyRes", (proxyRes, req, res) => {
          let responseBody = "";
          proxyRes.on("data", (chunk) => {
            responseBody += chunk;
          });
          proxyRes.on("end", () => {
            var { result } = JSON.parse(responseBody);
            if (result == "Success") {
              res.end(JSON.stringify({ result: "Success" }));
              resolve();
            } else {
              res.end(JSON.stringify({ result: "Failed" }));
              resolve();
            }
          });
        })
        .once("error", () => {})
        .web(req, res, {
          target: API_URL,
          autoRewrite: false,
          selfHandleResponse: true,
        });
    } else {
      req.url = req.url.replace(/^\/api\/proxy/, "");
      req.headers.cookie = "";
      proxy
        .once("proxyRes", (proxyRes, req, res) => {
          let responseBody = "";
          proxyRes.on("data", (chunk) => {
            responseBody += chunk;
          });
          proxyRes.on("end", () => {
            var { result, authToken, user } = JSON.parse(responseBody);
            if (result == "Success") {
              var { authToken } = JSON.parse(responseBody);
              var cookies = new Cookies(req, res);
              cookies.set("auth-token", authToken, {
                httpOnly: true,
                sameSite: "lax",
              });
              res.end(JSON.stringify({ result: "Success", user: user }));
              resolve();
            } else {
              res.end(JSON.stringify({ result: "Failed" }));
              resolve();
            }
          });
        })
        .once("error", () => {})
        .web(req, res, {
          target: API_URL,
          autoRewrite: false,
          selfHandleResponse: true,
        });
    }
  });
};
