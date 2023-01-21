# Lemon Challenge

## Commands

```bash
# install dependencies
npm ci

# run tests
npm test

# build
npm run build

# run
npm start

```

## Documentation

### Validators

It's a dynamic schema validator of input. There're two thing which I didn't manage to make:

1. Dynamic attribute detection of properties like (`numeroDoDocumento`, `tipoDeConexao`, etc..). Therefore I had to use switch operator to trigger the right sub-validator
2. Dynamic detection of types, this means thas if the type is float (e.g. on consumer history) you probably have to code one more case on `validateType`

### Analysis

It's the bussiness rule of this challenge-case. So if you want to change how analysis is made, then you shoudl change `analyze` function or the sub-analisys functions
