# PIZZA API

### ERD:

![ERD](./erdPizzaAPI.png)

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    readme.md
    logs/
    src/
        configs/
            dbConnection.js
        controllers/
            auth.js
            pizza.js
            order.js
            topping.js
            user.js
        helpers/
            passwordEncrypt.js
            setToken.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
        models/
            pizza.js
            order.js
            topping.js
            user.js
        routes/
            auth.js
            pizza.js
            order.js
            topping.js
            user.js
```