import "dotenv/config";
import "./server/shared/services/TranslationsYup";
import { server } from "./server/server";

const port = process.env.PORT || 4444;

server.listen(port, () => {
   console.log(`Server is running... ${port}`);
});
