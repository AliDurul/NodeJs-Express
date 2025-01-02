# TypeScript with Node

- tsconfig.json
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
