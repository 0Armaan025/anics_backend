
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const payload = {
    event: req.body.event,
    url: req.body.url,
    referrer: req.body.referrer,
    visitorId: req.body.visitorId,
    userAgent: req.body.userAgent,
    ip,
    timestamp: new Date()
  };

  // save to DB
  await analytics.insertOne(payload);

  res.sendStatus(204);
});

export default router;
