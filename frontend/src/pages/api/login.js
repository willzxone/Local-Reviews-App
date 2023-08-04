import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  let accessToken = null;

  if (req.method === "POST") {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = req.body;
    try {
      const { data: accessResponse } = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        body,
        config
      );
      accessToken = accessResponse.access;
      // in production change secure to true
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("refresh", accessResponse.refresh, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
          path: "/",
        })
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }

    if (accessToken) {
      const userConfig = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      try {
        const { data: userData } = await axios.get(
          "http://127.0.0.1:8000/api/user/",
          userConfig
        );
        res.status(200).json({ user: userData, access: accessToken });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch user data" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
