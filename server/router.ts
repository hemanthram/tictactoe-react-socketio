import express from "express"
const router = express.Router();
let t:any;

router.get("/", (request,response) => {
  t = t === request
  response.send({ response: "Server is up and running." }).status(200);
});

export default router;