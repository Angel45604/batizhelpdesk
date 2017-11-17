# batizdeskhelp-db

## Usage

``` js
const setupDatabase = require('batizdeskhelp-db')

setupDatabase(config).then(db => {
    const { some stuff } = db

}).catch(err => console.error(err))
```