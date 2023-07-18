require("dotenv").config();
const cron = require("node-cron");
const { transporter, mailOption } = require("./service/emailService");
const Express = require("express");
const app = Express();
require("./config/modelConfig");
let userRouter = require("./routes/mainRoutes");
const router = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const logger = require("./utils/loger");
const PORT =process.env.PORT||5000;
const HOST = "localhost";


app.get("/send", async (req, res) => {
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent succesfully" + info.response);
    }
  });
});

//for th email sending process
// cron.schedule("*/20 * * * * *", ()=>{
//     console.log("running ever 20 sec");
//     transporter.sendMail(mailOption, (error, info) =>
//     {
//         if (error)
//         {
//             console.log(error);
//         } else
//         {
//             console.log(`email sent succesfully ${ info.response}`);
//         }
//     });

app.use(Express.json());
app.use("/", userRouter);
app.use("/", companyRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`port is running on port :${process.env.PORT}`);
  logger.info(`Server staterd and running on http://${HOST}:${PORT}`);
});
