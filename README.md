## Changes worth noting

inside of `package.json`

```diff
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@react-email/render": "^0.0.12",
+    "react": "18.2.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
+    "@types/react": "18.2.55",
    "@types/supertest": "^6.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
```

in the `tsconfig.json`

```diff
{
  "compilerOptions": {
    "strict": true,
    "strictFunctionTypes": true,
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
+    "jsx": "react-jsx",

    // This setting should really be true in order for the compiled TS output to
    // follow the Javascript specs (and it defaults to true in TS projects
    // targeting newer Javascript versions) but we can't make it true, because
    // typeorm, and possibly nestjs (and/or class-validator), rely on the old,
    // non-standard behavior. See https://github.com/typeorm/typeorm/issues/9118
    "useDefineForClassFields": false,

    // This ignores event listeners
    "noUnusedLocals": false,
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "inlineSources": true
  }
}
```

in the transactional's `tsconfig.json`

```diff
{
+  "extends": "../tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "outDir": "dist",
    "declaration": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

