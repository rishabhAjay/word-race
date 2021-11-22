### Word Race

- In **client/actions**, replace the axios request URLs with the URL of your deployed backend(or localhost in development). Ideally, you would want to create a **proxy in package.json** or export a file with the URL of your backend API so they act as placeholders for your API calls in actions.
- Make a folder called **config** in your **server** folder. This folder will contain _db.js_(contains the code to connect to mongoDB), _default.json_ and _production.json_ which will hold both your MongoDB URL and JWT Secret. Make sure this folder is added to gitignore.
  **db.js**

```js
import mongoose from "mongoose";

import config from "config";

const connection = config.get("mongoURL");

const connectDB = async () => {
  try {
    await mongoose.connect(connection, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });

    console.log("mongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
```

**default.json and production.json**

```json
{
  "mongoURL": "YOUR MONGO URL",

  "jwtSecret": "YOUR JWT SECRET"
}
```
