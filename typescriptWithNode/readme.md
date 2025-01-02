# TypeScript with Node

- tsconfig.json: 
    - npx tsc --init 
    - npm i -D ts-node
    - npx tsc --build
        - package.json/scripts:
            - "build": "tsc --build",
            - "start": "node ./dist/index.js"
            - "dev": "nodemon ./src/index.ts"
```js
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "node16",
        "baseUrl": "src",
        "outDir": "dist",
        "sourceMap": true,
        "noImplicitAny": true,
    },
    "include": [
        "src/**/*"
    ]
}
```

- nodemon.json
```js
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "exec": "ts-node ./src/index.ts"
}
```
